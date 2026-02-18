# ER Diagram - DineReserve Database Schema

![ER Diagram](./images/erdiagram.png)

### Explanation
The Entity Relationship Diagram defines the relational structure of the DineReserve ecosystem:
- **Core Entities**: `USERS` (with roles), `RESTAURANTS`, and `TABLES`.
- **Operations**: `RESERVATIONS` link customers to specific tables at specific restaurants.
- **Support Entities**: `PAYMENTS` secure reservations, `MENU_ITEMS` provide culinary details, and `REVIEWS` store user feedback.
- **Relationships**:
  - One user (Owner) can manage many restaurants.
  - One restaurant has one floor plan, which contains many tables.
  - One reservation is tied to one primary table and one payment ID.
  - JSONB fields are utilized for flexible layout data and geographic coordinates.

```mermaid
erDiagram
    USERS {
        uuid id PK
        string email UK
        string password_hash
        string full_name
        enum role "CUSTOMER, OWNER, ADMIN"
        int loyalty_points
    }

    RESTAURANTS {
        uuid id PK
        uuid owner_id FK
        string name
        string slug UK
        string address
        jsonb location_coords
        float rating
    }

    FLOOR_PLANS {
        uuid id PK
        uuid restaurant_id FK
        jsonb layout_data
        timestamp updated_at
    }

    TABLES {
        uuid id PK
        uuid floor_plan_id FK
        int table_number
        int capacity
        boolean is_active
    }

    RESERVATIONS {
        uuid id PK
        uuid customer_id FK
        uuid restaurant_id FK
        uuid table_id FK
        timestamp booking_time
        int party_size
        enum status "PENDING, CONFIRMED, CANCELLED, COMPLETED"
    }

    PAYMENTS {
        uuid id PK
        uuid reservation_id FK
        decimal amount
        string stripe_payment_intent_id
        enum status "REQUIRED, PAID, REFUNDED"
    }

    MENU_ITEMS {
        uuid id PK
        uuid restaurant_id FK
        string name
        decimal price
        string category
        boolean is_available
    }

    REVIEWS {
        uuid id PK
        uuid customer_id FK
        uuid restaurant_id FK
        int rating
        text content
        string image_url
    }

    USERS ||--o{ RESTAURANTS : "manages"
    USERS ||--o{ RESERVATIONS : "books"
    USERS ||--o{ REVIEWS : "writes"

    RESTAURANTS ||--|| FLOOR_PLANS : "has"
    RESTAURANTS ||--o{ MENU_ITEMS : "offers"
    RESTAURANTS ||--o{ RESERVATIONS : "receives"
    
    FLOOR_PLANS ||--o{ TABLES : "contains"
    
    RESERVATIONS ||--|| PAYMENTS : "secured_by"
    RESERVATIONS ||--|| TABLES : "occupies"
```
