# Use Case Diagram - DineReserve Ecosystem

```mermaid
usecaseDiagram
    actor "Customer" as C
    actor "Restaurant Owner" as RO
    actor "System Admin" as SA
    actor "Payment Gateway" as PG
    actor "Notification Service" as NS

    package "DineReserve Platform" {
        %% Customer Use Cases
        usecase "Search & Filter Restaurants" as UC1
        usecase "Interactive Table Selection" as UC2
        usecase "Pre-pay/Deposit Booking" as UC3
        usecase "Earn/Redeem Loyalty Points" as UC4
        usecase "Submit Photo Review" as UC5
        
        %% Owner Use Cases
        usecase "Design Digital Floor Plan" as UC6
        usecase "Manage AI Waitlist" as UC7
        usecase "Analyze Revenue Reports" as UC8
        usecase "Configure Seasonal Menus" as UC9
        
        %% Admin Use Cases
        usecase "Verify Restaurant KYC" as UC10
        usecase "Manage Platform Promotions" as UC11
        usecase "System Health Monitoring" as UC12
    }

    C --> UC1
    C --> UC2
    C --> UC3
    C --> UC4
    C --> UC5

    RO --> UC6
    RO --> UC7
    RO --> UC8
    RO --> UC9

    SA --> UC10
    SA --> UC11
    SA --> UC12

    UC3 -- PG : "Processes Payment"
    UC7 -- NS : "Sends SMS/Push"
```
