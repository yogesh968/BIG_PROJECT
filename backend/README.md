# DineReserve Backend

The robust, type-safe API powering the DineReserve ecosystem.

## 🚀 Features
- **Role-Based Access Control (RBAC):** Secure authentication for Customers, Owners, and Admins.
- **Real-time Engine:** Powered by Socket.io for instant table availability updates.
- **Type-safe Database:** PostgreSQL managed via Prisma ORM.
- **Sophisticated Booking Logic:** Conflict resolution and "Select for Update" locking mechanism.
- **Integrated Payments:** Stripe integration for secure transactions.

## 🛠 Tech Stack
- **Runtime:** Node.js
- **Framework:** Express with TypeScript
- **ORM:** Prisma
- **Database:** MongoDB (Cloud Atlas)
- **Real-time:** Socket.io
- **Auth:** JWT & Bcrypt

## 📦 Installation
1. Clone the repository.
2. Navigate to `/backend`.
3. Install dependencies:
   ```bash
   npm install
   ```
4. Configure your `.env` file (refer to `.env.example`).
5. Generate Prisma client:
   ```bash
   npx prisma generate
   ```

## 🚦 Scripts
- `npm run dev`: Start development server with ts-node-dev.
- `npm run build`: Compile TypeScript to JavaScript.
- `npm start`: Run the compiled production server.

## 🗺 API Structure
- `/src/index.ts`: Entry point.
- `/src/controllers/`: Business logic.
- `/src/routes/`: API endpoint definitions.
- `/src/middleware/`: Auth and validation logic.
- `/src/prisma/`: Database schema and migrations.
