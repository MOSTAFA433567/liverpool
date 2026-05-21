import type { Lang } from '../store/useLanguageStore';

export const t: Record<string, Record<Lang, string>> = {
  // ---- Navigation ----
  'nav.dashboard':      { ar: 'الرئيسية',        en: 'Dashboard' },
  'nav.rooms':          { ar: 'الغرف',            en: 'Rooms' },
  'nav.bookings':       { ar: 'الحجوزات',         en: 'Bookings' },
  'nav.pos':            { ar: 'نقطة البيع',       en: 'POS Menu' },
  'nav.reports':        { ar: 'التقارير',          en: 'Reports' },
  'nav.settings':       { ar: 'الإعدادات',        en: 'Settings' },
  'nav.customer':       { ar: 'بوابة العملاء',    en: 'Customer Portal' },
  'nav.logout':         { ar: 'تسجيل الخروج',     en: 'Secure Logout' },

  // ---- Dashboard ----
  'dashboard.title':         { ar: 'لوحة التحكم', en: 'Command Center' },
  'dashboard.subtitle':      { ar: 'نظرة عامة والعمليات الحية', en: 'System Overview & Live Operations' },
  'dashboard.activeRooms':   { ar: 'الغرف النشطة',  en: 'Active Rooms' },
  'dashboard.available':     { ar: 'المتاحة',       en: 'Available' },
  'dashboard.todayRevenue':  { ar: 'إيرادات اليوم', en: "Today's Revenue" },
  'dashboard.liveGrid':      { ar: 'الشبكة الحية',  en: 'Live Grid' },
  'dashboard.viewAll':       { ar: 'عرض الكل',      en: 'View All' },

  // ---- Rooms ----
  'rooms.title':       { ar: 'مصفوفة الغرف',        en: 'Rooms Matrix' },
  'rooms.subtitle':    { ar: 'نظرة شاملة على جميع مناطق الألعاب.', en: 'Full overview of all gaming zones.' },
  'rooms.rate':        { ar: 'السعر',               en: 'Rate' },
  'rooms.perHour':     { ar: '/س',                  en: '/hr' },
  'rooms.manage':      { ar: 'إدارة',               en: 'Manage' },
  'rooms.start':       { ar: 'بدء',                 en: 'Start' },
  'rooms.addRoom':     { ar: '+ إضافة غرفة',        en: '+ Add Room' },

  // ---- Status ----
  'status.in_use':      { ar: 'قيد الاستخدام', en: 'In Use' },
  'status.available':   { ar: 'متاحة',         en: 'Available' },
  'status.reserved':    { ar: 'محجوزة',        en: 'Reserved' },
  'status.maintenance': { ar: 'صيانة',         en: 'Maintenance' },

  // ---- Bookings ----
  'bookings.title':      { ar: 'الحجوزات',          en: 'Reservations' },
  'bookings.subtitle':   { ar: 'إدارة الجدول الزمني القادم.', en: 'Manage upcoming schedule.' },
  'bookings.newBooking': { ar: '+ حجز جديد',        en: '+ New Booking' },
  'bookings.today':      { ar: 'اليوم',             en: 'Today' },
  'bookings.customer':   { ar: 'عميل',              en: 'Customer' },
  'bookings.noUpcoming': { ar: 'لا توجد حجوزات قادمة.', en: 'No upcoming bookings.' },

  // ---- POS ----
  'pos.title':        { ar: 'قائمة المشروبات والأكل', en: 'F&B Menu' },
  'pos.subtitle':     { ar: 'نقطة البيع وإدارة المخزون',   en: 'Point of Sale & Stock Management' },
  'pos.cart':         { ar: 'الطلب الحالي',         en: 'Current Order' },
  'pos.total':        { ar: 'المجموع',              en: 'Total' },
  'pos.empty':        { ar: 'السلة فارغة',          en: 'Cart is empty' },
  'pos.linkSession':  { ar: 'ربط بجلسة',            en: 'Link to Session' },
  'pos.walkin':       { ar: 'عميل زيارة (دفع مباشر)', en: 'Walk-in Customer (Direct Pay)' },
  'pos.addTab':       { ar: 'إضافة للحساب',         en: 'Add to Session Tab' },
  'pos.processPayment': { ar: 'معالجة الدفع',       en: 'Process Payment' },

  // ---- Reports ----
  'reports.title':       { ar: 'التحليلات',        en: 'System Analytics' },
  'reports.subtitle':    { ar: 'تتبع الإيرادات والأداء.', en: 'Revenue tracking & performance.' },
  'reports.totalRev':    { ar: 'إجمالي الإيرادات (7 أيام)', en: 'Total Revenue (7d)' },
  'reports.gamingRev':   { ar: 'إيرادات الألعاب',  en: 'Gaming Rev' },
  'reports.foodRev':     { ar: 'إيرادات الأكل',    en: 'F&B Rev' },
  'reports.revSplit':    { ar: 'توزيع الإيرادات',  en: 'Revenue Split' },

  // ---- Settings ----
  'settings.title':       { ar: 'إعدادات النظام',    en: 'System Settings' },
  'settings.subtitle':    { ar: 'ضبط معاملات اللاونج والكتالوج.', en: 'Configure lounge parameters and catalog.' },
  'settings.roomRates':   { ar: 'أسعار الغرف',       en: 'Room Rates' },
  'settings.ps5Rate':     { ar: 'سعر PS5 Pro (بالساعة)', en: 'PS5 Pro Rate (per hour)' },
  'settings.ps4Rate':     { ar: 'سعر PS4 Standard (بالساعة)', en: 'PS4 Standard Rate (per hour)' },
  'settings.billiard':    { ar: 'سعر طاولة البلياردو (بالساعة)', en: 'Billiard Table Rate (per hour)' },
  'settings.save':        { ar: 'حفظ الإعدادات',    en: 'Save Configurations' },
  'settings.sysPrefs':    { ar: 'تفضيلات النظام',   en: 'System Preferences' },
  'settings.darkMode':    { ar: 'الوضع الداكن',      en: 'Dark Mode' },
  'settings.darkModeDesc':{ ar: 'تفعيل المظهر الداكن للألعاب.', en: 'Force deep dark gaming aesthetic.' },
  'settings.autoBilling': { ar: 'الحساب التلقائي',  en: 'Auto-Calculate Billing' },
  'settings.autoBillingDesc': { ar: 'حساب الإجماليات ديناميكياً أثناء الجلسات.', en: 'Dynamically calculate totals during sessions.' },
  'settings.soundAlerts': { ar: 'تنبيهات صوتية',    en: 'Sound Alerts' },
  'settings.soundAlertsDesc': { ar: 'تشغيل صوت عند انتهاء الجلسة.', en: 'Play sound when session ends.' },

  // ---- Language Toggle ----
  'lang.switch': { ar: 'English', en: 'عربي' },
  'lang.label':  { ar: 'اللغة',  en: 'Language' },

  // ---- Sidebar Header ----
  'sidebar.clearance': { ar: 'صلاحية الدرجة 4',  en: 'Level 4 Clearance' },

  // ---- Quick Launch ----
  'quicklaunch.label': { ar: 'وصول سريع', en: 'Quick Access' },

  // ---- Session ----
  'session.title':    { ar: 'متحكم الجلسة',   en: 'Session Controller' },
  'session.subtitle': { ar: 'إدارة جلسة نشطة.', en: 'Managing active session.' },
};

export function useTranslation(lang: Lang) {
  return (key: string): string => t[key]?.[lang] ?? key;
}
