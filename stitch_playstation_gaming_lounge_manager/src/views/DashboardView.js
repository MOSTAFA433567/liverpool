export class DashboardView {
  constructor() {
    this.unsubscribe = window.Store.subscribe((state) => this.updateUI(state));
  }

  async render() {
    const state = window.Store.state;
    // Calculate basic stats for the dashboard from Store mock data
    const activeRooms = state.rooms.filter(r => r.status === 'in_use').length;
    const totalRooms = state.rooms.length;
    
    // Revenue calculated from total stored in app or mocked
    const revenue = 4289; // To be made dynamic later

    return `
      <!-- TopAppBar -->
      <header class="bg-neutral-950/80 backdrop-blur-xl fixed top-0 left-0 w-full shadow-[0_4px_20px_rgba(0,209,255,0.15)] flex justify-between items-center px-6 py-4 z-50">
        <button class="flex items-center justify-center text-cyan-400 hover:text-cyan-300 transition-colors active:scale-95 duration-200">
          <span class="material-symbols-outlined" style="font-variation-settings: 'wght' 300;">grid_view</span>
        </button>
        <h1 class="font-headline tracking-widest uppercase font-bold text-cyan-400 tracking-tighter">COMMAND CENTER</h1>
        <button id="logout-btn" class="w-8 h-8 rounded-full overflow-hidden border border-outline-variant/30 active:scale-95 duration-200 shadow-[0_0_10px_rgba(0,209,255,0.2)] bg-surface-container flex items-center justify-center text-on-surface hover:bg-error/20 hover:text-error transition-colors title="Logout"">
          <span class="material-symbols-outlined text-sm">logout</span>
        </button>
        <!-- Separation Logic -->
        <div class="bg-gradient-to-b from-cyan-500/10 to-transparent h-[1px] absolute bottom-0 left-0 w-full"></div>
      </header>
      
      <!-- Canvas: Main Dashboard Content -->
      <main class="flex-1 p-4 md:p-6 lg:p-8 max-w-5xl mx-auto w-full space-y-6 pt-24 pb-28">
        <!-- Hero Stats Grid -->
        <section class="grid grid-cols-2 gap-4">
          <!-- Daily Revenue Card -->
          <div class="bg-surface-container-highest/60 backdrop-blur-md rounded-lg p-5 shadow-[0_0_24px_rgba(0,209,255,0.05)] relative overflow-hidden flex flex-col justify-between h-32">
            <div class="absolute -top-10 -right-10 w-32 h-32 bg-primary/10 rounded-full blur-2xl pointer-events-none"></div>
            <h2 class="font-headline text-xs tracking-[0.1em] text-on-surface-variant uppercase z-10">Revenue Today</h2>
            <div class="z-10">
              <div class="flex items-baseline gap-1">
                <span class="font-headline text-on-surface-variant text-lg">$</span>
                <span class="font-headline text-3xl font-bold text-primary tracking-tight glow-text">${revenue}</span>
              </div>
              <div class="flex items-center gap-1 mt-1">
                <span class="material-symbols-outlined text-[14px] text-[#4CAF50] drop-shadow-[0_0_2px_rgba(76,175,80,0.8)]">trending_up</span>
                <span class="font-body text-[10px] text-on-surface-variant">+12.5% vs avg</span>
              </div>
            </div>
          </div>
          <!-- Active Sessions Card -->
          <div class="bg-surface-container-highest/60 backdrop-blur-md rounded-lg p-5 shadow-[0_0_24px_rgba(0,209,255,0.05)] relative overflow-hidden flex flex-col justify-between h-32">
            <h2 class="font-headline text-xs tracking-[0.1em] text-on-surface-variant uppercase z-10">Active Rooms</h2>
            <div class="z-10">
              <div class="flex items-baseline gap-2 mb-3">
                <span class="font-headline text-3xl font-bold text-on-surface tracking-tight" id="active-rooms-count">${activeRooms}</span>
                <span class="font-headline text-on-surface-variant text-sm">/ ${totalRooms}</span>
              </div>
              <!-- Segmented Indicator -->
              <div class="flex gap-1 h-1.5 w-full" id="room-indicators">
                ${this.generateRoomIndicators(activeRooms, totalRooms)}
              </div>
            </div>
          </div>
        </section>
        
        <!-- System Core Status -->
        <section class="bg-surface-container-low rounded-lg p-5">
          <div class="flex justify-between items-center mb-5">
            <h3 class="font-headline text-sm tracking-[0.1em] text-primary uppercase glow-text">Core Infrastructure</h3>
            <div class="flex items-center gap-2 bg-surface-container-highest px-2 py-1 rounded">
              <span class="w-2 h-2 rounded-full bg-[#4CAF50] shadow-[0_0_6px_rgba(76,175,80,0.8)]"></span>
              <span class="font-body text-[10px] text-on-surface-variant uppercase tracking-wider">Online</span>
            </div>
          </div>
          <div class="grid grid-cols-3 gap-2">
            <div class="bg-surface-container-highest/40 rounded p-3 text-center">
              <p class="font-body text-[10px] text-on-surface-variant uppercase tracking-wider mb-1">Latency</p>
              <p class="font-headline text-lg text-on-surface">14<span class="text-xs text-on-surface-variant ml-0.5">ms</span></p>
            </div>
            <div class="bg-surface-container-highest/40 rounded p-3 text-center">
              <p class="font-body text-[10px] text-on-surface-variant uppercase tracking-wider mb-1">Downlink</p>
              <p class="font-headline text-lg text-on-surface">1.2<span class="text-xs text-on-surface-variant ml-0.5">Gb</span></p>
            </div>
            <div class="bg-surface-container-highest/40 rounded p-3 text-center">
              <p class="font-body text-[10px] text-on-surface-variant uppercase tracking-wider mb-1">Server Temp</p>
              <p class="font-headline text-lg text-on-surface">68<span class="text-xs text-on-surface-variant ml-0.5">°C</span></p>
            </div>
          </div>
        </section>
        
        <!-- Recent Transactions Log -->
        <section>
          <div class="flex justify-between items-end mb-4">
            <h3 class="font-headline text-sm tracking-[0.1em] text-on-surface-variant uppercase">Action Log</h3>
            <button class="font-body text-xs text-primary hover:text-primary-container transition-colors">View All</button>
          </div>
          <div class="space-y-2">
            <div class="bg-surface-container-highest/50 backdrop-blur-sm rounded-lg p-4 flex items-center justify-between border border-outline-variant/10 hover:bg-surface-container-highest transition-colors cursor-pointer">
              <div class="flex items-center gap-4">
                <div class="w-10 h-10 rounded bg-primary/10 flex items-center justify-center text-primary shadow-[0_0_15px_rgba(0,209,255,0.1)]">
                  <span class="material-symbols-outlined text-[20px]" style="font-variation-settings: 'FILL' 1;">videogame_asset</span>
                </div>
                <div>
                  <p class="font-body text-sm text-on-surface font-medium">Session Extension</p>
                  <p class="font-body text-xs text-on-surface-variant mt-0.5">Room 04 • User_8892</p>
                </div>
              </div>
              <div class="text-right">
                <p class="font-headline text-sm text-primary">+$15.00</p>
                <p class="font-body text-[10px] text-[#4CAF50] mt-0.5">Just now</p>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <!-- BottomNavBar -->
      <nav class="bg-neutral-950/90 backdrop-blur-md fixed bottom-0 w-full z-50 h-20 shadow-[0_-10px_30px_rgba(0,209,255,0.1)] flex justify-around items-center px-4 pb-4 md:hidden">
        <div class="bg-gradient-to-t from-cyan-500/20 to-transparent h-[2px] absolute top-0 left-0 w-full"></div>
        <button onclick="window.location.hash='#dashboard'" class="flex flex-col items-center justify-center text-cyan-400 drop-shadow-[0_0_8px_rgba(0,209,255,0.6)] scale-110 transition-all cubic-bezier(0.4,0,0.2,1) duration-300 w-16">
          <span class="material-symbols-outlined mb-1" style="font-variation-settings: 'FILL' 1;">dashboard</span>
          <span class="font-label text-[10px] font-bold uppercase tracking-wider">Status</span>
        </button>
        <button onclick="window.location.hash='#rooms'" class="flex flex-col items-center justify-center text-neutral-600 hover:text-cyan-200 transition-all duration-300 w-16">
          <span class="material-symbols-outlined mb-1">videogame_asset</span>
          <span class="font-label text-[10px] font-bold uppercase tracking-wider">Rooms</span>
        </button>
        <button onclick="window.location.hash='#bookings'" class="flex flex-col items-center justify-center text-neutral-600 hover:text-cyan-200 transition-all duration-300 w-16">
          <span class="material-symbols-outlined mb-1">calendar_today</span>
          <span class="font-label text-[10px] font-bold uppercase tracking-wider">Schedule</span>
        </button>
      </nav>
    `;
  }

  generateRoomIndicators(active, total) {
    let html = '';
    for (let i = 0; i < active; i++) {
      html += '<div class="flex-1 bg-[#F44336] rounded-full shadow-[0_0_4px_rgba(244,67,54,0.6)]"></div>';
    }
    for (let i = active; i < total; i++) {
      html += '<div class="flex-1 bg-[#4CAF50] rounded-full opacity-40"></div>';
    }
    return html;
  }

  updateUI(state) {
    const activeRooms = state.rooms.filter(r => r.status === 'in_use').length;
    const totalRooms = state.rooms.length;
    
    const countEl = document.getElementById('active-rooms-count');
    if (countEl) countEl.innerText = activeRooms;
    
    const indicatorsEl = document.getElementById('room-indicators');
    if (indicatorsEl) {
      indicatorsEl.innerHTML = this.generateRoomIndicators(activeRooms, totalRooms);
    }
  }

  afterRender() {
    document.getElementById('logout-btn').addEventListener('click', () => {
      window.Store.logout();
      window.location.hash = '#login';
    });
  }

  destroy() {
    this.unsubscribe();
  }
}
