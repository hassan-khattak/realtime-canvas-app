// frontend/src/components/Canvas.tsx - Basic version
import React from 'react';
import { Stage, Layer, Rect } from 'react-konva';

const Canvas: React.FC = () => {
  return (
    <div className="mt-4 border border-gray-300 rounded">
      <Stage width={800} height={600}>
        <Layer>
          <Rect
            x={100}
            y={100}
            width={50}
            height={50}
            fill="red"
            draggable
          />
        </Layer>
      </Stage>
    </div>
  );
};

export default Canvas;
