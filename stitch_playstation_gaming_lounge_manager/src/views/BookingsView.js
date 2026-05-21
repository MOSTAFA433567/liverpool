export class BookingsView {
  constructor() {
    this.unsubscribe = window.Store.subscribe(() => this.renderList());
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
        <div class="mb-10 flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
          <div>
            <h2 class="font-headline text-4xl text-on-surface tracking-tight uppercase">Station Allocation</h2>
            <p class="font-body text-on-surface-variant mt-2 text-sm max-w-xl">Reserve premium kinetic ether terminals. Manage capacity and optimize session flow for incoming operators.</p>
          </div>
        </div>

        <!-- Asymmetric Layout Grid -->
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <!-- Calendar View (Left - 7 cols) -->
          <div class="lg:col-span-7 space-y-6">
            <div class="bg-surface-container-low/60 backdrop-blur-md rounded-lg p-6 relative overflow-hidden border border-outline-variant/15 shadow-[0_0_24px_rgba(0,209,255,0.05)]">
              <div class="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none"></div>
              <div class="flex justify-between items-center mb-8 relative z-10">
                <h3 class="font-headline text-xl text-primary tracking-wide">NOVEMBER 2024</h3>
                <div class="flex gap-2">
                  <button class="p-2 rounded bg-surface-container-lowest hover:bg-surface-container transition text-on-surface-variant">
                    <span class="material-symbols-outlined">chevron_left</span>
                  </button>
                  <button class="p-2 rounded bg-surface-container-lowest hover:bg-surface-container transition text-on-surface-variant">
                    <span class="material-symbols-outlined">chevron_right</span>
                  </button>
                </div>
              </div>

              <!-- Calendar Grid -->
              <div class="grid grid-cols-7 gap-2 mb-4 relative z-10">
                <!-- Days of week -->
                <div class="text-center font-headline text-xs text-on-surface-variant py-2">SUN</div>
                <div class="text-center font-headline text-xs text-on-surface-variant py-2">MON</div>
                <div class="text-center font-headline text-xs text-on-surface-variant py-2">TUE</div>
                <div class="text-center font-headline text-xs text-on-surface-variant py-2">WED</div>
                <div class="text-center font-headline text-xs text-on-surface-variant py-2">THU</div>
                <div class="text-center font-headline text-xs text-on-surface-variant py-2">FRI</div>
                <div class="text-center font-headline text-xs text-on-surface-variant py-2">SAT</div>
                
                <!-- Dates Dummy Content -->
                <div class="aspect-square flex items-center justify-center p-1"><button class="w-full h-full rounded text-on-surface-variant/30 text-sm font-body hover:bg-surface-container-high transition">27</button></div>
                <div class="aspect-square flex items-center justify-center p-1"><button class="w-full h-full rounded text-on-surface-variant/30 text-sm font-body hover:bg-surface-container-high transition">28</button></div>
                <div class="aspect-square flex items-center justify-center p-1"><button class="w-full h-full rounded text-on-surface-variant/30 text-sm font-body hover:bg-surface-container-high transition">29</button></div>
                <div class="aspect-square flex items-center justify-center p-1"><button class="w-full h-full rounded text-on-surface-variant/30 text-sm font-body hover:bg-surface-container-high transition">30</button></div>
                <div class="aspect-square flex items-center justify-center p-1"><button class="w-full h-full rounded text-on-surface-variant/30 text-sm font-body hover:bg-surface-container-high transition">31</button></div>
                <div class="aspect-square flex items-center justify-center p-1"><button class="w-full h-full rounded text-on-surface text-sm font-body bg-surface-container-lowest border border-outline-variant/20 hover:border-primary/50 transition">1</button></div>
                <div class="aspect-square flex items-center justify-center p-1"><button class="w-full h-full rounded text-on-surface text-sm font-body bg-surface-container-lowest border border-outline-variant/20 hover:border-primary/50 transition">2</button></div>
                
                <!-- Selected Date -->
                <div class="aspect-square flex items-center justify-center p-1 relative group">
                  <button class="relative w-full h-full rounded text-secondary font-bold text-sm font-body bg-surface-container border-2 border-secondary shadow-[0_0_15px_rgba(236,178,255,0.3)] transition">3</button>
                </div>
                
                <div class="aspect-square flex items-center justify-center p-1 relative">
                  <div class="absolute bottom-2 left-1/2 -translate-x-1/2 w-1 h-1 bg-primary rounded-full shadow-[0_0_5px_rgba(164,230,255,0.8)]"></div>
                  <button class="w-full h-full rounded text-on-surface text-sm font-body bg-surface-container-lowest border border-outline-variant/20 hover:border-primary/50 transition">4</button>
                </div>
                <div class="aspect-square flex items-center justify-center p-1"><button class="w-full h-full rounded text-on-surface text-sm font-body bg-surface-container-lowest border border-outline-variant/20 hover:border-primary/50 transition">5</button></div>
                <div class="aspect-square flex items-center justify-center p-1"><button class="w-full h-full rounded text-on-surface text-sm font-body bg-surface-container-lowest border border-outline-variant/20 hover:border-primary/50 transition">6</button></div>
                <div class="aspect-square flex items-center justify-center p-1"><button class="w-full h-full rounded text-on-surface text-sm font-body bg-surface-container-lowest border border-outline-variant/20 hover:border-primary/50 transition">7</button></div>
                <div class="aspect-square flex items-center justify-center p-1"><button class="w-full h-full rounded text-on-surface text-sm font-body bg-surface-container-lowest border border-outline-variant/20 hover:border-primary/50 transition">8</button></div>
                
                <div class="aspect-square flex items-center justify-center p-1 relative">
                  <div class="absolute bottom-2 left-1/2 -translate-x-1/2 w-1 h-1 bg-error rounded-full shadow-[0_0_5px_rgba(255,180,171,0.8)]"></div>
                  <button class="w-full h-full rounded text-on-surface text-sm font-body bg-surface-container-lowest border border-outline-variant/20 hover:border-primary/50 transition">9</button>
                </div>

                <!-- More dummy dates -->
                <div class="aspect-square flex items-center justify-center p-1"><button class="w-full h-full rounded text-on-surface text-sm font-body bg-surface-container-lowest border border-outline-variant/20">10</button></div>
                <div class="aspect-square flex items-center justify-center p-1"><button class="w-full h-full rounded text-on-surface text-sm font-body bg-surface-container-lowest border border-outline-variant/20">11</button></div>
                <div class="aspect-square flex items-center justify-center p-1"><button class="w-full h-full rounded text-on-surface text-sm font-body bg-surface-container-lowest border border-outline-variant/20">12</button></div>
                <div class="aspect-square flex items-center justify-center p-1"><button class="w-full h-full rounded text-on-surface text-sm font-body bg-surface-container-lowest border border-outline-variant/20">13</button></div>
                <div class="aspect-square flex items-center justify-center p-1"><button class="w-full h-full rounded text-on-surface text-sm font-body bg-surface-container-lowest border border-outline-variant/20">14</button></div>
                <div class="aspect-square flex items-center justify-center p-1"><button class="w-full h-full rounded text-on-surface text-sm font-body bg-surface-container-lowest border border-outline-variant/20">15</button></div>
                <div class="aspect-square flex items-center justify-center p-1"><button class="w-full h-full rounded text-on-surface text-sm font-body bg-surface-container-lowest border border-outline-variant/20">16</button></div>
              </div>

              <div class="flex gap-4 mt-6 pt-4 border-t border-outline-variant/20 relative z-10">
                <div class="flex items-center gap-2">
                  <div class="w-2 h-2 rounded-full bg-primary shadow-[0_0_5px_rgba(164,230,255,0.8)]"></div>
                  <span class="text-xs font-body text-on-surface-variant">Available</span>
                </div>
                <div class="flex items-center gap-2">
                  <div class="w-2 h-2 rounded-full bg-error shadow-[0_0_5px_rgba(255,180,171,0.8)]"></div>
                  <span class="text-xs font-body text-on-surface-variant">Fully Booked</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Booking Form (Right - 5 cols) -->
          <div class="lg:col-span-5 relative">
            <div class="bg-surface-container-high rounded-lg p-8 shadow-2xl relative z-10 border border-outline-variant/10 lg:-ml-8 mt-8 lg:mt-0">
              <div class="mb-8">
                <div class="inline-block px-3 py-1 bg-surface-container-lowest rounded-full border border-secondary/30 mb-4">
                  <span class="text-secondary text-xs font-headline tracking-widest uppercase">New Allocation</span>
                </div>
                <h3 class="font-headline text-2xl text-on-surface">DEFINE PARAMETERS</h3>
              </div>

              <form class="space-y-6" onsubmit="event.preventDefault(); alert('Booking confirmed!');">
                <!-- Customer Name -->
                <div class="space-y-2">
                  <label class="font-headline text-xs text-on-surface-variant uppercase tracking-widest flex items-center gap-2">
                    <span class="material-symbols-outlined text-sm">person</span> Operator ID / Name
                  </label>
                  <input type="text" class="w-full bg-surface-container-lowest border border-outline-variant/30 rounded-DEFAULT px-4 py-3 text-on-surface focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors" placeholder="Enter operator designation..." required />
                </div>

                <!-- Room Selection -->
                <div class="space-y-2">
                  <label class="font-headline text-xs text-on-surface-variant uppercase tracking-widest flex items-center gap-2">
                    <span class="material-symbols-outlined text-sm">dns</span> Terminal Sector
                  </label>
                  <select class="w-full bg-surface-container-lowest border border-outline-variant/30 rounded-DEFAULT px-4 py-3 text-on-surface focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors appearance-none" required>
                    <option value="" disabled selected>Select Sector...</option>
                    \${window.Store.state.rooms.map(r => \`<option value="\${r.id}">\${r.name} - \${r.type}</option>\`).join('')}
                  </select>
                </div>

                <div class="grid grid-cols-2 gap-4">
                  <!-- Start Time -->
                  <div class="space-y-2">
                    <label class="font-headline text-xs text-on-surface-variant uppercase tracking-widest flex items-center gap-2">
                      <span class="material-symbols-outlined text-sm">schedule</span> Init Time
                    </label>
                    <input type="time" class="w-full bg-surface-container-lowest border border-outline-variant/30 rounded-DEFAULT px-4 py-3 text-on-surface focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors" value="14:00" required />
                  </div>
                  
                  <!-- Duration -->
                  <div class="space-y-2">
                    <label class="font-headline text-xs text-on-surface-variant uppercase tracking-widest flex items-center gap-2">
                      <span class="material-symbols-outlined text-sm">hourglass_empty</span> Duration (HRS)
                    </label>
                    <select class="w-full bg-surface-container-lowest border border-outline-variant/30 rounded-DEFAULT px-4 py-3 text-on-surface focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors appearance-none">
                      <option value="1">1.0</option>
                      <option value="2" selected>2.0</option>
                      <option value="3">3.0</option>
                      <option value="4">4.0</option>
                    </select>
                  </div>
                </div>

                <!-- Action -->
                <button type="submit" class="w-full mt-8 bg-gradient-to-r from-primary to-primary-container text-on-primary-container font-headline font-bold py-4 px-6 rounded hover:shadow-[0_0_20px_rgba(0,209,255,0.4)] transition-all duration-300 tracking-widest uppercase">
                  LOCK ALLOCATION
                </button>
              </form>
            </div>
            <div class="absolute -bottom-10 -right-10 text-9xl font-headline font-black text-surface-container opacity-50 pointer-events-none z-0">
              03
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
        <button onclick="window.location.hash='#rooms'" class="flex flex-col items-center justify-center text-[#859399] opacity-70 hover:text-[#a4e6ff] hover:opacity-100 transition-all duration-200 w-16">
          <span class="material-symbols-outlined mb-1">videogame_asset</span>
          <span class="font-label font-medium text-[10px] tracking-[0.05em] uppercase">ROOMS</span>
        </button>
        <button onclick="window.location.hash='#bookings'" class="flex flex-col items-center justify-center text-[#00d1ff] drop-shadow-[0_0_8px_rgba(0,209,255,0.5)] scale-110 transition-all duration-200 w-16 relative">
          <div class="absolute -top-3 w-8 h-1 bg-primary-container rounded-full shadow-[0_0_10px_rgba(0,209,255,0.8)]"></div>
          <span class="material-symbols-outlined mb-1 icon-fill">event</span>
          <span class="font-label font-medium text-[10px] tracking-[0.05em] uppercase">SCHEDULE</span>
        </button>
      </nav>
    `;
  }

  renderList() {
    // Implement any dynamic calendar updates here if needed later
  }

  afterRender() {
    this.renderList();
  }

  destroy() {
    this.unsubscribe();
  }
}
