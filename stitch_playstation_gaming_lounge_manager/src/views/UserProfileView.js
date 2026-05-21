export class UserProfileView {
  constructor() {
  }

  async render() {
    return `
      <!-- TopAppBar -->
      <header class="bg-[#131316]/80 backdrop-blur-xl text-[#a4e6ff] font-headline font-bold tracking-tighter uppercase text-sm fixed top-0 w-full z-50 after:content-[''] after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-12 after:bg-[#00d1ff] shadow-[0_4px_20px_rgba(0,209,255,0.1)] flex justify-between items-center px-6 py-4 max-w-full">
        <div class="flex items-center gap-4">
          <div class="w-1 h-6 bg-primary-container rounded-r-full hidden sm:block"></div>
          <span class="text-xl font-black text-[#00d1ff] tracking-widest cursor-pointer" onclick="window.location.hash='#dashboard'">KINETIC VAULT</span>
        </div>
        <div class="flex items-center gap-6">
          <button class="hover:text-[#a4e6ff] transition-all duration-300 hover:scale-105 active:scale-95 text-[#859399]">
            <span class="material-symbols-outlined text-2xl">notifications</span>
          </button>
          <div class="w-8 h-8 rounded-full bg-surface-container-high border border-outline-variant/30 overflow-hidden shadow-inner flex items-center justify-center cursor-pointer" onclick="window.location.hash='#profile'">
            <span class="material-symbols-outlined text-sm">person</span>
          </div>
        </div>
      </header>

      <!-- Main Content Canvas -->
      <main class="relative z-10 pt-28 pb-32 px-4 md:px-8 max-w-7xl mx-auto min-h-screen space-y-6 md:space-y-10">
        
        <!-- User Profile Hero -->
        <section class="bg-surface-container-lowest rounded-lg p-6 flex flex-col md:flex-row items-center md:items-start gap-6 relative overflow-hidden backdrop-blur-md border border-outline-variant/15">
          <div class="absolute -top-10 -right-10 w-40 h-40 bg-primary/20 rounded-full blur-[40px] pointer-events-none"></div>
          <div class="w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden border-2 border-primary shadow-[0_0_20px_rgba(0,209,255,0.5)] flex-shrink-0 z-10">
            <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuAar74ks1EVoe7xmyiX3g9unv8Wo-wHazg5zc5IFeimFiUp6fZexKqpJ6-Lzr3u1trwyoTP3aJTBRWX7mz-bGWbG4Z3qrmYLzUmf1gyJ4ZFzU2L_pXk0oorZA3uX2aEP_q1-dmz-fI6OWJp8lPMXgFs0Ol_akAZJ3WGHOGVB2JnoXuQFC5txRRp0_qUNE6EvB39a7ljtityBTcWvPF5W9d3oePjRxuKf19k80ckMAkD0PNmNbd3C0VpL0Ci9pT_HcBIz-vzLL2CUmA" alt="Profile avatar" class="w-full h-full object-cover">
          </div>
          <div class="text-center md:text-left flex-1 z-10">
            <h2 class="font-headline text-3xl font-bold text-on-surface mb-1 uppercase tracking-wide">\${window.Store.state.user ? window.Store.state.user.name : 'Super Admin'}</h2>
            <p class="font-body text-on-surface-variant text-sm mb-4">admin@kineticvault.com</p>
            <div class="flex flex-wrap justify-center md:justify-start gap-4">
              <div class="bg-surface-container-high rounded-md px-4 py-3 min-w-[120px] border border-outline-variant/15">
                <p class="font-headline text-xs text-on-surface-variant uppercase tracking-widest mb-1">Clearance</p>
                <p class="font-headline text-xl text-primary font-bold">Level 4</p>
              </div>
            </div>
          </div>
          <button class="absolute top-4 right-4 text-on-surface-variant hover:text-primary transition-colors z-10">
            <span class="material-symbols-outlined">edit</span>
          </button>
        </section>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-10">
          <!-- Recent Activity Log -->
          <section class="md:col-span-2 space-y-4">
            <h3 class="font-headline text-xl font-bold text-on-surface uppercase tracking-wider mb-2">Recent System Activity</h3>
            
            <div class="bg-surface-container-lowest rounded-lg p-5 backdrop-blur-md border border-outline-variant/15 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 hover:bg-surface-container-low transition-colors group relative overflow-hidden">
              <div class="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div class="flex items-center gap-4 z-10">
                <div class="w-12 h-12 rounded-md bg-surface-container-high flex items-center justify-center text-primary border border-outline-variant/15">
                  <span class="material-symbols-outlined">build</span>
                </div>
                <div>
                  <h4 class="font-headline text-lg font-bold text-on-surface">Configuration Update</h4>
                  <p class="font-body text-sm text-on-surface-variant">Global Prefs • Just now</p>
                </div>
              </div>
              <div class="flex items-center gap-3 z-10 w-full md:w-auto justify-between md:justify-end">
                <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-[#FFC107]/10 text-[#FFC107] border border-[#FFC107]/20 shadow-[0_0_8px_rgba(255,193,7,0.5)]">
                  <span class="w-2 h-2 rounded-full bg-[#FFC107]"></span> Logged
                </span>
                <button class="text-primary hover:text-primary-fixed transition-colors">
                  <span class="material-symbols-outlined">chevron_right</span>
                </button>
              </div>
            </div>

          </section>

          <!-- Quick Settings -->
          <section class="space-y-4">
            <h3 class="font-headline text-xl font-bold text-on-surface uppercase tracking-wider mb-2">Account Options</h3>
            <div class="bg-surface-container-lowest rounded-lg p-5 backdrop-blur-md border border-outline-variant/15 space-y-6">
              
              <div class="flex items-center justify-between group cursor-pointer hover:bg-surface-container-low -mx-5 px-5 py-2 transition-colors">
                <div class="flex items-center gap-3">
                  <span class="material-symbols-outlined text-on-surface-variant group-hover:text-primary transition-colors">security</span>
                  <div>
                    <p class="font-body font-bold text-on-surface">Security</p>
                    <p class="font-body text-xs text-on-surface-variant">Password &amp; 2FA</p>
                  </div>
                </div>
                <span class="material-symbols-outlined text-on-surface-variant group-hover:text-primary transition-colors">chevron_right</span>
              </div>
              
              <button id="profile-logout-btn" class="w-full mt-4 py-3 px-4 rounded-md border border-error/50 text-error hover:bg-error/10 transition-colors font-headline font-bold uppercase tracking-widest text-sm flex items-center justify-center gap-2">
                <span class="material-symbols-outlined text-sm">logout</span> Sign Out
              </button>
            </div>
          </section>
        </div>
      </main>

      <!-- BottomNavBar -->
      <nav class="md:hidden bg-[#1b1b1e]/90 backdrop-blur-lg fixed bottom-0 w-full z-50 rounded-t-2xl shadow-[0_-8px_30px_rgba(0,0,0,0.5)] flex justify-around items-center h-20 px-4 pt-1 border-t-0">
        <button onclick="window.location.hash='#dashboard'" class="flex flex-col items-center justify-center text-[#859399] opacity-70 hover:text-[#a4e6ff] hover:opacity-100 transition-all active:scale-90 duration-200 w-16">
          <span class="material-symbols-outlined mb-1">dashboard</span>
          <span class="font-label font-medium text-[10px] tracking-[0.05em] uppercase">DASHBOARD</span>
        </button>
        <button onclick="window.location.hash='#rooms'" class="flex flex-col items-center justify-center text-[#859399] opacity-70 hover:text-[#a4e6ff] hover:opacity-100 transition-all active:scale-90 duration-200 w-16">
          <span class="material-symbols-outlined mb-1">videogame_asset</span>
          <span class="font-label font-medium text-[10px] tracking-[0.05em] uppercase">ROOMS</span>
        </button>
        <button onclick="window.location.hash='#profile'" class="flex flex-col items-center justify-center text-[#00d1ff] drop-shadow-[0_0_8px_rgba(0,209,255,0.5)] scale-110 transition-all duration-200 w-16 relative">
          <div class="absolute -top-3 w-8 h-1 bg-primary-container rounded-full shadow-[0_0_10px_rgba(0,209,255,0.8)]"></div>
          <span class="material-symbols-outlined mb-1 icon-fill">person</span>
          <span class="font-label font-medium text-[10px] tracking-[0.05em] uppercase">PROFILE</span>
        </button>
      </nav>
    `;
  }

  afterRender() {
    const logoutBtn = document.getElementById('profile-logout-btn');
    if (logoutBtn) {
      logoutBtn.addEventListener('click', () => {
        window.Store.logout();
        window.location.hash = '#login';
      });
    }
  }

  destroy() {
  }
}
