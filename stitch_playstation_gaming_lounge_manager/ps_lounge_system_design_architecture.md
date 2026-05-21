# PlayStation Lounge Management System - Technical Design Document

## 1. Project Overview
A comprehensive mobile application (Android/Kotlin) for managing a gaming lounge, featuring real-time room tracking, booking, session management, and integrated POS for snacks/drinks.

## 2. System Architecture
- **Pattern:** MVVM (Model-View-ViewModel)
- **Framework:** Clean Architecture (Data, Domain, Presentation layers)
- **Backend:** Firebase (Firestore for DB, Auth for Users, Cloud Functions for timers/logic)
- **Concurrency:** Kotlin Coroutines & Flow for real-time updates.

## 3. Database Schema (Firestore)

### `rooms` (Collection)
- `id`: String (PK)
- `type`: String ("PS4" | "PS5")
- `controller_count`: Int
- `hourly_price`: Double
- `status`: String ("available" | "reserved" | "in_use" | "maintenance")
- `current_session_id`: String (Optional)

### `bookings` (Collection)
- `id`: String (PK)
- `user_id`: String (FK)
- `room_id`: String (FK)
- `start_time`: Timestamp
- `duration_hours`: Int
- `status`: String ("pending" | "confirmed" | "cancelled")

### `sessions` (Collection)
- `id`: String (PK)
- `room_id`: String (FK)
- `user_id`: String (FK)
- `start_time`: Timestamp
- `end_time`: Timestamp (Optional)
- `room_cost`: Double
- `order_ids`: List<String> (FK)
- `total_amount`: Double

### `products` (Collection)
- `id`: String (PK)
- `name`: String
- `category`: String ("cold_drinks" | "hot_drinks" | "snacks")
- `price`: Double
- `stock`: Int

## 4. API / Interface Structure (Repository Pattern)

```kotlin
interface RoomRepository {
    fun getRooms(): Flow<List<Room>>
    suspend fun updateRoomStatus(roomId: String, status: RoomStatus)
}

interface BookingRepository {
    suspend fun createBooking(booking: Booking): Result<String>
    fun getUserBookings(userId: String): Flow<List<Booking>>
}

interface SessionManager {
    suspend fun startSession(roomId: String, userId: String)
    suspend fun stopSession(sessionId: String): Invoice
    suspend fun addOrderToSession(sessionId: String, order: Order)
}
```

## 5. UI Screen List
1. **Admin Dashboard:** Real-time stats, revenue, and active sessions.
2. **Rooms Grid:** Visual status of all 10 rooms.
3. **Session Controller:** Active timer, cost calculator, and "Add Time" buttons.
4. **Booking Calendar:** Date/Time picker for reservations.
5. **POS / Menu:** Category-based food and drink ordering.
6. **User Profile:** History and loyalty balance.

## 6. Security & Validation
- **Firebase Auth:** Email/Password and Google Sign-in.
- **Security Rules:** Firestore rules to ensure users can only read their own bookings.
- **Input Validation:** Use Kotlin Result type and Validated wrappers for form data.
