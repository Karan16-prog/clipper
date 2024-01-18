"use client";
import { Add, FormClose } from "grommet-icons";
import { Session } from "next-auth";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { SignOutBtn } from "../button/button";
import { InputField } from "../inputField/inputField";
import CustomTooltip from "../tooltip/tooltip";
import styles from "./addLink.module.css";
import toast from "react-hot-toast";

export function AddLink({ session }: { session: Session | null }) {
  const [toggle, setToggle] = useState(false);
  const [link, setLink] = useState("");
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [isFetching, setIsFetching] = useState(false);

  const handleToggle = () => {
    setToggle(!toggle);
  };

  const addLink = async () => {
    handleToggle();
    const body = {
      url: link,
    };
    try {
      setIsFetching(true);
      const data = await fetch("https://clipper-nine.vercel.app/api/add", {
        method: "POST",
        body: JSON.stringify(body),
        cache: "no-cache",
      });
      setIsFetching(false);

      startTransition(() => {
        router.replace("/");
      });
      toast.success("Article added successfully!");
    } catch (err) {
      console.log(err);
      toast.error("Oops! 💀");
      setIsFetching(false);
    }
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
