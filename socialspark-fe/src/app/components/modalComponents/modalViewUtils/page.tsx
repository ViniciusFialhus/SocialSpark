"use client";
import styles from "./page.module.css";
import "../../../globals.css";
import { io } from "socket.io-client";
import { useEffect, useRef } from "react";
import { useStoreModal, useChatStore } from "@/app/utils/store";

export default function ModalViewUtils() {
  const refPersonInside = useRef<HTMLDivElement | null>(null);
  const { toggleModalViewUtils } = useStoreModal();
  const { socket, setSocket, serverStatus, setServerStatus, userInfo } = useChatStore();
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      console.log("Texto copiado para a área de transferência:", text);
    }).catch((error) => {
      console.error("Erro ao copiar texto:", error);
    });
  };

  const toggleConnection = () => {
    if (socket && serverStatus === "connected") {
      socket.disconnect();
      console.log("Disconnecting from server.");
    } else if (!socket || serverStatus === "disconnected") {
      const newSocket = io("http://localhost:3000", {
        withCredentials: true,
        reconnection: false,
      });

      newSocket.on("connect", () => {
        setServerStatus("connected");
        console.log("Connected to server.");
      });

      newSocket.on("disconnect", () => {
        setServerStatus("disconnected");
        console.log("Disconnected from server.");
      });

      setSocket(newSocket);
    } else {
      console.log(`Current server status: ${serverStatus}`);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (
        refPersonInside.current &&
        !refPersonInside.current.contains(event.target)
      ) {
        toggleModalViewUtils(false);
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <div className={styles.containerMain} ref={refPersonInside}>
      <div className={styles.details} />
      <div className={styles.containerText}>
        <div className={styles.text}>
          <h5>Socket Status</h5>
          <span
            className="material-symbols-outlined"
            style={{ color: "white", fontSize: "17px", cursor: "pointer" }}
            onClick={toggleConnection}
          >
            {!socket || serverStatus === "disconnected" ? " wifi_off" : "wifi"}
          </span>
        </div>
        <div className={styles.text}>
          <h5>Actions</h5>
          <span
            className={`${styles.copy} material-symbols-outlined`}
            style={{ color: "white", fontSize: "17px", cursor: "pointer" }}
            onClick={() => copyToClipboard(userInfo.clientId)}
          >
            content_copy
          </span>
        </div>
      </div>
    </div>
  );
}
