"use client";
import { useEffect, useState } from "react";
import NameEntry from "@/components/nameEntry/page";
import ChatComponent from "@/components/chatComponent"; // Your main chat logic


export default function ChatRoom() {
  const [login, setLogin] = useState<Boolean>(false);
  
  if (!login) {
    return <NameEntry Login={setLogin} />;
  }
  return <ChatComponent />;
}
