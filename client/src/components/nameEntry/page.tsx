"use client";
// components/NameEntry.tsx
import { useState } from "react";
import { Box, Button, TextField, Typography, Paper } from "@mui/material";
import { User } from "@/interface";
import { message } from "antd";
import useStore from "@/store";

interface NameEntryProps {
  Login: (value: boolean) => void;
}

const NameEntry: React.FC<NameEntryProps> = ({ Login }) => {
  const [messageApi, contextHolder] = message.useMessage();
  const { setMyInfo } = useStore();
  const [user, setUser] = useState<User>({
    id: "0",
    name: "Aj verma",
    role: "Chori",
    avatar: "https://i.pravatar.cc/150?img=40",
    socketId: "1",
  });

  const handleStart = async () => {
    let isUserDataOkay: Boolean = true;
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
      Login(true);
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
          {(["name", "id", "role", "avatar"] as (keyof User)[]).map(
            (field, i) => {
              return (
                <div key={i}>
                  <Typography variant="h5" gutterBottom>
                    Enter your {field}
                  </Typography>
                  <TextField
                    required
                    fullWidth
                    label={`Your ${field}`}
                    variant="outlined"
                    value={user[field]}
                    onChange={(e) =>
                      setUser((pre) => ({
                        ...pre,
                        [field]: e.target.value.trim(),
                      }))
                    }
                    sx={{ my: 2 }}
                  />
                </div>
              );
            }
          )}

          <Button
            fullWidth
            variant="contained"
            color="primary"
            onClick={handleStart}
            onKeyDown={(e) => e.key === "Enter" && handleStart()}
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
