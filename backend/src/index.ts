import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
import { ClientToServerEvents, ServerToClientEvents, Rectangle } from './types';

const app = express();
const httpServer = createServer(app);
const io = new Server<ClientToServerEvents, ServerToClientEvents>(httpServer, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"]
  }
});

app.use(cors());
app.use(express.json());

// Store rectangles in memory
const rectangles: Rectangle[] = [];

io.on('connection', (socket) => {
  console.log('Client connected:', socket.id);

  // Send existing rectangles to the new client
  socket.emit('rectangles:init', rectangles);

  socket.on('rectangle:add', (rectangle) => {
    console.log('Adding rectangle:', rectangle);
    rectangles.push(rectangle);
    // Broadcast to ALL clients including the sender
    io.emit('rectangle:add', rectangle);
  });

  socket.on('rectangle:move', (data) => {
    const rectangle = rectangles.find(r => r.id === data.id);
    if (rectangle) {
      rectangle.x = data.x;
      rectangle.y = data.y;
      // Broadcast to ALL clients except the sender
      socket.broadcast.emit('rectangle:move', data);
    }
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected:', socket.id);
  });
});

const PORT = process.env.PORT || 3001;
httpServer.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
