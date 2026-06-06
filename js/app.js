// =============================================
// OINAR - Main Application Logic
// =============================================

// Pricing Constants
let PRICES = {
  noshi: 60,
  nagagata: 45,
  pochi: 80,
  atsugami: 100,
  sealA: 20,
  sealB: 10
};
const SHIPPING_FEE_ADDITION = 300;
const EXPRESS_FEE = 300;
const PLATFORM_FEES = { Mercari: 0.10, Rakuma: 0.10, Yahoo: 0.05 };

// Translation Dictionary
const i18n = {
  en: {
    'login_btn': 'Access Dashboard',
    'nav_dashboard': 'Dashboard',
    'nav_orders': 'Orders',
    'nav_clients': 'Clients',
    'nav_tasks': 'Tasks',
    'nav_inventory': 'Inventory',
    'nav_settings': 'Settings',
    'nav_logout': 'Logout',
    'top_overview': 'Business Overview',
    'btn_new_order': 'New Order',
    'dash_profit': 'Total Profit',
    'dash_sales': 'Total Sales',
    'dash_tasks': 'Remaining Tasks',
    'dash_orders': 'Total Orders',
    'recent_tasks': 'Recent Tasks',
    'view_all': 'View All',
    'quick_actions': 'Quick Actions',
    'add_client': 'Add Client',
    'add_task': 'Add Task',
    'order_date': 'Date',
    'order_buyer': 'Buyer Name',
    'order_items': 'Items',
    'order_amount': 'Purchase Amount',
    'order_profit': 'Actual Profit',
    'order_status': 'Status',
    'order_deadline': 'Deadline',
    'order_actions': 'Actions',
    'order_modal_title': 'Order Details',
    'qty': 'Qty',
    'calc_summary': 'Calculation Summary',
    'base_price': 'Base Price',
    'shipping_added': 'Shipping Added',
    'shipping_cost': 'Actual Shipping Cost',
    'platform_fee': 'Platform Fee',
    'calc_profit': 'Calculated Profit',
    'save_order': 'Save Order',
    'cancel': 'Cancel',
    'all_time': 'All Time',
    'this-month': 'This Month',
    'last-month': 'Last Month',
    'this-year': 'This Year',
    'metric_order_profit': 'Order Profit',
    'metric_inventory_cost': 'Inventory Cost',
    'metric_net_profit': 'Net Profit',
    'metric_total_clients': 'Total Clients',
    'title_for_printing': 'For Printing',
    'title_active_orders': 'Active Orders',
    'title_past_orders': 'Past Orders',
    'title_active_tasks': 'Active Tasks',
    'title_completed_tasks': 'Completed Tasks',
    'title_purchase_log': 'Purchase Log',
    'title_misprint_log': 'Misprint Log',
    'th_client': 'Client',
    'th_priority': 'Priority',
    'th_items': 'Items',
    'th_deadline': 'Deadline',
    'th_printing_done': 'Printing Done?',
    'th_shipped': 'Shipped',
    'th_purchase_date': 'Purchase Date',
    'th_actions': 'Actions',
    'th_total_spent': 'Total Spent:',
    'th_date': 'Date',
    'th_item': 'Item',
    'th_qty_wasted': 'Qty Wasted',
    'th_note': 'Note',
    'th_total_cost': 'Total Cost',
    'label_business_name': 'Business Name',
    'label_email_address': 'Email Address',
    'label_phone_number': 'Phone Number',
    'label_mercari_profile': 'Mercari Profile',
    'label_open': 'Open',
    'settings_price_config': 'Item Prices (¥)',
    'btn_save_settings': 'Save Settings',
    'options': 'Options',
    'label_atsugami_add': 'Add backing reinforcement',
    'label_express_add': 'Add Express delivery',
    'label_platform': 'Platform',
    'label_comments': 'Comments',
    'label_due_date': 'Due Date',
    'label_priority': 'Priority',
    'label_save_task': 'Save Task',
    'title_log_misprint': 'Log Misprint',
    'label_qty_wasted': 'Qty Wasted',
    'label_note': 'Note',
    'label_save': 'Save',
    'title_client_details': 'Client Details',
    'label_buyer_name': 'Buyer Name',
    'label_purchase_date': 'Purchase Date',
    'label_total_orders': 'Total Orders',
    'label_total_sales': 'Total Sales',
    'label_total_profit': 'Total Profit',
    'label_save_client': 'Save Client',
    'label_loading_data': 'Loading data...',
    'noshi': 'Noshi Envelopes',
    'nagagata': 'Long Envelope (Nagagata 4)',
    'pochi': 'Pochi Envelopes',
    'atsugami': 'Hard Board Reinforcement',
    'sealA': 'Sticker A',
    'sealB': 'Sticker B',
    'badge_express': 'Express',
    'status_ready': 'Ready',
    'status_pending': 'Pending',
    'status_finished': 'Finished',
    'status_todo': 'To Do',
    'status_done': 'Done',
    'priority_high': 'High',
    'priority_medium': 'Medium',
    'priority_low': 'Low',
    'no_purchase_records': 'No purchase records.',
    'no_waste_recorded': 'No waste recorded.',
    'no_clients_found': 'No clients found.',
    'no_tasks_yet': 'No completed tasks yet.',
    'all_orders_shipped': 'All orders shipped! 🎉',
    'no_shipped_orders_yet': 'No shipped orders yet.',
    'label_new_purchase_log': 'New Purchase Log:',
    'label_item_name_placeholder': 'Item Name (e.g. Noshi, Ink)',
    'label_total_cost_placeholder': 'Total Cost ¥',
    'label_add': 'Add',
    'label_cancel': 'Cancel',
    'client_year_placeholder': 'Year',
    'client_month_placeholder': 'Month',
    'client_day_placeholder': 'Day',
    'label_date': 'Date',
    'label_buyer': 'Buyer',
    'Pending': 'Pending',
    'Ready for Shipping': 'Ready for Shipping',
    'Finished': 'Finished',
    'To Do': 'To Do',
    'Done': 'Done',
    'High': 'High',
    'Medium': 'Medium',
    'Low': 'Low',
    'platform_fee_label': '{platform} Fee (-{rate}%)',
    'save_settings_alert': 'Settings saved! ✓',
    'delete_purchase_confirm': 'Delete this purchase log? / この購入履歴を削除しますか？',
    'delete_item_confirm': 'Delete this item? / このアイテムを削除しますか？',
    'delete_task_confirm': 'Delete this task? / このタスクを削除しますか？',
    'delete_waste_confirm': 'Delete this waste record? / この廃棄記録を削除しますか？',
    'delete_client_confirm': 'Delete this client? / この顧客を削除しますか？',
    // New Keys
    'login_subtitle': 'Wedding Stationery Management',
    'login_email_label': 'Email Address',
    'login_email_placeholder': 'your@email.com',
    'login_password_label': 'Password',
    'login_password_placeholder': '••••••••',
    'label_add_item': 'Add Item',
    'label_options': 'Options',
    'label_add_option': 'Add',
    'label_express_option': 'Express (+¥300)',
    'label_platform': 'Platform',
    'platform_yahoo': 'Yahoo Flea Market',
    'label_comments': 'Comments',
    'label_comments_placeholder': 'Optional notes...',
    'label_buyer_placeholder': 'e.g. Yamada Hanako',
    'label_note_placeholder': 'e.g. Misprint, Paper jam...',
    'settings_business_name_label': 'Business Name',
    'settings_business_name_placeholder': 'Oinar Wedding',
    'settings_email_placeholder': 'hello@oinar.com',
    'settings_phone_label': 'Phone Number',
    'settings_phone_placeholder': '+81 90 0000 0000',
    'settings_mercari_label': 'Mercari Profile',
    'settings_item_prices_title': 'Item Prices (¥)',
    'save_settings_btn': 'Save Settings',
    'save_task': 'Save Task',
    'save_client': 'Save Client',
    'settings_total_orders': 'Total Orders',
    'settings_total_sales': 'Total Sales (¥)',
    'settings_total_profit': 'Total Profit (¥)',
    'no_tasks_to_do': 'No tasks to do! 🎉',
    'task_title_template': 'Pack & ship order for {buyer}',
    'period_all': 'All Time',
    'period_this_month': 'This Month',
    'period_last_month': 'Last Month',
    'period_this_year': 'This Year',
    'label_qty_wasted': 'Qty Wasted',
    'label_save': 'Save',
    'label_yes': 'Yes',
    'login_failed': 'Login failed.',
    'invalid_credentials': 'Invalid email or password.',
    'client_auto_tracked': 'Auto-tracked',
    'metric_net_profit_sub': 'Revenue − Cost',
    'label_select_item': '-- Select Item --',
    'label_adjustment': 'Add-ons / Deductions',
    'label_adjustment_reason_placeholder': 'Reason (e.g. discount, custom charge)',
    'shipping_custom': 'Custom',
    'shipping_custom_label': 'Custom Cost (¥)'
  },
  jp: {
    'login_btn': 'ダッシュボードへ',
    'nav_dashboard': 'ダッシュボード',
    'nav_orders': '注文',
    'nav_clients': '顧客',
    'nav_tasks': 'タスク',
    'nav_inventory': '在庫',
    'nav_settings': '設定',
    'nav_logout': 'ログアウト',
    'top_overview': 'ビジネス概要',
    'btn_new_order': '新規注文',
    'dash_profit': '実質利益',
    'dash_sales': '合計金額',
    'dash_tasks': '残りタスク',
    'dash_orders': '総注文数',
    'recent_tasks': '最近のタスク',
    'view_all': 'すべて見る',
    'quick_actions': 'クイックアクション',
    'add_client': '顧客追加',
    'add_task': 'タスク追加',
    'order_date': '日付',
    'order_buyer': '購入者名',
    'order_items': 'デザイン & 枚数',
    'order_amount': '購入金額',
    'order_profit': '実質利益',
    'order_status': 'ステータス',
    'order_deadline': '発送予定日',
    'order_actions': '操作',
    'order_modal_title': '注文詳細',
    'qty': '枚数',
    'calc_summary': '計算の概要',
    'base_price': '基本料金',
    'shipping_added': '送料加算',
    'shipping_cost': '実際の送料',
    'platform_fee': '手数料 (10%)',
    'calc_profit': '実質利益',
    'save_order': '保存する',
    'cancel': 'キャンセル',
    'all_time': '全期間',
    'this-month': '今月',
    'last-month': '先月',
    'this-year': '今年',
    'metric_order_profit': '注文利益',
    'metric_inventory_cost': '在庫コスト',
    'metric_net_profit': '純利益',
    'metric_total_clients': '顧客数',
    'title_for_printing': '印刷待ち',
    'title_active_orders': '発送待ち中',
    'title_past_orders': '発送済み',
    'title_active_tasks': '未完了タスク',
    'title_completed_tasks': '完了済みタスク',
    'title_purchase_log': '購入履歴',
    'title_misprint_log': 'ミスプリント記録',
    'th_client': '顧客',
    'th_priority': '優先度',
    'th_items': '枚数',
    'th_deadline': '発送期日',
    'th_printing_done': '印刷完了',
    'th_shipped': '発送済',
    'th_purchase_date': '購入日',
    'th_actions': '操作',
    'th_total_spent': '支出合計:',
    'th_date': '日付',
    'th_item': '品目',
    'th_qty_wasted': '枚数',
    'th_note': 'メモ',
    'th_total_cost': '購入金額',
    'label_business_name': '屋号',
    'label_email_address': 'メールアドレス',
    'label_phone_number': '電話番号',
    'label_mercari_profile': 'メルカリプロフィール',
    'label_open': '開く',
    'settings_price_config': '単価設定 (¥)',
    'btn_save_settings': '設定を保存',
    'options': 'オプション',
    'label_atsugami_add': '厚紙補強を追加',
    'label_express_add': '速達を追加',
    'label_platform': 'プラットフォーム',
    'label_comments': 'コメント',
    'label_due_date': '期限日',
    'label_priority': '優先度',
    'label_save_task': 'タスクを保存',
    'title_log_misprint': 'ミスプリント記録',
    'label_qty_wasted': '枚数',
    'label_note': 'メモ',
    'label_save': '保存する',
    'title_client_details': '顧客情報',
    'label_buyer_name': '顧客名',
    'label_purchase_date': '購入日',
    'label_total_orders': '総注文数',
    'label_total_sales': '総売上金額',
    'label_total_profit': '総利益額',
    'label_save_client': '顧客情報を保存',
    'label_loading_data': 'データを読み込み中…',
    'noshi': 'のし袋',
    'nagagata': '長形４号',
    'pochi': 'ポチ袋',
    'atsugami': '厚紙補強',
    'sealA': 'シールA',
    'sealB': 'シールB',
    'badge_express': '速達',
    'status_ready': '発送待ち',
    'status_pending': '進行中',
    'status_finished': '完了',
    'status_todo': '未完了',
    'status_done': '完了',
    'priority_high': '高',
    'priority_medium': '中',
    'priority_low': '低',
    'no_purchase_records': '購入履歴はありません。',
    'no_waste_recorded': 'ミスプリント記録はありません。',
    'no_clients_found': '登録されている顧客はいません。',
    'no_tasks_yet': '完了済みのタスクはありません。',
    'all_orders_shipped': 'すべての注文が発送済みです 🎉',
    'no_shipped_orders_yet': '発送済みの注文はありません。',
    'label_new_purchase_log': '新規購入履歴:',
    'label_item_name_placeholder': '品目名 (例: のし袋、インク)',
    'label_total_cost_placeholder': '購入金額 ¥',
    'label_add': '追加',
    'label_cancel': 'キャンセル',
    'client_year_placeholder': '年',
    'client_month_placeholder': '月',
    'client_day_placeholder': '日',
    'label_date': '日付',
    'label_buyer': '購入者',
    'Pending': '進行中',
    'Ready for Shipping': '発送待ち',
    'Finished': '完了',
    'To Do': '未完了',
    'Done': '完了',
    'High': '高',
    'Medium': '中',
    'Low': '低',
    'platform_fee_label': '{platform} 手数料 (-{rate}%)',
    'save_settings_alert': '設定が保存されました！ ✓',
    'delete_purchase_confirm': 'この購入履歴を削除しますか？',
    'delete_item_confirm': 'このアイテムを削除しますか？',
    'delete_task_confirm': 'このタスクを削除しますか？',
    'delete_waste_confirm': 'この廃棄記録を削除しますか？',
    'delete_client_confirm': 'この顧客を削除しますか？',
    // New Keys
    'login_subtitle': 'ペーパーアイテム管理ダッシュボード',
    'login_email_label': 'メールアドレス',
    'login_email_placeholder': 'your@email.com',
    'login_password_label': 'パスワード',
    'login_password_placeholder': '••••••••',
    'label_add_item': '品目追加',
    'label_options': 'オプション',
    'label_add_option': '追加',
    'label_express_option': '速達 (+¥300)',
    'label_platform': 'プラットフォーム',
    'platform_yahoo': 'Yahoo フリマ',
    'label_comments': 'コメント',
    'label_comments_placeholder': '任意のメモ...',
    'label_buyer_placeholder': '例: 山田花子',
    'label_note_placeholder': '例: 印刷ミス、紙詰まり...',
    'settings_business_name_label': '屋号',
    'settings_business_name_placeholder': 'Oinar Wedding',
    'settings_email_placeholder': 'hello@oinar.com',
    'settings_phone_label': '電話番号',
    'settings_phone_placeholder': '+81 90 0000 0000',
    'settings_mercari_label': 'メルカリプロフィール',
    'settings_item_prices_title': '単価設定 (¥)',
    'save_settings_btn': '設定を保存',
    'save_task': 'タスクを保存',
    'save_client': '顧客情報を保存',
    'settings_total_orders': '総注文数',
    'settings_total_sales': '総売上金額 (¥)',
    'settings_total_profit': '総利益額 (¥)',
    'no_tasks_to_do': '未完了のタスクはありません。',
    'task_title_template': '{buyer} の注文を梱包・発送する',
    'period_all': '全期間',
    'period_this_month': '今月',
    'period_last_month': '先月',
    'period_this_year': '今年',
    'label_qty_wasted': '枚数',
    'label_save': '保存する',
    'label_yes': 'はい',
    'login_failed': 'ログインに失敗しました。',
    'invalid_credentials': 'メールアドレスまたはパスワードが正しくありません。',
    'client_auto_tracked': '自動追跡',
    'metric_net_profit_sub': '売上－コスト',
    'label_select_item': '-- 品目を選択 --',
    'label_adjustment': '追加・割引',
    'label_adjustment_reason_placeholder': '理由（例：割引、カスタム追加など）',
    'shipping_custom': 'カスタム',
    'shipping_custom_label': 'カスタム送料 (¥)'
  }
};

function t(key) {
  const lang = getLanguage();
  return i18n[lang] && i18n[lang][key] !== undefined ? i18n[lang][key] : key;
}

// ---- Loading overlay ----
function showLoadingOverlay(visible) {
  const el = document.getElementById('loading-overlay');
  if (el) el.style.display = visible ? 'flex' : 'none';
}

// ---- Refresh / Sync from Firestore ----
async function refreshData() {
  const btn = document.getElementById('btn-refresh');
  const icon = btn ? btn.querySelector('i') : null;
  if (btn) btn.disabled = true;
  if (icon) icon.classList.add('fa-spin');

  const data = await loadAllDataFromFirestore();
  if (data) initDB(data);

  PRICES = getPrices();
  applyLanguage(getLanguage());
  loadDashboardData();
  loadOrders();
  loadTasks();
  loadInventory();
  loadSettings();
  loadClients();
  updatePriceLabels();

  if (btn) btn.disabled = false;
  if (icon) icon.classList.remove('fa-spin');
}

document.addEventListener('DOMContentLoaded', () => {
  setupNavigation();
  setupModals();

  auth.onAuthStateChanged(async (firebaseUser) => {
    if (firebaseUser) {
      showLoadingOverlay(true);
      const data = await loadAllDataFromFirestore();
      if (data) initDB(data);
      showLoadingOverlay(false);

      document.getElementById('home-view').style.display = 'none';
      document.getElementById('dashboard-layout').style.display = 'flex';
      const name = getUser().name || 'Oinar Studio';
      const biz = getUser().businessName || name;
      document.getElementById('topbar-user-name').textContent = name;
      document.getElementById('sidebar-user-name').textContent = biz;

      applyLanguage(getLanguage());
      PRICES = getPrices();
      loadDashboardData();
      loadOrders();
      loadClients();
      loadTasks();
      loadInventory();
      loadSettings();
      setupOrderCalculators();
      setupClientDatePicker();
      updatePriceLabels();
    } else {
      document.getElementById('home-view').style.display = 'flex';
      document.getElementById('dashboard-layout').style.display = 'none';
    }
  });
});

// --- LANGUAGE ---
function toggleLanguage() {
  const currentLang = getLanguage();
  const newLang = currentLang === 'en' ? 'jp' : 'en';
  setLanguage(newLang);
  applyLanguage(newLang);
  loadDashboardData();
  loadOrders();
}

function applyLanguage(lang) {
  const elements = document.querySelectorAll('[data-i18n]');
  elements.forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (i18n[lang] && i18n[lang][key] !== undefined) {
      const translation = i18n[lang][key];
      if (el.tagName === 'INPUT' && (el.type === 'submit' || el.type === 'button')) {
        el.value = translation;
      } else if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
        el.placeholder = translation;
      } else {
        el.textContent = translation;
      }
    }
  });
  const toggleBtn = document.getElementById('lang-toggle');
  if (toggleBtn) toggleBtn.textContent = lang === 'en' ? '日本語' : 'English';

  updatePriceLabels();
  setupClientDatePicker();
}

function formatCurrency(amount) {
  return new Intl.NumberFormat('ja-JP', { style: 'currency', currency: 'JPY' }).format(amount);
}

function formatDate(dateStr) {
  if (!dateStr) return '—';
  const d = new Date(dateStr + 'T00:00:00');
  const lang = getLanguage();
  const locale = lang === 'jp' ? 'ja-JP' : 'en-US';
  return new Intl.DateTimeFormat(locale, { year: 'numeric', month: 'long', day: 'numeric' }).format(d);
}

// --- AUTH ---
async function login(e) {
  e.preventDefault();
  const email = document.getElementById('login-email').value.trim();
  const password = document.getElementById('login-password').value;
  const btn = e.target.querySelector('[type="submit"]');
  btn.value = '...'; btn.disabled = true;

  try {
    await auth.signInWithEmailAndPassword(email, password);
  } catch (err) {
    let msg = t('login_failed');
    if (err.code === 'auth/wrong-password' || err.code === 'auth/user-not-found' || err.code === 'auth/invalid-credential') {
      msg = t('invalid_credentials');
    }
    alert(msg);
    btn.value = t('login_btn'); btn.disabled = false;
  }
}

async function logout() {
  await auth.signOut();
}

// --- NAVIGATION ---
function setupNavigation() {
  const links = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('.view-section');
  const mobileToggle = document.getElementById('mobile-toggle');
  const sidebar = document.getElementById('sidebar');

  const overlay = document.createElement('div');
  overlay.className = 'sidebar-overlay';
  document.body.appendChild(overlay);

  const closeSidebar = () => {
    sidebar.classList.remove('open');
    overlay.classList.remove('active');
  };

  overlay.addEventListener('click', closeSidebar);
  overlay.addEventListener('touchstart', closeSidebar, { passive: true });

  let touchStartX = 0;
  let touchStartY = 0;

  document.addEventListener('touchstart', (e) => {
    if (!sidebar.classList.contains('open')) return;
    touchStartX = e.touches[0].clientX;
    touchStartY = e.touches[0].clientY;
  }, { passive: true });

  document.addEventListener('touchend', (e) => {
    if (!sidebar.classList.contains('open')) return;
    const touchEndX = e.changedTouches[0].clientX;
    const touchEndY = e.changedTouches[0].clientY;
    const diffX = touchEndX - touchStartX;
    const diffY = touchEndY - touchStartY;
    if (Math.abs(diffX) > Math.abs(diffY) && diffX < -45) {
      sidebar.classList.remove('open');
      overlay.classList.remove('active');
    }
  }, { passive: true });

  links.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = link.getAttribute('data-target');
      if (!targetId) return;
      links.forEach(l => l.classList.remove('active'));
      link.classList.add('active');
      sections.forEach(s => s.classList.remove('active'));
      document.getElementById(targetId).classList.add('active');
      if (window.innerWidth <= 768) {
        sidebar.classList.remove('open');
        overlay.classList.remove('active');
      }
    });
  });

  if (mobileToggle) {
    mobileToggle.addEventListener('click', () => {
      sidebar.classList.toggle('open');
      overlay.classList.toggle('active');
    });
  }
}

// --- MODALS ---
function setupModals() {
  const closeBtns = document.querySelectorAll('.btn-close, .modal-cancel');
  closeBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const modalId = btn.closest('.modal-overlay').id;
      closeModal(modalId);
    });
  });

  document.getElementById('form-order')?.addEventListener('submit', handleOrderSubmit);
  document.getElementById('form-task')?.addEventListener('submit', handleTaskSubmit);
  document.getElementById('form-waste')?.addEventListener('submit', handleWasteSubmit);
  document.getElementById('form-client')?.addEventListener('submit', handleClientSubmit);
}

// Opens a modal for NEW entries only — resets the form cleanly
function openModal(id) {
  const modal = document.getElementById(id);
  if (!modal) return;
  modal.classList.add('active');
  const form = modal.querySelector('form');
  if (form) {
    form.reset();
    // Explicitly clear all hidden fields
    form.querySelectorAll('input[type="hidden"]').forEach(h => h.value = '');
  }
  if (id === 'modal-order') {
    const today = new Date().toISOString().split('T')[0];
    document.getElementById('order-date').value = today;
    const customContainer = document.getElementById('custom-shipping-container');
    if (customContainer) customContainer.style.display = 'none';
    autoFillDeadline();
    calculateOrderMath();
  }
  if (id === 'modal-waste') {
    document.getElementById('waste-date').value = new Date().toISOString().split('T')[0];
  }
}
function closeModal(id) {
  const modal = document.getElementById(id);
  if (modal) modal.classList.remove('active');
}

// --- EDIT FUNCTIONS — open modal then fill fields ---
function editClient(id) {
  const c = getAll('clients').find(x => x.id === id);
  if (!c) return;
  const modal = document.getElementById('modal-client');
  modal.classList.add('active');
  const form = modal.querySelector('form');
  if (form) form.reset();
  // Fill fields after reset
  document.getElementById('client-id').value = c.id;
  document.getElementById('client-name').value = c.name;
  document.getElementById('client-orders').value = c.orders || 0;
  document.getElementById('client-sales').value = c.sales || 0;
  document.getElementById('client-profit').value = c.profit || 0;
  document.getElementById('client-comments').value = c.comments || '';
  setClientDatePicker(c.date || '');
}

function editOrder(id) {
  const o = getAll('orders').find(x => x.id === id);
  if (!o) return;
  const modal = document.getElementById('modal-order');
  modal.classList.add('active');
  const form = modal.querySelector('form');
  if (form) form.reset();
  // Fill fields after reset
  document.getElementById('order-id').value = o.id;
  document.getElementById('order-date').value = o.date;
  document.getElementById('order-buyer').value = o.buyerName;
  document.getElementById('item-noshi').value = o.items.noshi || 0;
  document.getElementById('item-nagagata').value = o.items.nagagata || 0;
  document.getElementById('item-pochi').value = o.items.pochi || 0;
  document.getElementById('item-atsugami').checked = o.items.atsugami || false;
  document.getElementById('item-seal-a').value = o.items.sealA || 0;
  document.getElementById('item-seal-b').value = o.items.sealB || 0;
  const costVal = o.shippingCost || 160;
  const costSel = document.getElementById('order-shipping-cost');
  const customContainer = document.getElementById('custom-shipping-container');
  if (costVal === 160 || costVal === 215) {
    if (costSel) costSel.value = costVal;
    if (customContainer) customContainer.style.display = 'none';
  } else {
    if (costSel) costSel.value = 'custom';
    if (customContainer) customContainer.style.display = 'flex';
    const costCustomInput = document.getElementById('order-shipping-cost-custom');
    if (costCustomInput) costCustomInput.value = costVal;
  }
  document.getElementById('order-adjustment').value = o.adjustment || 0;
  document.getElementById('order-adjustment-reason').value = o.adjustmentReason || '';
  document.getElementById('order-express').checked = o.express || false;
  document.getElementById('order-status').value = o.status;
  document.getElementById('order-deadline').value = o.deadline;
  document.getElementById('order-comments').value = o.comments || '';
  const platSel = document.getElementById('order-platform');
  if (platSel) platSel.value = o.platform || 'Mercari';
  calculateOrderMath();
}

function editTask(id) {
  const t = getAll('tasks').find(x => x.id === id);
  if (!t) return;
  const modal = document.getElementById('modal-task');
  modal.classList.add('active');
  const form = modal.querySelector('form');
  if (form) form.reset();
  // Fill fields after reset
  document.getElementById('task-id').value = t.id;
  document.getElementById('task-title').value = t.title;
  document.getElementById('task-due').value = t.dueDate;
  document.getElementById('task-status').value = t.status;
  document.getElementById('task-priority').value = t.priority;
}

// --- DASHBOARD ---
function getPeriodPrefix() {
  const sel = document.getElementById('dashboard-period');
  const period = sel ? sel.value : 'all';
  const now = new Date();
  const y = now.getFullYear();
  const m = now.getMonth();
  if (period === 'this-year') return { type: 'year', prefix: `${y}-` };
  if (period === 'this-month') return { type: 'month', prefix: `${y}-${String(m + 1).padStart(2, '0')}-` };
  if (period === 'last-month') {
    const lm = m === 0 ? 11 : m - 1;
    const ly = m === 0 ? y - 1 : y;
    return { type: 'month', prefix: `${ly}-${String(lm + 1).padStart(2, '0')}-` };
  }
  // Specific year: value is "year-2024", "year-2025", etc.
  if (period.startsWith('year-')) {
    const yr = period.split('-')[1];
    return { type: 'year', prefix: `${yr}-` };
  }
  return { type: 'all', prefix: '' };
}

function populateDashboardYears() {
  const sel = document.getElementById('dashboard-period');
  if (!sel) return;

  // Remember what was selected before we rebuild the options
  const currentValue = sel.value;

  // Collect all years present in orders and manual clients
  const years = new Set();
  const now = new Date().getFullYear();
  for (let yr = 2024; yr <= now; yr++) years.add(yr);
  getAll('orders').forEach(o => { if (o.date) years.add(parseInt(o.date.split('-')[0])); });
  getAll('clients').filter(c => !c.isFromOrder).forEach(c => { if (c.date) years.add(parseInt(c.date.split('-')[0])); });

  // Remove any previously injected year options
  sel.querySelectorAll('option[data-year]').forEach(o => o.remove());

  // Add a divider then sorted year options (newest first)
  const lang = getLanguage();
  const divider = document.createElement('option');
  divider.disabled = true;
  divider.textContent = lang === 'jp' ? '── 年別 ──' : '── By Year ──';
  divider.setAttribute('data-year', 'divider');
  sel.appendChild(divider);

  [...years].sort((a, b) => b - a).forEach(yr => {
    const opt = document.createElement('option');
    opt.value = `year-${yr}`;
    opt.textContent = lang === 'jp' ? `${yr}年` : `${yr}`;
    opt.setAttribute('data-year', yr);
    sel.appendChild(opt);
  });

  // Restore the previously selected value so the filter isn't lost
  if (currentValue) sel.value = currentValue;
}

function filterByPeriod(items, dateField = 'date') {
  const { type, prefix } = getPeriodPrefix();
  if (type === 'all') return items;
  return items.filter(i => (i[dateField] || '').startsWith(prefix));
}

function loadDashboardData() {
  populateDashboardYears();
  const allOrders = getAll('orders');
  const tasks = getAll('tasks');
  const manualClients = getAll('clients').filter(c => !c.isFromOrder);

  const filteredOrders = filterByPeriod(allOrders, 'date');
  const filteredClients = filterByPeriod(manualClients, 'date');

  const totalProfit = filteredOrders.reduce((sum, o) => sum + (o.profit || 0), 0)
    + filteredClients.reduce((sum, c) => sum + (c.profit || 0), 0);
  const totalSales = filteredOrders.reduce((sum, o) => sum + (o.purchaseAmount || 0), 0)
    + filteredClients.reduce((sum, c) => sum + (c.sales || 0), 0);
  const totalOrders = filteredOrders.length + filteredClients.reduce((sum, c) => sum + (c.orders || 0), 0);
  const remainingTasks = tasks.filter(t => t.status === 'To Do' || t.status === '未完了').length;

  // Count all clients filtered by period (auto-tracked use their latest order date)
  const allClients = getAll('clients');
  const filteredAllClients = filterByPeriod(allClients, 'date');
  const totalClients = filteredAllClients.length;

  document.getElementById('metric-profit').textContent = formatCurrency(totalProfit);
  
  const inv = getDB().inventory || [];
  const totalInventoryCost = inv.reduce((sum, item) => sum + (item.price || 0), 0);
  const netProfit = totalProfit - totalInventoryCost;

  const costEl = document.getElementById('metric-inventory-cost');
  if (costEl) costEl.textContent = formatCurrency(totalInventoryCost);

  const netEl = document.getElementById('metric-net-profit');
  if (netEl) netEl.textContent = formatCurrency(netProfit);

  document.getElementById('metric-sales').textContent = formatCurrency(totalSales);
  document.getElementById('metric-tasks').textContent = remainingTasks;
  document.getElementById('metric-orders').textContent = totalOrders;
  document.getElementById('metric-clients').textContent = totalClients;

  renderRecentTasks();
}

function renderRecentTasks() {
  const tbody = document.getElementById('printing-tbody');
  if (!tbody) return;
  tbody.innerHTML = '';

  const activeTasks = getAll('tasks').filter(t => t.status === 'To Do' || t.status === '未完了');

  // Update the printing count badge
  const printCountEl = document.getElementById('printing-count');
  if (printCountEl) {
    printCountEl.textContent = activeTasks.length > 0 ? `(${activeTasks.length})` : '';
  }

  if (activeTasks.length === 0) {
    tbody.innerHTML = `<tr><td colspan="5" style="text-align:center; padding: 2rem; color: var(--text-light);">${t('no_tasks_yet')}</td></tr>`;
    return;
  }

  activeTasks.forEach(tRow => {
    const order = getAll('orders').find(o => o.id === tRow.projectId);
    const clientName = order ? order.buyerName : tRow.title;
    // Express orders always show High priority
    const isExpress = order && order.express;
    const displayPriority = isExpress ? 'High' : tRow.priority;
    let priorityClass = 'status-todo';
    if (displayPriority === 'High') priorityClass = 'status-pending';
    if (displayPriority === 'Low') priorityClass = 'status-completed';

    // Calculate total items for this order
    let totalItems = 0;
    let itemDetails = [];
    if (order && order.items) {
      const items = order.items;
      const noshi = items.noshi || 0;
      const nagagata = items.nagagata || 0;
      const pochi = items.pochi || 0;
      const sealA = items.sealA || 0;
      const sealB = items.sealB || 0;
      totalItems = noshi + nagagata + pochi + sealA + sealB;
      if (noshi > 0) itemDetails.push(`${t('noshi')}×${noshi}`);
      if (nagagata > 0) itemDetails.push(`${t('nagagata')}×${nagagata}`);
      if (pochi > 0) itemDetails.push(`${t('pochi')}×${pochi}`);
      if (sealA > 0) itemDetails.push(`${t('sealA')}×${sealA}`);
      if (sealB > 0) itemDetails.push(`${t('sealB')}×${sealB}`);
      if (items.atsugami) itemDetails.push(t('atsugami'));
    }
    const itemsDisplay = totalItems > 0
      ? `<strong style="font-size:1.05rem;">${totalItems}</strong><div style="font-size:0.7rem; color:var(--text-light); margin-top:0.1rem; line-height:1.3;">${itemDetails.join(', ')}</div>`
      : `<span style="color:var(--text-light);">—</span>`;

    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td data-label="${t('th_client')}">
        <strong>${clientName}</strong>${isExpress ? ` <span style="display:inline-block; margin-left:0.3rem; background:#e53e3e; color:white; font-size:0.6rem; font-weight:700; padding:0.1rem 0.35rem; border-radius:4px; letter-spacing:0.5px;">⚡ ${t('badge_express')}</span>` : ''}
        <div class="mobile-only-meta" style="font-size: 0.72rem; color: var(--text-light); margin-top: 0.15rem;">
          ${t('th_priority')}: <span class="badge ${priorityClass}" style="font-size: 0.65rem; padding: 0.1rem 0.35rem;">${t(displayPriority) || t('Medium')}</span>
        </div>
      </td>
      <td class="col-priority" data-label="${t('th_priority')}"><span class="badge ${priorityClass}">${t(displayPriority) || t('Medium')}</span></td>
      <td data-label="${t('th_items')}">${itemsDisplay}</td>
      <td data-label="${t('th_deadline')}">${formatDate(tRow.dueDate)}</td>
      <td data-label="${t('th_printing_done')}" style="text-align: center;">
         <button class="btn btn-outline" style="font-size:0.8rem; padding: 0.3rem 0.6rem; display: inline-flex; align-items: center; gap: 0.4rem;" onclick="completePrintingTask('${tRow.id}')">
           <i class="fas fa-check"></i> ${t('label_yes')}
         </button>
      </td>
    `;
    tbody.appendChild(tr);
  });
}
function calculateDynamicPriority(deadline, orderDate) {
  if (!deadline) return 'Medium';
  
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const deadlineDate = new Date(deadline);
  deadlineDate.setHours(0, 0, 0, 0);
  
  const daysUntilDeadline = Math.round((deadlineDate - today) / (1000 * 60 * 60 * 24));
  
  // If deadline is today or tomorrow = High
  if (daysUntilDeadline <= 1) return 'High';
  // If deadline is 2-3 days = Medium
  if (daysUntilDeadline <= 3) return 'Medium';
  // If more than 3 days = Low
  return 'Low';
}
function completePrintingTask(taskId) {
  const task = getAll('tasks').find(t => t.id === taskId);
  updateItem('tasks', taskId, { status: 'Done' });
  if (task && task.projectId) {
    const order = getAll('orders').find(o => o.id === task.projectId);
    if (order && (order.status === 'Pending' || order.status === '進行中')) {
      updateItem('orders', order.id, { status: 'Ready for Shipping' });
    }
  }
  loadDashboardData();
  loadTasks();
  loadOrders();
}

// --- ORDERS ---
function loadOrders() {
  const orders = getAll('orders');
  let activeOrders = orders.filter(o => !o.shipped && o.status !== 'Finished' && o.status !== '完了');
  let pastOrders = orders.filter(o => o.shipped || o.status === 'Finished' || o.status === '完了');

  // Update active orders count badge in sidebar and card header
  const navCountEl = document.getElementById('nav-active-orders-count');
  if (navCountEl) {
    navCountEl.textContent = activeOrders.length;
    navCountEl.style.display = activeOrders.length > 0 ? 'inline-block' : 'none';
  }
  const cardCountEl = document.getElementById('card-active-orders-count');
  if (cardCountEl) {
    cardCountEl.textContent = `(${activeOrders.length})`;
  }

  // ---- SORT ACTIVE ORDERS BY PRIORITY ----
  activeOrders.sort((a, b) => {
  // Express orders always first
  if (a.express && !b.express) return -1;
  if (!a.express && b.express) return 1;
  // Then sort by date (oldest first)
  return (a.date || '').localeCompare(b.date || '');
});

  // ---- ACTIVE ORDERS ----
  const activeTbody = document.getElementById('orders-tbody');
  if (activeTbody) {
    activeTbody.innerHTML = '';
    if (activeOrders.length === 0) {
      activeTbody.innerHTML = `<tr><td colspan="9" style="text-align:center; padding: 2rem; color: var(--text-light);">${t('all_orders_shipped')}</td></tr>`;
    } else {
      activeOrders.forEach(o => renderOrderRow(o, activeTbody, false)); // false = active
    }
  }

  // ---- PAST ORDERS ----
  const pastTbody = document.getElementById('past-orders-tbody');
  if (pastTbody) {
    pastTbody.innerHTML = '';
    if (pastOrders.length === 0) {
      pastTbody.innerHTML = `<tr><td colspan="9" style="text-align:center; padding: 2rem; color: var(--text-light);">${t('no_shipped_orders_yet')}</td></tr>`;
    } else {
      pastOrders.forEach(o => renderOrderRow(o, pastTbody, true)); // true = past
    }
  }
}

function renderOrderRow(o, tbody, isPastOrder = false) {
  let statusClass = 'status-pending';
  if (o.status === 'Finished' || o.status === '完了') statusClass = 'status-completed';
  else if (o.status === 'Ready for Shipping' || o.status === '発送待ち') statusClass = 'status-todo';

  // ---- CALCULATE DYNAMIC PRIORITY (only for active orders) ----
  let priorityHtml = '';
  let priorityClass = 'status-todo';
  let dynamicPriority = 'Medium';
  if (!isPastOrder) {
    // Express orders always get High priority regardless of deadline
    if (o.express) {
      dynamicPriority = 'High';
    } else {
      dynamicPriority = calculateDynamicPriority(o.deadline);
    }
    if (dynamicPriority === 'High') priorityClass = 'status-pending';
    if (dynamicPriority === 'Low') priorityClass = 'status-completed';
    priorityHtml = `<td class="col-priority" data-label="${t('th_priority')}"><span class="badge ${priorityClass}">${t(dynamicPriority)}</span></td>`;
  }

  let itemsStr = [];
  if (o.items.noshi > 0) itemsStr.push(`${t('noshi')} x${o.items.noshi}`);
  if (o.items.nagagata > 0) itemsStr.push(`${t('nagagata')} x${o.items.nagagata}`);
  if (o.items.pochi > 0) itemsStr.push(`${t('pochi')} x${o.items.pochi}`);
  if (o.items.atsugami) itemsStr.push(`${t('atsugami')}`);
  if (o.items.sealA > 0) itemsStr.push(`${t('sealA')} x${o.items.sealA}`);
  if (o.items.sealB > 0) itemsStr.push(`${t('sealB')} x${o.items.sealB}`);
  if (o.adjustment && o.adjustment !== 0) {
    const sign = o.adjustment > 0 ? '+' : '';
    const reasonText = o.adjustmentReason ? ` (${o.adjustmentReason})` : '';
    itemsStr.push(`${t('label_adjustment')}: ${sign}${o.adjustment}${reasonText}`);
  }

  const isShipped = o.shipped;
  const isExpress = o.express;

  let rowStyle = '';
  if (isShipped) {
    rowStyle = 'opacity: 0.5; background-color: #f5f5f5;';
  } else if (isExpress) {
    rowStyle = 'background-color: #fff3f3; border-left: 4px solid #e53e3e;';
  }

  const tr = document.createElement('tr');
  tr.style.cssText = rowStyle;
  tr.innerHTML = `
    <td class="col-date" data-label="${t('order_date')}">${formatDate(o.date)}</td>
    <td data-label="${t('order_buyer')}">
      <strong>${o.buyerName}</strong>
      ${isExpress ? `<span style="display:inline-block; margin-left:0.4rem; background:#e53e3e; color:white; font-size:0.65rem; font-weight:700; padding:0.15rem 0.4rem; border-radius:4px; letter-spacing:0.5px;">⚡ ${t('badge_express')}</span>` : ''}
      <span class="badge ${statusClass} mobile-only-inline" style="display:inline-block; margin-left:0.3rem; font-size:0.65rem; padding:0.15rem 0.4rem; vertical-align:middle;">${o.status === 'Ready for Shipping' || o.status === '発送待ち' ? t('status_ready') : t(o.status)}</span>
      <br><small style="color:var(--text-light)">${o.platform}</small>
      <div class="mobile-only-meta">
        ${t('order_date')}: ${o.date.replace(/^\d{4}-/, '')} | ${t('order_deadline')}: ${o.deadline.replace(/^\d{4}-/, '')}
        ${!isPastOrder ? ` | ${t('th_priority')}: <span class="badge ${priorityClass}" style="font-size:0.65rem; padding:0.1rem 0.35rem;">${t(dynamicPriority)}</span>` : ''}
      </div>
    </td>
    <td data-label="${t('th_shipped')}" style="text-align:center;">
      <label style="display:flex; align-items:center; gap:0.4rem; margin:0; cursor:pointer;">
        <input type="checkbox" ${isShipped ? 'checked' : ''} 
          onchange="toggleShipped('${o.id}')"
          style="width:18px; height:18px; cursor:pointer;">
         <span class="col-shipped-text" style="font-size:0.85rem; color:var(--text-secondary);">${t('th_shipped')}</span>
      </label>
    </td>
    <td data-label="${t('order_items')}" style="font-size:0.85rem; line-height: 1.3;">${itemsStr.join(', ') || '—'}</td>
    <td data-label="${t('order_amount')}" style="font-weight:600; color:var(--text-primary);">${formatCurrency(o.purchaseAmount)}</td>
    <td data-label="${t('order_profit')}" style="font-weight:700; color:var(--status-active-text);">${formatCurrency(o.profit)}</td>
    <td class="col-status" data-label="${t('order_status')}"><span class="badge ${statusClass}">${t(o.status)}</span></td>
    ${priorityHtml}
    <td class="col-deadline" data-label="${t('order_deadline')}">${formatDate(o.deadline)}</td>
    <td data-label="${t('th_actions')}">
      <div class="action-btns">
        <button class="btn btn-text" onclick="editOrder('${o.id}')"><i class="fas fa-edit"></i></button>
        <button class="btn btn-text" style="color:var(--accent);" onclick="removeOrder('${o.id}')"><i class="fas fa-trash"></i></button>
      </div>
    </td>
  `;
  tbody.appendChild(tr);
}

function toggleShipped(orderId) {
  const order = getAll('orders').find(o => o.id === orderId);
  if (order) {
    updateItem('orders', orderId, { 
      shipped: !order.shipped,
      status: !order.shipped ? 'Shipped' : 'Ready for Shipping' // Toggle status too
    });
    loadOrders();
  }
}

// --- ORDER CALCULATION ---
function setupOrderCalculators() {
  const inputs = ['item-noshi', 'item-nagagata', 'item-pochi', 'item-seal-a', 'item-seal-b', 'order-shipping-cost', 'order-adjustment', 'order-shipping-cost-custom'];
  inputs.forEach(id => {
    document.getElementById(id)?.addEventListener('input', calculateOrderMath);
    document.getElementById(id)?.addEventListener('change', calculateOrderMath);
  });
  document.getElementById('order-shipping-cost')?.addEventListener('change', (e) => {
    const container = document.getElementById('custom-shipping-container');
    if (container) {
      container.style.display = e.target.value === 'custom' ? 'flex' : 'none';
    }
  });
  document.getElementById('item-atsugami')?.addEventListener('change', calculateOrderMath);
  document.getElementById('order-express')?.addEventListener('change', () => {
    calculateOrderMath();
    autoFillDeadline();
  });
  document.getElementById('order-date')?.addEventListener('change', autoFillDeadline);
}

function calculateOrderMath() {
  const noshi = parseInt(document.getElementById('item-noshi').value) || 0;
  const nagagata = parseInt(document.getElementById('item-nagagata').value) || 0;
  const pochi = parseInt(document.getElementById('item-pochi').value) || 0;
  const atsugami = document.getElementById('item-atsugami').checked;
  const sealA = parseInt(document.getElementById('item-seal-a').value) || 0;
  const sealB = parseInt(document.getElementById('item-seal-b').value) || 0;
  
  const shippingSel = document.getElementById('order-shipping-cost')?.value || '160';
  let actualShipping = 160;
  if (shippingSel === 'custom') {
    actualShipping = parseInt(document.getElementById('order-shipping-cost-custom').value) || 0;
  } else {
    actualShipping = parseInt(shippingSel) || 160;
  }
  const express = document.getElementById('order-express').checked;
  const adjustment = parseInt(document.getElementById('order-adjustment').value) || 0;

  const basePrice = (noshi * PRICES.noshi)
    + (nagagata * PRICES.nagagata)
    + (pochi * PRICES.pochi)
    + (atsugami ? PRICES.atsugami : 0)
    + (sealA * PRICES.sealA)
    + (sealB * PRICES.sealB);

  const expressCharge = express ? EXPRESS_FEE : 0;
  const purchaseAmount = (basePrice > 0 || adjustment !== 0) ? Math.max(0, basePrice + adjustment + SHIPPING_FEE_ADDITION + expressCharge) : 0;
  const platform = document.getElementById('order-platform')?.value || 'Mercari';
  const feeRate = PLATFORM_FEES[platform] || 0.10;
  const fee = Math.floor(purchaseAmount * feeRate);
  const feeLabel = document.getElementById('calc-fee-label');
  if (feeLabel) {
    const lang = getLanguage();
    const platformName = platform === 'Yahoo' ? (lang === 'jp' ? 'Yahoo フリマ' : 'Yahoo Flea Market') : platform;
    const rateText = Math.round(feeRate * 100);
    const tmpl = t('platform_fee_label');
    feeLabel.textContent = tmpl.replace('{platform}', platformName).replace('{rate}', rateText);
  }
  const profit = purchaseAmount > 0 ? (purchaseAmount - fee - actualShipping) : 0;

  document.getElementById('calc-base').textContent = formatCurrency(basePrice);
  document.getElementById('calc-shipping-added').textContent = `+${formatCurrency(SHIPPING_FEE_ADDITION + expressCharge)}`;
  document.getElementById('calc-purchase').textContent = formatCurrency(purchaseAmount);
  document.getElementById('calc-fee').textContent = formatCurrency(fee);
  document.getElementById('calc-profit').textContent = formatCurrency(profit);
  document.getElementById('hidden-purchase').value = purchaseAmount;
  document.getElementById('hidden-fee').value = fee;
  document.getElementById('hidden-profit').value = profit;
}

function autoFillDeadline() {
  const dateVal = document.getElementById('order-date').value;
  if (!dateVal) return;
  const express = document.getElementById('order-express').checked;
  document.getElementById('order-deadline').value = addDays(dateVal, express ? 2 : 5);
}

function addDays(dateStr, n) {
  const d = new Date(dateStr);
  d.setDate(d.getDate() + n);
  return d.toISOString().split('T')[0];
}

function calcTaskPriority(orderDate, deadline, express) {
  if (express) return 'High';
  const daysUntilDeadline = Math.round((new Date(deadline) - new Date(orderDate)) / (1000 * 60 * 60 * 24));
  if (daysUntilDeadline <= 2) return 'High';
  if (daysUntilDeadline === 3) return 'Medium';
  return 'Low';
}

function handleOrderSubmit(e) {
  e.preventDefault();
  calculateOrderMath();

  const isEdit = !!document.getElementById('order-id').value;
  const id = document.getElementById('order-id').value;
  const orderDate = document.getElementById('order-date').value;
  const deadline = document.getElementById('order-deadline').value;
  const express = document.getElementById('order-express').checked;

  const shippingSel = document.getElementById('order-shipping-cost')?.value || '160';
  const shippingCost = shippingSel === 'custom'
    ? (parseInt(document.getElementById('order-shipping-cost-custom').value) || 0)
    : (parseInt(shippingSel) || 160);

  const order = {
    date: orderDate,
    buyerName: document.getElementById('order-buyer').value,
    platform: document.getElementById('order-platform')?.value || 'Mercari',
    items: {
      noshi: parseInt(document.getElementById('item-noshi').value) || 0,
      nagagata: parseInt(document.getElementById('item-nagagata').value) || 0,
      pochi: parseInt(document.getElementById('item-pochi').value) || 0,
      atsugami: document.getElementById('item-atsugami').checked,
      sealA: parseInt(document.getElementById('item-seal-a').value) || 0,
      sealB: parseInt(document.getElementById('item-seal-b').value) || 0,
    },
    shippingCost,
    express,
    status: document.getElementById('order-status').value,
    deadline,
    comments: document.getElementById('order-comments').value,
    adjustment: parseInt(document.getElementById('order-adjustment').value) || 0,
    adjustmentReason: document.getElementById('order-adjustment-reason').value || '',
    purchaseAmount: parseInt(document.getElementById('hidden-purchase').value) || 0,
    fee: parseInt(document.getElementById('hidden-fee').value) || 0,
    profit: parseInt(document.getElementById('hidden-profit').value) || 0,
  };

  let savedOrder;
  if (isEdit) {
    savedOrder = { ...order, id };
    updateItem('orders', id, order);
    if (order.comments) {
      const clients = getAll('clients');
      const client = clients.find(c => c.name.toLowerCase() === order.buyerName.toLowerCase());
      if (client) {
        updateItem('clients', client.id, { comments: order.comments });
      }
    }
  } else {
    savedOrder = addItem('orders', order);
    deductStock(order.items);
    trackClientFromOrder(order.buyerName, order.purchaseAmount, order.profit, order.date, order.items, order.comments);
    const lang = getLanguage();
    const priority = calcTaskPriority(orderDate, deadline, express);
    const expressLabel = express ? (lang === 'jp' ? '【速達】' : '[Express] ') : '';
    const taskTitle = t('task_title_template').replace('{buyer}', order.buyerName);
    addItem('tasks', {
      title: `${expressLabel}${taskTitle}`,
      dueDate: deadline,
      status: 'To Do',
      priority,
      projectId: savedOrder.id
    });
  }

  closeModal('modal-order');
  loadOrders();
  loadTasks();
  loadInventory();
  loadDashboardData();
  loadClients();
}

function removeOrder(id) {
  if (confirm(t('delete_item_confirm'))) { deleteItem('orders', id); loadOrders(); loadDashboardData(); loadClients(); }
}

// --- TASKS ---
function loadTasks() {
  const tasks = getAll('tasks');
  const activeTasks = tasks.filter(tRow => tRow.status !== 'Done' && tRow.status !== '完了');
  const completedTasks = tasks.filter(tRow => tRow.status === 'Done' || tRow.status === '完了');

  const activeTbody = document.getElementById('tasks-tbody');
  if (activeTbody) {
    activeTbody.innerHTML = '';
    if (activeTasks.length === 0) {
      activeTbody.innerHTML = `<tr><td colspan="5" style="text-align:center; padding: 2rem; color: var(--text-light);">${t('no_tasks_to_do')}</td></tr>`;
    } else {
      activeTasks.forEach(tRow => renderTaskRow(tRow, activeTbody, false));
    }
  }

  const completedTbody = document.getElementById('completed-tasks-tbody');
  if (completedTbody) {
    completedTbody.innerHTML = '';
    if (completedTasks.length === 0) {
      completedTbody.innerHTML = `<tr><td colspan="5" style="text-align:center; padding: 2rem; color: var(--text-light);">${t('no_tasks_yet')}</td></tr>`;
    } else {
      completedTasks.forEach(tRow => renderTaskRow(tRow, completedTbody, true));
    }
  }
}

function renderTaskRow(tRow, tbody, isCompleted = false) {
  const isDone = tRow.status === 'Done' || tRow.status === '完了';
  const statusClass = isDone ? 'status-completed' : 'status-todo';
  
  let priorityClass = 'status-todo'; // Medium
  if (tRow.priority === 'High' || tRow.priority === '高') priorityClass = 'status-pending';
  else if (tRow.priority === 'Low' || tRow.priority === '低') priorityClass = 'status-completed';

  let rowStyle = '';
  if (isCompleted) {
    rowStyle = 'opacity: 0.5; background-color: #f5f5f5;';
  }

  const tr = document.createElement('tr');
  tr.style.cssText = rowStyle;
  tr.innerHTML = `
    <td data-label="${t('nav_tasks')}">
      <strong>${tRow.title}</strong>
      <div class="mobile-only-meta" style="font-size: 0.72rem; color: var(--text-light); margin-top: 0.15rem; line-height: 1.2;">
        ${t('th_deadline')}: ${tRow.dueDate} | ${t('th_priority')}: <span class="badge ${priorityClass}" style="font-size: 0.65rem; padding: 0.1rem 0.35rem;">${t(tRow.priority)}</span>
      </div>
    </td>
    <td class="col-priority" data-label="${t('th_priority')}">
      <span class="badge ${priorityClass}">${t(tRow.priority)}</span>
    </td>
    <td class="col-deadline" data-label="${t('th_deadline')}">${formatDate(tRow.dueDate)}</td>
    <td class="col-status" data-label="${t('order_status')}"><span class="badge ${statusClass}">${t(tRow.status)}</span></td>
    <td data-label="${t('th_actions')}">
      <div class="action-btns">
        <button class="btn btn-text" onclick="editTask('${tRow.id}')"><i class="fas fa-edit"></i></button>
        <button class="btn btn-text" style="color:var(--accent);" onclick="removeTask('${tRow.id}')"><i class="fas fa-trash"></i></button>
      </div>
    </td>
  `;
  tbody.appendChild(tr);
}

function handleTaskSubmit(e) {
  e.preventDefault();
  const id = document.getElementById('task-id').value;
  const task = {
    title: document.getElementById('task-title').value,
    dueDate: document.getElementById('task-due').value,
    status: document.getElementById('task-status').value,
    priority: document.getElementById('task-priority').value,
    projectId: null
  };
  if (id) { updateItem('tasks', id, task); } else { addItem('tasks', task); }
  closeModal('modal-task');
  loadTasks();
  loadDashboardData();
}

function removeTask(id) {
  if (confirm(t('delete_task_confirm'))) { deleteItem('tasks', id); loadTasks(); loadDashboardData(); }
}

function syncAutoTrackedClients() {
  const orders = getAll('orders');
  const clients = getAll('clients');

  // Group orders by buyer name (case-insensitive)
  const orderStats = {};
  orders.forEach(o => {
    const nameKey = (o.buyerName || '').trim().toLowerCase();
    if (!nameKey) return;

    const envQty = (o.items?.noshi || 0) + (o.items?.nagagata || 0) + (o.items?.pochi || 0);

    if (!orderStats[nameKey]) {
      orderStats[nameKey] = {
        orders: 0,
        sales: 0,
        profit: 0,
        latestDate: ''
      };
    }

    orderStats[nameKey].orders += envQty;
    orderStats[nameKey].sales += o.purchaseAmount || 0;
    orderStats[nameKey].profit += o.profit || 0;

    if (!orderStats[nameKey].latestDate || o.date > orderStats[nameKey].latestDate) {
      orderStats[nameKey].latestDate = o.date;
    }
  });

  // Update clients who are auto-tracked
  clients.forEach(c => {
    if (c.isFromOrder) {
      const nameKey = c.name.trim().toLowerCase();
      const stats = orderStats[nameKey] || { orders: 0, sales: 0, profit: 0, latestDate: c.date };

      if (
        c.orders !== stats.orders ||
        c.sales !== stats.sales ||
        c.profit !== stats.profit ||
        c.date !== stats.latestDate
      ) {
        updateItem('clients', c.id, {
          orders: stats.orders,
          sales: stats.sales,
          profit: stats.profit,
          date: stats.latestDate
        });
      }
    }
  });
}

// --- CLIENTS ---
function loadClients() {
  syncAutoTrackedClients();
  const clients = getAll('clients');
  const tbody = document.getElementById('clients-tbody');
  if (!tbody) return;
  tbody.innerHTML = '';

  if (clients.length === 0) {
    tbody.innerHTML = `<tr><td colspan="7" style="text-align:center; padding: 2rem; color: var(--text-light);">${t('no_clients_found')}</td></tr>`;
    return;
  }

  clients.sort((a, b) => {
    const dateDiff = (b.date || '').localeCompare(a.date || '');
    if (dateDiff !== 0) return dateDiff;
    // Same date: newer entry (higher ID) goes first
    return (b.id || '').localeCompare(a.id || '');
  });

  clients.forEach(c => {
    const source = c.isFromOrder ? `<span style="font-size:0.7rem; color:var(--text-light); display:block;">${t('client_auto_tracked')}</span>` : '';
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td data-label="${t('order_buyer')}"><strong>${c.name}</strong>${source}</td>
      <td data-label="${t('th_purchase_date')}">${formatDate(c.date)}</td>
      <td data-label="${t('dash_orders')}">${c.orders || 0}</td>
      <td data-label="${t('dash_sales')}" style="font-weight:600; color:var(--text-primary);">${formatCurrency(c.sales || 0)}</td>
      <td data-label="${t('order_profit')}" style="font-weight:700; color:var(--status-active-text);">${formatCurrency(c.profit || 0)}</td>
      <td data-label="${t('label_comments')}">${c.comments || ''}</td>
      <td data-label="${t('th_actions')}">
        <div class="action-btns">
          <button class="btn btn-text" onclick="editClient('${c.id}')"><i class="fas fa-edit"></i></button>
          <button class="btn btn-text" style="color:var(--accent);" onclick="removeClient('${c.id}')"><i class="fas fa-trash-alt"></i></button>
        </div>
      </td>
    `;
    tbody.appendChild(tr);
  });
}

function handleClientSubmit(e) {
  e.preventDefault();
  const id = document.getElementById('client-id').value;
  const client = {
    name: document.getElementById('client-name').value.trim(),
    date: document.getElementById('client-date').value,
    orders: parseInt(document.getElementById('client-orders').value) || 0,
    sales: parseInt(document.getElementById('client-sales').value) || 0,
    profit: parseInt(document.getElementById('client-profit').value) || 0,
    comments: document.getElementById('client-comments').value || '',
    isFromOrder: false
  };

  if (id) {
    updateItem('clients', id, client);
  } else {
    addItem('clients', client);
  }

  closeModal('modal-client');
  loadClients();
  loadDashboardData();
}

function removeClient(id) {
  if (confirm(t('delete_client_confirm'))) {
    deleteItem('clients', id);
    loadClients();
  }
}

function trackClientFromOrder(buyerName, amount, profit, orderDate, items, orderComments) {
  const nameTrimmed = (buyerName || '').trim();
  if (!nameTrimmed) return;
  
  // Calculate total items ordered (only envelopes: noshi, nagagata, pochi)
  const envelopeQty = items ? ((items.noshi || 0) + (items.nagagata || 0) + (items.pochi || 0)) : 0;
  
  const clients = getAll('clients');
  const existing = clients.find(c => c.name.toLowerCase() === nameTrimmed.toLowerCase());
  if (existing) {
    const updates = {
      orders: (existing.orders || 0) + envelopeQty,
      sales: (existing.sales || 0) + amount,
      profit: (existing.profit || 0) + profit,
      date: orderDate || existing.date,
      isFromOrder: true
    };
    if (orderComments) {
      updates.comments = orderComments;
    }
    updateItem('clients', existing.id, updates);
  } else {
    addItem('clients', {
      name: nameTrimmed,
      date: orderDate || new Date().toISOString().split('T')[0],
      orders: envelopeQty,
      sales: amount,
      profit: profit,
      comments: orderComments || '',
      isFromOrder: true
    });
  }
}

// --- INVENTORY ---
function loadInventory() {
  const tbody = document.getElementById('inventory-items-tbody');
  if (!tbody) return;
  tbody.innerHTML = '';

  const db = getDB();
  const items = db.inventory || [];

  if (items.length === 0) {
    tbody.innerHTML = `<tr><td colspan="5" style="text-align:center; padding:1.5rem; color:var(--text-light);">${t('no_purchase_records')}</td></tr>`;
    const qtyEl = document.getElementById('inv-total-qty');
    const costEl = document.getElementById('inv-total-cost');
    if (qtyEl) qtyEl.textContent = '0';
    if (costEl) costEl.textContent = formatCurrency(0);
    loadWasteLog();
    return;
  }

  // Sort by date descending
  items.sort((a, b) => {
    const dateDiff = (b.date || '').localeCompare(a.date || '');
    if (dateDiff !== 0) return dateDiff;
    return (b.id || '').localeCompare(a.id || '');
  });

  let totalQty = 0;
  let totalCost = 0;

  items.forEach(item => {
    totalQty += (item.qty || 0);
    totalCost += (item.price || 0);

    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td data-label="${t('th_date')}">${formatDate(item.date)}</td>
      <td data-label="${t('th_item')}"><strong>${item.name}</strong></td>
      <td data-label="${t('qty')}" style="font-weight:600;">${item.qty || 0}</td>
      <td data-label="${t('th_total_cost')}" style="font-weight:600;">${formatCurrency(item.price || 0)}</td>
      <td data-label="${t('th_actions')}">
        <button class="btn btn-text" style="color:var(--accent); padding:0.25rem;" onclick="removeInventoryItem('${item.id}')"><i class="fas fa-trash-alt"></i></button>
      </td>
    `;
    tbody.appendChild(tr);
  });

  const qtyEl = document.getElementById('inv-total-qty');
  const costEl = document.getElementById('inv-total-cost');
  if (qtyEl) qtyEl.textContent = totalQty;
  if (costEl) costEl.textContent = formatCurrency(totalCost);

  loadWasteLog();
}

function removeInventoryItem(id) {
  if (!confirm(t('delete_purchase_confirm'))) return;
  const db = getDB();
  db.inventory = db.inventory.filter(i => i.id !== id);
  saveDB(db);
  loadInventory();
  loadDashboardData();
}

function toggleMiscAddForm() {
  const form = document.getElementById('misc-add-form');
  if (!form) return;
  form.style.display = form.style.display === 'none' ? 'flex' : 'none';
  if (form.style.display === 'flex') {
    const dateInput = document.getElementById('inv-new-date');
    if (dateInput && !dateInput.value) {
      dateInput.value = new Date().toISOString().split('T')[0];
    }
    const nameInput = document.getElementById('inv-new-name');
    if (nameInput) nameInput.focus();
  }
}

function addInventoryPurchase() {
  const dateInput = document.getElementById('inv-new-date');
  const nameInput = document.getElementById('inv-new-name');
  const qtyInput = document.getElementById('inv-new-qty');
  const priceInput = document.getElementById('inv-new-price');
  
  const date = dateInput.value || new Date().toISOString().split('T')[0];
  const name = (nameInput.value || '').trim();
  if (!name) { nameInput.focus(); return; }
  const qty = parseInt(qtyInput.value) || 1;
  const price = parseInt(priceInput.value) || 0;
  
  const db = getDB();
  if (!db.inventory) db.inventory = [];
  
  db.inventory.push({
    id: 'pur_' + Date.now().toString() + Math.random().toString(36).substr(2, 5),
    date,
    name,
    qty,
    price // total cost
  });
  
  saveDB(db);
  
  nameInput.value = '';
  qtyInput.value = '';
  priceInput.value = '';
  
  toggleMiscAddForm();
  loadInventory();
  loadDashboardData();
}

function deductStock(items) {
  // Stock deduction is disabled since inventory functions as a purchase ledger.
}

function loadWasteLog() {
  const waste = getAll('waste');
  const tbody = document.getElementById('waste-tbody');
  if (!tbody) return;
  tbody.innerHTML = '';
  if (waste.length === 0) {
    tbody.innerHTML = `<tr><td colspan="5" style="text-align:center; color: var(--text-light);">${t('no_waste_recorded')}</td></tr>`;
    return;
  }
  waste.forEach(w => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td class="col-date" data-label="${t('th_date')}">${formatDate(w.date)}</td>
      <td data-label="${t('th_item')}">
        <strong>${t(w.item)}</strong>
        <div class="mobile-only-meta" style="font-size: 0.72rem; color: var(--text-light); margin-top: 0.15rem;">
          ${t('th_date')}: ${w.date}
        </div>
      </td>
      <td data-label="${t('qty')}" style="font-weight:600;">${w.qty}</td>
      <td data-label="${t('th_note')}" style="font-size:0.9rem; color:var(--text-secondary);">${w.note || '—'}</td>
      <td data-label="${t('th_actions')}">
        <div class="action-btns">
          <button class="btn btn-text" style="color:var(--accent);" onclick="removeWaste('${w.id}')"><i class="fas fa-trash"></i></button>
        </div>
      </td>
    `;
    tbody.appendChild(tr);
  });
}

function handleWasteSubmit(e) {
  e.preventDefault();
  const id = document.getElementById('waste-id').value;
  const waste = {
    date: document.getElementById('waste-date').value,
    item: document.getElementById('waste-item').value,
    qty: parseInt(document.getElementById('waste-qty').value) || 1,
    note: document.getElementById('waste-note').value,
  };
  if (id) {
    updateItem('waste', id, waste);
  } else {
    addItem('waste', waste);
    const items = { noshi: 0, nagagata: 0, pochi: 0, sealA: 0, sealB: 0 };
    items[waste.item] = waste.qty;
    deductStock(items);
  }
  closeModal('modal-waste');
  loadInventory();
}

function removeWaste(id) {
  if (confirm(t('delete_waste_confirm'))) { deleteItem('waste', id); loadInventory(); }
}

// --- SETTINGS ---
function loadSettings() {
  const user = getUser();
  document.getElementById('settings-business-name-input').value = user.businessName || user.name || 'Oinar Wedding';
  document.getElementById('settings-email').value = user.email || '';
  document.getElementById('settings-phone').value = user.phone || '';
  document.getElementById('settings-mercari').value = user.mercari || '';
  document.getElementById('settings-business-name').textContent = user.businessName || user.name || 'Oinar Wedding';
  updateMercariLink();
  const savedPrices = getPrices();
  document.getElementById('settings-price-noshi').value = savedPrices.noshi;
  document.getElementById('settings-price-nagagata').value = savedPrices.nagagata;
  document.getElementById('settings-price-pochi').value = savedPrices.pochi;
  document.getElementById('settings-price-atsugami').value = savedPrices.atsugami;
  document.getElementById('settings-price-sealA').value = savedPrices.sealA;
  document.getElementById('settings-price-sealB').value = savedPrices.sealB;
}

function saveSettings() {
  const businessName = document.getElementById('settings-business-name-input').value.trim() || 'Oinar Wedding';
  saveUser({
    businessName,
    email: document.getElementById('settings-email').value,
    phone: document.getElementById('settings-phone').value,
    mercari: document.getElementById('settings-mercari').value,
  });
  updateMercariLink();
  document.getElementById('settings-business-name').textContent = businessName;
  const sidebarUserEl = document.getElementById('sidebar-user-name');
  if (sidebarUserEl) sidebarUserEl.textContent = businessName;

  const updatedPrices = {
    noshi: parseInt(document.getElementById('settings-price-noshi').value) || 0,
    nagagata: parseInt(document.getElementById('settings-price-nagagata').value) || 0,
    pochi: parseInt(document.getElementById('settings-price-pochi').value) || 0,
    atsugami: parseInt(document.getElementById('settings-price-atsugami').value) || 0,
    sealA: parseInt(document.getElementById('settings-price-sealA').value) || 0,
    sealB: parseInt(document.getElementById('settings-price-sealB').value) || 0,
  };
  savePrices(updatedPrices);
  PRICES = updatedPrices;
  updatePriceLabels();
  alert(t('save_settings_alert'));
}

function updatePriceLabels() {
  const lang = getLanguage();
  const perPiece = lang === 'en' ? ' / pc' : ' / 枚';
  const labels = {
    'label-price-noshi': `${t('noshi')} (${formatCurrency(PRICES.noshi)})`,
    'label-price-nagagata': `${t('nagagata')} (${formatCurrency(PRICES.nagagata)})`,
    'label-price-pochi': `${t('pochi')} (${formatCurrency(PRICES.pochi)})`,
    'label-price-atsugami': `${t('atsugami')} (${formatCurrency(PRICES.atsugami)})`,
    'label-price-sealA': `${t('sealA')} (${formatCurrency(PRICES.sealA)}${perPiece})`,
    'label-price-sealB': `${t('sealB')} (${formatCurrency(PRICES.sealB)}${perPiece})`,
  };
  Object.entries(labels).forEach(([id, text]) => {
    const el = document.getElementById(id);
    if (el) el.textContent = text;
  });
}

function updateMercariLink() {
  const url = document.getElementById('settings-mercari').value;
  const link = document.getElementById('mercari-link');
  if (link && url) link.href = url;
}

// --- CLIENT DATE PICKER ---
function setupClientDatePicker() {
  const yearSel = document.getElementById('client-date-year');
  const monthSel = document.getElementById('client-date-month');
  const daySel = document.getElementById('client-date-day');
  const hidden = document.getElementById('client-date');
  if (!yearSel || !monthSel || !daySel) return;

  const currentYear = new Date().getFullYear();
  const lang = getLanguage();
  const yearSuffix = lang === 'jp' ? '年' : '';
  const monthSuffix = lang === 'jp' ? '月' : '';
  const daySuffix = lang === 'jp' ? '日' : '';

  const selectedYear = yearSel.value;
  const selectedMonth = monthSel.value;
  const selectedDay = daySel.value;

  yearSel.innerHTML = `<option value="" data-i18n="client_year_placeholder">${t('client_year_placeholder')}</option>`;
  monthSel.innerHTML = `<option value="" data-i18n="client_month_placeholder">${t('client_month_placeholder')}</option>`;
  daySel.innerHTML = `<option value="" data-i18n="client_day_placeholder">${t('client_day_placeholder')}</option>`;

  for (let y = currentYear; y >= currentYear - 5; y--) {
    yearSel.innerHTML += `<option value="${y}">${y}${yearSuffix}</option>`;
  }
  for (let m = 1; m <= 12; m++) {
    monthSel.innerHTML += `<option value="${String(m).padStart(2, '0')}">${m}${monthSuffix}</option>`;
  }
  for (let d = 1; d <= 31; d++) {
    daySel.innerHTML += `<option value="${String(d).padStart(2, '0')}">${d}${daySuffix}</option>`;
  }

  yearSel.value = selectedYear;
  monthSel.value = selectedMonth;
  daySel.value = selectedDay;

  const sync = () => {
    const y = yearSel.value, m = monthSel.value, d = daySel.value;
    hidden.value = (y && m && d) ? `${y}-${m}-${d}` : '';
  };
  // Ensure we don't attach multiple event listeners if called repeatedly
  yearSel.removeEventListener('change', sync);
  monthSel.removeEventListener('change', sync);
  daySel.removeEventListener('change', sync);
  yearSel.addEventListener('change', sync);
  monthSel.addEventListener('change', sync);
  daySel.addEventListener('change', sync);
}

function setClientDatePicker(dateStr) {
  if (!dateStr) return;
  const [y, m, d] = dateStr.split('-');
  const yearSel = document.getElementById('client-date-year');
  const monthSel = document.getElementById('client-date-month');
  const daySel = document.getElementById('client-date-day');
  const hidden = document.getElementById('client-date');
  if (yearSel) yearSel.value = y;
  if (monthSel) monthSel.value = m;
  if (daySel) daySel.value = d;
  if (hidden) hidden.value = dateStr;
}