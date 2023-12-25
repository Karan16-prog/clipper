"use client";
import styles from "./inputField.module.css";
import React, { useState } from "react";

export function InputField({
  callback,
}: {
  callback: (value: string) => void;
}) {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    callback(e?.target?.value);
  };
  return (
    <div className={styles.inputContainer}>
      <input
        onChange={(e) => handleInputChange(e)}
        autoFocus
        className={styles.input}
      />
    </div>
  );
}
