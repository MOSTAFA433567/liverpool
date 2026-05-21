export class Store {
  constructor() {
    this.key = 'stitch_ps_lounge_state';
    this.state = this.loadState();
    if (!this.state.initialized) {
      this.initializeDefaults();
    }
    this.listeners = [];
  }

  loadState() {
    const raw = localStorage.getItem(this.key);
    return raw ? JSON.parse(raw) : { initialized: false };
  }

  saveState() {
    localStorage.setItem(this.key, JSON.stringify(this.state));
    this.notify();
  }

  initializeDefaults() {
    this.state = {
      initialized: true,
      user: null, // If null, user is not logged in
      rooms: Array.from({ length: 10 }, (_, i) => ({
        id: `room_${i + 1}`,
        name: `Room ${String(i + 1).padStart(2, '0')}`,
        type: i < 3 ? 'PS5 Pro' : 'PS5',
        status: 'available', // available, in_use, reserved, maintenance
        currentSessionId: null
      })),
      sessions: [],
      bookings: [],
      inventory: [
        { id: 'item_1', name: 'Monster Energy', price: 4.5, category: 'drinks' },
        { id: 'item_2', name: 'Nachos Grande', price: 8.0, category: 'food' },
        { id: 'item_3', name: 'Water', price: 1.5, category: 'drinks' },
      ],
      hourlyRate: 15.0
    };
    // Let's set some dummy active sessions
    this.state.rooms[0].status = 'in_use';
    this.state.rooms[0].currentSessionId = 'sess_1';
    this.state.sessions.push({
      id: 'sess_1',
      roomId: 'room_1',
      startTime: Date.now() - 3600000, // 1 hour ago
      durationHours: 2,
      orders: []
    });
    this.saveState();
  }

  subscribe(listener) {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener);
    };
  }

  notify() {
    for (const listener of this.listeners) {
      listener(this.state);
    }
  }

  login(username, password) {
    if (username === 'admin' && password === 'admin') {
      this.state.user = { role: 'admin', name: 'Super Admin' };
      this.saveState();
      return true;
    }
    return false;
  }

  logout() {
    this.state.user = null;
    this.saveState();
  }

  startSession(roomId, durationHours) {
    const room = this.state.rooms.find(r => r.id === roomId);
    if (!room || room.status !== 'available') return null;

    const session = {
      id: `sess_${Date.now()}`,
      roomId,
      startTime: Date.now(),
      durationHours,
      orders: []
    };
    room.status = 'in_use';
    room.currentSessionId = session.id;
    this.state.sessions.push(session);
    this.saveState();
    return session;
  }

  stopSession(sessionId) {
    const session = this.state.sessions.find(s => s.id === sessionId);
    if (!session) return null;
    
    const room = this.state.rooms.find(r => r.id === session.roomId);
    if (room) {
      room.status = 'available';
      room.currentSessionId = null;
    }
    
    // Calculate final invoice
    const hoursPlayed = (Date.now() - session.startTime) / 3600000;
    const roomCost = hoursPlayed * this.state.hourlyRate;
    const ordersCost = session.orders.reduce((sum, order) => sum + order.price, 0);
    
    const invoice = {
      sessionId,
      roomCost,
      ordersCost,
      total: roomCost + ordersCost,
      completedAt: Date.now()
    };
    
    // Remove from active sessions
    this.state.sessions = this.state.sessions.filter(s => s.id !== sessionId);
    this.saveState();
    return invoice;
  }
}
