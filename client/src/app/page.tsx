"use client";
import { useState } from "react";
import NameEntry from "@/components/nameEntry/page";
import ChatComponent from "@/components/chatComponent"; // Your main chat logic

export default function ChatRoom() {
  const [login, setLogin] = useState<boolean>(false);

  if (!login) {
    return <NameEntry Login={setLogin} />;
  } else {
    return <ChatComponent />;
  }
}
