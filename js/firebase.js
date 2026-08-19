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

// ---- Firestore references ----
function getUserDocRef() {
  const user = auth.currentUser;
  if (!user) return null;
  return firestore.collection('users').doc(user.uid);
}

function getCollectionRef(name) {
  const user = auth.currentUser;
  if (!user) return null;
  return firestore.collection('users').doc(user.uid).collection(name);
}

// ---- Firestore write helpers (fire-and-forget) ----
function fsAddItem(collectionName, item) {
  const ref = getCollectionRef(collectionName);
  if (!ref) return;
  const { id, ...data } = item;
  ref.doc(id).set(data).catch(err => console.warn('[FS] Add error:', err));
}

function fsUpdateItem(collectionName, id, updates) {
  const ref = getCollectionRef(collectionName);
  if (!ref) return;
  ref.doc(id).set(updates, { merge: true }).catch(err => console.warn('[FS] Update error:', err));
}

function fsDeleteItem(collectionName, id) {
  const ref = getCollectionRef(collectionName);
  if (!ref) return;
  ref.doc(id).delete().catch(err => console.warn('[FS] Delete error:', err));
}

function fsSaveUserDoc(data) {
  const ref = getUserDocRef();
  if (!ref) return;
  ref.set(data, { merge: true }).catch(err => console.warn('[FS] User doc save error:', err));
}

// ---- Save prices to Firestore ----
function savePrices(prices) {
  // Save to localStorage
  const db = getDB();
  db.prices = prices;
  saveDB(db);

  // Sync to Firestore under user doc
  const ref = getUserDocRef();
  if (!ref) return;
  ref.set({ prices }, { merge: true }).catch(err => console.warn('[FS] Prices save error:', err));
}

// ---- Get prices (from localStorage cache) ----
function getPrices() {
  return getDB().prices || { noshi: 60, nagagata: 45, pochi: 80, atsugami: 100, sealA: 20, sealB: 10, sekifudaNoLogo: 50, sekifudaWithLogo: 55 };
}

// ---- Load ALL data from Firestore on login ----
async function loadAllDataFromFirestore() {
  const user = auth.currentUser;
  if (!user) return null;

  const userRef = firestore.collection('users').doc(user.uid);

  try {
    const [userSnap, ordersSnap, tasksSnap, wasteSnap, clientsSnap] = await Promise.all([
      userRef.get(),
      userRef.collection('orders').get().catch(() => ({ docs: [] })),
      userRef.collection('tasks').get().catch(() => ({ docs: [] })),
      userRef.collection('waste').get().catch(() => ({ docs: [] })),
      userRef.collection('clients').get().catch(() => ({ docs: [] }))
    ]);

    const userData = userSnap.exists ? userSnap.data() : {};
    const orders  = ordersSnap.docs.map(d => ({ id: d.id, ...d.data() }));
    const tasks   = tasksSnap.docs.map(d => ({ id: d.id, ...d.data() }));
    const waste   = wasteSnap.docs.map(d => ({ id: d.id, ...d.data() }));
    const clients = clientsSnap.docs.map(d => ({ id: d.id, ...d.data() }));

    // Sort by date descending
    orders.sort((a, b) => (b.date || '').localeCompare(a.date || ''));
    waste.sort((a,  b) => (b.date || '').localeCompare(a.date || ''));

    return {
      user: userData.user || {
        name: 'Oinar Studio',
        email: user.email,
        phone: '',
        businessName: 'Oinar Wedding',
        mercari: 'https://jp.mercari.com/user/profile/177559465'
      },
      language:  userData.language  || 'jp',
      orders,
      clients,
      tasks,
      invoices:  [],
      inventory: userData.inventory || { noshi: 0, nagagata: 0, pochi: 0, sealA: 0, sealB: 0 },
      waste,
      prices:    userData.prices    || { noshi: 60, nagagata: 45, pochi: 80, atsugami: 100, sealA: 20, sealB: 10, sekifudaNoLogo: 50, sekifudaWithLogo: 55 },
      miscItems: userData.miscItems || []
    };
  } catch (err) {
    console.error('[FS] Load failed:', err);
    return null;
  }
}