# DineReserve: A Premium Restaurant Booking Ecosystem

DineReserve is a state-of-the-art, end-to-end dining orchestration platform. It provides a seamless experience for diners to book tables and for restaurant owners to manage their establishments.

## 🏗 Project Structure
- **/frontend**: React + TypeScript application with Tailwind CSS and Framer Motion.
- **/backend**: Node.js + Express API with Prisma (MongoDB) and Socket.io.

## 🚀 Getting Started

### 1. Prerequisites
- Node.js (v18+)
- MongoDB (Atlas or local)

### 2. Backend Setup
```bash
cd backend
npm install
cp .env.example .env # Fill in your credentials
npx prisma generate
npm run dev
```

### 3. Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

## 📸 Screenshots & Diagrams
Refer to the following documents for deep-dives into the architecture:
- [System Idea](./idea.md)
- [Database Schema (ERD)](./ErDiagram.md)
- [Application Class Structure](./classDiagram.md)
- [Booking Sequence Flow](./sequenceDiagram.md)
- [Use Case Diagram](./useCaseDiagram.md)

## 🛡 License
This project is licensed under the MIT License.
