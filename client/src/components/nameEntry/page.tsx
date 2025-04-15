"use client";
// components/NameEntry.tsx
import { useState } from "react";
import { Box, Button, TextField, Typography, Paper } from "@mui/material";

interface NameEntryProps {
  onSubmit: (name: string) => void;
}

const NameEntry = ({ onSubmit }: NameEntryProps) => {
  const [name, setName] = useState("");

  const handleStart = () => {
    if (name.trim()) {
      onSubmit(name.trim());
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
      <Paper elevation={3} sx={{ p: 4, maxWidth: 400, mx: "auto"  }}>
        <Typography variant="h5" gutterBottom>
          Enter your name to start chatting
        </Typography>
        <TextField
          fullWidth
          label="Your Name"
          variant="outlined"
          value={name}
          onChange={(e) => setName(e.target.value)}
          sx={{ my: 2 }}
        />
        <Button
          fullWidth
          variant="contained"
          color="primary"
          onClick={handleStart}
          disabled={!name.trim()}
        >
          Get Started
        </Button>
      </Paper>
    </Box>
  );
};

export default NameEntry;
