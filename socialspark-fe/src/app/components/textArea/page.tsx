"use client";
import styles from "./page.module.css";
import '../../globals.css';
import { useChatStore } from "@/app/utils/store";

export default function TextArea() {
  const { messages, userInfo } = useChatStore();
  function formatedDate(dataISO: string): string {
    const date = new Date(dataISO); 
    let horas = date.getUTCHours().toString().padStart(2, "0");
    let minutos = date.getUTCMinutes().toString().padStart(2, "0");
    return `${horas}:${minutos}`;
  }
  
  return (
    <div className={styles.containerMain}>
      <div>
        {messages.map((msg, index) => (
          <div key={index} className={styles.containerMessage}>
            <div
              className={
                userInfo.clientId === messages[index].clientId
                  ? `${styles.myMessages}`
                  : `${styles.otherMessages}`
              }
            >
              <h6>{formatedDate(msg.date.toString())}</h6>
              <h1>{msg.message}</h1>
              <div
                className={styles.circle}
                style={{
                  color: "#1A5FD5",
                  backgroundColor: "#1b262d",
                }}
              >
                {msg.letterName ? msg.letterName.charAt(0).toUpperCase() : msg.clientId.charAt(0).toUpperCase()}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
