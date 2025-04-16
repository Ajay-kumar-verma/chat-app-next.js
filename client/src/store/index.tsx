// store.js
import { create } from "zustand";
import { User, Message, UserDetails } from "@/interface";
import UserList from "./TeamUserList";
import InitialMessages from "./TeamMessages";

interface StoreState {
  CurrentUserName: string;
  CurrentUserId: string;
  CurrentUserAvatar: string;
  currentUserRole: string;
  setUserDetails: (userDetails: UserDetails) => void;
  Messages: Message[];
  addMsg: (msg: Message) => void;
  Users: User[]; // Added Users property
  addUser: (user: User) => void; // Updated addUser function type
}

const useStore = create<StoreState>((set) => ({
  CurrentUserId: "0",
  CurrentUserName: "Guest",
  currentUserRole: "Guest",
  CurrentUserAvatar: "https://via.placeholder.com/150",
  setUserDetails: (userDetails: UserDetails) =>
    set((state) => ({ ...state, ...userDetails })),
  Messages: InitialMessages,
  addMsg: (msg: Message) =>
    set((state) => ({ Messages: [...state.Messages, msg] })),
  Users: UserList,
  addUser: (user: User) => set((state) => ({ Users: [...state.Users, user] })),
}));

export default useStore;
