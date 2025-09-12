import React, { useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';
import Canvas from './components/Canvas';
import { useCanvasStore } from './stores/canvasStore';
import { Rectangle, ServerToClientEvents, ClientToServerEvents } from './types';

function App() {
  const [socket, setSocket] = useState<Socket<ServerToClientEvents, ClientToServerEvents> | null>(null);
  const { rectangles, addRectangle, updateRectanglePosition, setRectangles } = useCanvasStore();
  const [localRectangleIds, setLocalRectangleIds] = useState<Set<string>>(new Set()); // Add this state to track rectangles we've already added locally

  useEffect(() => {
    
    // Initialize socket connection
    const newSocket: Socket<ServerToClientEvents, ClientToServerEvents> = io('http://localhost:3001');
    setSocket(newSocket);

    // Handle initial rectangles load
    newSocket.on('rectangles:init', (initialRectangles: Rectangle[]) => {
      setRectangles(initialRectangles);
    });

    // Handle new rectangle added by any client
    newSocket.on('rectangle:add', (rectangle: Rectangle) => {
      addRectangle(rectangle);
    });

    // Handle rectangle moved by another client
    newSocket.on('rectangle:move', (data: { id: string; x: number; y: number }) => {
      updateRectanglePosition(data.id, data.x, data.y);
    });

    // Clean up on component unmount
    return () => {
      newSocket.close();
    };
  }, [addRectangle, updateRectanglePosition, setRectangles]);
 
  useEffect(() => {
    if (!socket) return;
    
    socket.on('rectangle:add', (rectangle: Rectangle) => {
      // Only add if this rectangle wasn't created by this client
      if (!localRectangleIds.has(rectangle.id)) {
        console.log('Received new rectangle from other client:', rectangle);
        addRectangle(rectangle);
      }
    });
    
    return () => {
      socket.off('rectangle:add');
    };
  }, [socket, addRectangle, localRectangleIds]);

  const handleAddRectangle = () => {
    if (socket) {
      const newRect: Rectangle = {
        id: Math.random().toString(36).substr(2, 9),
        x: Math.random() * 400,
        y: Math.random() * 400,
        width: 50 + Math.random() * 100,
        height: 50 + Math.random() * 100,
        fill: `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0')}`
      };
      
      socket.emit('rectangle:add', newRect);
      
      // Add to local tracking
      setLocalRectangleIds(prev => new Set(prev).add(newRect.id));
      
      // Add locally for immediate feedback
      addRectangle(newRect);
    }
  };

  const handleDragMove = (id: string, x: number, y: number) => {
    if (socket) {
      socket.emit('rectangle:move', { id, x, y });
      // Update locally for immediate feedback
      updateRectanglePosition(id, x, y);
    }
  };

  return (
    <div className="h-screen flex flex-col">
      <div className="bg-gray-800 text-white p-2">
        <button 
          onClick={handleAddRectangle}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Add Rectangle
        </button>
        <span className="ml-4">
          {rectangles.length} rectangles |{' '}
          {socket?.connected ? 'Connected' : 'Disconnected'}
        </span>
      </div>
      <div className="flex-1">
        {socket && <Canvas onDragMove={handleDragMove} socket={socket} />}
      </div>
    </div>
  );
}

export default App;
