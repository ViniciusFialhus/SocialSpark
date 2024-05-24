import { create } from "zustand";
import { Socket } from "socket.io-client";
import {
  UtilsState,
  ModalStates,
  ChatState,
  UserInfo,
  UserStatus,
} from "../utils/types";

export const useStoreCommuns = create<UtilsState>((set) => ({
  utilsSelected: false,
  perfilSelected: false,
  toggleUtilsSelected: (value: boolean) => set({ utilsSelected: value }),
  togglePerfilSelected: (value: boolean) => set({ perfilSelected: value }),
}));

export const useStoreModal = create<ModalStates>((set) => ({
  viewModalAllUser: false,
  viewModalViewUtils: false,
  viewmModalNewName: false,
  toggleModalAllUser: (value: boolean) => set({ viewModalAllUser: value }),
  toggleModalViewUtils: (value: boolean) => set({ viewModalViewUtils: value }),
  toggleModalNewName: (value: boolean) => set({ viewmModalNewName: value }),
}));

export const useChatStore = create<ChatState>((set) => ({
  socket: null,
  message: "",
  messages: [],
  userInfo: { clientId: "", Connected: false, letterName: "" },
  allUsers: [],
  serverStatus: "",
  personServerStatus: "",
  setSocket: (socket: Socket | null) => set({ socket }),
  setMessage: (message: string) => set({ message }),
  setMessages: (messages) => set({ messages }),
  setUserInfo: (userInfo: UserInfo) => set({ userInfo }),
  setAllUsers: (allUsers: UserStatus[]) => set({ allUsers }),
  setServerStatus: (serverStatus: string) => set({ serverStatus }),
  setPersonServerStatus: (personServerStatus: string) =>
    set({ personServerStatus }),
}));
