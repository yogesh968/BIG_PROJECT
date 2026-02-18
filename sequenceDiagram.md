# Sequence Diagram - Advanced Booking & Payment Flow

![Sequence Diagram](./images/sequence.png)

### Explanation
This sequence diagram details the end-to-end flow of booking a table with integrated payments:
1. **Initiation**: The customer selects a table and time on the React frontend, which sends a request to the Express API.
2. **Availability Check**: The API performs a type-safe check against the PostgreSQL database using a "SELECT FOR UPDATE" lock to prevent double booking.
3. **Payment Setup**: A Stripe Payment Intent is created to hold the table for a limited time (e.g., 10 minutes).
4. **Transaction**: The customer completes the payment via Stripe Elements. Once successful, the frontend notifies the API.
5. **Confirmation**: The API updates the reservation status in the database and broadcasts a 'new_reservation' event via Socket.io to the restaurant owner's dashboard in real-time.
6. **Finalization**: The customer receives an immediate confirmation and an digital e-ticket.

```mermaid
sequenceDiagram
    autonumber
    actor C as Customer
    participant FE as React Frontend (TS)
    participant API as Express API (TS)
    participant Socket as Socket.io Server
    participant DB as PostgreSQL (Prisma)
    participant Stripe as Stripe API

    C->>FE: Select Table & Time
    FE->>API: POST /api/v1/bookings/init
    API->>DB: Check Availability (SELECT FOR UPDATE)
    DB-->>API: Table Available
    
    API->>Stripe: Create Payment Intent
    Stripe-->>API: Client Secret
    
    API-->>FE: Booking Held (10m) + Payment Secret
    
    C->>FE: Confirm Payment (Stripe Elements)
    FE->>Stripe: Process Payment
    Stripe-->>FE: Payment SUCCESS
    
    FE->>API: POST /api/v1/bookings/confirm
    API->>DB: Update Status (CONFIRMED)
    DB-->>API: Success
    
    API->>Socket: Emit 'new_reservation'
    Socket-->>FE: Update Owner Dashboard (Real-time)
    
    API-->>FE: Return Reservation Details
    FE-->>C: Show Confirmation & E-Ticket
```
