'use client';
import { useEffect, useState } from 'react';
import socket from '@/socket'; // adjust path as needed

export default function ChatPage() {
  const [connected, setConnected] = useState(false);
  const [message, setMessage] = useState('');
  const [chat, setChat] = useState<string[]>([]);

  useEffect(() => {
    // Connect when component mounts
    socket.connect();

    socket.on('connect', () => {
      console.log('Connected:', socket.id);
      setConnected(true);
    });

    socket.on('message', (msg: string) => {
      setChat(prev => [...prev, msg]);
    });

    socket.on('disconnect', () => {
      console.log('Disconnected');
      setConnected(false);
    });

    // Clean up
    return () => {
      socket.disconnect();
    };
  }, []);

  const sendMessage = () => {
    if (message.trim()) {
      socket.emit('message', message);
      setChat(prev => [...prev, `You: ${message}`]);
      setMessage('');
    }
  };

  return (
    <div>
      <h2>{connected ? '🟢 Connected' : '🔴 Disconnected'}</h2>
      <ul>
        {chat.map((m, i) => <li key={i}>{m}</li>)}
      </ul>
      <input
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type a message"
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
}
