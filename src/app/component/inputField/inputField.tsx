"use client";
import styles from "./inputField.module.css";
import React, { useState } from "react";

export function InputField({
  callback,
}: {
  callback: (value: string) => void;
}) {
  const [isFocused, setIsFocused] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    callback(e?.target?.value);
  };

  const handleFocus = () => {
    setIsFocused(true);
  };

  return (
    <div className={`${styles.inputContainer} ${isFocused && styles.focused}`}>
      <input
        onChange={(e) => handleInputChange(e)}
        autoFocus
        className={styles.input}
        onFocus={handleFocus}
      />
    </div>
  );
}
