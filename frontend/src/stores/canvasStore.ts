import { create } from 'zustand';
import { Rectangle } from '../types';

interface CanvasState {
  rectangles: Rectangle[];
  addRectangle: (rectangle: Rectangle) => void;
  updateRectanglePosition: (id: string, x: number, y: number) => void;
  setRectangles: (rectangles: Rectangle[]) => void;
}

export const useCanvasStore = create<CanvasState>((set) => ({
  rectangles: [],
  addRectangle: (rectangle) => set((state) => ({ 
    rectangles: state.rectangles.some(r => r.id === rectangle.id)
      ? state.rectangles
      : [...state.rectangles, rectangle] 
  })),
  updateRectanglePosition: (id, x, y) => set((state) => ({
    rectangles: state.rectangles.map(rect => 
      rect.id === id ? { ...rect, x, y } : rect
    )
  })),
  setRectangles: (rectangles) => set({ rectangles }),
}));
