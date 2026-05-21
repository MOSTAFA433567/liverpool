export class SettingsView {
  constructor() {
    this.hourlyRate = window.Store.state.hourlyRate || 15.00;
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
      <main class="relative z-10 pt-28 pb-32 px-4 md:px-8 max-w-7xl mx-auto min-h-screen">
        <div class="flex justify-between items-end mb-8">
          <div>
            <p class="font-headline text-primary tracking-widest text-xs uppercase mb-1 font-bold">Configuration Matrix</p>
            <h1 class="font-headline text-4xl font-bold tracking-tight text-white uppercase">System Config</h1>
          </div>
          <div class="flex gap-4">
            <button id="save-settings-btn" class="bg-gradient-to-br from-primary to-primary-container text-on-primary-container px-6 py-2 rounded-md font-bold text-sm shadow-[0_0_15px_rgba(0,209,255,0.2)] hover:scale-[1.02] transition-transform">
              Commit Changes
            </button>
          </div>
        </div>

        <div class="w-full h-[1px] bg-surface-container-highest mb-12 relative">
          <div class="absolute left-0 top-0 h-[2px] w-[15%] bg-primary"></div>
        </div>

        <!-- Bento Grid Layout -->
        <div class="grid grid-cols-12 gap-8">
          <!-- Left Column: Global Toggles -->
          <div class="col-span-12 lg:col-span-5 space-y-8">
            <section class="bg-surface-container-low/60 backdrop-blur-md border border-outline-variant/15 rounded-xl p-8 relative overflow-hidden group hover:bg-surface-container-high transition-colors duration-300 shadow-[0_0_40px_10px_rgba(164,230,255,0.05)]">
              <div class="absolute -top-10 -right-10 w-32 h-32 bg-primary/5 rounded-full blur-2xl group-hover:bg-primary/10 transition-colors"></div>
              <div class="flex items-center gap-3 mb-8 relative z-10">
                <span class="material-symbols-outlined text-primary">tune</span>
                <h2 class="font-headline text-xl font-bold text-white tracking-tight">Global Prefs</h2>
              </div>
              <div class="space-y-6 relative z-10">
                <!-- Toggle 1 -->
                <div class="flex items-center justify-between">
                  <div>
                    <p class="text-sm font-medium text-white">Dark Mode</p>
                    <p class="text-xs text-on-surface-variant mt-1">Force void aesthetic</p>
                  </div>
                  <label class="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" class="sr-only peer" checked>
                    <div class="w-11 h-6 bg-surface-container-lowest peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-container border border-outline-variant/20"></div>
                  </label>
                </div>
                <!-- Toggle 2 -->
                <div class="flex items-center justify-between">
                  <div>
                    <p class="text-sm font-medium text-white">System Alerts</p>
                    <p class="text-xs text-on-surface-variant mt-1">Push notifications via HUD</p>
                  </div>
                  <label class="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" class="sr-only peer" checked>
                    <div class="w-11 h-6 bg-surface-container-lowest peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-container border border-outline-variant/20"></div>
                  </label>
                </div>
              </div>
            </section>
          </div>

          <!-- Right Column: Hardware Rates -->
          <div class="col-span-12 lg:col-span-7 space-y-8">
            <section class="bg-surface-container-low/60 backdrop-blur-md border border-outline-variant/15 rounded-xl p-8 relative overflow-hidden group hover:bg-surface-container-high transition-colors duration-300 shadow-[0_0_40px_10px_rgba(164,230,255,0.05)]">
              <div class="flex items-center justify-between mb-8">
                <div class="flex items-center gap-3">
                  <span class="material-symbols-outlined text-primary">payments</span>
                  <h2 class="font-headline text-xl font-bold text-white tracking-tight">Hardware Tariffs</h2>
                </div>
                <span class="font-label text-[10px] tracking-[0.1em] text-on-surface-variant uppercase bg-surface-container-lowest px-2 py-1 rounded border border-outline-variant/20">Hourly Rates (USD)</span>
              </div>
              <div class="space-y-4">
                
                <!-- Base Rate Item -->
                <div class="flex items-center justify-between p-4 bg-surface-container-lowest rounded-lg border border-outline-variant/10 hover:border-primary/30 transition-colors">
                  <div class="flex items-center gap-4">
                    <div class="w-12 h-12 rounded bg-surface-container flex items-center justify-center border border-outline-variant/20">
                      <span class="material-symbols-outlined text-white">videogame_asset</span>
                    </div>
                    <div>
                      <h3 class="font-bold text-white text-sm">Base Station Hourly Rate</h3>
                      <div class="flex items-center gap-2 mt-1">
                        <div class="w-1.5 h-1.5 rounded-full bg-primary-container shadow-[0_0_4px_#00d1ff]"></div>
                        <p class="text-xs text-on-surface-variant">Global System Rate</p>
                      </div>
                    </div>
                  </div>
                  <div class="flex items-center gap-4">
                    <div class="relative">
                      <span class="absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-sm">$</span>
                      <input id="settings-hourly-rate" class="bg-surface-container text-white text-right text-sm font-bold rounded-md border border-outline-variant/20 focus:border-primary/50 focus:ring-1 focus:ring-primary/50 py-2 pl-8 pr-4 w-24 outline-none" type="number" step="0.5" value="\${this.hourlyRate.toFixed(2)}"/>
                    </div>
                  </div>
                </div>

              </div>
            </section>
          </div>
        </div>
      </main>

      <!-- BottomNavBar -->
      <nav class="md:hidden bg-[#1b1b1e]/90 backdrop-blur-lg fixed bottom-0 w-full z-50 rounded-t-2xl shadow-[0_-8px_30px_rgba(0,0,0,0.5)] flex justify-around items-center h-20 px-4 pt-1 border-t-0">
        <button onclick="window.location.hash='#dashboard'" class="flex flex-col items-center justify-center text-[#859399] opacity-70 hover:text-[#a4e6ff] hover:opacity-100 transition-all active:scale-90 duration-200 w-16">
          <span class="material-symbols-outlined mb-1">dashboard</span>
          <span class="font-label font-medium text-[10px] tracking-[0.05em] uppercase">DASHBOARD</span>
        </button>
        <button onclick="window.location.hash='#reports'" class="flex flex-col items-center justify-center text-[#859399] opacity-70 hover:text-[#a4e6ff] hover:opacity-100 transition-all duration-200 w-16">
          <span class="material-symbols-outlined mb-1">monitoring</span>
          <span class="font-label font-medium text-[10px] tracking-[0.05em] uppercase">REPORTS</span>
        </button>
        <button onclick="window.location.hash='#settings'" class="flex flex-col items-center justify-center text-[#00d1ff] drop-shadow-[0_0_8px_rgba(0,209,255,0.5)] scale-110 transition-all duration-200 w-16 relative">
          <div class="absolute -top-3 w-8 h-1 bg-primary-container rounded-full shadow-[0_0_10px_rgba(0,209,255,0.8)]"></div>
          <span class="material-symbols-outlined mb-1 icon-fill">settings</span>
          <span class="font-label font-medium text-[10px] tracking-[0.05em] uppercase">SETTINGS</span>
        </button>
      </nav>
    `;
  }

  afterRender() {
    const saveBtn = document.getElementById('save-settings-btn');
    if (saveBtn) {
      saveBtn.addEventListener('click', () => {
        const rateInput = document.getElementById('settings-hourly-rate');
        if (rateInput) {
          const newRate = parseFloat(rateInput.value);
          if (!isNaN(newRate)) {
            window.Store.state.hourlyRate = newRate;
            window.Store.saveState();
            alert('Settings committed to system memory.');
          }
        }
      });
    }
  }

  destroy() {
    // cleanup
  }
}
