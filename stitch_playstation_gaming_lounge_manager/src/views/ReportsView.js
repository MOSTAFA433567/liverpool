export class ReportsView {
  constructor() {
    this.unsubscribe = window.Store.subscribe(() => this.updateData());
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
        <!-- Ambient Background Glows -->
        <div class="fixed top-[-10%] right-[-5%] w-[40vw] h-[40vw] bg-primary-container/5 rounded-full blur-[120px] pointer-events-none z-0"></div>
        <div class="fixed bottom-[-10%] left-[-5%] w-[30vw] h-[30vw] bg-secondary/5 rounded-full blur-[100px] pointer-events-none z-0"></div>
        
        <div class="relative z-10 space-y-8">
          <!-- Page Header -->
          <div class="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <h1 class="font-headline text-3xl font-bold tracking-tight text-on-surface uppercase">System Analytics</h1>
              <p class="font-body text-on-surface-variant mt-1 text-sm">Real-time telemetry and revenue tracking.</p>
            </div>
            <div class="flex gap-3">
              <button class="px-4 py-2 border border-outline-variant/30 rounded-lg text-sm font-headline uppercase tracking-wider text-on-surface hover:bg-white/5 transition-colors flex items-center gap-2">
                <span class="material-symbols-outlined text-sm">download</span> Export Data
              </button>
              <div class="bg-surface-container-lowest border border-outline-variant/30 rounded-lg flex items-center px-3 py-1.5 cursor-pointer hover:border-primary/50 transition-colors">
                <span class="material-symbols-outlined text-on-surface-variant text-sm mr-2">calendar_today</span>
                <span class="text-sm font-body text-on-surface">Last 7 Days</span>
                <span class="material-symbols-outlined text-on-surface-variant text-sm ml-2">arrow_drop_down</span>
              </div>
            </div>
          </div>

          <!-- Key Stats Grid -->
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <!-- Stat Card 1 -->
            <div class="bg-surface-container-low/80 backdrop-blur-md rounded-lg p-6 relative overflow-hidden group border border-outline-variant/15">
              <div class="absolute top-0 left-0 w-1 h-full bg-primary-container opacity-50 group-hover:opacity-100 transition-opacity"></div>
              <div class="flex justify-between items-start mb-4">
                <p class="font-headline text-xs uppercase tracking-widest text-on-surface-variant">Today's Revenue</p>
                <span class="material-symbols-outlined text-primary-container text-xl opacity-80 group-hover:opacity-100 transition-opacity drop-shadow-[0_0_8px_rgba(0,209,255,0.4)]">attach_money</span>
              </div>
              <div class="flex items-baseline gap-2">
                <h2 class="font-headline text-4xl font-bold text-on-surface tracking-tighter drop-shadow-[0_0_8px_rgba(0,209,255,0.6)]">$4,289</h2>
                <span class="text-xs font-body text-[#4CAF50] bg-[#4CAF50]/10 px-1.5 py-0.5 rounded flex items-center">
                  <span class="material-symbols-outlined text-[10px] mr-0.5">arrow_upward</span> 12.5%
                </span>
              </div>
            </div>
            
            <!-- Stat Card 2 -->
            <div class="bg-surface-container-low/80 backdrop-blur-md rounded-lg p-6 relative overflow-hidden group border border-outline-variant/15">
              <div class="absolute top-0 left-0 w-1 h-full bg-secondary opacity-50 group-hover:opacity-100 transition-opacity"></div>
              <div class="flex justify-between items-start mb-4">
                <p class="font-headline text-xs uppercase tracking-widest text-on-surface-variant">Active Sessions</p>
                <span class="material-symbols-outlined text-secondary text-xl opacity-80 group-hover:opacity-100 transition-opacity drop-shadow-[0_0_8px_rgba(236,178,255,0.4)]">sports_esports</span>
              </div>
              <div class="flex items-baseline gap-2">
                <h2 class="font-headline text-4xl font-bold text-on-surface tracking-tighter" id="report-active-sessions">142</h2>
                <span class="text-xs font-body text-on-surface-variant">/ <span id="report-total-sessions">180</span> cap</span>
              </div>
            </div>

            <!-- Stat Card 3 -->
            <div class="bg-surface-container-low/80 backdrop-blur-md rounded-lg p-6 relative overflow-hidden group border border-outline-variant/15">
              <div class="absolute top-0 left-0 w-1 h-full bg-[#feb127] opacity-50 group-hover:opacity-100 transition-opacity"></div>
              <div class="flex justify-between items-start mb-4">
                <p class="font-headline text-xs uppercase tracking-widest text-on-surface-variant">Avg Session Time</p>
                <span class="material-symbols-outlined text-[#feb127] text-xl opacity-80 group-hover:opacity-100 transition-opacity drop-shadow-[0_0_8px_rgba(254,177,39,0.4)]">timer</span>
              </div>
              <div class="flex items-baseline gap-2">
                <h2 class="font-headline text-4xl font-bold text-on-surface tracking-tighter">2.4<span class="text-2xl text-on-surface-variant font-normal">h</span></h2>
                <span class="text-xs font-body text-[#F44336] bg-[#F44336]/10 px-1.5 py-0.5 rounded flex items-center">
                  <span class="material-symbols-outlined text-[10px] mr-0.5">arrow_downward</span> 3.2%
                </span>
              </div>
            </div>

            <!-- Stat Card 4 -->
            <div class="bg-surface-container-low/80 backdrop-blur-md rounded-lg p-6 relative overflow-hidden group border border-outline-variant/15">
              <div class="absolute top-0 left-0 w-1 h-full bg-[#4cd6ff] opacity-50 group-hover:opacity-100 transition-opacity"></div>
              <div class="flex justify-between items-start mb-4">
                <p class="font-headline text-xs uppercase tracking-widest text-on-surface-variant">Popular Zone</p>
                <span class="material-symbols-outlined text-[#4cd6ff] text-xl opacity-80 group-hover:opacity-100 transition-opacity drop-shadow-[0_0_8px_rgba(76,214,255,0.4)]">whatshot</span>
              </div>
              <div class="flex flex-col gap-1">
                <h2 class="font-headline text-2xl font-bold text-on-surface tracking-tight uppercase truncate">PS5 Pro Lounge</h2>
                <div class="w-full bg-surface-container-lowest h-1.5 rounded-full mt-2 overflow-hidden">
                  <div class="bg-[#4cd6ff] h-full w-[85%] shadow-[0_0_8px_rgba(76,214,255,0.8)]"></div>
                </div>
                <span class="text-[10px] font-body text-on-surface-variant text-right mt-1">85% Utilization</span>
              </div>
            </div>
          </div>

          <!-- Chart & Tables Grid -->
          <div class="grid grid-cols-1 xl:grid-cols-3 gap-8">
            <!-- Main Chart Area -->
            <div class="xl:col-span-2 bg-surface-container-low/60 backdrop-blur-md rounded-lg p-6 border border-outline-variant/10">
              <div class="flex justify-between items-center mb-8">
                <div>
                  <h3 class="font-headline text-lg font-bold text-on-surface uppercase tracking-wide">Revenue Flow</h3>
                  <p class="font-body text-xs text-on-surface-variant mt-1">7-Day Trailing Aggregate</p>
                </div>
                <div class="flex gap-2">
                  <div class="flex items-center gap-2 mr-4">
                    <div class="w-2 h-2 rounded-full bg-primary-container shadow-[0_0_8px_rgba(0,209,255,0.6)]"></div>
                    <span class="font-label text-xs text-on-surface-variant">Gaming</span>
                  </div>
                  <div class="flex items-center gap-2">
                    <div class="w-2 h-2 rounded-full bg-secondary shadow-[0_0_8px_rgba(236,178,255,0.6)]"></div>
                    <span class="font-label text-xs text-on-surface-variant">F&amp;B</span>
                  </div>
                </div>
              </div>

              <!-- Faux Line Graph -->
              <div class="relative h-64 w-full flex items-end justify-between pt-10 pb-6 px-4">
                <div class="absolute left-0 top-0 h-full flex flex-col justify-between text-[10px] font-label text-on-surface-variant/50 pb-6 pointer-events-none">
                  <span>$5k</span><span>$4k</span><span>$3k</span><span>$2k</span><span>$1k</span><span>$0</span>
                </div>
                <div class="absolute inset-0 flex flex-col justify-between pb-6 pl-8 pointer-events-none">
                  <div class="w-full h-px bg-outline-variant/10"></div>
                  <div class="w-full h-px bg-outline-variant/10"></div>
                  <div class="w-full h-px bg-outline-variant/10"></div>
                  <div class="w-full h-px bg-outline-variant/10"></div>
                  <div class="w-full h-px bg-outline-variant/10"></div>
                  <div class="w-full h-px bg-outline-variant/20"></div>
                </div>
                <div class="relative w-full h-full flex items-end justify-between pl-8 z-10 group cursor-crosshair">
                  \${[45, 60, 55, 70, 90, 95, 75].map((h, i) => \`
                  <div class="flex flex-col items-center gap-2 w-full">
                    <div class="relative w-2 bg-gradient-to-t from-primary-container/10 to-primary-container rounded-t-sm shadow-[0_0_15px_rgba(0,209,255,0.3)] group-hover:opacity-50 hover:!opacity-100 transition-opacity" style="height: \${h}%">
                      \${i===0 ? '<div class="absolute -top-1 -left-1 w-4 h-4 bg-primary-container rounded-full opacity-0 hover:opacity-100 transition-opacity shadow-[0_0_10px_rgba(0,209,255,0.8)] border-2 border-surface"></div>' : ''}
                    </div>
                    <span class="text-[10px] font-label \${i===4 ? 'text-primary' : 'text-on-surface-variant'} uppercase tracking-wider">\${['Mon','Tue','Wed','Thu','Fri','Sat','Sun'][i]}</span>
                  </div>
                  \`).join('')}
                </div>
              </div>
            </div>

            <!-- Recent Transactions Log -->
            <div class="bg-surface-container-low/60 backdrop-blur-md rounded-lg p-6 border border-outline-variant/10 flex flex-col h-full">
              <div class="flex justify-between items-center mb-6">
                <h3 class="font-headline text-lg font-bold text-on-surface uppercase tracking-wide">Transaction Log</h3>
                <button class="text-primary-container text-xs font-headline uppercase tracking-wider hover:text-primary transition-colors">View All</button>
              </div>
              <div class="flex-1 overflow-hidden">
                <table class="w-full text-left border-collapse">
                  <thead>
                    <tr class="text-[10px] font-headline uppercase tracking-widest text-on-surface-variant/70 border-b border-outline-variant/20">
                      <th class="pb-3 font-normal">ID / Details</th>
                      <th class="pb-3 font-normal text-right">Value</th>
                    </tr>
                  </thead>
                  <tbody class="font-body text-sm text-on-surface">
                    <tr class="border-b border-outline-variant/10 hover:bg-surface-container-highest/30 transition-colors group">
                      <td class="py-4">
                        <div class="flex items-center gap-3">
                          <div class="w-8 h-8 rounded bg-primary-container/10 text-primary-container flex items-center justify-center border border-primary-container/30">
                            <span class="material-symbols-outlined text-sm">sports_esports</span>
                          </div>
                          <div>
                            <div class="font-headline text-xs text-on-surface">TX-992A</div>
                            <div class="text-[10px] text-on-surface-variant mt-0.5">Room 1 • 2h</div>
                          </div>
                        </div>
                      </td>
                      <td class="py-4 text-right">
                        <div class="text-primary-container font-headline font-bold drop-shadow-[0_0_4px_rgba(0,209,255,0.3)]">$30.00</div>
                        <div class="text-[10px] text-on-surface-variant mt-0.5">Just now</div>
                      </td>
                    </tr>
                    <tr class="border-b border-outline-variant/10 hover:bg-surface-container-highest/30 transition-colors group">
                      <td class="py-4">
                        <div class="flex items-center gap-3">
                          <div class="w-8 h-8 rounded bg-secondary/10 text-secondary flex items-center justify-center border border-secondary/30">
                            <span class="material-symbols-outlined text-sm">local_pizza</span>
                          </div>
                          <div>
                            <div class="font-headline text-xs text-on-surface">TX-991B</div>
                            <div class="text-[10px] text-on-surface-variant mt-0.5">Walk-in • F&amp;B</div>
                          </div>
                        </div>
                      </td>
                      <td class="py-4 text-right">
                        <div class="text-secondary font-headline font-bold drop-shadow-[0_0_4px_rgba(236,178,255,0.3)]">$18.50</div>
                        <div class="text-[10px] text-on-surface-variant mt-0.5">13:45</div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </main>

      <!-- BottomNavBar -->
      <nav class="md:hidden bg-[#1b1b1e]/90 backdrop-blur-lg fixed bottom-0 w-full z-50 rounded-t-2xl shadow-[0_-8px_30px_rgba(0,0,0,0.5)] flex justify-around items-center h-20 px-4 pt-1 border-t-0">
        <button onclick="window.location.hash='#dashboard'" class="flex flex-col items-center justify-center text-[#859399] opacity-70 hover:text-[#a4e6ff] hover:opacity-100 transition-all active:scale-90 duration-200 w-16">
          <span class="material-symbols-outlined mb-1">dashboard</span>
          <span class="font-label font-medium text-[10px] tracking-[0.05em] uppercase">DASHBOARD</span>
        </button>
        <button onclick="window.location.hash='#reports'" class="flex flex-col items-center justify-center text-[#00d1ff] drop-shadow-[0_0_8px_rgba(0,209,255,0.5)] scale-110 transition-all duration-200 w-16 relative">
          <div class="absolute -top-3 w-8 h-1 bg-primary-container rounded-full shadow-[0_0_10px_rgba(0,209,255,0.8)]"></div>
          <span class="material-symbols-outlined mb-1 icon-fill">monitoring</span>
          <span class="font-label font-medium text-[10px] tracking-[0.05em] uppercase">REPORTS</span>
        </button>
        <button onclick="window.location.hash='#settings'" class="flex flex-col items-center justify-center text-[#859399] opacity-70 hover:text-[#a4e6ff] hover:opacity-100 transition-all active:scale-90 duration-200 w-16">
          <span class="material-symbols-outlined mb-1">settings</span>
          <span class="font-label font-medium text-[10px] tracking-[0.05em] uppercase">SETTINGS</span>
        </button>
      </nav>
    `;
  }

  updateData() {
    const state = window.Store.state;
    const activeEl = document.getElementById('report-active-sessions');
    const totalEl = document.getElementById('report-total-sessions');
    
    if (activeEl) activeEl.innerText = state.rooms.filter(r => r.status === 'in_use').length;
    if (totalEl) totalEl.innerText = state.rooms.length;
  }

  afterRender() {
    this.updateData();
  }

  destroy() {
    this.unsubscribe();
  }
}
