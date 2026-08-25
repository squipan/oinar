// =============================================
// OINAR - Main Application Logic
// =============================================

// PRICES is populated from Firestore on login (DEFAULT_PRICES defined in data.js)
let PRICES = {};

function getShippingFeeAddition(dateStr) {
  // From July 27 2026, standard shipping fee addition increases from ¥300 to ¥310
  if (dateStr && dateStr >= '2026-07-27') return 310;
  return 300;
}
const EXPRESS_FEE = 300;
const PLATFORM_FEES = { Mercari: 0.10, Rakuma: 0.10, Yahoo: 0.05 };

// Translation Dictionary
const i18n = {
  en: {
    'login_btn': 'Access Dashboard',
    'nav_dashboard': 'Dashboard',
    'nav_orders': 'Orders',
    'nav_clients': 'Clients',
    'nav_profits': 'Profits',
    'nav_inventory': 'Inventory',
    'nav_settings': 'Settings',
    'nav_logout': 'Logout',
    'title_profits_calendar': 'Profits Calendar',
    'profit_order_profit': 'Order Profit',
    'profit_client_count': 'Clients',
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
    'title_active_orders': 'For Shipping',
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
    'client_orders_title': 'Order History',
    'no_orders_found': 'No orders found.',
    'label_loading_data': 'Loading data...',
    'noshi': 'Noshi Envelopes',
    'nagagata': 'Long Envelope (Nagagata 4)',
    'pochi': 'Pochi Envelopes',
    'atsugami': 'Hard Board Reinforcement',
    'sealA': 'Sticker A',
    'sealB': 'Sticker B',
    'sekifudaNoLogo': 'Sekifuda (No Logo)',
    'sekifudaWithLogo': 'Sekifuda (With Logo)',
    'hofuchoMermaid': 'Guest Book / Reception (Mermaid)',
    'hofuchoGayo': 'Guest Book / Reception (Drawing Paper)',
    'uketsukeSign': 'Reception Sign',
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
    'label_client_id': 'Client ID / Account ID',
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
    'period_all_months': 'All Months',
    'period_year_label': 'Year',
    'period_month_label': 'Month',
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
    'nav_profits': '利益',
    'nav_inventory': '在庫',
    'nav_settings': '設定',
    'nav_logout': 'ログアウト',
    'title_profits_calendar': '利益カレンダー',
    'profit_order_profit': '注文利益',
    'profit_client_count': '顧客数',
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
    'client_orders_title': '注文履歴',
    'no_orders_found': '注文履歴はありません。',
    'label_loading_data': 'データを読み込み中…',
    'noshi': 'のし袋',
    'nagagata': '長形４号',
    'pochi': 'ポチ袋',
    'atsugami': '厚紙補強',
    'sealA': 'シールA',
    'sealB': 'シールB',
    'sekifudaNoLogo': '席札 (ロゴなし)',
    'sekifudaWithLogo': '席札 (ロゴあり)',
    'hofuchoMermaid': '芳名帳/受付書 マーメイド紙',
    'hofuchoGayo': '芳名帳/受付書 画用紙',
    'uketsukeSign': '受付サイン',
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
    'label_client_id': '顧客ID / アカウントID',
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
    'period_all_months': '全月',
    'period_year_label': '年',
    'period_month_label': '月',
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
  if (data) {
    initDB(data);
    migrateHistoricalData();
  }

  PRICES = getPrices();
  applyLanguage(getLanguage());
  loadDashboardData();
  loadOrders();
  loadInventory();
  loadSettings();
  loadClients();
  loadProfitsView();
  updatePriceLabels();

  if (btn) btn.disabled = false;
  if (icon) icon.classList.remove('fa-spin');
}

document.addEventListener('DOMContentLoaded', () => {
  setupNavigation();
  setupBottomNav();
  setupModals();

  auth.onAuthStateChanged(async (firebaseUser) => {
    if (firebaseUser) {
      showLoadingOverlay(true);
      const data = await loadAllDataFromFirestore();
      if (data) {
        initDB(data);
        migrateHistoricalData();
      }
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
      loadInventory();
      loadSettings();
      loadProfitsView();
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
  loadClients();
  loadProfitsView();
  loadInventory();
  loadSettings();
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
  const val = Number.isFinite(Number(amount)) ? Number(amount) : 0;
  return new Intl.NumberFormat('ja-JP', { style: 'currency', currency: 'JPY' }).format(val);
}

function formatDate(dateStr) {
  if (!dateStr) return '—';
  const d = new Date(dateStr + 'T00:00:00+09:00'); // force JST
  const lang = getLanguage();
  const locale = lang === 'jp' ? 'ja-JP' : 'en-US';
  return new Intl.DateTimeFormat(locale, { year: 'numeric', month: 'long', day: 'numeric', timeZone: 'Asia/Tokyo' }).format(d);
}

// --- AUTH ---
async function login(e) {
  e.preventDefault();
  const email = document.getElementById('login-email').value.trim();
  const password = document.getElementById('login-password').value;
  const btn = e.target.querySelector('[type="submit"]');
  const errEl = document.getElementById('login-error');
  if (errEl) { errEl.style.display = 'none'; errEl.textContent = ''; }
  btn.value = '...'; btn.disabled = true;

  try {
    await auth.signInWithEmailAndPassword(email, password);
  } catch (err) {
    let msg = 'Login failed. Please try again.';
    if (err.code === 'auth/wrong-password' || err.code === 'auth/user-not-found' || err.code === 'auth/invalid-credential') {
      msg = 'Incorrect email or password.';
    } else if (err.code === 'auth/network-request-failed') {
      msg = 'Network error. Please check your connection.';
    }
    if (errEl) { errEl.textContent = msg; errEl.style.display = 'block'; }
    else alert(msg);
    btn.value = 'Access Dashboard'; btn.disabled = false;
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

  // ── Client detail panel: close on backdrop click ──
  const cdpOverlay = document.getElementById('client-detail-overlay');
  if (cdpOverlay) {
    cdpOverlay.addEventListener('click', (e) => {
      if (e.target === cdpOverlay) closeClientDetail();
    });
  }

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
      if (targetId === 'view-profits') {
        loadProfitsView();
      }
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

function setupBottomNav() {
  const bottomLinks = document.querySelectorAll('.bottom-nav-link');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('.view-section');

  bottomLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = link.getAttribute('data-target');
      if (!targetId) return;

      bottomLinks.forEach(l => l.classList.remove('active'));
      link.classList.add('active');

      navLinks.forEach(nl => {
        if (nl.getAttribute('data-target') === targetId) {
          nl.classList.add('active');
        } else {
          nl.classList.remove('active');
        }
      });

      sections.forEach(s => s.classList.remove('active'));
      const targetSec = document.getElementById(targetId);
      if (targetSec) targetSec.classList.add('active');

      if (targetId === 'view-profits') {
        loadProfitsView();
      }
    });
  });
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
  document.getElementById('order-buyer').value = o.buyerName || '';
  document.getElementById('item-noshi').value = o.items.noshi || 0;
  document.getElementById('item-nagagata').value = o.items.nagagata || 0;
  document.getElementById('item-pochi').value = o.items.pochi || 0;
  document.getElementById('item-atsugami').checked = o.items.atsugami || false;
  document.getElementById('item-seal-a').value = o.items.sealA || 0;
  document.getElementById('item-seal-b').value = o.items.sealB || 0;
  document.getElementById('item-sekifuda-nologo').value = o.items.sekifudaNoLogo || 0;
  document.getElementById('item-sekifuda-withlogo').value = o.items.sekifudaWithLogo || 0;
  document.getElementById('item-hofucho-mermaid').value = o.items.hofuchoMermaid || 0;
  document.getElementById('item-hofucho-gayo').value = o.items.hofuchoGayo || 0;
  document.getElementById('item-uketsuke').value = o.items.uketsukeSign || 0;
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
  // Specific year selected — check if a specific month is also selected
  if (period.startsWith('year-')) {
    const yr = period.split('-')[1];
    const monthSel = document.getElementById('dashboard-month');
    const monthVal = monthSel ? monthSel.value : 'all-months';
    if (monthVal && monthVal !== 'all-months') {
      // monthVal is like "2025-07" → prefix becomes "2025-07-"
      return { type: 'month', prefix: `${monthVal}-` };
    }
    return { type: 'year', prefix: `${yr}-` };
  }
  return { type: 'all', prefix: '' };
}

function populateDashboardYears() {
  const sel = document.getElementById('dashboard-period');
  if (!sel) return;

  // Remember what was selected before we rebuild the options
  const currentValue = sel.value;

  // Collect all years present in clients list
  const years = new Set();
  const now = new Date().getFullYear();
  for (let yr = 2024; yr <= now; yr++) years.add(yr);
  getAll('clients').forEach(c => { if (c.date) years.add(parseInt(c.date.split('-')[0])); });

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

  // Sync the month dropdown visibility
  syncMonthDropdown(currentValue);
}

function populateDashboardMonths(yr) {
  const monthSel = document.getElementById('dashboard-month');
  if (!monthSel) return;

  const prevMonthVal = monthSel.value;
  monthSel.innerHTML = '';

  const lang = getLanguage();
  const months = lang === 'jp'
    ? ['全月', '1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月']
    : ['All Months', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  months.forEach((label, idx) => {
    const opt = document.createElement('option');
    opt.value = idx === 0 ? 'all-months' : `${yr}-${String(idx).padStart(2, '0')}`;
    opt.textContent = label;
    monthSel.appendChild(opt);
  });

  // Restore previously selected month if still valid
  if (prevMonthVal && prevMonthVal !== 'all-months' && prevMonthVal.startsWith(yr)) {
    monthSel.value = prevMonthVal;
  }
}

function syncMonthDropdown(periodValue) {
  const monthSel = document.getElementById('dashboard-month');
  if (!monthSel) return;
  if (periodValue && periodValue.startsWith('year-')) {
    const yr = periodValue.split('-')[1];
    populateDashboardMonths(yr);
    monthSel.style.display = '';
  } else {
    monthSel.style.display = 'none';
  }
}

function onDashboardYearChange() {
  const sel = document.getElementById('dashboard-period');
  const val = sel ? sel.value : 'all';
  syncMonthDropdown(val);
  loadDashboardData();
}

function filterByPeriod(items, dateField = 'date') {
  const { type, prefix } = getPeriodPrefix();
  if (type === 'all') return items;
  return items.filter(i => (i[dateField] || '').startsWith(prefix));
}

function loadDashboardData() {
  populateDashboardYears();
  const allClients = getAll('clients');

  const filteredClients = filterByPeriod(allClients, 'date');

  const totalProfit = filteredClients.reduce((sum, c) => sum + (c.profit || 0), 0);
  const totalSales = filteredClients.reduce((sum, c) => sum + (c.sales || 0), 0);
  const totalOrders = filteredClients.reduce((sum, c) => sum + (c.orders || 0), 0);
  const pendingPrintCount = getAll('orders').filter(o =>
    !o.shipped && (o.status === 'Pending' || o.status === '進行中')
  ).length;

  // Count all clients filtered by period
  const totalClients = filteredClients.length;

  document.getElementById('metric-profit').textContent = formatCurrency(totalProfit);

  const filteredInv = filterByPeriod(getDB().inventory || [], 'date');
  const totalInventoryCost = filteredInv.reduce((sum, item) => sum + (item.price || 0), 0);
  const netProfit = totalProfit - totalInventoryCost;

  const costEl = document.getElementById('metric-inventory-cost');
  if (costEl) costEl.textContent = formatCurrency(totalInventoryCost);

  const netEl = document.getElementById('metric-net-profit');
  if (netEl) netEl.textContent = formatCurrency(netProfit);

  document.getElementById('metric-sales').textContent = formatCurrency(totalSales);
  document.getElementById('metric-tasks').textContent = pendingPrintCount;
  document.getElementById('metric-orders').textContent = totalOrders;
  document.getElementById('metric-clients').textContent = totalClients;

  renderRecentTasks();
}

function renderRecentTasks() {
  const tbody = document.getElementById('printing-tbody');
  if (!tbody) return;
  tbody.innerHTML = '';

  // Drive printing queue from orders (Pending status) instead of task records
  const pendingOrders = getAll('orders').filter(o =>
    !o.shipped && (o.status === 'Pending' || o.status === '進行中')
  ).sort((a, b) => (a.deadline || '') < (b.deadline || '') ? -1 : 1);

  const printCountEl = document.getElementById('printing-count');
  if (printCountEl) {
    printCountEl.textContent = pendingOrders.length > 0 ? `(${pendingOrders.length})` : '';
  }

  if (pendingOrders.length === 0) {
    tbody.innerHTML = `<tr><td colspan="5" style="text-align:center; padding: 2rem; color: var(--text-light);">${t('no_tasks_to_do')}</td></tr>`;
    return;
  }

  pendingOrders.forEach(order => {
    const isExpress = order.express;
    const displayPriority = isExpress ? 'High' : calculateDynamicPriority(order.deadline, order.date);
    let priorityClass = 'status-todo';
    if (displayPriority === 'High') priorityClass = 'status-pending';
    if (displayPriority === 'Low') priorityClass = 'status-completed';

    let totalItems = 0;
    let itemDetails = [];
    if (order.items) {
      const items = order.items;
      const noshi = items.noshi || 0;
      const nagagata = items.nagagata || 0;
      const pochi = items.pochi || 0;
      const sealA = items.sealA || 0;
      const sealB = items.sealB || 0;
      const sekifudaNoLogo = items.sekifudaNoLogo || 0;
      const sekifudaWithLogo = items.sekifudaWithLogo || 0;
      totalItems = noshi + nagagata + pochi + sekifudaNoLogo + sekifudaWithLogo;
      if (noshi > 0) itemDetails.push(`${t('noshi')}\u00d7${noshi}`);
      if (nagagata > 0) itemDetails.push(`${t('nagagata')}\u00d7${nagagata}`);
      if (pochi > 0) itemDetails.push(`${t('pochi')}\u00d7${pochi}`);
      if (sekifudaNoLogo > 0) itemDetails.push(`${t('sekifudaNoLogo')}\u00d7${sekifudaNoLogo}`);
      if (sekifudaWithLogo > 0) itemDetails.push(`${t('sekifudaWithLogo')}\u00d7${sekifudaWithLogo}`);
      if (sealA > 0) itemDetails.push(`${t('sealA')}\u00d7${sealA}`);
      if (sealB > 0) itemDetails.push(`${t('sealB')}\u00d7${sealB}`);
      const hofuchoMermaid = items.hofuchoMermaid || 0;
      const hofuchoGayo = items.hofuchoGayo || 0;
      const uketsukeSign = items.uketsukeSign || 0;
      if (hofuchoMermaid > 0) itemDetails.push(`${t('hofuchoMermaid')}\u00d7${hofuchoMermaid}`);
      if (hofuchoGayo > 0) itemDetails.push(`${t('hofuchoGayo')}\u00d7${hofuchoGayo}`);
      if (uketsukeSign > 0) itemDetails.push(`${t('uketsukeSign')}\u00d7${uketsukeSign}`);
      if (items.atsugami) itemDetails.push(t('atsugami'));
    }
    const itemsDisplay = totalItems > 0
      ? `<strong style="font-size:1.05rem;">${totalItems}</strong><div style="font-size:0.7rem; color:var(--text-light); margin-top:0.1rem; line-height:1.3;">${itemDetails.join(', ')}</div>`
      : `<span style="color:var(--text-light);">\u2014</span>`;

    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td data-label="${t('th_client')}">
        <strong>${order.buyerName}</strong>${isExpress ? ` <span style="display:inline-block; margin-left:0.3rem; background:#e53e3e; color:white; font-size:0.6rem; font-weight:700; padding:0.1rem 0.35rem; border-radius:4px; letter-spacing:0.5px;">\u26a1 ${t('badge_express')}</span>` : ''}
        <div class="mobile-only-meta" style="font-size: 0.72rem; color: var(--text-light); margin-top: 0.15rem;">
          ${t('th_priority')}: <span class="badge ${priorityClass}" style="font-size: 0.65rem; padding: 0.1rem 0.35rem;">${t(displayPriority) || t('Medium')}</span>
        </div>
      </td>
      <td data-label="${t('th_printing_done')}" style="text-align: center;">
         <button class="btn btn-outline" style="font-size:0.8rem; padding: 0.3rem 0.6rem; display: inline-flex; align-items: center; gap: 0.4rem;" onclick="completePrintingTask('${order.id}')">
           <i class="fas fa-check"></i> ${t('label_yes')}
         </button>
      </td>
      <td class="col-priority" data-label="${t('th_priority')}"><span class="badge ${priorityClass}">${t(displayPriority) || t('Medium')}</span></td>
      <td data-label="${t('th_items')}">${itemsDisplay}</td>
      <td data-label="${t('th_deadline')}">${formatDate(order.deadline)}</td>
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
function completePrintingTask(orderId) {
  const order = getAll('orders').find(o => o.id === orderId);
  if (order && (order.status === 'Pending' || order.status === '進行中')) {
    updateItem('orders', orderId, { status: 'Ready for Shipping' });
  }
  loadDashboardData();
  loadOrders();
}

// --- ORDERS ---
function loadOrders() {
  const orders = getAll('orders');
  let activeOrders = orders.filter(o => !o.shipped && (o.status === 'Ready for Shipping' || o.status === '発送待ち'));
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
  if (o.items.sekifudaNoLogo > 0) itemsStr.push(`${t('sekifudaNoLogo')} x${o.items.sekifudaNoLogo}`);
  if (o.items.sekifudaWithLogo > 0) itemsStr.push(`${t('sekifudaWithLogo')} x${o.items.sekifudaWithLogo}`);
  if (o.items.sealA > 0) itemsStr.push(`${t('sealA')} x${o.items.sealA}`);
  if (o.items.sealB > 0) itemsStr.push(`${t('sealB')} x${o.items.sealB}`);
  if (o.items.hofuchoMermaid > 0) itemsStr.push(`${t('hofuchoMermaid')} x${o.items.hofuchoMermaid}`);
  if (o.items.hofuchoGayo > 0) itemsStr.push(`${t('hofuchoGayo')} x${o.items.hofuchoGayo}`);
  if (o.items.uketsukeSign > 0) itemsStr.push(`${t('uketsukeSign')} x${o.items.uketsukeSign}`);
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
  const inputs = ['item-noshi', 'item-nagagata', 'item-pochi', 'item-seal-a', 'item-seal-b', 'item-sekifuda-nologo', 'item-sekifuda-withlogo', 'item-hofucho-mermaid', 'item-hofucho-gayo', 'item-uketsuke', 'order-shipping-cost', 'order-adjustment', 'order-shipping-cost-custom'];
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
  document.getElementById('order-date')?.addEventListener('change', () => {
    autoFillDeadline();
    calculateOrderMath();
  });
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
  const sekifudaNoLogo = parseInt(document.getElementById('item-sekifuda-nologo').value) || 0;
  const sekifudaWithLogo = parseInt(document.getElementById('item-sekifuda-withlogo').value) || 0;
  const hofuchoMermaid = parseInt(document.getElementById('item-hofucho-mermaid').value) || 0;
  const hofuchoGayo = parseInt(document.getElementById('item-hofucho-gayo').value) || 0;
  const uketsukeSign = parseInt(document.getElementById('item-uketsuke').value) || 0;

  // A4 items pricing logic
  const hofuchoMermaidPrice = hofuchoMermaid === 0 ? 0
    : hofuchoMermaid === 1 ? 280
      : hofuchoMermaid * 180;

  const hofuchoGayoPrice = hofuchoGayo === 0 ? 0
    : hofuchoGayo === 1 ? 260
      : hofuchoGayo * 160;

  const uketsukeSignPrice = uketsukeSign === 0 ? 0
    : 320 + (Math.max(0, uketsukeSign - 1) * 100);

  // Dynamic shipping addition: 350 if any A4 item or sekifuda ordered, else date-aware standard fee
  const hasA4Items = hofuchoMermaid > 0 || hofuchoGayo > 0 || uketsukeSign > 0;
  const hasSekifuda = sekifudaNoLogo > 0 || sekifudaWithLogo > 0;
  const hasEnvelopes = noshi > 0 || nagagata > 0 || pochi > 0;
  const orderDateForCalc = document.getElementById('order-date')?.value || '';
  
  let shippingAddition = getShippingFeeAddition(orderDateForCalc);
  if (hasA4Items && hasEnvelopes) {
    shippingAddition = 650;
  } else if (hasSekifuda && hasEnvelopes) {
    shippingAddition = getShippingFeeAddition(orderDateForCalc) + 350 - 200;
  } else if (hasA4Items || hasSekifuda) {
    shippingAddition = 350;
  }

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
    + (sealB * PRICES.sealB)
    + (sekifudaNoLogo * PRICES.sekifudaNoLogo)
    + (sekifudaWithLogo * PRICES.sekifudaWithLogo)
    + hofuchoMermaidPrice
    + hofuchoGayoPrice
    + uketsukeSignPrice;

  const expressCharge = express ? EXPRESS_FEE : 0;
  const purchaseAmount = (basePrice > 0 || adjustment !== 0) ? Math.max(0, basePrice + adjustment + shippingAddition + expressCharge) : 0;
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
  document.getElementById('calc-shipping-added').textContent = `+${formatCurrency(shippingAddition + expressCharge)}`;
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

  const buyerName = document.getElementById('order-buyer').value.trim();
  let clientId = '';

  if (isEdit) {
    const oldOrder = getAll('orders').find(o => o.id === id);
    clientId = oldOrder ? oldOrder.clientId : '';
    if (!clientId) {
      clientId = 'c' + Date.now() + Math.random().toString(36).slice(2, 7);
    }
  } else {
    clientId = 'c' + Date.now() + Math.random().toString(36).slice(2, 7);
  }

  // Ensure client record exists
  const clients = getAll('clients');
  let client = clients.find(c => c.id === clientId);
  if (!client) {
    client = addItem('clients', {
      id: clientId,
      name: buyerName,
      date: orderDate || new Date().toISOString().split('T')[0],
      orders: 0,
      sales: 0,
      profit: 0,
      comments: document.getElementById('order-comments').value || '',
      isFromOrder: true
    });
  } else {
    const updates = {};
    if (client.name !== buyerName) updates.name = buyerName;
    if (document.getElementById('order-comments').value && client.comments !== document.getElementById('order-comments').value) {
      updates.comments = document.getElementById('order-comments').value;
    }
    if (client.isFromOrder !== true) {
      updates.isFromOrder = true;
    }
    if (Object.keys(updates).length > 0) {
      updateItem('clients', client.id, updates);
    }
  }

  const order = {
    date: orderDate,
    clientId,
    buyerName,
    platform: document.getElementById('order-platform')?.value || 'Mercari',
    items: {
      noshi: parseInt(document.getElementById('item-noshi').value) || 0,
      nagagata: parseInt(document.getElementById('item-nagagata').value) || 0,
      pochi: parseInt(document.getElementById('item-pochi').value) || 0,
      atsugami: document.getElementById('item-atsugami').checked,
      sealA: parseInt(document.getElementById('item-seal-a').value) || 0,
      sealB: parseInt(document.getElementById('item-seal-b').value) || 0,
      sekifudaNoLogo: parseInt(document.getElementById('item-sekifuda-nologo').value) || 0,
      sekifudaWithLogo: parseInt(document.getElementById('item-sekifuda-withlogo').value) || 0,
      hofuchoMermaid: parseInt(document.getElementById('item-hofucho-mermaid').value) || 0,
      hofuchoGayo: parseInt(document.getElementById('item-hofucho-gayo').value) || 0,
      uketsukeSign: parseInt(document.getElementById('item-uketsuke').value) || 0,
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
    if (order.comments && order.clientId) {
      updateItem('clients', order.clientId, { comments: order.comments });
    }
  } else {
    savedOrder = addItem('orders', order);
    deductStock(order.items);
    trackClientFromOrder(order.clientId, order.purchaseAmount, order.profit, order.date, order.items, order.comments);
  }

  closeModal('modal-order');
  loadOrders();
  loadInventory();
  loadDashboardData();
  loadClients();
}

function removeOrder(id) {
  if (confirm(t('delete_item_confirm'))) { deleteItem('orders', id); loadOrders(); loadDashboardData(); loadClients(); }
}


function syncAutoTrackedClients() {
  const orders = getAll('orders');
  const clients = getAll('clients');

  // Group orders by clientId
  const orderStats = {};
  orders.forEach(o => {
    const clientId = o.clientId;
    if (!clientId) return;

    const items = o.items || {};
    const envelopeQty = (items.noshi || 0) + (items.nagagata || 0) + (items.pochi || 0);
    const sekifudaQty = (items.sekifudaNoLogo || 0) + (items.sekifudaWithLogo || 0);
    const a4Qty = (items.hofuchoMermaid || 0) + (items.hofuchoGayo || 0) + (items.uketsukeSign || 0);
    const totalQty = envelopeQty + sekifudaQty + a4Qty;

    if (!orderStats[clientId]) {
      orderStats[clientId] = {
        orders: 0,
        sales: 0,
        profit: 0,
        latestDate: ''
      };
    }

    orderStats[clientId].orders += totalQty;
    orderStats[clientId].sales += o.purchaseAmount || 0;
    orderStats[clientId].profit += o.profit || 0;

    if (!orderStats[clientId].latestDate || o.date > orderStats[clientId].latestDate) {
      orderStats[clientId].latestDate = o.date;
    }
  });

  // Update clients who are auto-tracked
  clients.forEach(c => {
    if (c.isFromOrder) {
      const stats = orderStats[c.id] || { orders: 0, sales: 0, profit: 0, latestDate: c.date };

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

// --- CLIENT DETAIL PANEL ---
function showClientDetail(id) {
  const c = getAll('clients').find(x => x.id === id);
  if (!c) return;

  const overlay = document.getElementById('client-detail-overlay');
  if (!overlay) return;

  document.getElementById('cdp-name').textContent = c.name;
  document.getElementById('cdp-date').textContent = formatDate(c.date);
  document.getElementById('cdp-orders').textContent = c.orders || 0;
  document.getElementById('cdp-sales').textContent = formatCurrency(c.sales || 0);
  document.getElementById('cdp-profit').textContent = formatCurrency(c.profit || 0);

  const commentRow = document.getElementById('cdp-comment-row');
  const commentEl = document.getElementById('cdp-comment');
  if (c.comments) {
    commentEl.textContent = c.comments;
    commentRow.style.display = 'flex';
  } else {
    commentRow.style.display = 'none';
  }

  // Populate client order history
  const clientOrders = getAll('orders').filter(o => o.clientId === id);
  const ordersListEl = document.getElementById('cdp-orders-list');
  if (ordersListEl) {
    ordersListEl.innerHTML = '';
    if (clientOrders.length === 0) {
      ordersListEl.innerHTML = `<div style="text-align: center; color: var(--text-light); font-size: 0.85rem; padding: 1rem 0;">${t('no_orders_found')}</div>`;
    } else {
      // Sort orders: newest first
      clientOrders.sort((a, b) => (b.date || '').localeCompare(a.date || ''));
      
      clientOrders.forEach(o => {
        let itemsStr = [];
        if (o.items.noshi > 0) itemsStr.push(`${t('noshi')} x${o.items.noshi}`);
        if (o.items.nagagata > 0) itemsStr.push(`${t('nagagata')} x${o.items.nagagata}`);
        if (o.items.pochi > 0) itemsStr.push(`${t('pochi')} x${o.items.pochi}`);
        if (o.items.atsugami) itemsStr.push(`${t('atsugami')}`);
        if (o.items.sekifudaNoLogo > 0) itemsStr.push(`${t('sekifudaNoLogo')} x${o.items.sekifudaNoLogo}`);
        if (o.items.sekifudaWithLogo > 0) itemsStr.push(`${t('sekifudaWithLogo')} x${o.items.sekifudaWithLogo}`);
        if (o.items.sealA > 0) itemsStr.push(`${t('sealA')} x${o.items.sealA}`);
        if (o.items.sealB > 0) itemsStr.push(`${t('sealB')} x${o.items.sealB}`);
        if (o.items.hofuchoMermaid > 0) itemsStr.push(`${t('hofuchoMermaid')} x${o.items.hofuchoMermaid}`);
        if (o.items.hofuchoGayo > 0) itemsStr.push(`${t('hofuchoGayo')} x${o.items.hofuchoGayo}`);
        if (o.items.uketsukeSign > 0) itemsStr.push(`${t('uketsukeSign')} x${o.items.uketsukeSign}`);
        if (o.adjustment && o.adjustment !== 0) {
          const sign = o.adjustment > 0 ? '+' : '';
          const reasonText = o.adjustmentReason ? ` (${o.adjustmentReason})` : '';
          itemsStr.push(`${t('label_adjustment')}: ${sign}${o.adjustment}${reasonText}`);
        }

        let statusClass = 'status-pending';
        if (o.status === 'Finished' || o.status === '完了') statusClass = 'status-completed';
        else if (o.status === 'Ready for Shipping' || o.status === '発送待ち') statusClass = 'status-todo';

        const orderDiv = document.createElement('div');
        orderDiv.className = 'client-order-item';
        orderDiv.style.cssText = 'background: var(--background-color, #f9f9f9); border: 1px solid var(--border-color); border-radius: var(--border-radius); padding: 0.6rem; font-size: 0.8rem; margin-bottom: 0.5rem;';
        orderDiv.innerHTML = `
          <div style="display: flex; justify-content: space-between; margin-bottom: 0.3rem; align-items: center;">
            <span style="font-weight: 600; color: var(--text-primary);">${formatDate(o.date)}</span>
            <span class="badge ${statusClass}" style="font-size: 0.65rem; padding: 0.15rem 0.4rem; border-radius: 4px;">${t(o.status)}</span>
          </div>
          <div style="color: var(--text-secondary); margin-bottom: 0.3rem; line-height: 1.4;">${itemsStr.join(', ') || '—'}</div>
          <div style="display: flex; justify-content: space-between; font-size: 0.75rem; color: var(--text-light); border-top: 1px solid var(--border-color); padding-top: 0.3rem; margin-top: 0.3rem;">
            <span>${t('order_amount')}: <strong style="color: var(--text-primary);">${formatCurrency(o.purchaseAmount)}</strong></span>
            <span>${t('order_profit')}: <strong style="color: var(--status-active-text);">${formatCurrency(o.profit)}</strong></span>
          </div>
        `;
        ordersListEl.appendChild(orderDiv);
      });
    }
  }

  overlay.classList.add('active');
}

function closeClientDetail() {
  const overlay = document.getElementById('client-detail-overlay');
  if (overlay) overlay.classList.remove('active');
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
    const source = c.isFromOrder
      ? `<span style="font-size:0.7rem; color:var(--text-light); display:block;">${t('client_auto_tracked')}</span>`
      : '';
    const infoBtnHtml = c.comments
      ? `<button class="client-info-btn" onclick="showClientDetail('${c.id}')" title="${c.comments}">!</button>`
      : '';
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td data-label="${t('order_buyer')}">
        <span style="display:inline-flex; align-items:center; gap:0.2rem; flex-wrap:wrap;">
          <strong class="client-clickable-name" onclick="showClientDetail('${c.id}')">${c.name}</strong>${infoBtnHtml}
        </span>
        ${source}
      </td>
      <td data-label="${t('th_purchase_date')}">${formatDate(c.date)}</td>
      <td data-label="${t('dash_orders')}">${c.orders || 0}</td>
      <td data-label="${t('dash_sales')}" style="font-weight:600; color:var(--text-primary);">${formatCurrency(c.sales || 0)}</td>
      <td data-label="${t('order_profit')}" style="font-weight:700; color:var(--status-active-text);">${formatCurrency(c.profit || 0)}</td>
      <td class="col-comments" data-label="${t('label_comments')}" style="font-size:0.85rem; color:var(--text-secondary); white-space:normal; max-width:180px;">${c.comments ? `💬 ${c.comments}` : '—'}</td>
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

function trackClientFromOrder(clientId, amount, profit, orderDate, items, orderComments) {
  if (!clientId) return;

  const itemsObj = items || {};
  const envelopeQty = (itemsObj.noshi || 0) + (itemsObj.nagagata || 0) + (itemsObj.pochi || 0);
  const sekifudaQty = (itemsObj.sekifudaNoLogo || 0) + (itemsObj.sekifudaWithLogo || 0);
  const a4Qty = (itemsObj.hofuchoMermaid || 0) + (itemsObj.hofuchoGayo || 0) + (itemsObj.uketsukeSign || 0);
  const totalQty = envelopeQty + sekifudaQty + a4Qty;

  const clients = getAll('clients');
  const existing = clients.find(c => c.id === clientId);
  if (existing) {
    const updates = {
      orders: (existing.orders || 0) + totalQty,
      sales: (existing.sales || 0) + amount,
      profit: (existing.profit || 0) + profit,
      date: orderDate || existing.date,
      isFromOrder: true
    };
    if (orderComments) {
      updates.comments = orderComments;
    }
    updateItem('clients', existing.id, updates);
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
function toggleCustomInventoryInput(sel) {
  const customInput = document.getElementById('inv-custom-name');
  if (!customInput) return;
  if (sel.value === '__custom__') {
    customInput.style.display = 'inline-block';
    customInput.focus();
  } else {
    customInput.style.display = 'none';
    customInput.value = '';
  }
}
function addInventoryPurchase() {
  const dateInput = document.getElementById('inv-new-date');
  const nameInput = document.getElementById('inv-new-name');
  const qtyInput = document.getElementById('inv-new-qty');
  const priceInput = document.getElementById('inv-new-price');

  const date = dateInput.value || new Date().toISOString().split('T')[0];
  const isCustom = nameInput.value === '__custom__';
  const customNameInput = document.getElementById('inv-custom-name');
  const name = isCustom
    ? (customNameInput ? customNameInput.value.trim() : '')
    : (nameInput.value || '').trim();
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
  if (customNameInput) {
    customNameInput.value = '';
    customNameInput.style.display = 'none';
  }
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
  const savedPrices = { ...DEFAULT_PRICES, ...(getPrices() || {}) };
  document.getElementById('settings-price-noshi').value = savedPrices.noshi;
  document.getElementById('settings-price-nagagata').value = savedPrices.nagagata;
  document.getElementById('settings-price-pochi').value = savedPrices.pochi;
  document.getElementById('settings-price-atsugami').value = savedPrices.atsugami;
  document.getElementById('settings-price-sealA').value = savedPrices.sealA;
  document.getElementById('settings-price-sealB').value = savedPrices.sealB;
  document.getElementById('settings-price-sekifuda-nologo').value = savedPrices.sekifudaNoLogo;
  document.getElementById('settings-price-sekifuda-withlogo').value = savedPrices.sekifudaWithLogo;
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
    ...PRICES,
    noshi: parseInt(document.getElementById('settings-price-noshi').value) || 0,
    nagagata: parseInt(document.getElementById('settings-price-nagagata').value) || 0,
    pochi: parseInt(document.getElementById('settings-price-pochi').value) || 0,
    atsugami: parseInt(document.getElementById('settings-price-atsugami').value) || 0,
    sealA: parseInt(document.getElementById('settings-price-sealA').value) || 0,
    sealB: parseInt(document.getElementById('settings-price-sealB').value) || 0,
    sekifudaNoLogo: parseInt(document.getElementById('settings-price-sekifuda-nologo').value) || 0,
    sekifudaWithLogo: parseInt(document.getElementById('settings-price-sekifuda-withlogo').value) || 0,
  };
  savePrices(updatedPrices);
  PRICES = updatedPrices;
  updatePriceLabels();
  alert(t('save_settings_alert'));
}

function updatePriceLabels() {
  PRICES = { ...DEFAULT_PRICES, ...(PRICES || {}), ...(getPrices() || {}) };
  const lang = getLanguage();
  const perPiece = lang === 'en' ? ' / pc' : ' / 枚';
  const labels = {
    'label-price-noshi': `${t('noshi')} (${formatCurrency(PRICES.noshi)})`,
    'label-price-nagagata': `${t('nagagata')} (${formatCurrency(PRICES.nagagata)})`,
    'label-price-pochi': `${t('pochi')} (${formatCurrency(PRICES.pochi)})`,
    'label-price-atsugami': `${t('atsugami')} (${formatCurrency(PRICES.atsugami)})`,
    'label-price-sealA': `${t('sealA')} (${formatCurrency(PRICES.sealA)}${perPiece})`,
    'label-price-sealB': `${t('sealB')} (${formatCurrency(PRICES.sealB)}${perPiece})`,
    'label-price-sekifuda-nologo': `${t('sekifudaNoLogo')} (${formatCurrency(PRICES.sekifudaNoLogo)})`,
    'label-price-sekifuda-withlogo': `${t('sekifudaWithLogo')} (${formatCurrency(PRICES.sekifudaWithLogo)})`,
    'label-price-hofucho-mermaid': `${t('hofuchoMermaid')} (¥280 / ¥180×2+)`,
    'label-price-hofucho-gayo': `${t('hofuchoGayo')} (¥260 / ¥160×2+)`,
    'label-price-uketsuke': `${t('uketsukeSign')} (¥320 +¥100/pc)`,
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

// ── BOTTOM NAV ──
function setupBottomNav() {
  const bottomLinks = document.querySelectorAll('.bottom-nav-link');
  const sidebarLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('.view-section');

  bottomLinks.forEach(link => {
    link.addEventListener('click', () => {
      const targetId = link.getAttribute('data-target');
      if (!targetId) return;

      // Update bottom nav active state
      bottomLinks.forEach(l => l.classList.remove('active'));
      link.classList.add('active');

      // Sync sidebar active state
      sidebarLinks.forEach(l => {
        l.classList.toggle('active', l.getAttribute('data-target') === targetId);
      });

      // Show correct section
      sections.forEach(s => s.classList.remove('active'));
      document.getElementById(targetId)?.classList.add('active');
      if (targetId === 'view-profits') {
        loadProfitsView();
      }
    });
  });
}

function migrateHistoricalData() {
  const orders = getAll('orders');
  const clients = getAll('clients');
  let migrated = false;

  orders.forEach(o => {
    if (!o.clientId) {
      // Create a brand new auto-tracked client for this order to keep it completely unique
      const newClientId = 'c' + Date.now() + Math.random().toString(36).slice(2, 7);
      const client = {
        id: newClientId,
        name: (o.buyerName || '').trim() || 'Unknown',
        date: o.date || new Date().toISOString().split('T')[0],
        orders: 0,
        sales: 0,
        profit: 0,
        comments: o.comments || '',
        isFromOrder: true
      };
      clients.push(client);
      fsAddItem('clients', client);
      
      o.clientId = newClientId;
      // Save the order updates
      updateItem('orders', o.id, { clientId: newClientId });
      migrated = true;
    }
  });

  // Fix client records that are referenced by orders but lack isFromOrder = true (prevents double-counting in dashboard)
  const orderClientIds = new Set(orders.map(o => o.clientId).filter(Boolean));
  clients.forEach(c => {
    if (orderClientIds.has(c.id) && c.isFromOrder !== true) {
      c.isFromOrder = true;
      updateItem('clients', c.id, { isFromOrder: true });
      migrated = true;
    }
  });

  if (migrated) {
    console.log('[Migration] Migrated legacy orders and synchronized client states');
  }
}

// --- PROFITS CALENDAR ---
let currentProfitYear = new Date().getFullYear();

function changeProfitYear(delta) {
  currentProfitYear += delta;
  loadProfitsView();
}

function loadProfitsView() {
  const yearLabel = document.getElementById('profit-year-label');
  if (yearLabel) yearLabel.textContent = currentProfitYear;

  const grid = document.getElementById('profit-month-grid');
  if (!grid) return;
  grid.innerHTML = '';

  const allClients = getAll('clients') || [];
  const lang = getLanguage();

  const yearStr = String(currentProfitYear);
  let yearTotalProfit = 0;
  let yearTotalClients = 0;

  for (let m = 1; m <= 12; m++) {
    const monthStr = `${yearStr}-${String(m).padStart(2, '0')}`;

    // Unique clients who placed order(s) in this month
    const monthClients = allClients.filter(c => c.date && c.date.startsWith(monthStr));
    const monthProfit = monthClients.reduce((sum, c) => sum + (c.profit || 0), 0);
    const clientCount = monthClients.length;

    yearTotalProfit += monthProfit;
    yearTotalClients += clientCount;

    const monthName = lang === 'jp'
      ? `${m}月`
      : new Date(currentProfitYear, m - 1, 1).toLocaleString('en-US', { month: 'short' });

    // Full month label for the modal title (e.g. "August 2026" / "2026年8月")
    const monthFullName = lang === 'jp'
      ? `${currentProfitYear}年${m}月`
      : new Date(currentProfitYear, m - 1, 1).toLocaleString('en-US', { month: 'long', year: 'numeric' });

    const card = document.createElement('div');
    const isCurrentMonth = new Date().getFullYear() === currentProfitYear && (new Date().getMonth() + 1) === m;
    card.className = `profit-month-card ${isCurrentMonth ? 'current-month' : ''} ${clientCount === 0 ? 'no-data' : ''}`;
    card.style.cursor = 'pointer';

    // Attach tap handler — works on both iPhone touch and desktop click
    card.addEventListener('click', () => openMonthDetailModal(monthStr, monthFullName));

    card.innerHTML = `
      <div class="profit-month-header">
        <span class="profit-month-name">${monthName}</span>
        ${isCurrentMonth ? `<span class="profit-month-badge">${lang === 'jp' ? '今月' : 'Current'}</span>` : ''}
      </div>
      <div class="profit-month-body">
        <div class="profit-metric-item">
          <span class="profit-metric-label"><i class="fas fa-coins" style="margin-right: 0.35rem; opacity: 0.75;"></i><span data-i18n="profit_order_profit">${t('profit_order_profit')}</span></span>
          <span class="profit-metric-val profit-value ${monthProfit < 0 ? 'negative' : ''}">${formatCurrency(monthProfit)}</span>
        </div>
        <div class="profit-metric-item">
          <span class="profit-metric-label"><i class="fas fa-users" style="margin-right: 0.35rem; opacity: 0.75;"></i><span data-i18n="profit_client_count">${t('profit_client_count')}</span></span>
          <span class="profit-metric-val">${clientCount}${lang === 'jp' ? '件' : ' clients'}</span>
        </div>
      </div>
      <div class="profit-month-tap-hint">
        <i class="fas fa-chevron-right" style="font-size:0.7rem; opacity:0.4;"></i>
      </div>
    `;
    grid.appendChild(card);
  }

  // Annual inventory cost for the selected year
  const db = getDB();
  const inventoryList = db.inventory || [];
  const yearInventoryList = inventoryList.filter(item => item.date && item.date.startsWith(yearStr));
  const yearTotalInventory = yearInventoryList.reduce((sum, item) => sum + (item.price || 0), 0);

  const yearNetProfit = yearTotalProfit - yearTotalInventory;

  const yearNetProfitEl = document.getElementById('profit-year-net-profit');
  if (yearNetProfitEl) {
    yearNetProfitEl.textContent = formatCurrency(yearNetProfit);
    if (yearNetProfit < 0) {
      yearNetProfitEl.classList.add('negative');
    } else {
      yearNetProfitEl.classList.remove('negative');
    }
  }

  const yearProfitEl = document.getElementById('profit-year-total-profit');
  if (yearProfitEl) yearProfitEl.textContent = formatCurrency(yearTotalProfit);

  const yearInvEl = document.getElementById('profit-year-total-inventory');
  if (yearInvEl) yearInvEl.textContent = formatCurrency(yearTotalInventory);

  const yearClientsEl = document.getElementById('profit-year-total-clients');
  if (yearClientsEl) yearClientsEl.textContent = `${yearTotalClients}${lang === 'jp' ? '件' : ''}`;
}

// --- MONTH DETAIL BOTTOM SHEET ---
function openMonthDetailModal(monthStr, monthFullName) {
  const overlay = document.getElementById('modal-month-details');
  const titleEl = document.getElementById('month-modal-title');
  const summaryEl = document.getElementById('month-modal-summary');
  const listEl = document.getElementById('month-client-list');
  if (!overlay || !listEl) return;

  const lang = getLanguage();
  const allClients = getAll('clients') || [];
  const monthClients = allClients.filter(c => c.date && c.date.startsWith(monthStr));

  // Aggregate by client name: sum orders & profit
  const clientMap = {};
  monthClients.forEach(c => {
    const key = c.name || (lang === 'jp' ? '不明' : 'Unknown');
    if (!clientMap[key]) clientMap[key] = { orders: 0, profit: 0 };
    clientMap[key].orders += 1;
    clientMap[key].profit += (c.profit || 0);
  });

  const rows = Object.entries(clientMap).sort((a, b) => b[1].profit - a[1].profit);
  const totalMonthProfit = rows.reduce((sum, [, v]) => sum + v.profit, 0);
  const totalClients = rows.length;

  // Set header
  titleEl.textContent = monthFullName;
  summaryEl.textContent = lang === 'jp'
    ? `${formatCurrency(totalMonthProfit)} · ${totalClients}件`
    : `${formatCurrency(totalMonthProfit)} · ${totalClients} client${totalClients !== 1 ? 's' : ''}`;

  // Build client rows
  if (rows.length === 0) {
    listEl.innerHTML = `
      <div class="month-modal-empty">
        <i class="fas fa-calendar-times" style="font-size:2rem; opacity:0.3; margin-bottom:0.75rem;"></i>
        <p>${lang === 'jp' ? 'この月の記録はありません' : 'No client activity for this month'}</p>
      </div>`;
  } else {
    listEl.innerHTML = rows.map(([name, data]) => {
      const ordersLabel = lang === 'jp'
        ? `${data.orders}件`
        : `${data.orders} order${data.orders !== 1 ? 's' : ''}`;
      return `
        <div class="profit-client-row">
          <span class="profit-client-name">${name}</span>
          <span class="profit-client-badge">${ordersLabel}</span>
          <span class="profit-client-val ${data.profit < 0 ? 'negative' : ''}">+${formatCurrency(data.profit)}</span>
        </div>`;
    }).join('');
  }

  // Show the overlay
  overlay.style.display = 'flex';
  // Trigger slide-up animation
  requestAnimationFrame(() => {
    overlay.classList.add('visible');
  });
  document.body.style.overflow = 'hidden';
}

function closeMonthDetailModal(e) {
  // If called from backdrop click, only close if the click was on the overlay itself
  if (e && e.target !== document.getElementById('modal-month-details')) return;
  const overlay = document.getElementById('modal-month-details');
  if (!overlay) return;
  overlay.classList.remove('visible');
  setTimeout(() => {
    overlay.style.display = 'none';
    document.body.style.overflow = '';
  }, 300);
}

