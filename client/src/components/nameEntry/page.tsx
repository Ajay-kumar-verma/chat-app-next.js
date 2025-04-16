"use client";
// components/NameEntry.tsx
import { useState } from "react";
import { Box, Button, TextField, Typography, Paper } from "@mui/material";
import { User } from "@/interface";
import { message, Space } from "antd";
import useStore from "@/store";

interface NameEntryProps {
  Login: (value: boolean) => void;
}

const NameEntry: React.FC<NameEntryProps> = ({ Login }) => {
  const [messageApi, contextHolder] = message.useMessage();
  const { setCurrentUser,addUser } = useStore();
   console.log("fsdf")
  const [user, setUser] = useState<User>({
    id: "321",
    name: "Aj verma",
    role: "Chori",
    avatar: "https://i.pravatar.cc/150?img=40",
  });

  const handleStart = () => {
    console.log({ user });
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
 if(isUserDataOkay){
  setCurrentUser(user);
  addUser(user);
  Login(true)
 }

  };

  return (
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
        {(["name", "id", "role", "avatar"] as (keyof User)[]).map((field) => {
          return (
            <>
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
                  setUser((pre) => ({ ...pre, [field]: e.target.value.trim() }))
                }
                sx={{ my: 2 }}
              />
            </>
          );
        })}

        <Button
          fullWidth
          variant="contained"
          color="primary"
          onClick={handleStart}
          onKeyDown={(e) => e.key === "Enter" && handleStart()}
          // disabled={!name.trim()}
        >
          Get Started
        </Button>
      </Paper>
    </Box>
  );
};

export default NameEntry;
