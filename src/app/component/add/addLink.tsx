"use client";
import { useState } from "react";
import { InputField } from "../inputField/inputField";
import Plus from "@/app/icon/plus";
import styles from "./addLink.module.css";
import { useRef } from "react";

export function AddLink() {
  const [toggle, setToggle] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleToggle = () => {
    setToggle(!toggle);
  };
  return (
    <>
      {toggle ? (
        <>
          <div style={{ display: "flex", alignItems: "center" }}>
            <InputField inputRef={inputRef} />
            <div className={styles.button} onClick={handleToggle}>
              <span>x</span>
            </div>
          </div>
        </>
      ) : (
        <div className={styles.button} onClick={handleToggle}>
          <span>+</span>
        </div>
      )}
    </>
  );
}
