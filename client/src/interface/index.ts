export interface User {
  id: string;
  name: string;
  role: string;
  avatar: string;
}

export interface UserDetails {
  CurrentUserId: string;
  CurrentUserName: string;
  currentUserRole: string;
  CurrentUserAvatar: string;
}

export interface Message {
  user: string;
  text: string;
}
