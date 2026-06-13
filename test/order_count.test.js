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
  createElement: (tag) => ({ appendChild: () => {}, value: '', textContent: '', setAttribute: () => {}, style: {} })
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

context.addItem('clients', { id: 'c1', name: 'Buyer A', date: '2026-06-11', isFromOrder: true });
context.addItem('orders', order1);
context.syncAutoTrackedClients();

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

// Run client sync first then dashboard calculations
context.syncAutoTrackedClients();
context.loadDashboardData();

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

// Test 3: handleOrderSubmit auto-assigns unique clientId and creates separate clients for same name
console.log('Test 3: handleOrderSubmit auto-assigns unique client IDs...');
// Reset / Clear database
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

// Setup mock elements for first order
domElements['order-id'] = { value: '' }; // New order
domElements['order-date'] = { value: '2026-06-11' };
domElements['order-buyer'] = { value: 'ここ' };
domElements['item-noshi'] = { value: '5' };
domElements['item-nagagata'] = { value: '0' };
domElements['item-pochi'] = { value: '0' };
domElements['item-atsugami'] = { checked: false };
domElements['item-seal-a'] = { value: '0' };
domElements['item-seal-b'] = { value: '0' };
domElements['item-hofucho-mermaid'] = { value: '0' };
domElements['item-hofucho-gayo'] = { value: '0' };
domElements['item-uketsuke'] = { value: '0' };
domElements['order-express'] = { checked: false };
domElements['order-deadline'] = { value: '2026-06-18' };
domElements['order-comments'] = { value: 'First Order Comments' };
domElements['order-adjustment'] = { value: '0' };
domElements['order-adjustment-reason'] = { value: '' };
domElements['hidden-purchase'] = { value: '500' };
domElements['hidden-fee'] = { value: '50' };
domElements['hidden-profit'] = { value: '450' };

// Submit first order
context.handleOrderSubmit({ preventDefault: () => {} });

// Setup mock elements for second order with same name
domElements['order-id'] = { value: '' }; // New order
domElements['order-buyer'] = { value: 'ここ' };
domElements['order-comments'] = { value: 'Second Order Comments' };

// Submit second order
context.handleOrderSubmit({ preventDefault: () => {} });

const test3Orders = context.getAll('orders');
const test3Clients = context.getAll('clients');

assert.strictEqual(test3Orders.length, 2, 'Should have created 2 orders');
assert.strictEqual(test3Clients.length, 2, 'Should have created 2 client records');
assert.notStrictEqual(test3Orders[0].clientId, test3Orders[1].clientId, 'Client IDs must be different');
assert.notStrictEqual(test3Clients[0].id, test3Clients[1].id, 'Client record IDs must be different');

console.log('✓ Test 3 Passed!');

// Test 4: Prevent double-counting when a client is linked to an order but isFromOrder is not true/unset.
console.log('Test 4: Prevent double-counting with unset isFromOrder...');
context.initDB({
  user: { name: 'Oinar Test' },
  language: 'en',
  orders: [
    {
      id: 'o_2026_1',
      date: '2026-06-11',
      buyerName: 'Test Client',
      clientId: 'c_unset_from_order',
      items: { noshi: 1 },
      profit: 5000,
      purchaseAmount: 10000
    }
  ],
  clients: [
    {
      id: 'c_unset_from_order',
      name: 'Test Client',
      date: '2026-06-11',
      orders: 1,
      sales: 10000,
      profit: 5000,
      isFromOrder: undefined // This mimics legacy database state
    }
  ],
  tasks: [],
  inventory: [],
  waste: [],
  prices: { noshi: 60, nagagata: 45, pochi: 80, atsugami: 100, sealA: 20, sealB: 10 }
});

// Run migration
context.migrateHistoricalData();

// Verify migration corrected the client record
const migratedClients = context.getAll('clients');
const clientRecord = migratedClients.find(c => c.id === 'c_unset_from_order');
assert.strictEqual(clientRecord.isFromOrder, true, 'Migration should set isFromOrder to true');

// Reset to undefined and test dashboard-level fallback
clientRecord.isFromOrder = undefined;
context.loadDashboardData();

const totalProfit = parseInt(context.document.getElementById('metric-profit').textContent.replace(/[^\d]/g, ''));
assert.strictEqual(totalProfit, 5000, `Expected total profit of 5000 (no double counting), but got ${totalProfit}`);

console.log('✓ Test 4 Passed!');
console.log('All tests passed successfully! 🎉');

