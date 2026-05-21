export class POSMenuView {
  constructor(params) {
    this.sessionId = params.get('session');
    this.cart = [];
    this.unsubscribe = window.Store.subscribe(() => this.renderList());
  }

  async render() {
    return `
      <!-- TopAppBar -->
      <header class="fixed top-0 left-0 right-0 h-16 z-40 bg-[#131315]/80 backdrop-blur-md flex items-center justify-between px-8 w-full border-b border-cyan-500/10">
        <div class="flex items-center gap-4 cursor-pointer" onclick="window.history.back()">
          <span class="material-symbols-outlined text-cyan-400">arrow_back</span>
          <span class="font-headline font-bold text-cyan-400 tracking-wider">BACK</span>
        </div>
        <div class="flex items-center justify-center">
          <span class="font-headline font-bold text-xl text-slate-100 tracking-wider">CYBER_CORE INVENTORY</span>
        </div>
        <div class="w-8"></div>
      </header>

      <!-- Main Content Canvas -->
      <main class="mt-16 flex-1 flex flex-col md:flex-row p-4 md:p-8 gap-8 bg-surface min-h-[calc(100vh-4rem)]">
        <!-- Inventory Grid Area -->
        <div class="flex-1 flex flex-col gap-8">
          <div class="flex items-end justify-between bg-surface-container-low p-6 rounded-lg border border-outline-variant/15">
            <div>
              <h2 class="font-headline text-3xl font-bold text-on-surface mb-2">POS SYSTEM</h2>
              <p class="font-body text-on-surface-variant text-sm">Session: ${this.sessionId || 'Guest Or Walk-in'}</p>
            </div>
          </div>

          <!-- Bento Grid Items -->
          <div id="pos-inventory-grid" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            <!-- Dynamically populated via JS -->
          </div>
        </div>

        <!-- Order Summary Sidebar -->
        <aside class="w-full md:w-96 bg-surface-container-low rounded-lg p-6 flex flex-col border border-outline-variant/15 relative overflow-hidden">
          <div class="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-primary-container to-transparent opacity-50"></div>
          <div class="flex items-center justify-between mb-6">
            <h2 class="font-headline text-xl font-bold text-on-surface tracking-wide uppercase">Current Order</h2>
          </div>

          <!-- Cart Items -->
          <div id="pos-cart-list" class="flex-1 overflow-y-auto space-y-4 pr-2 mb-6 min-h-[200px]">
            <!-- Dynamic Cart Items -->
          </div>

          <!-- Totals Area -->
          <div class="border-t border-outline-variant/20 pt-4 space-y-2 mb-6">
            <div class="flex justify-between items-end pt-2 mt-2 border-t border-outline-variant/10">
              <span class="font-headline text-sm text-on-surface uppercase tracking-wider">Total</span>
              <span id="pos-total" class="font-headline text-3xl font-bold text-primary">$0.00</span>
            </div>
          </div>

          <!-- Action Buttons -->
          <div class="flex gap-3">
            <button id="charge-btn" class="flex-1 py-3 bg-gradient-to-br from-primary to-primary-container rounded-sm font-headline text-sm font-bold uppercase tracking-wider text-on-primary hover:shadow-[0_0_20px_rgba(0,209,255,0.3)] transition-all flex items-center justify-center gap-2">
              <span class="material-symbols-outlined text-sm">point_of_sale</span>
              Place Order
            </button>
          </div>
        </aside>
      </main>
    `;
  }

  addToCart(item) {
    this.cart.push(item);
    this.renderCart();
  }

  renderList() {
    const container = document.getElementById('pos-inventory-grid');
    if (!container) return;
    
    const inventory = window.Store.state.inventory;
    container.innerHTML = inventory.map(item => `
      <div class="bg-surface-container-low rounded-lg p-4 flex flex-col gap-4 group hover:bg-surface-container-highest transition-all duration-300 border border-outline-variant/10">
        <div class="flex flex-col gap-1">
          <h3 class="font-headline font-bold text-lg text-on-surface">\${item.name}</h3>
          <p class="font-body text-on-surface-variant text-sm capitalize">\${item.category}</p>
        </div>
        <div class="flex items-center justify-between mt-auto pt-4 border-t border-outline-variant/10">
          <span class="font-headline text-xl text-primary font-bold">$\${item.price.toFixed(2)}</span>
          <button class="w-10 h-10 rounded-sm bg-surface-container flex items-center justify-center text-primary border border-outline-variant/30 hover:bg-primary/20 transition-colors add-to-cart-btn" data-id="\${item.id}">
            <span class="material-symbols-outlined pointer-events-none">add</span>
          </button>
        </div>
      </div>
    `).join('');

    container.querySelectorAll('.add-to-cart-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const id = e.target.getAttribute('data-id');
        const item = window.Store.state.inventory.find(i => i.id === id);
        if (item) this.addToCart(item);
      });
    });
  }

  renderCart() {
    const list = document.getElementById('pos-cart-list');
    const totalEl = document.getElementById('pos-total');
    if (!list) return;

    if (this.cart.length === 0) {
      list.innerHTML = '<p class="text-on-surface-variant text-sm font-body text-center mt-10">Cart is empty</p>';
      totalEl.innerText = '$0.00';
      return;
    }

    list.innerHTML = this.cart.map((item, index) => `
      <div class="flex items-start gap-4 p-3 bg-surface-container rounded-sm border border-outline-variant/10">
        <div class="flex flex-col gap-1 flex-1">
          <div class="flex justify-between items-start">
            <h4 class="font-headline font-bold text-sm text-on-surface">\${item.name}</h4>
            <span class="font-headline text-sm text-on-surface">$\${item.price.toFixed(2)}</span>
          </div>
        </div>
        <button class="text-error hover:text-error/80 transition-colors bg-transparent border-0 cursor-pointer" onclick="window.posRemoveItem(\${index})">
          <span class="material-symbols-outlined text-sm">remove_circle</span>
        </button>
      </div>
    `).join('');

    const total = this.cart.reduce((sum, item) => sum + item.price, 0);
    totalEl.innerText = '$' + total.toFixed(2);
  }

  afterRender() {
    this.renderList();
    this.renderCart();

    // Setup global remove for inline onclick
    window.posRemoveItem = (index) => {
      this.cart.splice(index, 1);
      this.renderCart();
    };

    document.getElementById('charge-btn').addEventListener('click', () => {
      if (this.cart.length === 0) return alert('Cart is empty!');
      
      if (this.sessionId) {
        const session = window.Store.state.sessions.find(s => s.id === this.sessionId);
        if (session) {
          session.orders.push(...this.cart);
          window.Store.saveState();
          alert('Orders added to session!');
          window.history.back();
          return;
        }
      }
      alert('Walk-in Order Placed successfully!');
      this.cart = [];
      this.renderCart();
    });
  }

  destroy() {
    this.unsubscribe();
    delete window.posRemoveItem;
  }
}
