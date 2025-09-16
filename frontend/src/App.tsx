import { useEffect, useMemo } from 'react';
import { Socket } from 'socket.io-client';
import Canvas from './components/Canvas';
import { useCanvasStore } from './stores/canvasStore';
import { Rectangle, ServerToClientEvents, ClientToServerEvents } from './types';
import { getSocket } from './socket';

function App() {
  const socket: Socket<ServerToClientEvents, ClientToServerEvents> = useMemo(() => getSocket(), []);
  const { rectangles, addRectangle, updateRectanglePosition, setRectangles } = useCanvasStore();

  useEffect(() => {
    socket.on('rectangles:init', (initialRectangles: Rectangle[]) => {
      setRectangles(initialRectangles);
    });

    socket.on('rectangle:move', (data: { id: string; x: number; y: number }) => {
      updateRectanglePosition(data.id, data.x, data.y);
    });

    return () => {
      socket.off('rectangles:init');
      socket.off('rectangle:move');
    };
  }, [socket, setRectangles, updateRectanglePosition]);
 
  useEffect(() => {
    socket.on('rectangle:add', (rectangle: Rectangle) => {
      addRectangle(rectangle);
    });
    return () => {
      socket.off('rectangle:add');
    };
  }, [socket, addRectangle]);

  const handleAddRectangle = () => {
    const newRect: Rectangle = {
      id: Math.random().toString(36).substr(2, 9),
      x: Math.random() * 400,
      y: Math.random() * 400,
      width: 50 + Math.random() * 100,
      height: 50 + Math.random() * 100,
      fill: `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0')}`
    };

    socket.emit('rectangle:add', newRect);
  };

  const handleDragMove = (id: string, x: number, y: number) => {
    socket.emit('rectangle:move', { id, x, y });
    updateRectanglePosition(id, x, y);
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
        <Canvas onDragMove={handleDragMove} />
      </div>
    </div>
  );
}

export default App;
