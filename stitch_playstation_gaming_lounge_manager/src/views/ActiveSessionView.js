export class ActiveSessionView {
  constructor(params) {
    this.roomId = params.get('id');
    this.timerInterval = null;
  }

  async render() {
    this.room = window.Store.state.rooms.find(r => r.id === this.roomId);
    if (!this.room) return '<h1 class="text-on-surface text-center mt-20 text-4xl">Room Not Found</h1>';
    
    this.session = window.Store.state.sessions.find(s => s.id === this.room.currentSessionId);
    if (!this.session) return '<h1 class="text-on-surface text-center mt-20 text-4xl">No Active Session in this Room</h1>';

    const currentCost = this.calculateCost();

    return `
      <style>
          .neon-glow {
              text-shadow: 0 0 10px rgba(0, 209, 255, 0.5), 0 0 20px rgba(0, 209, 255, 0.3);
          }
          .bg-glass {
              background: rgba(42, 42, 44, 0.4);
              backdrop-filter: blur(12px);
          }
          .btn-primary-gradient {
              background: linear-gradient(135deg, #a4e6ff 0%, #00d1ff 100%);
          }
          .shadow-ambient {
              box-shadow: 0 0 40px 8px rgba(0, 209, 255, 0.08);
          }
      </style>

      <!-- TopAppBar (Web/Desktop) -->
      <header class="hidden md:flex justify-between items-center px-6 py-4 w-full z-50 bg-neutral-950/80 backdrop-blur-xl fixed top-0 shadow-[0_4px_20px_rgba(0,209,255,0.15)] border-b border-cyan-500/10">
        <div class="flex items-center gap-4 cursor-pointer" onclick="window.location.hash='#rooms'">
          <span class="material-symbols-outlined text-cyan-400">arrow_back</span>
          <h1 class="font-headline tracking-widest uppercase font-bold text-cyan-400 tracking-tighter">BACK TO MATRIX</h1>
        </div>
      </header>

      <!-- Main Canvas -->
      <main class="flex-grow flex flex-col relative px-4 pt-8 pb-32 md:pb-8 md:pt-24 max-w-lg mx-auto w-full min-h-screen">
        <!-- Header -->
        <div class="flex justify-between items-start mb-8">
          <div>
            <p class="font-headline text-on-surface-variant uppercase tracking-[0.1em] text-sm mb-1">Station ID</p>
            <h2 class="font-headline text-3xl font-bold text-on-surface uppercase">${this.room.name}</h2>
          </div>
          <div class="flex items-center gap-2 bg-surface-container-high px-3 py-1 rounded-full border border-outline-variant/15">
            <span class="w-2 h-2 rounded-full bg-[#4CAF50] shadow-[0_0_4px_#4CAF50]"></span>
            <span class="font-label text-xs uppercase tracking-wider text-[#4CAF50]">Active</span>
          </div>
        </div>

        <!-- Timer Card -->
        <div class="bg-glass rounded-xl p-8 mb-6 flex flex-col items-center justify-center relative shadow-ambient">
          <!-- decorative corner accents -->
          <div class="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-primary-container/50 rounded-tl-xl"></div>
          <div class="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-primary-container/50 rounded-tr-xl"></div>
          <div class="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-primary-container/50 rounded-bl-xl"></div>
          <div class="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-primary-container/50 rounded-br-xl"></div>
          
          <p class="font-headline text-on-surface-variant uppercase tracking-[0.1em] text-sm mb-2">Time Elapsed</p>
          <div id="session-timer" class="font-headline text-6xl font-black text-primary-container neon-glow tabular-nums tracking-tighter mb-4">
            00:00:00
          </div>
          <div class="w-full bg-surface-container-lowest h-2 rounded-full mt-4 overflow-hidden">
            <div id="session-progress" class="h-full bg-primary-container w-[100%] rounded-full shadow-[0_0_10px_rgba(0,209,255,0.8)]"></div>
          </div>
        </div>

        <!-- Stats Grid -->
        <div class="grid grid-cols-2 gap-4 mb-8">
          <div class="bg-surface-container-low rounded-lg p-4 flex flex-col">
            <p class="font-headline text-on-surface-variant uppercase tracking-[0.1em] text-xs mb-1">Current Cost</p>
            <p id="session-cost" class="font-headline text-xl font-bold text-on-surface">$${currentCost.toFixed(2)}</p>
          </div>
          <div class="bg-surface-container-low rounded-lg p-4 flex flex-col">
            <p class="font-headline text-on-surface-variant uppercase tracking-[0.1em] text-xs mb-1">Station Type</p>
            <p class="font-headline text-xl font-bold text-secondary uppercase">${this.room.type}</p>
          </div>
        </div>

        <!-- Action Buttons -->
        <div class="flex flex-col gap-4 mb-8">
          <button id="add-time-btn" class="w-full py-4 rounded-lg font-headline font-bold text-on-primary-container btn-primary-gradient hover:shadow-[0_0_20px_rgba(0,209,255,0.5)] transition-all active:scale-95 flex items-center justify-center gap-2">
            <span class="material-symbols-outlined" style="font-variation-settings: 'FILL' 1;">add_circle</span>
            ADD POS ORDER
          </button>
          <button id="end-session-btn" class="w-full py-4 rounded-lg font-headline font-bold text-secondary border border-outline-variant/15 hover:bg-surface-container-high transition-all active:scale-95 flex items-center justify-center gap-2">
            <span class="material-symbols-outlined">power_settings_new</span>
            END SESSION & CHECKOUT
          </button>
        </div>

        <!-- Member Info -->
        <div class="mt-auto bg-surface-container-lowest rounded-lg p-4 flex items-center gap-4 border border-outline-variant/15">
          <div class="w-12 h-12 flex justify-center items-center rounded-full bg-surface-container-high border border-outline-variant/30">
            <span class="material-symbols-outlined text-outline">person</span>
          </div>
          <div>
            <p class="font-headline text-on-surface font-bold text-lg">Walk-in Client</p>
            <p class="font-label text-on-surface-variant text-sm">Guest</p>
          </div>
        </div>
      </main>

      <!-- BottomNavBar (Mobile) -->
      <nav class="md:hidden fixed bottom-0 left-0 w-full flex justify-around items-center px-4 pt-1 bg-neutral-950/90 backdrop-blur-md z-50 h-20 shadow-[0_-10px_30px_rgba(0,209,255,0.1)] border-t border-cyan-500/20">
        <button onclick="window.location.hash='#rooms'" class="flex flex-col items-center justify-center text-cyan-400 drop-shadow-[0_0_8px_rgba(0,209,255,0.6)] scale-110 transition-all duration-300 group">
          <span class="material-symbols-outlined mb-1" style="font-variation-settings: 'FILL' 1;">arrow_back</span>
          <span class="font-label text-[10px] font-bold uppercase tracking-wider">Back</span>
        </button>
      </nav>
    `;
  }

  calculateCost() {
    const hoursElapsed = (Date.now() - this.session.startTime) / 3600000;
    const roomCost = hoursElapsed * window.Store.state.hourlyRate;
    const ordersCost = this.session.orders.reduce((sum, order) => sum + order.price, 0);
    return roomCost + ordersCost;
  }

  updateTimer() {
    if (!this.session) return;
    const diff = Date.now() - this.session.startTime;
    const hours = Math.floor(diff / 3600000);
    const mins = Math.floor((diff % 3600000) / 60000);
    const secs = Math.floor((diff % 60000) / 1000);

    const timerEl = document.getElementById('session-timer');
    const costEl = document.getElementById('session-cost');
    
    if (timerEl) {
      timerEl.innerText = `\${String(hours).padStart(2, '0')}:\${String(mins).padStart(2, '0')}:\${String(secs).padStart(2, '0')}`;
    }
    if (costEl) {
      costEl.innerText = '$' + this.calculateCost().toFixed(2);
    }
  }

  afterRender() {
    if (!this.session) return;
    
    this.updateTimer();
    this.timerInterval = setInterval(() => this.updateTimer(), 1000);

    const endBtn = document.getElementById('end-session-btn');
    if (endBtn) {
      endBtn.addEventListener('click', () => {
        if (confirm('End this session and proceed to checkout?')) {
          window.location.hash = `#checkout?session=\${this.session.id}`;
        }
      });
    }

    const posBtn = document.getElementById('add-time-btn');
    if (posBtn) {
      posBtn.addEventListener('click', () => {
        // Will route to POS view and pass session ID in query
        window.location.hash = `#pos?session=\${this.session.id}`;
      });
    }
  }

  destroy() {
    if (this.timerInterval) clearInterval(this.timerInterval);
  }
}
