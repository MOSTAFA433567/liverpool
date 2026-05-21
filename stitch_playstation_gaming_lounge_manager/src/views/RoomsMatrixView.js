export class RoomsMatrixView {
  constructor() {
    this.unsubscribe = window.Store.subscribe(() => this.renderList());
  }

  async render() {
    return `
      <!-- Atmospheric Ambient Glow -->
      <div class="fixed top-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-secondary rounded-full mix-blend-screen filter blur-[250px] opacity-20 pointer-events-none z-0"></div>
      <div class="fixed bottom-[-20%] right-[-10%] w-[60vw] h-[60vw] bg-primary rounded-full mix-blend-screen filter blur-[300px] opacity-10 pointer-events-none z-0"></div>
      
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
          <div class="w-8 h-8 rounded-full bg-surface-container-high border border-outline-variant/30 overflow-hidden shadow-inner flex items-center justify-center">
            <span class="material-symbols-outlined text-sm">person</span>
          </div>
        </div>
      </header>

      <!-- Main Content Canvas -->
      <main class="relative z-10 pt-28 pb-32 px-4 md:px-8 max-w-7xl mx-auto min-h-screen">
        <div class="mb-10 w-full relative">
          <div class="h-[1px] w-full bg-surface-container-highest absolute bottom-0 left-0"></div>
          <div class="h-[2px] w-[15%] bg-primary-container absolute bottom-0 left-8 shadow-[0_0_10px_rgba(0,209,255,0.8)]"></div>
          <h1 class="font-headline text-3xl md:text-4xl lg:text-5xl tracking-[-0.03em] font-bold text-on-surface pb-4 uppercase">
            Room <span class="text-on-surface-variant font-light">Matrix</span>
          </h1>
        </div>
        
        <!-- Rooms Grid -->
        <div id="rooms-grid" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          <!-- Dynamically populated via JS -->
        </div>
      </main>

      <!-- BottomNavBar -->
      <nav class="md:hidden bg-[#1b1b1e]/90 backdrop-blur-lg fixed bottom-0 w-full z-50 rounded-t-2xl shadow-[0_-8px_30px_rgba(0,0,0,0.5)] flex justify-around items-center h-20 px-4 pt-1 border-t-0">
        <button onclick="window.location.hash='#dashboard'" class="flex flex-col items-center justify-center text-[#859399] opacity-70 hover:text-[#a4e6ff] hover:opacity-100 transition-all active:scale-90 duration-200 w-16">
          <span class="material-symbols-outlined mb-1">dashboard</span>
          <span class="font-label font-medium text-[10px] tracking-[0.05em] uppercase">DASHBOARD</span>
        </button>
        <button onclick="window.location.hash='#rooms'" class="flex flex-col items-center justify-center text-[#00d1ff] drop-shadow-[0_0_8px_rgba(0,209,255,0.5)] scale-110 transition-all duration-200 w-16 relative">
          <div class="absolute -top-3 w-8 h-1 bg-primary-container rounded-full shadow-[0_0_10px_rgba(0,209,255,0.8)]"></div>
          <span class="material-symbols-outlined mb-1 icon-fill">videogame_asset</span>
          <span class="font-label font-medium text-[10px] tracking-[0.05em] uppercase">ROOMS</span>
        </button>
        <button onclick="window.location.hash='#pos'" class="flex flex-col items-center justify-center text-[#859399] opacity-70 hover:text-[#a4e6ff] hover:opacity-100 transition-all active:scale-90 duration-200 w-16">
          <span class="material-symbols-outlined mb-1">receipt_long</span>
          <span class="font-label font-medium text-[10px] tracking-[0.05em] uppercase">ORDERS</span>
        </button>
      </nav>
    `;
  }

  renderList() {
    const container = document.getElementById('rooms-grid');
    if (!container) return;
    const { rooms } = window.Store.state;
    container.innerHTML = rooms.map(room => this.buildRoomCard(room)).join('');
  }

  buildRoomCard(room) {
    if (room.status === 'in_use') {
      return `
        <div class="relative rounded-xl p-[1px] bg-gradient-to-br from-primary-container/30 to-transparent group cursor-pointer" onclick="window.location.hash='#session_controller?id=\${room.id}'">
          <div class="absolute inset-0 bg-surface-container-low/80 backdrop-blur-xl rounded-xl z-0"></div>
          <div class="absolute inset-0 rounded-xl glow-primary z-0"></div>
          <div class="relative z-10 p-6 flex flex-col gap-6">
            <div class="flex justify-between items-start">
              <span class="material-symbols-outlined text-primary-container text-2xl icon-fill">sports_esports</span>
              <div class="flex items-center gap-2">
                <div class="w-2 h-2 rounded-full bg-primary-container shadow-[0_0_8px_rgba(0,209,255,0.6)]"></div>
                <span class="font-body text-[10px] uppercase tracking-[0.05em] font-semibold text-primary-container">In Use</span>
              </div>
            </div>
            <div>
              <h2 class="font-headline text-3xl font-bold text-on-surface tracking-tight mb-1">\${room.name}</h2>
              <p class="font-body text-xs text-primary-container/70">\${room.type}</p>
            </div>
            <div class="pt-4 mt-auto border-t border-primary-container/20 flex justify-between items-center">
              <span class="font-headline font-bold text-lg text-on-surface">$\${window.Store.state.hourlyRate}<span class="text-sm font-normal text-on-surface-variant">/hr</span></span>
              <span class="font-headline font-bold text-xl text-primary drop-shadow-[0_0_5px_rgba(164,230,255,0.5)]">ACTIVE</span>
            </div>
          </div>
        </div>`;
    }

    if (room.status === 'available') {
      return `
        <div class="relative rounded-xl p-[1px] bg-gradient-to-b from-white/10 to-transparent group hover:-translate-y-1 transition-transform duration-300">
          <div class="absolute inset-0 bg-surface-container-low/60 backdrop-blur-md rounded-xl z-0 group-hover:bg-surface-container-high transition-colors duration-300"></div>
          <div class="absolute inset-0 border border-outline-variant/15 rounded-xl z-0 pointer-events-none"></div>
          <div class="relative z-10 p-6 flex flex-col gap-6">
            <div class="flex justify-between items-start">
              <span class="material-symbols-outlined text-on-surface-variant text-2xl group-hover:text-primary transition-colors">sports_esports</span>
              <div class="flex items-center gap-2">
                <div class="w-2 h-2 rounded-full bg-[#00ff66] shadow-[0_0_8px_rgba(0,255,102,0.6)]"></div>
                <span class="font-body text-[10px] uppercase tracking-[0.05em] font-semibold text-[#00ff66]">Available</span>
              </div>
            </div>
            <div>
              <h2 class="font-headline text-3xl font-bold text-on-surface tracking-tight mb-1">\${room.name}</h2>
              <p class="font-body text-xs text-on-surface-variant">\${room.type}</p>
            </div>
            <div class="pt-4 mt-auto border-t border-outline-variant/20 flex justify-between items-center">
              <span class="font-headline font-bold text-lg text-primary">$\${window.Store.state.hourlyRate}<span class="text-sm font-normal text-on-surface-variant">/hr</span></span>
              <button onclick="window.Store.startSession('\${room.id}', 1)" class="bg-surface-container-highest hover:bg-primary-container hover:text-surface text-primary font-body text-xs px-4 py-2 rounded-lg transition-colors font-medium tracking-wide">ASSIGN</button>
            </div>
          </div>
        </div>`;
    }

    if (room.status === 'maintenance') {
      return `
        <div class="relative rounded-xl p-[1px] bg-gradient-to-b from-white/5 to-transparent opacity-60 grayscale-[50%]">
          <div class="absolute inset-0 bg-surface-container-lowest/80 backdrop-blur-md rounded-xl z-0"></div>
          <div class="absolute inset-0 border border-outline-variant/30 rounded-xl z-0 pointer-events-none"></div>
          <div class="relative z-10 p-6 flex flex-col gap-6">
            <div class="flex justify-between items-start">
              <span class="material-symbols-outlined text-outline text-2xl">build</span>
              <div class="flex items-center gap-2">
                <div class="w-2 h-2 rounded-full bg-outline"></div>
                <span class="font-body text-[10px] uppercase tracking-[0.05em] font-semibold text-outline">Maintenance</span>
              </div>
            </div>
            <div>
              <h2 class="font-headline text-3xl font-bold text-outline tracking-tight mb-1">\${room.name}</h2>
              <p class="font-body text-xs text-outline/70">\${room.type}</p>
            </div>
            <div class="pt-4 mt-auto border-t border-outline-variant/20 flex justify-between items-center">
              <span class="font-headline font-bold text-lg text-outline">N/A</span>
              <span class="material-symbols-outlined text-outline text-xl">lock</span>
            </div>
          </div>
        </div>`;
    }
  }

  afterRender() {
    this.renderList();
  }

  destroy() {
    this.unsubscribe();
  }
}
