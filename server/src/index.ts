import express from 'express';
import http from 'http';
import { Server as SocketIOServer } from 'socket.io';
import cors from 'cors';

const app = express();
const server = http.createServer(app);
const io = new SocketIOServer(server, {
  cors: {
    origin: 'http://localhost:3000', // frontend URL
    methods: ['GET', 'POST']
  }
});

app.use(cors());
app.use(express.json());

app.get('/api/ping', (req, res) => {
  res.json({ message: 'pong' });
});

 interface User {
  id: string;
  name?: string;
  role?: string;
  avatar?: string;
}

const users: User[] = [];

io.on('connection', (socket) => {
  users.push({ id: socket.id }) 
  console.log('Socket connected:', socket.id);
  socket.broadcast.emit('getUsers',users)

  socket.emit('message',{user:"Team", text:'Welcome to the chat!'}); // send a welcome message to the client

  socket.on('message', (data) => {
    console.log('Received message:', data);
    socket.broadcast.emit('message', data); // broadcast to other clients
  });

  socket.on('disconnect', () => {
    console.log('Socket disconnected:', socket.id);
  });
});

server.listen(3001, () => {
  console.log('Backend running at http://localhost:3001');
});
