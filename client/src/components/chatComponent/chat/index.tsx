"use client";
import React, { useState, useRef, useEffect } from "react";
import {
  Box,
  TextField,
  IconButton,
  Typography,
  Stack,
  Container,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import User from "./user";
import useStore from "@/store";
import { onMessage, sendMessage } from "@/socket";
import { Message } from "@/interface";

const BeautifulChat = () => {
  const { Messages, addMsg, currentUser, myInfo } = useStore();
  const [message, setMessage] = useState<string>("");
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleNewMessage = (message: Message) => {
      addMsg(message);
    };

    onMessage(handleNewMessage);

    const scrollToBottom = () => {
      if (bottomRef.current) {
        bottomRef.current.scrollIntoView({ behavior: "smooth" });
      }
    };

    scrollToBottom();

    return () => {
      // Cleanup listener when component unmounts
      onMessage(() => {});
    };
  }, [Messages, addMsg]);

  const handleSend = () => {
    if (message.trim() === "") return;

    const msg: Message = {
      from: { socketId: myInfo.socketId || "", name: myInfo.name },
      to: { socketId: currentUser.socketId || "", name: currentUser.name },
      senderId: myInfo.id,
      text: message,
    };

    addMsg(msg);
    sendMessage(msg);
    setMessage("");
  };

  return (
    <Container
      maxWidth="xl"
      sx={{
        height: "100%",
        mx: "auto",
        display: "flex",
        flexDirection: "column",
        p: 2,
        bgcolor: "background.paper",
      }}
    >
      <User />
      <Stack spacing={2}>
        {Messages.length === 0 ? (
          <EmptyState message="No messages yet. Start the conversation!" />
        ) : (
          Messages.map((msg,i) => {
            const isMe: boolean = msg.from?.socketId === myInfo?.socketId;
            const isVisible: boolean =
              msg.from?.socketId === currentUser?.socketId ||
              msg.to?.socketId === currentUser?.socketId;

            return (
              isVisible && (
                <Box
                  key={i} 
                  sx={{
                    display: "flex",
                    justifyContent: isMe ? "flex-end" : "flex-start",
                  }}
                >
                  <Box
                    sx={{
                      maxWidth: "75%",
                      bgcolor: isMe ? "primary.main" : "grey.300",
                      color: isMe ? "white" : "black",
                      px: 2,
                      py: 1,
                      borderRadius: 3,
                      borderTopRightRadius: isMe ? 0 : 3,
                      borderTopLeftRadius: isMe ? 3 : 0,
                      boxShadow: 1,
                    }}
                  >
                    {!isMe && (
                      <Typography
                        variant="caption"
                        sx={{ color: "text.secondary", mb: 0.5 }}
                      >
                        {msg.from.name}
                      </Typography>
                    )}
                    <Typography variant="body1">{msg.text}</Typography>
                  </Box>
                </Box>
              )
            );
          })
        )}
      </Stack>
      <Box sx={{ display: "flex", mt: 2, gap: 1 }}>
        <TextField
          fullWidth
          size="small"
          placeholder="Type a message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
          sx={{
            backgroundColor: "background.paper",
            borderRadius: 2,
            boxShadow: 1,
          }}
        />
        <IconButton color="primary" onClick={handleSend}>
          <SendIcon />
        </IconButton>
      </Box>
      <div ref={bottomRef} />
    </Container>
  );
};

export default BeautifulChat;

function EmptyState({
  message = "Nothing to display",
  icon = <ChatBubbleOutlineIcon fontSize="large" />,
}) {
  return (
    <Box
      sx={{
        height: "100%",
        minHeight: 300,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        color: "grey.500",
        textAlign: "center",
        p: 2,
      }}
    >
      {icon}
      <Typography variant="h6" sx={{ mt: 1 }}>
        {message}
      </Typography>
    </Box>
  );
}