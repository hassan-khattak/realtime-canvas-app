export interface Rectangle {
    id: string;
    x: number;
    y: number;
    width: number;
    height: number;
    fill: string;
  }
  
  export interface ClientToServerEvents {
    'rectangle:add': (rectangle: Rectangle) => void;
    'rectangle:move': (data: { id: string; x: number; y: number }) => void;
  }
  
  export interface ServerToClientEvents {
    'rectangles:init': (rectangles: Rectangle[]) => void;
    'rectangle:add': (rectangle: Rectangle) => void;
    'rectangle:move': (data: { id: string; x: number; y: number }) => void;
  }