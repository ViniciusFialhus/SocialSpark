"use client";
import styles from "./page.module.css";
import "../../../globals.css";
import { useEffect, useRef } from "react";
import { useStoreCommuns, useChatStore } from "@/app/utils/store";

export default function ModalTo() {
  const refPersonInside = useRef<HTMLDivElement | null>(null);
  const { toggleUtilsSelected } = useStoreCommuns();
  const { userInfo } = useChatStore();
  const copyToClipboard = (text: string) => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        console.log("Texto copiado para a área de transferência:", text);
      })
      .catch((error) => {
        console.error("Erro ao copiar texto:", error);
      });
  };

  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (
        refPersonInside.current &&
        !refPersonInside.current.contains(event.target)
      ) {
        toggleUtilsSelected(false);
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
      <h3>Socket id</h3>
      <div className={styles.containerInput} tabIndex={0}>
        <input placeholder="Target Socket id" value={userInfo.clientId} />
        <div className={styles.containerIcon}>
          <span
            className="material-symbols-outlined"
            style={{ color: "#3b3c3e", fontSize: "20px" }}
            onClick={() => copyToClipboard(userInfo.clientId)}
          >
            content_paste
          </span>
        </div>
      </div>
    </div>
  );
}
