// store.js
import { create } from "zustand";
import { User, Message } from "@/interface";
import UserList from "./TeamUserList";
import InitialMessages from "./TeamMessages";

interface StoreState {
  currentUser: User;
  setCurrentUser: (user: User) => void;
  Messages: Message[];
  addMsg: (msg: Message) => void;
  Users: User[]; // Added Users property
  addUsers: (user: User[]) => void; // Updated addUser function type
}

const useStore = create<StoreState>((set) => ({
  currentUser: {
    id: "0",
    name: "Guest",
    role: "Guest",
    avatar: "https://via.placeholder.com/150",
    socketId: "",
  },
  setCurrentUser: (currentUser: User) => set(() => ({ currentUser })),
  Messages: InitialMessages,
  addMsg: (msg: Message) =>
    set(({ Messages }) => ({ Messages: [...Messages, msg] })),
  Users: UserList,
  addUsers: (user: User[]) => set(({ Users }) => ({ Users: [...new Map([...Users, ...user].map(item => [item.id, item])).values()] })),
}));

export default useStore;
