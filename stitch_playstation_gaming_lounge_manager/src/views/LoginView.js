export class LoginView {
  async render() {
    return `
      <!-- Atmospheric Glow Orbs -->
      <div class="absolute top-1/4 left-1/4 w-96 h-96 bg-secondary/10 rounded-full blur-[150px] -z-10"></div>
      <div class="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[200px] -z-10"></div>
      
      <main class="w-full max-w-md px-6 relative z-10 mx-auto mt-20">
        <!-- Glassmorphic Login Card -->
        <div class="bg-surface-container-low/60 backdrop-blur-xl rounded-xl p-8 relative shadow-2xl overflow-hidden border-t border-white/10 glow-effect">
          <!-- Asymmetric Loading Line (HUD element) -->
          <div class="absolute top-0 left-0 h-[2px] w-[15%] bg-primary"></div>
          
          <!-- Header -->
          <div class="mb-10 text-center">
            <h1 class="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-br from-primary to-primary-container tracking-tighter mb-2">
              KINETIC VAULT
            </h1>
            <p class="text-on-surface-variant text-sm font-label tracking-widest uppercase opacity-80">
              System Authorization
            </p>
          </div>
          
          <!-- Error Message -->
          <div id="login-error" class="hidden text-error text-center text-sm mb-4 font-body">Invalid Operator ID or Access Code</div>

          <!-- Form -->
          <form id="login-form" class="space-y-6">
            <!-- Username / Email Input -->
            <div class="space-y-2">
              <label class="block text-xs font-label uppercase tracking-widest text-on-surface-variant" for="username">Operator ID</label>
              <div class="relative">
                <span class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span class="material-symbols-outlined text-outline text-sm" style="font-variation-settings: 'FILL' 1;">person</span>
                </span>
                <input autocomplete="username" class="block w-full pl-10 pr-3 py-3 bg-surface-container-lowest border border-outline-variant/15 rounded-md text-on-surface text-sm focus:border-primary/50 focus:ring-0 focus:shadow-[inset_0_0_8px_rgba(164,230,255,0.2)] transition-all outline-none" id="username" name="username" placeholder="Enter credentials" type="text" value="admin"/>
              </div>
            </div>
            
            <!-- Password Input -->
            <div class="space-y-2">
              <div class="flex justify-between items-baseline">
                <label class="block text-xs font-label uppercase tracking-widest text-on-surface-variant" for="password">Access Code</label>
                <a class="text-xs text-primary hover:text-primary-container transition-colors" href="#">Forgot code?</a>
              </div>
              <div class="relative">
                <span class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span class="material-symbols-outlined text-outline text-sm" style="font-variation-settings: 'FILL' 1;">lock</span>
                </span>
                <input autocomplete="current-password" class="block w-full pl-10 pr-3 py-3 bg-surface-container-lowest border border-outline-variant/15 rounded-md text-on-surface text-sm focus:border-primary/50 focus:ring-0 focus:shadow-[inset_0_0_8px_rgba(164,230,255,0.2)] transition-all outline-none" id="password" name="password" placeholder="••••••••" type="password" value="admin"/>
              </div>
            </div>
            
            <!-- Action Button -->
            <button id="login-btn" class="w-full py-3 px-4 mt-8 bg-gradient-to-br from-primary to-primary-container text-on-primary-fixed font-headline font-semibold rounded-md shadow-[0_0_20px_rgba(164,230,255,0.1)] hover:shadow-[0_0_30px_rgba(164,230,255,0.3)] hover:scale-[1.02] transition-all duration-300 flex justify-center items-center gap-2" type="submit">
              INITIALIZE LOGIN
              <span class="material-symbols-outlined text-sm" style="font-variation-settings: 'FILL' 1;">login</span>
            </button>
          </form>
          
          <!-- Footer Links -->
          <div class="mt-8 pt-6 border-t border-outline-variant/15 text-center">
            <p class="text-sm text-on-surface-variant">
              No active clearance? 
              <a class="text-primary hover:text-primary-container font-medium ml-1 transition-colors relative after:absolute after:bottom-0 after:left-0 after:w-full after:h-px after:bg-primary after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300" href="#">
                Request Access
              </a>
            </p>
          </div>
        </div>
        
        <!-- Bottom Status Pip -->
        <div class="mt-8 flex justify-center items-center gap-2">
          <div class="w-2 h-2 rounded-full bg-primary-container shadow-[0_0_8px_#00d1ff]"></div>
          <span class="text-xs font-label uppercase tracking-widest text-on-surface-variant">System Online</span>
        </div>
      </main>
    `;
  }

  afterRender() {
    const form = document.getElementById('login-form');
    const errorEl = document.getElementById('login-error');
    
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const username = form.username.value;
      const password = form.password.value;
      
      const success = window.Store.login(username, password);
      if (success) {
        window.location.hash = '#dashboard';
      } else {
        errorEl.classList.remove('hidden');
      }
    });

    // Add background classes to body for full effect
    document.body.classList.add('bg-kinetic-pattern');
  }

  destroy() {
    document.body.classList.remove('bg-kinetic-pattern');
  }
}
