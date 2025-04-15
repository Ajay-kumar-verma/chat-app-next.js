"use client";
import { useState } from "react";
import NameEntry from "@/components/nameEntry/page";
import ChatComponent from "@/components/chatComponent"; // Your main chat logic

export default function ChatRoom() {
  const [username, setUsername] = useState<string | null>("Ajay");


  if (!username) {
    return <NameEntry onSubmit={setUsername} />;
  }
  return <ChatComponent username={username} />;
}
