# 🎨 Real-time Collaborative Canvas App

A Responsive, real-time collaborative canvas application built with React, TypeScript, Node.js, and Socket.io. Create and manipulate rectangles in real-time with multiple users!

## ✨ Features

- 🎯 **Real-time Collaboration** - Multiple users can interact simultaneously
- 🔷 **Rectangle Creation** - Add colorful rectangles with a single click
- 🖱️ **Drag & Drop** - Move rectangles around the canvas effortlessly  
- 🌐 **WebSocket Communication** - Instant updates across all connected clients
- 🎨 **Beautiful UI** - Modern design with Tailwind CSS
- 📱 **Responsive Design** - Works perfectly on desktop and mobile
- ⚡ **TypeScript** - Full type safety for better development experience

## 🚀 Local Demo

![demo](https://github.com/user-attachments/assets/2fc9aaa0-237b-438e-8a24-0fcd1094d1fa)


Follow these steps to run the application locally and experience real-time collaboration:

### Prerequisites
- Node.js 16+ 
- npm or yarn
- Git

### 1. Clone and Setup the Repository

```bash
# Clone the repository
git clone [repository-url](https://github.com/hassan-khattak/realtime-canvas-app.git)
cd realtime-canvas-app

# Setup backend
cd backend
npm install
cp .env.example .env

# Setup frontend  
cd ../frontend
npm install
cp .env.example .env
```

### 2. Configure Environment

**Backend (.env):**
```env
PORT=3001
NODE_ENV=development
CORS_ORIGIN=http://localhost:5173
CLIENT_URL=http://localhost:5173
```

**Frontend (.env):**
```env
VITE_APP_NAME=Real-time Canvas App
VITE_APP_VERSION=1.0.0
VITE_API_URL=http://localhost:3001
VITE_NODE_ENV=development
```

### 3. Start the Application

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
```
*Server will start on http://localhost:3001*

**Terminal 2 - Frontend:**
```bash
cd frontend  
npm run dev
```
*Application will start on http://localhost:5173*

### 4. Experience Real-time Collaboration

1. **Open first browser window**: Navigate to `http://localhost:5173`
2. **Open second browser window**: Navigate to `http://localhost:5173` in a new tab or different browser
3. **Add rectangles**: Click "Add Rectangle" in one window
4. **Watch real-time updates**: See rectangles appear instantly in both windows
5. **Drag rectangles**: Move any rectangle and watch it sync across all windows

## 🛠️ Tech Stack

**Frontend:**
- React.js with TypeScript
- Vite for fast development
- Tailwind CSS for styling
- React Konva for canvas manipulation
- Zustand for state management
- Socket.io-client for real-time communication

**Backend:**
- Node.js with TypeScript
- Express.js server
- Socket.io for WebSocket communication
- CORS for cross-origin requests

## 📁 Project Structure

```
realtime-canvas-app/
├── backend/
│   ├── src/
│   │   ├── index.ts          # Socket.io server (port 3001)
│   │   └── types.ts          # TypeScript definitions
│   ├── package.json
│   ├── tsconfig.json
│   └── .env
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   └── Canvas.tsx    # Main canvas component
│   │   ├── stores/
│   │   │   └── canvasStore.ts # Zustand state management
│   │   ├── App.tsx           # Main application component
│   │   ├── main.tsx          # React entry point
│   │   └── types.ts          # TypeScript definitions
│   ├── package.json
│   ├── vite.config.ts
│   ├── tailwind.config.js
│   └── .env
└── README.md
```

## 🔧 Development Commands

### Running the Application
```bash
# Start backend (http://localhost:3001)
cd backend && npm run dev

# Start frontend (http://localhost:5173)
cd frontend && npm run dev
```

### Building for Production
```bash
# Build backend
cd backend && npm run build

# Build frontend
cd frontend && npm run build
```

### Debugging Tips

1. **Enable verbose logging** by checking browser console and terminal outputs
2. **Verify environment variables** are correctly set in both .env files
3. **Check network tab** in browser devtools for WebSocket connections
4. **Restart both servers** if changes aren't reflecting

## 📊 Performance Notes

- ⚡ **Low Latency**: Local network provides <10ms response times
- 📈 **High Capacity**: Handles 50+ simultaneous rectangles smoothly
- 🔄 **Efficient Sync**: Only position data is transmitted (minimal bandwidth)
- 💾 **Memory Efficient**: Minimal state management with Zustand


## 📋 Future Features & Improvements

### 🎨 Enhanced Drawing Tools
- **Multiple Shapes**: Circles, triangles, lines, and freehand drawing
- **Drawing Tools**: Pen, brush, eraser, and shape tools
- **Color Palette**: Custom color picker and predefined color schemes
- **Layer System**: Multiple layers for complex drawings
- **Text Tool**: Add text annotations and labels

### 👥 Advanced Collaboration
- **User Presence**: See who's online and what they're working on
- **User Cursors**: Real-time cursor tracking for each user
- **User Colors**: Assign unique colors to different users
- **Chat System**: In-app messaging for collaboration
- **Permission System**: Admin controls and user roles

### 💾 Data Management
- **Save/Load**: Save canvas states and load previous sessions
- **Export Options**: Export as PNG, SVG, or PDF
- **Version History**: Track changes and revert to previous versions
- **Database Integration**: Persistent storage with PostgreSQL/MongoDB
- **Cloud Storage**: Integration with AWS S3 or Google Cloud Storage

### 🎯 Performance & UX
- **Optimistic Updates**: Instant UI feedback with conflict resolution
- **Offline Support**: Work offline and sync when reconnected
- **Mobile Optimization**: Touch gestures and mobile-specific features
- **Performance Monitoring**: Real-time performance metrics
- **Accessibility**: Screen reader support and keyboard navigation

### 🔒 Security & Scalability
- **Authentication**: User accounts and secure login
- **Rate Limiting**: Prevent spam and abuse
- **Room System**: Create private rooms for specific projects
- **Scalability**: Horizontal scaling with Redis and load balancing
- **Security**: Input validation and XSS protection

### 🎪 Advanced Features
- **Undo/Redo**: Full history management
- **Copy/Paste**: Duplicate shapes and elements
- **Grouping**: Group multiple elements together
- **Templates**: Pre-made templates and shapes
- **Animations**: Animated transitions and effects
- **Plugins**: Extensible plugin system

## 🐛 Known Issues

- Rectangle count may show duplicates in some edge cases
- Performance may degrade with very large numbers of rectangles
- Mobile touch events need optimization for better responsiveness

---
