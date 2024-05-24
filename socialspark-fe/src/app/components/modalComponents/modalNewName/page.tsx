"use client";
import styles from "./page.module.css";
import "../../../globals.css";
import { useState } from "react";
import { useStoreModal, useChatStore } from "@/app/utils/store";

export default function ModalNewName() {
  const { toggleModalNewName } = useStoreModal();
  const { userInfo, socket } = useChatStore();
  const letterName =
  typeof window !== "undefined"
    ? localStorage.getItem("letterName") || ""
    : "";
  const [input, setInput] = useState(
    !userInfo.letterName ? userInfo.clientId : letterName
  );
  const handleChange = (e: any) => {
    setInput(e.target.value);
  };
  const handleSubmit = () => {
    if (input.trim()) {
      if (socket) {
        socket.emit("updateLetterName", input);
        if (typeof window !== "undefined") {
          localStorage.setItem("clientID", userInfo.clientId);
          localStorage.setItem("letterName", input);
        }
        toggleModalNewName(false);
      }
    }
  };

  return (
    <div className={styles.containerMain}>
      <main className={styles.Modal}>
        <div className={styles.containerTitle}>
          <h5>New Name</h5>
          <span
            className="material-symbols-outlined"
            onClick={() => toggleModalNewName(false)}
            style={{ cursor: "pointer" }}
          >
            close
          </span>
        </div>
        <div className={styles.containerInput}>
          <h5>Your Name</h5>
          <input
            placeholder="Your Name"
            value={input}
            onChange={handleChange}
          />
        </div>
        <div className={styles.containerButton}>
          <button onClick={handleSubmit}>Submit</button>
        </div>
        <h5 className={styles.detailInform}>
          Your current name is {userInfo.clientId}
        </h5>
      </main>
    </div>
  );
}
