"use client";
import React, { useState } from "react";
import { Box, Button, TextField, Typography, Paper } from "@mui/material";
import { User } from "@/interface";
import { message } from "antd";
import useStore from "@/store";

const NameEntry: React.FC = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const { setMyInfo,Loggin } = useStore();
  const [user, setUser] = useState<User>({
    id: "0",
    name: "Aj verma",
    role: "Chori",
    avatar: "https://i.pravatar.cc/150?img=40",
    socketId: "1",
  });

  const handleInputChange = (field: keyof User, value: string) => {
    setUser((prev) => ({
      ...prev,
      [field]: value.trim(),
    }));
  };

  const handleStart = async () => {
    let isUserDataOkay = true;
    for (const key of Object.keys(user)) {
      if (user[key as keyof User] === "") {
        messageApi.open({
          type: "warning",
          content: `${key.toUpperCase()} is not filled!`,
        });
        isUserDataOkay = false;
        break;
      }
    }
    if (isUserDataOkay) {
      setMyInfo(user);
      Loggin(true);
    }
  };

  return (
    <div>
      <Box
        sx={{
          height: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          bgcolor: "#f5f5f5",
        }}
      >
        {contextHolder}
        <Paper elevation={3} sx={{ p: 4, maxWidth: 400, mx: "auto" }}>
          {(["name", "id", "role", "avatar"] as (keyof User)[]).map((field) => (
            <div key={field}>
              <Typography variant="h5" gutterBottom>
                Enter your {field}
              </Typography>
              <TextField
                required
                fullWidth
                label={`Your ${field}`}
                variant="outlined"
                value={user[field]}
                onChange={(e) => handleInputChange(field, e.target.value)}
                sx={{ my: 2 }}
              />
            </div>
          ))}

          <Button
            fullWidth
            variant="contained"
            color="primary"
            onClick={handleStart}
            disabled={
              !user.name.trim() ||
              !user.id.trim() ||
              !user.role.trim() ||
              !user.avatar.trim()
            }
          >
            Get Started
          </Button>
        </Paper>
      </Box>
    </div>
  );
};

export default NameEntry;