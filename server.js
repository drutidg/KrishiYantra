const express = require('express');
const http = require('http');
const next = require('next');
const path = require('path');
const { Server } = require('socket.io');

const dev = process.env.NODE_ENV !== 'production';
const port = parseInt(process.env.PORT, 10) || 3000;
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = express();
  const httpServer = http.createServer(server);

  const io = new Server(httpServer, {
    cors: {
      origin: '*',
      methods: ['GET', 'POST', 'PATCH', 'DELETE'],
    },
    path: '/socket.io',
  });

  // Attach io to global for API routes
  global.__io = io;

  io.on('connection', (socket) => {
    console.log('⚡ Client connected to real-time queue:', socket.id);

    socket.on('join:center', (centerId) => {
      socket.join(`center:${centerId}`);
    });

    socket.on('join:booking', (bookingId) => {
      socket.join(`booking:${bookingId}`);
    });

    socket.on('join:user', (userId) => {
      socket.join(`user:${userId}`);
    });

    socket.on('disconnect', () => {
      // client disconnected
    });
  });

  // Body parsing middleware for API requests
  server.use(express.json());
  server.use(express.urlencoded({ extended: true }));

  // Serve the standalone chatbot page without modifying its source file.
  server.get('/krishi_mandi_mitra.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'krishi_mandi_mitra.html'));
  });

  // Mount modular Express REST API layer
  const apiRoutes = require('./server/routes');
  const { errorHandler } = require('./server/middleware/error.middleware');
  server.use('/api', apiRoutes);
  server.use(errorHandler);

  // Let Next.js handle all page views and client-side rendering
  server.all('*', (req, res) => {
    return handle(req, res);
  });

  httpServer.listen(port, (err) => {
    if (err) throw err;
    console.log(`> 🌾 KrishiYantra server running at http://localhost:${port}`);
    console.log(`> 📱 Farmer Portal: http://localhost:${port}/farmer/dashboard`);
    console.log(`> 🏢 Staff Dashboard: http://localhost:${port}/staff/dashboard`);
  });
});
