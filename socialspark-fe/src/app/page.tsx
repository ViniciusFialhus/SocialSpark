"use client";
import styles from "./page.module.css";
import './globals.css';
import io from "socket.io-client";
import { useEffect } from "react";
import { useStoreCommuns, useStoreModal, useChatStore } from "./utils/store";

import ModalAllUser from "./components/modalComponents/modalAllUser/page";
import ModalTo from "./components/modalComponents/modalTo/page";
import ModalViewUtils from "./components/modalComponents/modalViewUtils/page";
import TextArea from "./components/textArea/page";
import ModalNewName from "./components/modalComponents/modalNewName/page";

export default function Home() {
  const {
    utilsSelected,
    toggleUtilsSelected,
    perfilSelected,
    togglePerfilSelected,
  } = useStoreCommuns();

  const {
    viewModalAllUser,
    viewModalViewUtils,
    viewmModalNewName,
    toggleModalViewUtils,
    toggleModalAllUser,
    toggleModalNewName,
  } = useStoreModal();

  const {
    socket,
    setSocket,
    message,
    messages,
    serverStatus,
    userInfo,
    setMessage,
    setMessages,
    setUserInfo,
    setAllUsers,
    setServerStatus,
  } = useChatStore();

  useEffect(() => {
    const clientId = typeof window !== "undefined" ? localStorage.getItem("clientID") : null;
    const letterName = typeof window !== "undefined" ? localStorage.getItem("letterName") : null;
    const socket = io("http://localhost:3000", {
      withCredentials: true,
      reconnection: false,
      query: { clientId, letterName },
    });

    socket.on("connect", () => {
      setServerStatus("connected");
    });

    socket.on("userInfo", (info) => {
      setUserInfo(info);
    });

    socket.on("allMessages", (messages) => {
      setMessages(messages);
    });

    socket.on("allUsers", (users) => {
      setAllUsers([...users]);
    });

    socket.on("disconnect", () => {
      if (typeof window !== "undefined") {
        localStorage.clear();
      }
      setServerStatus("disconnected");
    });

    setSocket(socket);

    return () => {
      socket.disconnect();
    };
  }, []);

  const sendMessage = () => {
    if (socket && message.trim()) {
      socket.emit("message", message);
      setMessage("");
    }
  };

  return (
    <div className={styles.containerMain}>
      {viewModalAllUser && <ModalAllUser />}
      {viewModalViewUtils && <ModalViewUtils />}
      {viewmModalNewName && <ModalNewName />}
      {utilsSelected && <ModalTo />}
      <main className={styles.main}>
        <header className={styles.topArea}>
          <div className={styles.perfilArea}>
            <div
              className={styles.circle}
              style={{
                color: "#1A5FD5",
                backgroundColor: !perfilSelected ? "#1b262d" : "black",
              }}
              onMouseEnter={() => togglePerfilSelected(true)}
              onMouseLeave={() => togglePerfilSelected(false)}
              onClick={() => toggleModalNewName(true)}
            >
              {!perfilSelected ? (
                !userInfo.letterName ? (
                  userInfo.clientId.charAt(0).toUpperCase()
                ) : (
                  userInfo.letterName.toUpperCase()
                )
              ) : (
                <span
                  className="material-symbols-outlined"
                  style={{ color: "#1A5FD5" }}
                >
                  edit
                </span>
              )}
              <div
                className={styles.miniCircle}
                style={{
                  backgroundColor: serverStatus === "connected" ? "green" : "red",
                }}
              />
            </div>
            <span
              className="material-symbols-outlined"
              style={{ color: "#747C84", cursor: "pointer" }}
              onClick={() => toggleModalViewUtils(true)}
            >
              expand_more
            </span>
          </div>
          <nav className={styles.utilsArea}>
            <div className={styles.containerSelector}>
              <div
                className={styles.detailsSelector}
                style={{
                  width: !utilsSelected ? "90px" : "40px",
                  left: !utilsSelected ? "10px" : "113px",
                }}
              />
              <div
                className={styles.containerSelectorItem}
                style={{ width: "90px" }}
                onClick={() => toggleUtilsSelected(false)}
              >
                <span
                  className="material-symbols-outlined"
                  style={{ fontSize: "15px" }}
                >
                  podcasts
                </span>
                <div
                  style={{
                    fontSize: "12px",
                    font: "sans-serif",
                    width: "60px",
                  }}
                >
                  Broadcast
                </div>
              </div>
              <div
                className={styles.containerSelectorItem}
                style={{ width: "40px" }}
                onClick={() => toggleUtilsSelected(true)}
              >
                <span
                  className="material-symbols-outlined"
                  style={{ fontSize: "15px" }}
                >
                  person
                </span>
                <div style={{ fontSize: "12px", font: "sans-serif" }}>To</div>
              </div>
            </div>
            <span
              className="material-symbols-outlined"
              style={{ color: "#828282", cursor: "pointer" }}
              onClick={() => toggleModalAllUser(true)}
            >
              group
            </span>
          </nav>
        </header>
        <section>
          {messages && <TextArea />}
        </section>
        <footer className={styles.bottomArea}>
          <textarea
            placeholder="Type something..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <span
            className="material-symbols-outlined"
            style={{ color: "white", fontSize: "50px", cursor: "pointer" }}
            onClick={sendMessage}
          >
            send
          </span>
        </footer>
      </main>
    </div>
  );
}
