export interface User {
  id: string;
  name: string;
  role: string;
  avatar: string;
  socketId?:string;
}

export interface Message {
  user: string;
  text: string;
}
