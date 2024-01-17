import SortMenu from "../sortMenu/sortMenu";
import Card, { ArticleCard } from "./card";
import styles from "./card.module.css";
import CardParent from "./cardParent";

export default function CardWrapper({
  cardData,
  sort,
}: {
  sort: "old" | "new";
  cardData: ArticleCard[];
}) {
  if (sort == "old") {
    cardData.sort((a, b) => {
      let date1 = new Date(a.createdAt);
      let date2 = new Date(b.createdAt);
      return date1.getTime() - date2.getTime();
    });
  } else {
    cardData.sort((a, b) => {
      let date1 = new Date(a.createdAt);
      let date2 = new Date(b.createdAt);
      return date2.getTime() - date1.getTime();
    });
  }

  return (
    <>
      <div className={styles.wrapperHeader}>
        <h2>Saved Bookmarks</h2>
        <SortMenu />
      </div>
      <div className={styles.wrapper}>
        {cardData.map((card) => {
          return (
            <CardParent key={card?.id} url={card?.url}>
              <Card {...card} />
            </CardParent>
          );
        })}
      </div>
    </>
  );
}
