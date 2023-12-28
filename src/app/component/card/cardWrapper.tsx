"use client";
import Card from "./card";
import styles from "./card.module.css";
import { useState } from "react";
import { Descend } from "grommet-icons";
import SortMenu from "../sortMenu/sortMenu";

export default function CardWrapper({ cardData }: { cardData: ICard[] }) {
  const goToPage = (url: string) => {
    window.open(url, "_blank")?.focus();
  };

  const [list, setList] = useState(cardData);

  return (
    <>
      <div className={styles.wrapperHeader}>
        <h2>Saved Bookmarks</h2>
        {/* <div className={styles.sortBtn} role="button">
          <Descend color="var(--text-primary)" />
        </div> */}

        <SortMenu />
      </div>
      <div className={styles.wrapper}>
        {cardData.map((card) => {
          return (
            <div
              style={{
                maxWidth: "300px",
                maxHeight: "300px",
                justifySelf: "center",
              }}
              onClick={() => goToPage(card.link)}
              key={card.id}
            >
              <Card {...card} />
            </div>
          );
        })}
      </div>
    </>
  );
}

export interface ICard {
  title: string;
  image: string;
  // description: string;
  link: string;
  id: number;
}
