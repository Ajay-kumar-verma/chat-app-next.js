// socket.ts
import { io } from "socket.io-client";
import { Message, User } from "@/interface";
const socket = io("http://localhost:3001", {
  autoConnect: false, // disable auto connection
});

export default socket;

export const connect = () => {
  socket.connect();
};

export const socketId = async () => {
  await new Promise((resolve) => {
    setTimeout(() => {
      resolve(`Resolved`);
    }, 1000);
  });

  return socket.id;
};

export const onConnect = (callback: () => void) => {
  socket.on("connect", callback);
};

export const sendMyDetail = (user: User) => {
  socket.emit("myDetail", user);
};

export const getUsers = (callback: (users: User[]) => void) => {
  socket.on("getUsers", callback);
};

export const onNewUser = (callback: (user: User) => void) => {
  socket.on("newUser", callback);
};

export const sendMessage = (message: Message) => {
  socket.emit("message", message);
};

export const onMessage = (callback: (message: Message) => void) => {
  socket.on("message", callback);
};

export const disConnect = () => {
  socket.disconnect();
};

export const onDisconnect = (callback: (socketId: string) => void) => {
  socket.on("userDisconneted", callback);
};

export const pingApi = async () => {
  const response = await fetch("http://localhost:3001/api/ping");
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
};
