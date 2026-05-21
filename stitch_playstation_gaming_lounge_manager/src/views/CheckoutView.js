export class CheckoutView {
  constructor(params) {
    this.sessionId = params.get('session');
    // For demo purposes if accessed without session, redirect or handle empty
  }

  async render() {
    this.session = window.Store.state.sessions.find(s => s.id === this.sessionId);
    if (!this.session) return '<h1 class="text-on-surface text-center mt-20 text-4xl">Session Not Found for Checkout</h1>';
    
    this.room = window.Store.state.rooms.find(r => r.id === this.session.roomId);
    
    const hoursElapsed = (Date.now() - this.session.startTime) / 3600000;
    const roomCost = hoursElapsed * window.Store.state.hourlyRate;
    const ordersCost = this.session.orders.reduce((sum, order) => sum + order.price, 0);
    const subtotal = roomCost + ordersCost;
    const tax = subtotal * 0.08;
    const total = subtotal + tax;

    let timeString = `\${Math.floor(hoursElapsed)} Hours \${Math.floor((hoursElapsed % 1) * 60)} Mins @ $\${window.Store.state.hourlyRate}/hr`;

    return `
      <style>
          .glass-panel {
              background: rgba(53, 52, 55, 0.4);
              backdrop-filter: blur(12px);
              -webkit-backdrop-filter: blur(12px);
          }
          .neon-glow-primary:hover {
              box-shadow: 0 0 20px rgba(0, 209, 255, 0.5);
          }
          .bg-gradient-primary {
              background: linear-gradient(135deg, #a4e6ff 0%, #00d1ff 100%);
          }
          .ambient-shadow {
              box-shadow: 0 8px 32px rgba(0, 209, 255, 0.08);
          }
      </style>

      <!-- Atmospheric Background Glows -->
      <div class="absolute top-0 left-1/4 w-96 h-96 bg-primary-container/5 rounded-full blur-[100px] pointer-events-none"></div>
      <div class="absolute bottom-0 right-1/4 w-96 h-96 bg-secondary/5 rounded-full blur-[100px] pointer-events-none"></div>
      
      <!-- TopAppBar (Web/Desktop) -->
      <header class="hidden md:flex justify-between items-center px-6 py-4 w-full z-50 bg-neutral-950/80 backdrop-blur-xl fixed top-0 shadow-[0_4px_20px_rgba(0,209,255,0.15)] border-b border-cyan-500/10">
        <div class="flex items-center gap-4 cursor-pointer" onclick="window.history.back()">
          <span class="material-symbols-outlined text-cyan-400">arrow_back</span>
          <h1 class="font-headline tracking-widest uppercase font-bold text-cyan-400 tracking-tighter">BACK TO SESSION</h1>
        </div>
      </header>

      <!-- Main Container -->
      <main class="w-full max-w-4xl grid md:grid-cols-12 gap-8 z-10 mx-auto pt-24 pb-20 px-6">
        <!-- Invoice Section -->
        <div class="md:col-span-7 glass-panel rounded-lg ambient-shadow flex flex-col h-full border border-outline-variant/15 relative overflow-hidden">
          <div class="h-2 w-full bg-surface-container-lowest"></div>
          <div class="p-8 flex-grow flex flex-col">
            <!-- Header -->
            <div class="flex justify-between items-start mb-12">
              <div>
                <h1 class="font-headline text-3xl font-bold text-primary-container tracking-tighter drop-shadow-[0_0_8px_rgba(0,209,255,0.4)]">CYBER_CORE</h1>
                <p class="font-body text-sm text-on-surface-variant uppercase tracking-widest mt-1">Invoice #\${this.session.id.toUpperCase()}</p>
              </div>
              <div class="text-right">
                <p class="font-headline text-lg font-bold text-on-surface uppercase">\${this.room.name}</p>
                <p class="font-body text-sm text-on-surface-variant uppercase">\${this.room.type}</p>
              </div>
            </div>
            
            <!-- Content Zone -->
            <div class="flex-grow space-y-8">
              <!-- Room/Station Usage -->
              <div class="space-y-4">
                <h2 class="font-headline text-sm uppercase tracking-[0.1em] text-primary">Station Usage</h2>
                <div class="bg-surface-container-lowest rounded-sm p-4 flex justify-between items-center border border-outline-variant/15 transition-colors">
                  <div class="flex items-center gap-4">
                    <span class="material-symbols-outlined text-primary-container bg-primary-container/10 p-2 rounded-sm">videogame_asset</span>
                    <div>
                      <p class="font-headline text-base text-on-surface">Rig Access</p>
                      <p class="font-body text-xs text-on-surface-variant">\${timeString}</p>
                    </div>
                  </div>
                  <p class="font-headline text-lg text-on-surface">$\${roomCost.toFixed(2)}</p>
                </div>
              </div>
              
              <!-- Consumables -->
              <div class="space-y-4">
                <h2 class="font-headline text-sm uppercase tracking-[0.1em] text-primary">Consumables</h2>
                <div class="space-y-2">
                  ${this.session.orders.length === 0 ? '<p class="text-on-surface-variant text-sm border p-4 border-outline-variant/10">No items ordered.</p>' : ''}
                  ${this.renderOrders()}
                </div>
              </div>
            </div>
            
            <!-- Footer / Totals -->
            <div class="mt-12 pt-8 border-t border-outline-variant/20 space-y-3">
              <div class="flex justify-between items-center font-body text-sm text-on-surface-variant">
                <span>Subtotal</span>
                <span>$\${subtotal.toFixed(2)}</span>
              </div>
              <div class="flex justify-between items-center font-body text-sm text-on-surface-variant">
                <span>Tax (8%)</span>
                <span>$\${tax.toFixed(2)}</span>
              </div>
              <div class="flex justify-between items-center mt-4 pt-4 border-t border-outline-variant/20">
                <span class="font-headline text-xl text-on-surface font-bold">Grand Total</span>
                <span class="font-headline text-3xl text-primary-container font-bold drop-shadow-[0_0_8px_rgba(0,209,255,0.4)]">$\${total.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Checkout Section -->
        <div class="md:col-span-5 flex flex-col gap-6">
          <div class="glass-panel rounded-lg ambient-shadow border border-outline-variant/15 p-6 flex-grow">
            <h2 class="font-headline text-sm uppercase tracking-[0.1em] text-primary mb-6">Payment Method</h2>
            <div class="space-y-4">
              <label class="block relative cursor-pointer group">
                <input checked class="peer sr-only" name="payment_method" type="radio"/>
                <div class="bg-surface-container-lowest rounded-sm p-4 border border-outline-variant/20 peer-checked:border-primary-container peer-checked:bg-primary-container/5 transition-all flex items-center gap-4">
                  <span class="material-symbols-outlined text-on-surface-variant peer-checked:text-primary-container">contactless</span>
                  <div class="flex-grow">
                    <p class="font-headline text-base text-on-surface">Digital Wallet</p>
                  </div>
                  <div class="w-4 h-4 rounded-full border border-outline-variant peer-checked:border-primary-container peer-checked:bg-primary-container transition-all"></div>
                </div>
              </label>
              
              <label class="block relative cursor-pointer group">
                <input class="peer sr-only" name="payment_method" type="radio"/>
                <div class="bg-surface-container-lowest rounded-sm p-4 border border-outline-variant/20 peer-checked:border-primary-container peer-checked:bg-primary-container/5 transition-all flex items-center gap-4">
                  <span class="material-symbols-outlined text-on-surface-variant peer-checked:text-primary-container">payments</span>
                  <div class="flex-grow">
                    <p class="font-headline text-base text-on-surface">Cash</p>
                  </div>
                  <div class="w-4 h-4 rounded-full border border-outline-variant peer-checked:border-primary-container peer-checked:bg-primary-container transition-all"></div>
                </div>
              </label>
            </div>
            
            <div class="mt-8">
              <label class="font-headline text-xs uppercase tracking-wider text-on-surface-variant mb-2 block">Amount Rendered</label>
              <div class="relative">
                <span class="absolute left-4 top-1/2 -translate-y-1/2 font-headline text-primary-container font-bold">$</span>
                <input class="w-full bg-surface-container-lowest border border-outline-variant/30 rounded-sm py-3 pl-8 pr-4 font-headline text-lg text-on-surface focus:outline-none focus:border-primary-container focus:ring-1 focus:ring-primary-container transition-all" type="text" value="\${total.toFixed(2)}"/>
              </div>
            </div>
          </div>
          
          <div class="space-y-4">
            <button id="close-session-btn" class="w-full py-4 rounded-sm font-headline text-on-primary bg-gradient-primary uppercase tracking-widest font-bold neon-glow-primary transition-all flex items-center justify-center gap-2 border-0 cursor-pointer">
              <span class="material-symbols-outlined">check_circle</span>
              Close Session & Pay
            </button>
          </div>
        </div>
      </main>
    `;
  }

  renderOrders() {
    return this.session.orders.map(order => `
      <div class="bg-surface-container-lowest rounded-sm p-4 flex justify-between items-center border border-outline-variant/15 transition-colors">
        <div class="flex items-center gap-4">
          <span class="material-symbols-outlined text-tertiary-container bg-tertiary-container/10 p-2 rounded-sm">local_cafe</span>
          <div>
            <p class="font-headline text-base text-on-surface">${order.name}</p>
            <p class="font-body text-xs text-on-surface-variant capitalize">${order.category}</p>
          </div>
        </div>
        <p class="font-headline text-lg text-on-surface">$${order.price.toFixed(2)}</p>
      </div>
    `).join('');
  }

  afterRender() {
    if (!this.session) return;
    const btn = document.getElementById('close-session-btn');
    if (btn) {
      btn.addEventListener('click', () => {
        window.Store.stopSession(this.session.id);
        alert('Payment Success! Session closed.');
        window.location.hash = '#rooms';
      });
    }
  }

  destroy() {
    //
  }
}
