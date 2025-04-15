// socket.ts
import { io } from "socket.io-client";

const socket = io("http://localhost:3001", {
  autoConnect: false, // disable auto connection
});

export default socket;

export const connectSocket = () => {
  socket.connect();
};

export const sendMessage = (message: string) => {
  socket.emit("message", message);
};

export const onMessage = (callback: (message: string) => void) => {
  socket.on("message", callback);
};

export const disconnectSocket = () => {
  socket.disconnect();
};

export const pingApi = async () => {
  const response = await fetch("http://localhost:3001/api/ping");
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
};
