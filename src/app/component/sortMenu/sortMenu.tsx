import { Menu, MenuItem, MenuButton } from "@szhsin/react-menu";
import { Sort, Descend, Ascend } from "grommet-icons";
import "@szhsin/react-menu/dist/index.css";
import styles from "./sortMenu.module.css";
export default function SortMenu() {
  return (
    <>
      <Menu
        menuClassName={styles.menuClass}
        menuButton={
          <MenuButton className={styles.menuButton}>
            <Sort color="var(--text-primary)" />
          </MenuButton>
        }
      >
        {menuOptions.map((item, index) => {
          return (
            <MenuItem key={index} className={styles.menuItem}>
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
  },
  {
    icon: <Ascend color="var(--text-primary)" />,
    text: "Newest First",
  },
];
