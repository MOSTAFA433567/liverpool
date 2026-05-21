import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { useAuthStore } from './store/useAuthStore';
import { useLoungeStore } from './store/useLoungeStore';
import { Layout } from './components/layout/Layout';
import { ToastContainer } from './components/ui/ToastContainer';

import Home from './pages/Public/Home';
import Login from './pages/Auth/Login';
import CustomerDashboard from './pages/Customer/CustomerDashboard';
import BookingFlow from './pages/Customer/BookingFlow';
import Checkout from './pages/Customer/Checkout';

import Dashboard from './pages/Dashboard/Dashboard';
import SessionManager from './pages/Session/SessionManager';
import RoomsList from './pages/Rooms/RoomsList';
import POS from './pages/POS/POS';
import Invoice from './pages/Checkout/Invoice';
import Bookings from './pages/Bookings/Bookings';
import Reports from './pages/Reports/Analytics';
import Settings from './pages/Settings/Config';

function AdminRoute({ children }: { children: React.ReactNode }) {
  const { user, isLoading } = useAuthStore();
  if (isLoading) return <LoadingScreen />;
  if (!user || (user.role !== 'admin' && user.role !== 'staff')) return <Navigate to="/login" replace />;
  return <>{children}</>;
}

function CustomerRoute({ children }: { children: React.ReactNode }) {
  const { user, isLoading } = useAuthStore();
  const location = useLocation();
  if (isLoading) return <LoadingScreen />;
  if (!user) return <Navigate to={`/login?redirect=${encodeURIComponent(location.pathname)}`} replace />;
  return <>{children}</>;
}

function LoadingScreen() {
  return (
    <div className="h-screen w-full flex items-center justify-center bg-background">
      <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-primary"></div>
    </div>
  );
}

export default function App() {
  const initAuth = useAuthStore(state => state.init);
  const initLounge = useLoungeStore(state => state.init);

  useEffect(() => {
    initAuth();
    initLounge();
  }, [initAuth, initLounge]);

  return (
    <>
      <ToastContainer />
      <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        
        {/* Customer Routes */}
        <Route path="/customer" element={
          <CustomerRoute>
            <CustomerDashboard />
          </CustomerRoute>
        } />
        <Route path="/customer/book" element={
          <CustomerRoute>
            <BookingFlow />
          </CustomerRoute>
        } />
        <Route path="/customer/checkout/:bookingId" element={
          <CustomerRoute>
            <Checkout />
          </CustomerRoute>
        } />

        {/* Admin Routes */}
        <Route path="/admin" element={
          <AdminRoute>
            <Layout />
          </AdminRoute>
        }>
          <Route index element={<Dashboard />} />
          <Route path="session/:sessionId" element={<SessionManager />} />
          <Route path="rooms" element={<RoomsList />} />
          <Route path="bookings" element={<Bookings />} />
          <Route path="pos" element={<POS />} />
          <Route path="checkout/:sessionId" element={<Invoice />} />
          <Route path="reports" element={<Reports />} />
          <Route path="settings" element={<Settings />} />
        </Route>
      </Routes>
    </Router>
    </>
  );
}
