# Class Diagram - DineReserve TypeScript Architecture

![Class Diagram](./images/classDiagram.png)

### Explanation
This class diagram outlines the object-oriented structure of the TypeScript backend:
- **Interfaces**: `IUser` serves as the base contract for all system users, ensuring consistent fields like `userId` and `role`.
- **Specialization**: `Customer` extends user functionality with loyalty points and personal booking history.
- **Restaurant Management**: The `Restaurant` class aggregates `FloorPlan` and `Menu` objects to manage physical and culinary offerings.
- **Resource Entities**: `Table` and `MenuItem` represent the granular resources.
- **Transactional Logic**: `Reservation` and `Payment` handle the lifecycle of a booking, from status updates to payment confirmation.

```mermaid
classDiagram
    class IUser {
        <<interface>>
        +userId: string
        +email: string
        +role: UserRole
        +createdAt: Date
    }

    class Customer {
        +loyaltyPoints: number
        +bookings: Reservation[]
        +redeemPoints(amount: number): boolean
    }

    class Restaurant {
        +id: string
        +name: string
        +floorPlan: FloorPlan
        +menu: Menu
        +getLiveAvailability(time: Date): Table[]
    }

    class Reservation {
        +id: string
        +status: BookingStatus
        +paymentStatus: PaymentStatus
        +partySize: number
        +assignedTable: Table
        +confirmPayment(tx: string): void
    }

    class Payment {
        +id: string
        +amount: number
        +provider: string
        +process(): Promise<boolean>
    }

    class FloorPlan {
        +id: string
        +zones: Zone[]
        +tables: Table[]
        +updateLayout(json: string): void
    }

    class Table {
        +id: string
        +capacity: number
        +isAvailable: boolean
        +coordinates: object
    }

    class Menu {
        +id: string
        +items: MenuItem[]
        +category: string
    }

    IUser <|-- Customer
    Customer "1" *-- "*" Reservation
    Reservation "1" -- "1" Payment
    Restaurant "1" *-- "1" FloorPlan
    Restaurant "1" *-- "1" Menu
    FloorPlan "1" *-- "*" Table
    Reservation "*" -- "1" Table
```

