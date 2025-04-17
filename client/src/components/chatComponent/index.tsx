"use client";
import React from "react";
import { Box, Paper } from "@mui/material";
import UserList from "./userList";
import ChatSection from "./chat";

const BeautifulChat = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        height: "100vh",
        bgcolor: "background.default",
        p: 1,
      }}
    >
      {/* User List Section */}
      <Paper
        elevation={3}
        sx={{
          flex: "0 0 300px", // Fixed width for the user list
          p: 1,
          overflowY: "auto",
          borderRadius: 2,
          bgcolor: "background.paper",
          mr: 2, // Add margin to separate from chat section
        }}
      >
        <UserList />
      </Paper>

      {/* Chat Section */}
      <Paper
        elevation={3}
        sx={{
          flexGrow: 1,
          p: 1,
          overflowY: "auto",
          borderRadius: 2,
          bgcolor: "background.paper",
        }}
      >
        <ChatSection />
      </Paper>
    </Box>
  );
};

export default BeautifulChat;