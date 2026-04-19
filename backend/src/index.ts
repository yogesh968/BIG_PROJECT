import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { Server } from 'socket.io';
import http from 'http';
import path from 'path';

dotenv.config();

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: [
      'http://localhost:5173', 
      'https://big-project-git-main-yogesh-kumars-projects-b37dbb16.vercel.app'
    ],
    methods: ['GET', 'POST'],
  },
});

import authRoutes from './routes/authRoutes';
import restaurantRoutes from './routes/restaurantRoutes';
import reservationRoutes from './routes/reservationRoutes';

app.use(cors({
  origin: [
    'http://localhost:5173', 
    'https://big-project-git-main-yogesh-kumars-projects-b37dbb16.vercel.app'
  ],
  credentials: true
}));
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/restaurants', restaurantRoutes);
app.use('/api/reservations', reservationRoutes);

app.get('/', (req, res) => {
  res.send('DineReserve API is running');
});

// Socket.io
io.on('connection', (socket) => {
  console.log('A user connected:', socket.id);

  socket.on('join_restaurant', (restaurantId) => {
    socket.join(restaurantId);
    console.log(`User ${socket.id} joined restaurant ${restaurantId}`);
  });

  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
