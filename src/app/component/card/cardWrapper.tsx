"use client";
import Card from "./card";

export default function CardWrapper({ cardData }: { cardData: ICard[] }) {
  const goToPage = (url: string) => {
    window.open(url, "_blank")?.focus();
  };

  return (
    <div
      style={{
        display: "flex",
        columnGap: "60px",
        rowGap: "60px",
        flexWrap: "wrap",
      }}
    >
      {cardData.map((card) => {
        return (
          <div
            style={{
              maxWidth: "300px",
              maxHeight: "300px",
            }}
            onClick={() => goToPage(card.link)}
            key={card.id}
          >
            <Card {...card} />
          </div>
        );
      })}
    </div>
  );
}

export interface ICard {
  title: string;
  image: string;
  // description: string;
  link: string;
  id: number;
}
