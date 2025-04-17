"use client";
import {
  Container,
  Box,
  Typography,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Button,
} from "@mui/material";
import useStore from "@/store";
import { connect, disConnect, socketId, sendMyDetail } from "@/socket";
import { useState } from "react";

export default function UserComponent() {
  const {
    currentUser: { name, id, role, avatar },
  } = useStore();

  return (
    <Container maxWidth="xl">
      <Box
        sx={{
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            width: "90%",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 2,
          }}
        >
          <ListItem
            sx={{
              height: 60,
              width: 300,
              display: "flex",
              alignItems: "center",
              p: 2,
              bgcolor: "primary.light",
              borderRadius: 5,
              boxShadow: 1,
              "&:hover": {
                bgcolor: "primary.main",
                color: "white",
              },
              "&:active": {
                bgcolor: "primary.dark",
                color: "white",
              },
              transition: "background-color 0.3s ease",
              cursor: "pointer",
            }}
          >
            <ListItemAvatar>
              <Avatar
                sx={{
                  width: 40,
                  height: 40,
                  transition: "all 0.3s ease",
                  "&:hover": {
                    width: 60,
                    height: 60,
                    cursor: "pointer",
                  },
                }}
                src={avatar}
              />
            </ListItemAvatar>
            <ListItemText
              primary={id === "0" ? "YOU" : name}
              secondary={role}
              slotProps={{ primary: { style: { fontWeight: "bold" } } }}
            />
          </ListItem>
          <Typography variant="h6" gutterBottom>
            <ColorToggleButton />
          </Typography>
        </Box>
      </Box>
    </Container>
  );
}

const ColorToggleButton = () => {
  const { setMyInfo, myInfo } = useStore();
  const [clicked, setClicked] = useState<boolean>(false);

  const handleConnect = async () => {
    connect();
    const id = (await socketId()) || "";
    const updatedInfo = { ...myInfo, socketId: id };
    setMyInfo(updatedInfo);
    sendMyDetail(updatedInfo);
    setClicked(true);
  };

  const handleDisconnect = () => {
    disConnect();
    setClicked(false);
  };

  return (
    <>
      {clicked ? "🟢" : "🔴"}
      <Button
        variant="contained"
        onClick={clicked ? handleDisconnect : handleConnect}
        sx={{
          backgroundColor: clicked ? "#4caf50" : "#e91e63",
          "&:hover": {
            backgroundColor: clicked ? "#388e3c" : "#1565c0",
          },
        }}
      >
        {myInfo.name}
      </Button>
    </>
  );
};