// store.js
import { create } from "zustand";

interface StoreState {
  CurrentUserName: string;
  CurrentUserId: string;
  CurrentUserAvatar: string;
  currentUserRole: string;
  setUserDetails: (userDetails:{ CurrentUserId: string; CurrentUserName: string; currentUserRole: string; CurrentUserAvatar: string } ) => void;
}

const useStore = create<StoreState>((set) => ({
  CurrentUserId: "0",
  CurrentUserName: "Guest",
  currentUserRole: "Guest",
  CurrentUserAvatar: "https://via.placeholder.com/150",
  setUserDetails: (userDetails:{ CurrentUserId: string; CurrentUserName: string; currentUserRole: string; CurrentUserAvatar: string } ) =>
    set(() => (userDetails)),
}));

export default useStore;
