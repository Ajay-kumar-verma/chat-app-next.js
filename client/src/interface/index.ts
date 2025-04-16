export interface User {
  id: string;
  name: string;
  role: string;
  avatar: string;
  socketId?:string;
}

export interface Message {
  from:{socketId:string,name:string};
  to:{socketId:string,name:string};
  text: string;
  senderId:string
}
