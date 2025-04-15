"use client";
import React, { useState, useRef, useEffect } from "react";
import { Box, Paper } from "@mui/material";
import UserList from "./userList";
import ChatSection from "./chat";
const ENDPOINT = "localhost:2000";
// const socket = io(ENDPOINT);

interface BeautifulChatProps {
  username: string;
}

const initialMessages: { user: string; text: string }[] = [
  { user: "Alice", text: "Hey there! 👋 How's it going?" },
  {
    user: "Bob",
    text: "Hey! 😄 All good here. Just working on the project. 💻",
  },
  {
    user: "Alice",
    text: "Nice! 👍 Let me know if you need help with anything. 🧠",
  },
  { user: "Bob", text: "Sure thing, appreciate it! 🙌" },
];

const BeautifulChat = ({ username }: BeautifulChatProps) => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] =
    useState<{ user: string; text: string }[]>(initialMessages);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scrollToBottom = () => {
      if (bottomRef.current) {
        bottomRef.current.scrollIntoView({ behavior: "smooth" });
      }
    };
    scrollToBottom();
  }, [messages]);

  const handleSend = () => {
    if (message.trim() === "") return;
    const msg = { user: username, text: message };
    setMessages((prev) => [...prev, { ...msg, user: "me" }]);
    setMessage("");
  };

  return (
    <Paper
      elevation={3}
      sx={{
        flexGrow: 1,
        p: 1,
        overflowY: "auto",
        mb: 2,
        mx: 1,
        borderRadius: 2,
        bgcolor: "background.default",
        maxHeight: "calc(100vh - 150px)", // Limit height
      }}
    >
      <Box display="flex" alignItems="center" justifyContent="space-between">
        <UserList />
        <Paper
          elevation={3}
          sx={{
            flexGrow: 1,
            p: 1,
            overflowY: "auto",
            mb: 2,
            mx: 1,
            borderRadius: 2,
            bgcolor: "background.default",
            maxHeight: "calc(100vh - 150px)", // Limit height
          }}
        >
          <ChatSection />
        </Paper>
      </Box>
      <div ref={bottomRef} />
    </Paper>
  );
};

export default BeautifulChat;
