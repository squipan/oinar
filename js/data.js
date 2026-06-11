// =============================================
// OINAR - Data Layer (Firestore + Memory Cache)
// =============================================

// In-memory database - populated from Firestore after login
let _db = {
  user: { name: 'Oinar Studio', email: '', phone: '', businessName: 'Oinar Wedding', mercari: 'https://jp.mercari.com/user/profile/177559465' },
  language: 'jp',
  orders: [],
  clients: [],
  tasks: [],
  invoices: [],
  inventory: { noshi: 0, nagagata: 0, pochi: 0, sealA: 0, sealB: 0 },
  waste: [],
  prices: { noshi: 60, nagagata: 45, pochi: 80, atsugami: 100, sealA: 20, sealB: 10 }
};

// Called by app.js after Firestore data is fetched
function initDB(data) {
  if (data) {
    if (data.inventory) {
      if (!Array.isArray(data.inventory)) {
        const rawInv = data.inventory;
        const arrayInv = [];
        const today = new Date().toISOString().split('T')[0];
        
        if (rawInv.noshi > 0) arrayInv.push({ id: 'noshi_' + Date.now(), date: today, name: 'のし袋 / Noshi Envelopes', qty: rawInv.noshi, price: 0 });
        if (rawInv.nagagata > 0) arrayInv.push({ id: 'nagagata_' + Date.now(), date: today, name: '長形４号 / Long Envelope (Nagagata 4)', qty: rawInv.nagagata, price: 0 });
        if (rawInv.pochi > 0) arrayInv.push({ id: 'pochi_' + Date.now(), date: today, name: 'ポチ袋 / Pochi Envelopes', qty: rawInv.pochi, price: 0 });
        if (rawInv.sealA > 0) arrayInv.push({ id: 'sealA_' + Date.now(), date: today, name: 'シールA / Sticker A', qty: rawInv.sealA, price: 0 });
        if (rawInv.sealB > 0) arrayInv.push({ id: 'sealB_' + Date.now(), date: today, name: 'シールB / Sticker B', qty: rawInv.sealB, price: 0 });
        
        const misc = data.miscItems || [];
        misc.forEach(m => {
          arrayInv.push({
            id: m.id || 'misc_' + Date.now() + Math.random().toString(36).substr(2, 5),
            date: today,
            name: m.name,
            qty: m.qty || 0,
            price: m.price || 0
          });
        });
        data.inventory = arrayInv;
        data.miscItems = [];
      } else {
        const converted = [];
        const today = new Date().toISOString().split('T')[0];
        data.inventory.forEach(item => {
          if (item.hasOwnProperty('isCore')) {
            if ((item.qty || 0) > 0 || (item.price || 0) > 0) {
              converted.push({
                id: item.id,
                date: today,
                name: item.name,
                qty: item.qty || 0,
                price: (item.price || 0) * (item.qty || 1)
              });
            }
          } else {
            converted.push(item);
          }
        });
        data.inventory = converted;
      }
    } else {
      data.inventory = [];
    }
  }
  _db = data;
}

// ---- DB Access ----
function getDB() { return _db; }

function saveDB(db) {
  _db = db;
  // Persist settings/inventory/prices/language to Firestore user doc
  fsSaveUserDoc({
    user: db.user,
    language: db.language,
    inventory: db.inventory,
    prices: db.prices,
    miscItems: db.miscItems || []
  });
}

// ---- Generic CRUD (sync in-memory + async Firestore) ----
function getAll(collection) { return _db[collection] || []; }

function addItem(collection, item) {
  if (!item.id) {
    item.id = collection[0] + Date.now() + Math.random().toString(36).slice(2, 7);
  }
  if (!_db[collection]) _db[collection] = [];
  _db[collection].unshift(item);
  fsAddItem(collection, item);
  return item;
}

function updateItem(collection, id, updates) {
  const idx = _db[collection].findIndex(i => i.id === id);
  if (idx > -1) {
    _db[collection][idx] = { ..._db[collection][idx], ...updates };
    fsUpdateItem(collection, id, _db[collection][idx]);
  }
  return _db[collection][idx];
}

function deleteItem(collection, id) {
  _db[collection] = _db[collection].filter(i => i.id !== id);
  fsDeleteItem(collection, id);
}

// ---- User / Settings ----
function getUser() { return _db.user; }
function saveUser(data) {
  _db.user = { ..._db.user, ...data };
  fsSaveUserDoc({ user: _db.user });
}

function getLanguage() { return _db.language || 'jp'; }
function setLanguage(lang) {
  _db.language = lang;
  fsSaveUserDoc({ language: lang });
}

function getPrices() {
  if (!_db.prices) _db.prices = { noshi: 60, nagagata: 45, pochi: 80, atsugami: 100, sealA: 20, sealB: 10 };
  return _db.prices;
}
function savePrices(prices) {
  _db.prices = { ..._db.prices, ...prices };
  fsSaveUserDoc({ prices: _db.prices });
}

// ---- Auth (delegates to Firebase) ----
function getAuth() {
  const user = auth.currentUser;
  if (!user) return null;
  return { email: user.email, name: _db.user.name, businessName: _db.user.businessName };
}
function clearAuth() { /* handled by firebase signOut in app.js */ }