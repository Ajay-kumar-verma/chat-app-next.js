"use client";

import React from "react";
import { Box, Container, IconButton, TextField } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";

export default function chat() {
  const [Name, setName] = React.useState<string>("");


  return (
    <Container
      maxWidth="xl"
      sx={{
        height: "100%",
        mx: "auto",
        display: "flex",
        flexDirection: "column",
        p: 2,
      }}
    >
       
        <Container
          maxWidth="xl"
          sx={{
            height: "100%",
            mx: "auto",
            display: "flex",
            flexDirection: "column",
            p: 2,
          }}
        >
          <Box sx={{ display: "flex", gap: 1 }}>
            <TextField
              fullWidth
              size="small"
              placeholder="type your name..."
              variant="outlined"
              value={Name}
              onChange={(e) => setName(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" }
            />
            <IconButton color="primary" onClick={() => console.log("JoinChat")}>
              <SendIcon />
            </IconButton>
          </Box>
        </Container>
    </Container>
  );
}
