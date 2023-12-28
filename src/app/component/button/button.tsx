"use client";

import { useSession, signIn, signOut } from "next-auth/react";
import styles from "./button.module.css";
export function SignOutBtn() {
  return (
    <button className={styles.btn} onClick={() => signOut()}>
      Logout
    </button>
  );
}
