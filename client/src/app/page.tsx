"use client";
import { useEffect, useState } from "react";
import NameEntry from "@/components/nameEntry/page";
import ChatComponent from "@/components/chatComponent"; // Your main chat logic
import socket from "@/socket"; // adjust path as needed

export default function ChatRoom() {
  const [username, setUsername] = useState<string | null>();

  useEffect(() => {
    socket.connect();

    return () => {
      socket.disconnect();
    };
  }, [username]);
  if (!username) {
    return <NameEntry onSubmit={setUsername} />;
  }
  return <ChatComponent username={username} />;
}
