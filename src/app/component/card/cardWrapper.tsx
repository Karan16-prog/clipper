"use client";
import Card, { ArticleCard } from "./card";
import styles from "./card.module.css";
import { useEffect, useState } from "react";
import { Descend } from "grommet-icons";
import SortMenu from "../sortMenu/sortMenu";

export default function CardWrapper({ cardData }: { cardData: ArticleCard[] }) {
  const goToPage = (url: string) => {
    window.open(url, "_blank")?.focus();
  };

  const [sortedData, setSortedData] = useState(cardData);

  const handleSort = (order: "new" | "old") => {
    if (order === "new" || !order) {
      setSortedData([
        ...cardData.sort((a, b) => {
          let date1 = new Date(a.createdAt);
          let date2 = new Date(b.createdAt);
          return date2.getTime() - date1.getTime();
        }),
      ]);
    } else {
      setSortedData([
        ...cardData.sort((a, b) => {
          let date1 = new Date(a.createdAt);
          let date2 = new Date(b.createdAt);
          return date1.getTime() - date2.getTime();
        }),
      ]);
    }
  };

  useEffect(() => {
    console.log(sortedData[0].title);
  }, [sortedData]);

  return (
    <>
      <div className={styles.wrapperHeader}>
        <h2>Saved Bookmarks</h2>
        <SortMenu handleSort={handleSort} />
      </div>
      <div className={styles.wrapper}>
        {sortedData.map((card) => {
          return (
            <div
              style={
                {
                  // flex: 1,
                  // maxWidth: "320px",
                  // maxHeight: "400px",
                  // justifySelf: "center",
                }
              }
              onClick={() => goToPage(card?.url)}
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
