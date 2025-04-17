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

export default function RootLayout() {
  const {
    currentUser: { name, id, role, avatar },
  } = useStore();

  return (
    <Container maxWidth="xl">
      <Box
        sx={{
          height: "100%",
          display: "flex",
          flexDirection: "column", // stack children vertically
          justifyContent: "center", // center vertically
          alignItems: "center", // center horizontally
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
              width: 300, // Adjust height for the normal state
              display: "flex",
              alignItems: "center",
              p: 2, // Adjust padding for the normal state
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
              cursor: "pointer", // Pointer cursor to indicate interactivity
            }}
          >
            <ListItemAvatar>
              <Avatar
                sx={{
                  width: 40,
                  height: 40,
                  transition: "all 0.3s ease", // Smooth transition for width and height change
                  "&:hover": {
                    width: 60, // Increase width on hover
                    height: 60, // Increase height on hover
                    cursor: "pointer", // Change cursor to indicate interactivity
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
  const [clicked, setClicked] = useState(false);

  const handleClick = async () => {
    connect();
    const id = (await socketId()) || "";
    setMyInfo({ ...myInfo, socketId: id });
    sendMyDetail({ ...myInfo, socketId: id });
    setClicked((prev) => !prev);
  };

  return (
    <>
      {clicked ? "🟢" : "🔴"}
      <Button
        variant="contained"
        onClick={
          clicked
            ? () => {
                disConnect();
                setClicked((prev) => !prev);
              }
            : handleClick
        }
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
