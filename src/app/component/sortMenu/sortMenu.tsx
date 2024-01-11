"use client";

import { Menu, MenuItem, MenuButton } from "@szhsin/react-menu";
import { Sort, Descend, Ascend } from "grommet-icons";
import "@szhsin/react-menu/dist/index.css";
import styles from "./sortMenu.module.css";
import { useEffect, useState } from "react";

export default function SortMenu({
  handleSort,
}: {
  handleSort: (order: "new" | "old") => void;
}) {
  const [selected, setSelected] = useState<"new" | "old">("new");

  // useEffect(() => {
  //   console.log(selected);
  // }, [selected]);
  return (
    <>
      <Menu
        menuClassName={styles.menuClass}
        onItemClick={(e) => {
          console.log(`[Menu] ${e} clicked`);
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
