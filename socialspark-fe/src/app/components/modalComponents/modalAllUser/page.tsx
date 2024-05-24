"use client";
import styles from "./page.module.css";
import '../../../globals.css';
import { useEffect, useRef } from "react";
import { useStoreModal, useChatStore } from "@/app/utils/store";

export default function ModalAllUser() {
  const refPersonInside = useRef<HTMLDivElement | null>(null);
  const { toggleModalAllUser } = useStoreModal();
  const { allUsers } = useChatStore();

  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (
        refPersonInside.current &&
        !refPersonInside.current.contains(event.target)
      ) {
        toggleModalAllUser(false);
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <div
      className={styles.containerMain}
      ref={refPersonInside}
      style={{
        height: allUsers.length === 1 ? "30px" : "150px",
        width: allUsers.length === 1 ? "100px" : "300px",
      }}
    >
      <div className={styles.details} />

      {allUsers.length > 1 && (
        <div style={{ marginTop: "10px", fontSize: "12px" }}>All Users</div>
      )}
      {allUsers.length <= 1 ? (
        <h6>Online user</h6>
      ) : (
        allUsers.map((allUser, index) => (
          <div key={index} className={styles.containerUser}>
            <div
              className={styles.circle}
              style={{
                color: "#1A5FD5",
                backgroundColor: "#1b262d",
              }}
            >
              { allUser.letterName ? allUser.letterName.toUpperCase() : allUser.clientId.charAt(0).toUpperCase()}
            </div>
            <div className={styles.containerClientID}>{allUser.clientId}</div>
          </div>
        ))
      )}
    </div>
  );
}
