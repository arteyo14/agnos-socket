import express from 'express';
import http from 'http';
import { Server } from 'socket.io';

const app = express();
const server = http.createServer(app);
const io = new Server({
  cors: {
    origin: '*',
  },
});

io.on('connection', (socket) => {
  console.log('Client connected:', socket.id);

  socket.emit('message', 'Welcome to Socket.IO server!');

  /* ==== Join Socket Room Event ==== */
  socket.on('joinRoom', ({ patient_id }: { patient_id: string }) => {
    const room = `patient_${patient_id}`;
    socket.join(room);
    console.log(`${socket.id} joined room: ${room}`);
  });

  /* ==== Typing Start Event ==== */
  socket.on(
    'typing:start',
    ({
      patient_id,
      field,
      value,
    }: {
      patient_id: string;
      field: string;
      value: string;
    }) => {
      const room = `patient_${patient_id}`;
      socket.to(room).emit('typing', { field, value, is_typing: true });
    }
  );

  /* ==== Typing Stop Event ==== */
  socket.on(
    'typing:stop',
    ({ patient_id, field }: { patient_id: string; field: string }) => {
      const room = `patient_${patient_id}`;
      socket.to(room).emit('typing:update', { field, is_typing: false });
    }
  );

  socket.on('disconnect', () => {
    console.log('Client disconnected:', socket.id);
  });
});

app.get('/', (_, res) => {
  res.send('Socket.IO + Express server is running');
});

const PORT = process.env.PORT || 4000;
server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
