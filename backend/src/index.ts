import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
import dotenv from 'dotenv';
import { Rectangle, ClientToServerEvents, ServerToClientEvents } from './types';

// Load environment variables
dotenv.config();

const app = express();
const httpServer = createServer(app);

// Get configuration from environment variables
const PORT = process.env.PORT || 3001;
const CORS_ORIGIN = process.env.CORS_ORIGIN || "http://localhost:5173";
const NODE_ENV = process.env.NODE_ENV || "development";

const io = new Server<ClientToServerEvents, ServerToClientEvents>(httpServer, {
  cors: {
    origin: CORS_ORIGIN,
    methods: ["GET", "POST"]
  }
});

app.use(cors({
  origin: CORS_ORIGIN
}));
app.use(express.json());

// Store rectangles in memory
let rectangles: Rectangle[] = [];

io.on('connection', (socket) => {
  console.log('Client connected:', socket.id);
  
  if (NODE_ENV === 'development') {
    console.log('Development mode: verbose logging enabled');
  }

  // Send initial rectangles to newly connected client
  socket.emit('rectangles:init', rectangles);

  // Handle new rectangle added by client
  socket.on('rectangle:add', (rectangle) => {
    console.log('Received rectangle:add from', socket.id, rectangle);
    rectangles.push(rectangle);
    // Broadcast to all other clients
    socket.broadcast.emit('rectangle:add', rectangle);
  });

  // Handle rectangle moved by client
  socket.on('rectangle:move', (data) => {
    console.log('Received rectangle:move from', socket.id, data);
    // Update rectangle position in our store
    const rect = rectangles.find(r => r.id === data.id);
    if (rect) {
      rect.x = data.x;
      rect.y = data.y;
    }
    // Broadcast to all other clients
    socket.broadcast.emit('rectangle:move', data);
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected:', socket.id);
  });
});

httpServer.listen(PORT, () => {
  console.log(`Server running in ${NODE_ENV} mode on port ${PORT}`);
  console.log(`CORS enabled for: ${CORS_ORIGIN}`);
});
