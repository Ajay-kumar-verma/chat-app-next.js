import express from "express";
import http from "http";
import { Server as SocketIOServer } from "socket.io";
import cors from "cors";

const app = express();
const server = http.createServer(app);
const io = new SocketIOServer(server, {
  cors: {
    origin: "http://localhost:3000", // frontend URL
    methods: ["GET", "POST"],
  },
});

app.use(cors());
app.use(express.json());

app.get("/api/ping", (req, res) => {
  res.json({ message: "pong" });
});

interface User {
  id: string;
  name: string;
  role: string;
  avatar: string;
  socketId: string;
}

let users: User[] = [];

io.on("connection", (socket) => {
  socket.emit("message", { user: "Team", text: "Welcome to the chat!" }); // send a welcome message to the client

  socket.on("myDetail", (user: User) => {
    socket.broadcast.emit("newUser", user);
    socket.emit("getUsers", users);
    users.push(user);
    console.log("All connected users: ", users);
  });

  socket.on("message", (data) => {
    io.to(data.to.socketId).emit("message", data);
  });

  socket.on("disconnect", () => {
    console.log("Socket ID: ", socket.id, users);
    users = users.filter(({ socketId }) => socketId !== socket.id);
    console.log("After filter: ", users);
    socket.broadcast.emit("userDisconneted", socket.id);
  });
});

server.listen(3001, () => {
  console.log("Backend running at http://localhost:3001");
});
