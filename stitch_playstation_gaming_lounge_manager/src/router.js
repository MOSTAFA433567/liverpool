import { LoginView } from './views/LoginView.js';
import { DashboardView } from './views/DashboardView.js';
import { RoomsMatrixView } from './views/RoomsMatrixView.js';
import { ActiveSessionView } from './views/ActiveSessionView.js';
import { POSMenuView } from './views/POSMenuView.js';
import { CheckoutView } from './views/CheckoutView.js';
import { BookingsView } from './views/BookingsView.js';
import { ReportsView } from './views/ReportsView.js';
import { SettingsView } from './views/SettingsView.js';
import { UserProfileView } from './views/UserProfileView.js';

export class Router {
  constructor(rootElement) {
    this.root = rootElement;
    this.routes = {
      '#login': LoginView,
      '#dashboard': DashboardView,
      '#rooms': RoomsMatrixView,
      '#session_controller': ActiveSessionView,
      '#pos': POSMenuView,
      '#checkout': CheckoutView,
      '#bookings': BookingsView,
      '#reports': ReportsView,
      '#settings': SettingsView,
      '#profile': UserProfileView,
    };
    
    // Listen to hash change
    window.addEventListener('hashchange', () => this.handleHashChange());
    
    // Handle initial route
    this.handleHashChange();
  }

  async handleHashChange() {
    let fullHash = window.location.hash || '#dashboard';
    const [hash, queryString] = fullHash.split('?');
    const params = new URLSearchParams(queryString || '');
    
    // Guard clause: if not authenticated, redirect to login
    if (!window.Store.state.user && hash !== '#login') {
      window.location.hash = '#login';
      return;
    }

    // If authenticated and trying to access login, redirect to dashboard
    if (window.Store.state.user && hash === '#login') {
      window.location.hash = '#dashboard';
      return;
    }

    const ViewClass = this.routes[hash];
    if (ViewClass) {
      if (this.currentView && this.currentView.destroy) {
        this.currentView.destroy();
      }
      this.currentView = new ViewClass(params);
      this.root.innerHTML = await this.currentView.render();
      if (this.currentView.afterRender) {
        this.currentView.afterRender();
      }
    } else {
      this.root.innerHTML = '<h1 class="text-on-surface text-center mt-20 text-4xl">404 - Not Found</h1>';
    }
  }
}
