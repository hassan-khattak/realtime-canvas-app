import React from 'react';
import { Stage, Layer, Rect } from 'react-konva';
import { useCanvasStore } from '../stores/canvasStore';
import { Socket } from 'socket.io-client';
import { ClientToServerEvents, ServerToClientEvents } from '../types';

interface CanvasProps {
  onDragMove: (id: string, x: number, y: number) => void;
  socket: Socket<ServerToClientEvents, ClientToServerEvents>;
}

const Canvas: React.FC<CanvasProps> = ({ onDragMove, socket }) => {
  const rectangles = useCanvasStore((state) => state.rectangles);
  
  console.log('Canvas rendering with rectangles:', rectangles);

  return (
    <Stage width={window.innerWidth} height={window.innerHeight - 50}>
      <Layer>
        {rectangles.map((rect) => (
          <Rect
            key={rect.id}
            id={rect.id}
            x={rect.x}
            y={rect.y}
            width={rect.width}
            height={rect.height}
            fill={rect.fill}
            draggable
            onDragMove={(e) => {
              console.log('Drag move:', rect.id, e.target.x(), e.target.y());
              onDragMove(rect.id, e.target.x(), e.target.y());
            }}
            onDragEnd={(e) => {
              console.log('Drag end:', rect.id, e.target.x(), e.target.y());
            }}
          />
        ))}
      </Layer>
    </Stage>
  );
};

export default Canvas;
