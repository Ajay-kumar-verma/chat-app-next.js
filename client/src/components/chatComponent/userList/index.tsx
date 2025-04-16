"use client";
import React from "react";
import {
  Avatar,
  Box,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
  Divider,
} from "@mui/material";
import useStore from "@/store";


const UserList = () => {
  const { CurrentUserId, setUserDetails ,Users} = useStore();

  const handleUserClick = (user: {
    id: string;
    name: string;
    role: string;
    avatar: string;
  }) => {
    console.log(`User clicked:`, user);
    // Update the store with the clicked user's details
    setUserDetails({
      CurrentUserName: user.name,
      CurrentUserId: user.id.toString(),
      CurrentUserAvatar: user.avatar,
      currentUserRole: user.role,
    });
    // Optionally, you can navigate to a different page or perform other actions here
  };
  return (
    <Box sx={{ maxWidth: 800, margin: "auto", mt: 5 ,}}>
      <Card elevation={4} sx={{ borderRadius: 4 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            👥 Team Members
          </Typography>

          {/* Scrollable List Container */}
          <Box
            sx={{
              maxHeight: { xs: 300, sm: 400, md: 500 },
              overflowY: "auto", // Scroll only when necessary
              pr: 1, // Prevents scrollbar overlap
            }}
          >
            <List>
              {Users.map((user, index) => (
                <React.Fragment key={user.name}>
                  <ListItem
                    onClick={() => handleUserClick(user)}
                    sx={{
                      height: 60, // Adjust height for the normal state
                      display: "flex",
                      alignItems: "center",
                      borderRadius: 4,
                      boxShadow: 1,
                      p: 2, // Adjust padding for the normal state
                      bgcolor:
                        user?.id === CurrentUserId
                          ? "primary.light"
                          : "transparent", // highlight selected
                      border: user?.id === CurrentUserId ? "1px solid" : "none",
                      borderColor:
                        user?.id === CurrentUserId
                          ? "primary.main"
                          : "transparent",
                      transition:
                        "transform 0.5s ease, background-color 0.4s ease", // Smooth transition
                      "&:hover": {
                        backgroundColor: "grey.200", // Change background on hover
                        transform: "scale(.9)", // Reduce size to 98% on hover
                        cursor: "pointer", // Pointer cursor to indicate interactivity
                      },
                    }}
                  >
                    <ListItemAvatar>
                      <Avatar
                        sx={{ width: 32, height: 32 }}
                        src={user.avatar}
                      />
                    </ListItemAvatar>
                    <ListItemText
                      primary={user.name}
                      secondary={user.role}
                      slotProps={{ primary: { style: { fontWeight: "bold" } } }}
                    />
                  </ListItem>
                  {index < Users.length - 1 && (
                    <Divider variant="inset" component="li" />
                  )}
                </React.Fragment>
              ))}
            </List>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default UserList;
