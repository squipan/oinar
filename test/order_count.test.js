const fs = require('fs');
const vm = require('vm');
const assert = require('assert');

// 1. Read files
const dataJsContent = fs.readFileSync('js/data.js', 'utf8');
const appJsContent = fs.readFileSync('js/app.js', 'utf8');

// 2. Set up global context mockup for browser environment
const domElements = {};
const mockDoc = {
  getElementById: (id) => {
    if (!domElements[id]) {
      domElements[id] = {
        textContent: '',
        value: '',
        style: {},
        classList: { add: () => {}, remove: () => {}, toggle: () => {} },
        addEventListener: () => {},
        querySelector: () => null,
        querySelectorAll: () => [],
        appendChild: () => {},
        setAttribute: () => {}
      };
    }
    return domElements[id];
  },
  querySelectorAll: () => [],
  addEventListener: () => {},
  createElement: (tag) => ({ appendChild: () => {}, value: '', textContent: '', setAttribute: () => {} })
};

const mockWindow = {
  addEventListener: () => {},
  innerWidth: 1024
};

const mockAuth = {
  currentUser: { email: 'test@example.com', uid: 'testuid' },
  onAuthStateChanged: () => {}
};

const context = {
  document: mockDoc,
  window: mockWindow,
  auth: mockAuth,
  firebase: {
    initializeApp: () => {},
    auth: () => mockAuth,
    firestore: () => ({
      collection: () => ({
        doc: () => ({
          get: async () => ({ exists: false, data: () => ({}) }),
          collection: () => ({
            get: async () => ({ docs: [] })
          })
        })
      })
    })
  },
  fsSaveUserDoc: () => {},
  fsAddItem: () => {},
  fsUpdateItem: () => {},
  fsDeleteItem: () => {},
  navigator: { serviceWorker: { register: () => Promise.resolve() } },
  console: {
    log: () => {},
    warn: () => {},
    error: console.error
  },
  setTimeout: setTimeout,
  Intl: Intl
};

vm.createContext(context);

// Execute scripts inside context
vm.runInContext(dataJsContent, context);
vm.runInContext(appJsContent, context);

// 3. Define Tests
console.log('Running tests...');

// Reset / Initialize Database mock state
context.initDB({
  user: { name: 'Oinar Test' },
  language: 'en',
  orders: [],
  clients: [],
  tasks: [],
  inventory: [],
  waste: [],
  prices: { noshi: 60, nagagata: 45, pochi: 80, atsugami: 100, sealA: 20, sealB: 10 }
});

// Test 1: Dashboard order count logic (envelope + A4 items, ignoring stickers)
console.log('Test 1: Dashboard order counting logic...');
// Create order with 100 envelopes, 20 A4 items, 1 Seal A, 1 Seal B
const order1 = {
  id: 'o1',
  date: '2026-06-11',
  buyerName: 'Buyer A',
  clientId: 'c1',
  items: {
    noshi: 50,
    nagagata: 30,
    pochi: 20, // 100 envelopes
    sealA: 1,
    sealB: 1, // stickers (excluded)
    hofuchoMermaid: 10,
    hofuchoGayo: 5,
    uketsukeSign: 5 // 20 A4 items
  },
  profit: 5000,
  purchaseAmount: 10000
};

context.addItem('orders', order1);

// Run dashboard calculations
context.loadDashboardData();
let totalOrders = parseInt(context.document.getElementById('metric-orders').textContent);
assert.strictEqual(totalOrders, 120, `Expected 120 orders (100 envelopes + 20 A4 items), got ${totalOrders}`);
console.log('✓ Test 1 Passed!');

// Test 2: Customer aggregation for identical names (should NOT merge if they have different IDs)
console.log('Test 2: Customer aggregation with identical names...');
// Clear database
context.initDB({
  user: { name: 'Oinar Test' },
  language: 'en',
  orders: [],
  clients: [],
  tasks: [],
  inventory: [],
  waste: [],
  prices: { noshi: 60, nagagata: 45, pochi: 80, atsugami: 100, sealA: 20, sealB: 10 }
});

// Add Order 1: Buyer "ここ" (ID: client_A) purchased 20 items
const o1 = {
  id: 'order_1',
  date: '2026-06-11',
  buyerName: 'ここ',
  clientId: 'client_A',
  items: { noshi: 20 }
};

// Add Order 2: Buyer "ここ" (ID: client_B) purchased 18 items
const o2 = {
  id: 'order_2',
  date: '2026-06-11',
  buyerName: 'ここ',
  clientId: 'client_B',
  items: { noshi: 18 }
};

// Add Order 3: Buyer "ここ" (ID: client_B) purchased 1 item
const o3 = {
  id: 'order_3',
  date: '2026-06-11',
  buyerName: 'ここ',
  clientId: 'client_B',
  items: { noshi: 1 }
};

context.addItem('clients', { id: 'client_A', name: 'ここ', isFromOrder: true });
context.addItem('clients', { id: 'client_B', name: 'ここ', isFromOrder: true });

context.addItem('orders', o1);
context.addItem('orders', o2);
context.addItem('orders', o3);

// Run dashboard and client sync
context.loadDashboardData();
context.syncAutoTrackedClients();

const clients = context.getAll('clients');
const clientA = clients.find(c => c.id === 'client_A');
const clientB = clients.find(c => c.id === 'client_B');

assert.ok(clientA, 'Client A should exist');
assert.ok(clientB, 'Client B should exist');
assert.strictEqual(clientA.orders, 20, `Client A orders count should be 20, got ${clientA.orders}`);
assert.strictEqual(clientB.orders, 19, `Client B orders count should be 19, got ${clientB.orders}`);

const dashboardOrders = parseInt(context.document.getElementById('metric-orders').textContent);
assert.strictEqual(dashboardOrders, 39, `Dashboard total orders count should be 39, got ${dashboardOrders}`);

console.log('✓ Test 2 Passed!');
console.log('All tests passed successfully! 🎉');
