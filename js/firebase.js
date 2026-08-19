// =============================================
// OINAR - Firebase Configuration & Helpers
// =============================================

const firebaseConfig = {
  apiKey: "AIzaSyC2zr79GTp5-crUtpYC2cRWqhqkA_Vl_Es",
  authDomain: "oinar-project.firebaseapp.com",
  projectId: "oinar-project",
  storageBucket: "oinar-project.firebasestorage.app",
  messagingSenderId: "249762082353",
  appId: "1:249762082353:web:b5c67ce93d8fd50e986f10"
};

firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const firestore = firebase.firestore();

// Fixed Studio ID — all data is stored under this document, not tied to any user UID.
// This means no login is ever required. The app signs in anonymously and always
// reads/writes to the same Firestore path.
const STUDIO_ID = 'oinar-main-studio';

// Keep session alive across PWA restarts
auth.setPersistence(firebase.auth.Auth.Persistence.LOCAL).catch(() => {});

// ---- Firestore references (fixed path, not UID-based) ----
function getUserDocRef() {
  return firestore.collection('studios').doc(STUDIO_ID);
}

function getCollectionRef(name) {
  return firestore.collection('studios').doc(STUDIO_ID).collection(name);
}

// ---- Firestore write helpers (fire-and-forget) ----
function fsAddItem(collectionName, item) {
  const ref = getCollectionRef(collectionName);
  const { id, ...data } = item;
  ref.doc(id).set(data).catch(err => console.warn('[FS] Add error:', err));
}

function fsUpdateItem(collectionName, id, updates) {
  const ref = getCollectionRef(collectionName);
  ref.doc(id).set(updates, { merge: true }).catch(err => console.warn('[FS] Update error:', err));
}

function fsDeleteItem(collectionName, id) {
  const ref = getCollectionRef(collectionName);
  ref.doc(id).delete().catch(err => console.warn('[FS] Delete error:', err));
}

function fsSaveUserDoc(data) {
  const ref = getUserDocRef();
  ref.set(data, { merge: true }).catch(err => console.warn('[FS] Studio doc save error:', err));
}

// ---- Save prices to Firestore ----
function savePrices(prices) {
  const db = getDB();
  db.prices = prices;
  saveDB(db);
  getUserDocRef().set({ prices }, { merge: true }).catch(err => console.warn('[FS] Prices save error:', err));
}

const DEFAULT_PRICES = {
  noshi: 60,
  nagagata: 45,
  pochi: 80,
  atsugami: 100,
  sealA: 20,
  sealB: 10,
  sekifudaNoLogo: 50,
  sekifudaWithLogo: 55,
  hofuchoMermaid1: 280,
  hofuchoMermaid2: 180,
  hofuchoGayo1: 260,
  hofuchoGayo2: 160,
  uketsukeSign1: 320,
  uketsukeSignExtra: 100
};

// ---- Get prices (from localStorage cache) ----
function getPrices() {
  const db = getDB();
  db.prices = { ...DEFAULT_PRICES, ...(db.prices || {}) };
  return db.prices;
}

// ---- Auto sign-in (anonymous, invisible to user) ----
async function autoSignIn() {
  try {
    if (!auth.currentUser) {
      await auth.signInAnonymously();
    }
    return auth.currentUser;
  } catch (err) {
    console.warn('[FS] Auto sign-in failed:', err);
    return null;
  }
}

// ---- Load ALL data from Firestore ----
async function loadAllDataFromFirestore() {
  // Ensure we have an anonymous session
  if (!auth.currentUser) {
    await autoSignIn();
  }

  const studioRef = getUserDocRef();

  try {
    const [studioSnap, ordersSnap, tasksSnap, wasteSnap, clientsSnap] = await Promise.all([
      studioRef.get(),
      studioRef.collection('orders').get().catch(() => ({ docs: [] })),
      studioRef.collection('tasks').get().catch(() => ({ docs: [] })),
      studioRef.collection('waste').get().catch(() => ({ docs: [] })),
      studioRef.collection('clients').get().catch(() => ({ docs: [] }))
    ]);

    const studioData = studioSnap.exists ? studioSnap.data() : {};
    const orders  = ordersSnap.docs.map(d => ({ id: d.id, ...d.data() }));
    const tasks   = tasksSnap.docs.map(d => ({ id: d.id, ...d.data() }));
    const waste   = wasteSnap.docs.map(d => ({ id: d.id, ...d.data() }));
    const clients = clientsSnap.docs.map(d => ({ id: d.id, ...d.data() }));

    // Sort by date descending
    orders.sort((a, b) => (b.date || '').localeCompare(a.date || ''));
    waste.sort((a,  b) => (b.date || '').localeCompare(a.date || ''));

    return {
      user: studioData.user || {
        name: 'Oinar Studio',
        email: '',
        phone: '',
        businessName: 'Oinar Wedding',
        mercari: 'https://jp.mercari.com/user/profile/177559465'
      },
      language:  studioData.language  || 'jp',
      orders,
      clients,
      tasks,
      invoices:  [],
      inventory: studioData.inventory || { noshi: 0, nagagata: 0, pochi: 0, sealA: 0, sealB: 0 },
      waste,
      prices:    { ...DEFAULT_PRICES, ...(studioData.prices || {}) },
      miscItems: studioData.miscItems || []
    };
  } catch (err) {
    console.error('[FS] Load failed:', err);
    return null;
  }
}