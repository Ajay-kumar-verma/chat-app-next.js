"use client";
import { useEffect, useState } from "react";
import NameEntry from "@/components/nameEntry/page";
import ChatComponent from "@/components/chatComponent"; // Your main chat logic
import {User} from '@/interface'
import useStore from "@/store";

export default function ChatRoom() {
  const [username, setUsername] = useState<string | null>("");
  const { setUserDetails,addUser } = useStore();
  

  
  useEffect(() => {
    const currentUser = {
      CurrentUserId: "0",
      CurrentUserName: username || "",
      currentUserRole: "Associate Engineer",
      CurrentUserAvatar: "https://i.pravatar.cc/",
    };
    const user: User = {
      id: currentUser.CurrentUserId,
      name: currentUser.CurrentUserName,
      role: currentUser.currentUserRole,
      avatar: currentUser.CurrentUserAvatar,
    };
    console.log({user})
    if(username){
      setUserDetails(currentUser);
      addUser(user);
    }
  }, [username]);

  if (!username) {
    return <NameEntry onSubmit={setUsername} />;
  }
  return <ChatComponent />;
}
