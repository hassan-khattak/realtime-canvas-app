import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const app = express();
const httpServer = createServer(app);

// Get configuration from environment variables
const PORT = process.env.PORT || 3001;
const CORS_ORIGIN = process.env.CORS_ORIGIN || "http://localhost:5173";
const NODE_ENV = process.env.NODE_ENV || "development";

const io = new Server(httpServer, {
  cors: {
    origin: CORS_ORIGIN,
    methods: ["GET", "POST"]
  }
});

app.use(cors({
  origin: CORS_ORIGIN
}));
app.use(express.json());

io.on('connection', (socket) => {
  console.log('Client connected:', socket.id);
  
  if (NODE_ENV === 'development') {
    console.log('Development mode: verbose logging enabled');
  }

  socket.on('disconnect', () => {
    console.log('Client disconnected:', socket.id);
  });
});

httpServer.listen(PORT, () => {
  console.log(`Server running in ${NODE_ENV} mode on port ${PORT}`);
  console.log(`CORS enabled for: ${CORS_ORIGIN}`);
});
