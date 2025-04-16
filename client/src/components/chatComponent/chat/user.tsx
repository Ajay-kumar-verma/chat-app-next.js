"use client";
import {
  Container,
  Box,
  Typography,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
} from "@mui/material";
import useStore from "@/store";

export default function RootLayout() {
  const { CurrentUserName, CurrentUserId, currentUserRole, CurrentUserAvatar } =
    useStore();
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
                src={CurrentUserAvatar}
              />
            </ListItemAvatar>
            <ListItemText
              primary={CurrentUserId === "0" ? "YOU" : CurrentUserName}
              secondary={currentUserRole}
              slotProps={{ primary: { style: { fontWeight: "bold" } } }}
            />
          </ListItem>

          <Typography variant="h6" gutterBottom>
            User ID <strong>{CurrentUserId}</strong>
          </Typography>
        </Box>
      </Box>
    </Container>
  );
}
