// socket.ts
import { io } from "socket.io-client";
import { Message, User } from "@/interface";
const socket = io("http://localhost:3001", {
  autoConnect: false, // disable auto connection
});

export default socket;

export const socketId = () => {
  return socket.id;
};

export const connect = () => {
  socket.connect();
};
export const onConnect = (callback: () => void) => {
  socket.on("connect", callback);
};

export const onMessage = (callback: (message: Message) => void) => {
  socket.on("message", callback);
};

export const sendMessage = (message: Message) => {
  socket.emit("message", message);
};

export const getUsers = (callback: (users: User[]) => void) => {
  socket.on("getUsers", callback);
};

export const disconnect = () => {
  socket.disconnect();
};

export const pingApi = async () => {
  const response = await fetch("http://localhost:3001/api/ping");
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
};
