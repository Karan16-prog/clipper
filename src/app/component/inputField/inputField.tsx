"use client";
import styles from "./inputField.module.css";
import React from "react";

export function InputField({
  inputRef,
}: {
  inputRef: React.RefObject<HTMLInputElement>;
}) {
  return (
    <div className={styles.inputContainer}>
      <input autoFocus ref={inputRef} className={styles.input} />
    </div>
  );
}
