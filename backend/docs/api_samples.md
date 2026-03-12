### Booking API Samples

#### 1. Create Booking
**POST** `/api/bookings`

**Request Body:**
```json
{
  "userId": 1,
  "roomId": 1,
  "checkIn": "2026-03-20",
  "checkOut": "2026-03-22",
  "guests": 2
}
```

**Response (Success):**
```json
{
  "id": 16,
  "userName": "Arjun Kumar",
  "roomType": "Deluxe Garden View Room",
  "checkIn": "2026-03-20",
  "checkOut": "2026-03-22",
  "nights": 2,
  "subtotal": 4998.0,
  "gstAmount": 599.76,
  "totalAmount": 5597.76,
  "status": "PENDING",
  "paymentStatus": "UNPAID",
  "createdAt": "2026-02-24T00:45:00"
}
```

**Response (Room Not Available):**
```json
{
  "timestamp": "2026-02-24T00:45:00",
  "message": "No rooms available for selected dates"
}
```

**Response (Validation Error):**
```json
{
  "timestamp": "2026-02-24T00:45:00",
  "errors": {
    "guests": "At least one guest is required"
  }
}
```

#### 2. Get All Rooms
**GET** `/api/rooms`

**Response:**
```json
[
  {
    "id": 1,
    "roomType": "Deluxe Garden View Room",
    "description": "Elegant AC rooms with nature view",
    "basePrice": 2499.0,
    "weekendPrice": 2499.0,
    "totalRooms": 10
  }
]
```
