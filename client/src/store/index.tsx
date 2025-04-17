// store.ts
import { create } from "zustand";
import { User, Message } from "@/interface";
import UserList from "./TeamUserList";
import InitialMessages from "./TeamMessages";

interface StoreState {
  myInfo: User;
  setMyInfo: (myInfo: User) => void;
  currentUser: User;
  setCurrentUser: (user: User) => void;
  Messages: Message[];
  addMsg: (msg: Message) => void;
  Users: User[];
  addUsers: (users: User[]) => void;
  removeUser: (socketId: string) => void;
}

const useStore = create<StoreState>((set) => ({
  myInfo: {
    id: "NAN",
    name: "unknown",
    role: "unknown",
    avatar: "https://via.placeholder.com/150",
    socketId: "",
  },
  setMyInfo: (myInfo: User) => set(() => ({ myInfo })),

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
  addUsers: (users: User[]) =>
    set(({ Users }) => ({
      Users: [
        ...new Map([...Users, ...users].map((item) => [item.id, item])).values(),
      ],
    })),

  removeUser: (socketId: string) =>
    set(({ Users }) => ({
      Users: Users.filter((user) => user.socketId !== socketId),
    })),
}));

export default useStore;