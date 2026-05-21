export type RoomType = 'PS4' | 'PS5' | 'Tennis' | 'Billiard';
export type RoomStatus = 'available' | 'in_use' | 'reserved' | 'maintenance';

export interface Room {
  id: string;
  name: string;
  type: RoomType;
  hourly_price: number;
  status: RoomStatus;
  current_session_id: string | null;
}

export type SessionStatus = 'active' | 'completed';

export interface OrderItem {
  product_id: string;
  name: string;
  price: number;
  quantity: number;
}

export interface Session {
  id: string;
  room_id: string;
  customer_id?: string;
  booking_id?: string;
  start_time: string; // ISO string
  end_time: string | null; // ISO string or null if active
  status: SessionStatus;
  total_amount: number;
  orders: OrderItem[];
}

export type BookingStatus = 'pending' | 'confirmed' | 'cancelled' | 'completed';
export type PaymentStatus = 'pending' | 'paid' | 'failed';
export type PaymentMethod = 'cash' | 'visa' | 'vodafone_cash';

export interface Booking {
  id: string;
  room_id: string;
  customer_id: string;
  customer_name: string;
  start_time: string; // ISO string
  duration: number; // in minutes
  end_time: string; // ISO string
  total_price: number;
  status: BookingStatus;
  payment_status: PaymentStatus;
  payment_method?: PaymentMethod;
  transaction_id?: string;
  createdAt: string;
}

export interface Transaction {
  id: string;
  amount_cents: number;
  created_at: string;
  currency: string;
  error_occured: boolean;
  has_parent_transaction: boolean;
  is_auth: boolean;
  is_capture: boolean;
  is_refunded: boolean;
  is_standalone_payment: boolean;
  is_voided: boolean;
  order: { id: number };
  owner: number;
  pending: boolean;
  source_data: {
    pan: string;
    sub_type: string;
    type: string;
  };
  success: boolean;
  booking_id?: string;
}

export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  stock: number;
  image_url?: string;
}

export type Role = 'admin' | 'staff' | 'customer';

export interface User {
  id: string; // Firebase Auth UID
  email: string;
  role: Role;
  name: string;
  phone?: string;
  createdAt: string;
}
