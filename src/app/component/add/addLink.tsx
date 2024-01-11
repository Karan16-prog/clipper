"use client";
import { Add, FormClose } from "grommet-icons";
import { Session } from "next-auth";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { SignOutBtn } from "../button/button";
import { InputField } from "../inputField/inputField";
import CustomTooltip from "../tooltip/tooltip";
import styles from "./addLink.module.css";

export function AddLink({ session }: { session: Session | null }) {
  const [toggle, setToggle] = useState(false);
  const [link, setLink] = useState("");
  const router = useRouter();
  const handleToggle = () => {
    setToggle(!toggle);
  };

  const [loading, setLoading] = useState(false);

  const addLink = async () => {
    handleToggle();
    setLoading(true);
    // remove localhost variable
    const body = {
      url: link,
    };
    try {
      const data = await fetch("http://localhost:3000/api/add", {
        method: "POST",
        body: JSON.stringify(body),
        cache: "no-cache",
      });
      setLoading(false);
      location.reload();
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  const updateInputValue = (value: string) => {
    setLink(value);
  };
  if (loading) {
    return <div>Loading</div>;
  }

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
            <button
              className={styles.btn}
              onClick={() => {
                handleToggle();
                addLink();
              }}
            >
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
