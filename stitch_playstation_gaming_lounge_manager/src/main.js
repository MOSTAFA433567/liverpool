import './index.css';
import { Router } from './router.js';
import { Store } from './store.js';

// Initialize state management
window.Store = new Store();

// Initialize application routing
document.addEventListener('DOMContentLoaded', () => {
  window.Router = new Router(document.getElementById('app'));
});
