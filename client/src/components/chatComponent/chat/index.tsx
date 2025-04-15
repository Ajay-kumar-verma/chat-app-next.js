"use client";
import React, { useState, useRef, useEffect } from "react";
import {
  Box,
  TextField,
  IconButton,
  Typography,
  Stack,
  Container,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import User from "./user";
const ENDPOINT = "localhost:2000";
// const socket = io(ENDPOINT);

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

const BeautifulChat = () => {
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
    const msg = { user: "username", text: message };
    setMessages((prev) => [...prev, { ...msg, user: "me" }]);
    setMessage("");
  };

  return (
    <Container
      maxWidth="xl"
      sx={{
        height: "100%",
        mx: "auto",
        display: "flex",
        flexDirection: "column",
        p: 2,
        bgcolor: "background.paper",
      }}
    >
      <User />
      <Stack spacing={2}>
        {messages.length === 0 ? (
          <EmptyState message="No messages yet. Start the conversation!" />
        ) : (
          messages.map((msg, i) => {
            const isMe = msg.user === "me";
            return (
              <Box
                key={i}
                sx={{
                  display: "flex",
                  justifyContent: isMe ? "flex-end" : "flex-start",
                }}
              >
                <Box
                  sx={{
                    maxWidth: "75%",
                    bgcolor: isMe ? "primary.main" : "grey.300",
                    color: isMe ? "white" : "black",
                    px: 2,
                    py: 1,
                    borderRadius: 3,
                    borderTopRightRadius: isMe ? 0 : 3,
                    borderTopLeftRadius: isMe ? 3 : 0,
                    boxShadow: 1, // Added subtle shadow
                  }}
                >
                  {!isMe && (
                    <Typography
                      variant="caption"
                      sx={{ color: "text.secondary", mb: 0.5 }}
                    >
                      {msg.user}
                    </Typography>
                  )}
                  <Typography variant="body1">{msg.text}</Typography>
                </Box>
              </Box>
            );
          })
        )}
      </Stack>
      <Box sx={{ display: "flex", mt: 2, gap: 1 }}>
        <TextField
          fullWidth
          size="small"
          placeholder="Type a message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
          sx={{
            backgroundColor: "background.paper",
            borderRadius: 2,
            boxShadow: 1, // Added shadow for input field
          }}
        />
        <IconButton color="primary" onClick={handleSend}>
          <SendIcon />
        </IconButton>
      </Box>
      <div ref={bottomRef} />
    </Container>
  );
};

export default BeautifulChat;

function EmptyState({
  message = "Nothing to display",
  icon = <ChatBubbleOutlineIcon fontSize="large" />,
}) {
  return (
    <Box
      sx={{
        height: "100%",
        minHeight: 300,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        color: "grey.500",
        textAlign: "center",
        p: 2,
      }}
    >
      {icon}
      <Typography variant="h6" sx={{ mt: 1 }}>
        {message}
      </Typography>
    </Box>
  );
}
