"use client";
import { useState } from "react";
import { InputField } from "../inputField/inputField";
import Plus from "@/app/icon/plus";
import styles from "./addLink.module.css";
import { useRef } from "react";
import { Session } from "next-auth";
import { useRouter } from "next/navigation";
import { FormClose } from "grommet-icons";
import { Add } from "grommet-icons";
import CustomTooltip from "../tooltip/tooltip";
import { SignOutBtn } from "../button/button";

export function AddLink({ session }: { session: Session | null }) {
  const [toggle, setToggle] = useState(false);

  const [link, setLink] = useState("");
  const router = useRouter();

  const inputRef = useRef<HTMLInputElement>(null);

  const handleToggle = () => {
    setToggle(!toggle);
  };

  const addLink = async () => {
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
          <div
            style={{
              display: "flex",

              alignItems: "center",
              columnGap: "20px",
            }}
          >
            <InputField callback={updateInputValue} />
            <button className={styles.btn} onClick={addLink}>
              Add
            </button>
            <div className={styles.button} onClick={handleToggle}>
              <CustomTooltip text={"Cancel Here"}>
                <FormClose size="30px" color="var(--text-primary)" />
              </CustomTooltip>
            </div>
          </div>
        </>
      ) : (
        <div style={{ display: "flex", alignItems: "center", float: "right" }}>
          <div className={styles.buttonAdd} onClick={handleToggle}>
            <CustomTooltip text={"Save A URL"}>
              <Add size="22px" color="var(--text-primary)" />
            </CustomTooltip>
          </div>
          {session?.user && (
            <div className={styles.navFooter}>
              <p
                style={{ fontSize: "18px", margin: "0px" }}
              >{`Hi ${session?.user?.name}`}</p>
              <SignOutBtn />
            </div>
          )}
        </div>
      )}
    </>
  );
}
