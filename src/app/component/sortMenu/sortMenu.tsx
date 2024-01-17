"use client";

import { Menu, MenuButton, MenuItem } from "@szhsin/react-menu";
import "@szhsin/react-menu/dist/index.css";
import { Ascend, Descend } from "grommet-icons";
import { useState } from "react";
import styles from "./sortMenu.module.css";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";

export default function SortMenu() {
  const [selected, setSelected] = useState<"new" | "old">("new");

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);

      return params.toString();
    },
    [searchParams]
  );

  const handleSort = (order: "new" | "old") => {
    if (order === "new" || !order) {
      router.push(pathname + "?" + createQueryString("sort", "new"));
    } else {
      router.push(pathname + "?" + createQueryString("sort", "old"));
    }
  };

  return (
    <>
      <Menu
        menuClassName={styles.menuClass}
        onItemClick={(e) => {
          setSelected(e.value);
          handleSort(e.value);
        }}
        menuButton={
          <MenuButton className={styles.menuButton}>
            {/* <Sort className={styles.sortIcon} color="var(--text-primary)" /> */}
            {selected === "new" ? (
              <Ascend className={styles.sortIcon} color="var(--text-primary)" />
            ) : (
              <Descend
                className={styles.sortIcon}
                color="var(--text-primary)"
              />
            )}
          </MenuButton>
        }
      >
        {menuOptions.map((item, index) => {
          return (
            <MenuItem
              key={index}
              value={item.value}
              className={styles.menuItem}
            >
              <div>{item.icon}</div>
              <div>{item.text}</div>
            </MenuItem>
          );
        })}
      </Menu>
    </>
  );
}

const menuOptions = [
  {
    icon: <Descend color="var(--text-primary)" />,
    text: "Oldest First",
    value: "old",
  },
  {
    icon: <Ascend color="var(--text-primary)" />,
    text: "Newest First",
    value: "new",
  },
];
