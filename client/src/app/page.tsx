"use client";
import { useState } from "react";
import NameEntry from "@/components/nameEntry/page";
import ChatComponent from "@/components/chatComponent";

export default function ChatRoom() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  return isLoggedIn ? (
    <ChatComponent />
  ) : (
    <NameEntry Login={setIsLoggedIn} />
  );
}