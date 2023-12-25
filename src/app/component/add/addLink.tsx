"use client";
import { useState } from "react";
import { InputField } from "../inputField/inputField";
import Plus from "@/app/icon/plus";
import styles from "./addLink.module.css";
import { useRef } from "react";
import { Session } from "next-auth";
import { useRouter } from "next/navigation";

export function AddLink({ session }: { session: Session | null }) {
  const [toggle, setToggle] = useState(false);

  const [link, setLink] = useState("");
  const router = useRouter();

  const inputRef = useRef<HTMLInputElement>(null);

  const handleToggle = () => {
    setToggle(!toggle);
  };

  const addLink = async () => {
    console.log(session);
    handleToggle();
    router.refresh();

    // remove localhost variable
    const data = await fetch("http://localhost:3000/api/add");
    const res = data.json();
    console.log(res);
    alert(res);
  };

  const updateInputValue = (value: string) => {
    setLink(value);
  };

  return (
    <>
      {toggle ? (
        <>
          <div style={{ display: "flex", alignItems: "center" }}>
            <InputField callback={updateInputValue} />
            <button onClick={addLink}>Add</button>
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
