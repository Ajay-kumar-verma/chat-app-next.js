"use client";
import React, { useEffect } from "react";
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
import { User } from "@/interface";
import useStore from "@/store";
import { getUsers, onNewUser, onDisconnect } from "@/socket";

const UserList = () => {
  const { currentUser, setCurrentUser, addUsers, Users, removeUser } =
    useStore();

  const handleUserClick = (user: User) => {
    setCurrentUser(user);
  };

  useEffect(() => {
    getUsers((users: User[]) => {
      addUsers(users);
      console.log("All Users", { users });
    });

    onNewUser((user: User) => {
      addUsers([user]);
      console.log("new user joinned: ", user);
    });

    onDisconnect((socketId: string) => {
      removeUser(socketId);
    });
  });

  return (
    <Box sx={{ maxWidth: 800, margin: "auto", mt: 5 }}>
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
              {Users.length === 0 ? (
                <Typography variant="body1" color="text.secondary">
                  No team member has joined.
                </Typography>
              ) : (
                Users.map((user, index) => (
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
                          user?.id === currentUser.id
                            ? "primary.light"
                            : "transparent", // highlight selected
                        border:
                          user?.id === currentUser.id ? "1px solid" : "none",
                        borderColor:
                          user?.id === currentUser.id
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
                        slotProps={{
                          primary: { style: { fontWeight: "bold" } },
                        }}
                      />
                    </ListItem>
                    {index < Users.length - 1 && (
                      <Divider variant="inset" component="li" />
                    )}
                  </React.Fragment>
                ))
              )}
            </List>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default UserList;
