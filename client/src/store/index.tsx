// store.js
import { create } from "zustand";
import { User, Message, UserDetails } from "@/interface";
import UserList from "./TeamUserList";
import InitialMessages from "./TeamMessages";

interface StoreState extends UserDetails {
  setCurrentUser: (user: User) => void;
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
  setCurrentUser: (user: User) =>
    set(() => ({
      CurrentUserName: user.name,
      CurrentUserId: user.id,
      currentUserRole: user.role,
      CurrentUserAvatar: user.avatar,
    })),
  Messages: InitialMessages,
  addMsg: (msg: Message) =>
    set((state) => ({ Messages: [...state.Messages, msg] })),
  Users: UserList,
  addUser: (user: User) => set(({ Users }) => ({ Users: [...Users, user] })),
}));

export default useStore;
