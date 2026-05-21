(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))a(s);new MutationObserver(s=>{for(const r of s)if(r.type==="childList")for(const o of r.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&a(o)}).observe(document,{childList:!0,subtree:!0});function t(s){const r={};return s.integrity&&(r.integrity=s.integrity),s.referrerPolicy&&(r.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?r.credentials="include":s.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function a(s){if(s.ep)return;s.ep=!0;const r=t(s);fetch(s.href,r)}})();class c{async render(){return`
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
    `}afterRender(){const e=document.getElementById("login-form"),t=document.getElementById("login-error");e.addEventListener("submit",a=>{a.preventDefault();const s=e.username.value,r=e.password.value;window.Store.login(s,r)?window.location.hash="#dashboard":t.classList.remove("hidden")}),document.body.classList.add("bg-kinetic-pattern")}destroy(){document.body.classList.remove("bg-kinetic-pattern")}}class p{constructor(){this.unsubscribe=window.Store.subscribe(e=>this.updateUI(e))}async render(){const e=window.Store.state,t=e.rooms.filter(r=>r.status==="in_use").length,a=e.rooms.length;return`
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
                <span class="font-headline text-3xl font-bold text-primary tracking-tight glow-text">4289</span>
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
                <span class="font-headline text-3xl font-bold text-on-surface tracking-tight" id="active-rooms-count">${t}</span>
                <span class="font-headline text-on-surface-variant text-sm">/ ${a}</span>
              </div>
              <!-- Segmented Indicator -->
              <div class="flex gap-1 h-1.5 w-full" id="room-indicators">
                ${this.generateRoomIndicators(t,a)}
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
    `}generateRoomIndicators(e,t){let a="";for(let s=0;s<e;s++)a+='<div class="flex-1 bg-[#F44336] rounded-full shadow-[0_0_4px_rgba(244,67,54,0.6)]"></div>';for(let s=e;s<t;s++)a+='<div class="flex-1 bg-[#4CAF50] rounded-full opacity-40"></div>';return a}updateUI(e){const t=e.rooms.filter(o=>o.status==="in_use").length,a=e.rooms.length,s=document.getElementById("active-rooms-count");s&&(s.innerText=t);const r=document.getElementById("room-indicators");r&&(r.innerHTML=this.generateRoomIndicators(t,a))}afterRender(){document.getElementById("logout-btn").addEventListener("click",()=>{window.Store.logout(),window.location.hash="#login"})}destroy(){this.unsubscribe()}}class u{constructor(){this.unsubscribe=window.Store.subscribe(()=>this.renderList())}async render(){return`
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
    `}renderList(){const e=document.getElementById("rooms-grid");if(!e)return;const{rooms:t}=window.Store.state;e.innerHTML=t.map(a=>this.buildRoomCard(a)).join("")}buildRoomCard(e){if(e.status==="in_use")return`
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
        </div>`;if(e.status==="available")return`
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
        </div>`;if(e.status==="maintenance")return`
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
        </div>`}afterRender(){this.renderList()}destroy(){this.unsubscribe()}}class f{constructor(e){this.roomId=e.get("id"),this.timerInterval=null}async render(){if(this.room=window.Store.state.rooms.find(t=>t.id===this.roomId),!this.room)return'<h1 class="text-on-surface text-center mt-20 text-4xl">Room Not Found</h1>';if(this.session=window.Store.state.sessions.find(t=>t.id===this.room.currentSessionId),!this.session)return'<h1 class="text-on-surface text-center mt-20 text-4xl">No Active Session in this Room</h1>';const e=this.calculateCost();return`
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
            <p id="session-cost" class="font-headline text-xl font-bold text-on-surface">$${e.toFixed(2)}</p>
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
    `}calculateCost(){const t=(Date.now()-this.session.startTime)/36e5*window.Store.state.hourlyRate,a=this.session.orders.reduce((s,r)=>s+r.price,0);return t+a}updateTimer(){if(!this.session)return;Date.now()-this.session.startTime;const e=document.getElementById("session-timer"),t=document.getElementById("session-cost");e&&(e.innerText="${String(hours).padStart(2, '0')}:${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}"),t&&(t.innerText="$"+this.calculateCost().toFixed(2))}afterRender(){if(!this.session)return;this.updateTimer(),this.timerInterval=setInterval(()=>this.updateTimer(),1e3);const e=document.getElementById("end-session-btn");e&&e.addEventListener("click",()=>{confirm("End this session and proceed to checkout?")&&(window.location.hash="#checkout?session=${this.session.id}")});const t=document.getElementById("add-time-btn");t&&t.addEventListener("click",()=>{window.location.hash="#pos?session=${this.session.id}"})}destroy(){this.timerInterval&&clearInterval(this.timerInterval)}}class b{constructor(e){this.sessionId=e.get("session"),this.cart=[],this.unsubscribe=window.Store.subscribe(()=>this.renderList())}async render(){return`
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
              <p class="font-body text-on-surface-variant text-sm">Session: ${this.sessionId||"Guest Or Walk-in"}</p>
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
    `}addToCart(e){this.cart.push(e),this.renderCart()}renderList(){const e=document.getElementById("pos-inventory-grid");if(!e)return;const t=window.Store.state.inventory;e.innerHTML=t.map(a=>`
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
    `).join(""),e.querySelectorAll(".add-to-cart-btn").forEach(a=>{a.addEventListener("click",s=>{const r=s.target.getAttribute("data-id"),o=window.Store.state.inventory.find(l=>l.id===r);o&&this.addToCart(o)})})}renderCart(){const e=document.getElementById("pos-cart-list"),t=document.getElementById("pos-total");if(!e)return;if(this.cart.length===0){e.innerHTML='<p class="text-on-surface-variant text-sm font-body text-center mt-10">Cart is empty</p>',t.innerText="$0.00";return}e.innerHTML=this.cart.map((s,r)=>`
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
    `).join("");const a=this.cart.reduce((s,r)=>s+r.price,0);t.innerText="$"+a.toFixed(2)}afterRender(){this.renderList(),this.renderCart(),window.posRemoveItem=e=>{this.cart.splice(e,1),this.renderCart()},document.getElementById("charge-btn").addEventListener("click",()=>{if(this.cart.length===0)return alert("Cart is empty!");if(this.sessionId){const e=window.Store.state.sessions.find(t=>t.id===this.sessionId);if(e){e.orders.push(...this.cart),window.Store.saveState(),alert("Orders added to session!"),window.history.back();return}}alert("Walk-in Order Placed successfully!"),this.cart=[],this.renderCart()})}destroy(){this.unsubscribe(),delete window.posRemoveItem}}class x{constructor(e){this.sessionId=e.get("session")}async render(){return this.session=window.Store.state.sessions.find(t=>t.id===this.sessionId),this.session?(this.room=window.Store.state.rooms.find(t=>t.id===this.session.roomId),(Date.now()-this.session.startTime)/36e5*window.Store.state.hourlyRate,this.session.orders.reduce((t,a)=>t+a.price,0),`
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
                  ${this.session.orders.length===0?'<p class="text-on-surface-variant text-sm border p-4 border-outline-variant/10">No items ordered.</p>':""}
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
    `):'<h1 class="text-on-surface text-center mt-20 text-4xl">Session Not Found for Checkout</h1>'}renderOrders(){return this.session.orders.map(e=>`
      <div class="bg-surface-container-lowest rounded-sm p-4 flex justify-between items-center border border-outline-variant/15 transition-colors">
        <div class="flex items-center gap-4">
          <span class="material-symbols-outlined text-tertiary-container bg-tertiary-container/10 p-2 rounded-sm">local_cafe</span>
          <div>
            <p class="font-headline text-base text-on-surface">${e.name}</p>
            <p class="font-body text-xs text-on-surface-variant capitalize">${e.category}</p>
          </div>
        </div>
        <p class="font-headline text-lg text-on-surface">$${e.price.toFixed(2)}</p>
      </div>
    `).join("")}afterRender(){if(!this.session)return;const e=document.getElementById("close-session-btn");e&&e.addEventListener("click",()=>{window.Store.stopSession(this.session.id),alert("Payment Success! Session closed."),window.location.hash="#rooms"})}destroy(){}}class m{constructor(){this.unsubscribe=window.Store.subscribe(()=>this.renderList())}async render(){return`
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
    `}renderList(){}afterRender(){this.renderList()}destroy(){this.unsubscribe()}}class v{constructor(){this.unsubscribe=window.Store.subscribe(()=>this.updateData())}async render(){return`
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
    `}updateData(){const e=window.Store.state,t=document.getElementById("report-active-sessions"),a=document.getElementById("report-total-sessions");t&&(t.innerText=e.rooms.filter(s=>s.status==="in_use").length),a&&(a.innerText=e.rooms.length)}afterRender(){this.updateData()}destroy(){this.unsubscribe()}}class h{constructor(){this.hourlyRate=window.Store.state.hourlyRate||15}async render(){return`
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
    `}afterRender(){const e=document.getElementById("save-settings-btn");e&&e.addEventListener("click",()=>{const t=document.getElementById("settings-hourly-rate");if(t){const a=parseFloat(t.value);isNaN(a)||(window.Store.state.hourlyRate=a,window.Store.saveState(),alert("Settings committed to system memory."))}})}destroy(){}}class g{constructor(){}async render(){return`
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
    `}afterRender(){const e=document.getElementById("profile-logout-btn");e&&e.addEventListener("click",()=>{window.Store.logout(),window.location.hash="#login"})}destroy(){}}class y{constructor(e){this.root=e,this.routes={"#login":c,"#dashboard":p,"#rooms":u,"#session_controller":f,"#pos":b,"#checkout":x,"#bookings":m,"#reports":v,"#settings":h,"#profile":g},window.addEventListener("hashchange",()=>this.handleHashChange()),this.handleHashChange()}async handleHashChange(){let e=window.location.hash||"#dashboard";const[t,a]=e.split("?"),s=new URLSearchParams(a||"");if(!window.Store.state.user&&t!=="#login"){window.location.hash="#login";return}if(window.Store.state.user&&t==="#login"){window.location.hash="#dashboard";return}const r=this.routes[t];r?(this.currentView&&this.currentView.destroy&&this.currentView.destroy(),this.currentView=new r(s),this.root.innerHTML=await this.currentView.render(),this.currentView.afterRender&&this.currentView.afterRender()):this.root.innerHTML='<h1 class="text-on-surface text-center mt-20 text-4xl">404 - Not Found</h1>'}}class w{constructor(){this.key="stitch_ps_lounge_state",this.state=this.loadState(),this.state.initialized||this.initializeDefaults(),this.listeners=[]}loadState(){const e=localStorage.getItem(this.key);return e?JSON.parse(e):{initialized:!1}}saveState(){localStorage.setItem(this.key,JSON.stringify(this.state)),this.notify()}initializeDefaults(){this.state={initialized:!0,user:null,rooms:Array.from({length:10},(e,t)=>({id:`room_${t+1}`,name:`Room ${String(t+1).padStart(2,"0")}`,type:t<3?"PS5 Pro":"PS5",status:"available",currentSessionId:null})),sessions:[],bookings:[],inventory:[{id:"item_1",name:"Monster Energy",price:4.5,category:"drinks"},{id:"item_2",name:"Nachos Grande",price:8,category:"food"},{id:"item_3",name:"Water",price:1.5,category:"drinks"}],hourlyRate:15},this.state.rooms[0].status="in_use",this.state.rooms[0].currentSessionId="sess_1",this.state.sessions.push({id:"sess_1",roomId:"room_1",startTime:Date.now()-36e5,durationHours:2,orders:[]}),this.saveState()}subscribe(e){return this.listeners.push(e),()=>{this.listeners=this.listeners.filter(t=>t!==e)}}notify(){for(const e of this.listeners)e(this.state)}login(e,t){return e==="admin"&&t==="admin"?(this.state.user={role:"admin",name:"Super Admin"},this.saveState(),!0):!1}logout(){this.state.user=null,this.saveState()}startSession(e,t){const a=this.state.rooms.find(r=>r.id===e);if(!a||a.status!=="available")return null;const s={id:`sess_${Date.now()}`,roomId:e,startTime:Date.now(),durationHours:t,orders:[]};return a.status="in_use",a.currentSessionId=s.id,this.state.sessions.push(s),this.saveState(),s}stopSession(e){const t=this.state.sessions.find(i=>i.id===e);if(!t)return null;const a=this.state.rooms.find(i=>i.id===t.roomId);a&&(a.status="available",a.currentSessionId=null);const r=(Date.now()-t.startTime)/36e5*this.state.hourlyRate,o=t.orders.reduce((i,d)=>i+d.price,0),l={sessionId:e,roomCost:r,ordersCost:o,total:r+o,completedAt:Date.now()};return this.state.sessions=this.state.sessions.filter(i=>i.id!==e),this.saveState(),l}}window.Store=new w;document.addEventListener("DOMContentLoaded",()=>{window.Router=new y(document.getElementById("app"))});
