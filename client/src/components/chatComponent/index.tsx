"use client";
import React, { useState } from "react";
import { Box, Paper } from "@mui/material";
import UserList from "./userList";
import ChatSection from "./chat";

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
  useState<{ user: string; text: string }[]>(initialMessages);

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
        maxHeight: "calc(100vh - 1px)", // Limit height
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
    </Paper>
  );
};

export default BeautifulChat;
