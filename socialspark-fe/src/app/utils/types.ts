import { Socket } from "socket.io-client";

export interface Message {
  clientId: string;
  message: string;
  letterName: string;
  date: Date
}

export interface UserInfo {
  clientId: string;
  Connected: boolean;
  letterName: string;
}

export interface UserStatus {
  letterName: any;
  clientId: string;
  connected: boolean;
}

export interface UtilsState {
  utilsSelected: boolean;
  perfilSelected: boolean;

  toggleUtilsSelected: (value: boolean) => void;
  togglePerfilSelected: (value: boolean) => void;
}

export interface ModalStates {
  viewModalAllUser: boolean;
  viewModalViewUtils: boolean;
  viewmModalNewName: boolean;

  toggleModalAllUser: (value: boolean) => void;
  toggleModalViewUtils: (value: boolean) => void;
  toggleModalNewName: (value: boolean) => void;
}

export interface ChatState {
  socket: Socket | null;
  message: string;
  messages: Message[];
  userInfo: UserInfo;
  allUsers: UserStatus[];
  serverStatus: string;
  personServerStatus: string;
  setSocket: (socket: Socket | null) => void;
  setMessage: (message: string) => void;
  setMessages: (messages: Message[]) => void;
  setUserInfo: (userInfo: UserInfo) => void;
  setAllUsers: (allUsers: UserStatus[]) => void;
  setServerStatus: (serverStatus: string) => void
  setPersonServerStatus: (personServerStatus: string) => void
}
