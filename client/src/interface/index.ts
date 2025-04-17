// Interface for a User
export interface User {
  id: string; // Unique identifier for the user
  name: string; // Name of the user
  role: string; // Role of the user (e.g., admin, member)
  avatar: string; // URL for the user's avatar
  socketId?: string; // Optional socket ID for real-time communication
}

// Interface for a Message
export interface Message {
  from: { socketId: string; name: string }; // Sender details
  to: { socketId: string; name: string }; // Receiver details
  text: string; // Message content
  senderId: string; // ID of the sender
}