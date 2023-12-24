import styles from "./card.module.css";
import Cat from "../../../public/cat.jpeg";
import Image from "next/image";
import { ICard } from "./cardWrapper";

export default function Card(props: ICard) {
  return (
    <div className={styles.cardContainer}>
      <div className={styles.cardHeader}>
        <div>
          <img
            alt="Article Image"
            src={"/cat.jpeg"}
            className={styles.image}
            style={{ objectFit: "cover" }}
          />
        </div>
      </div>
      <div className={styles.cardContent}>
        <h3 className={styles.title}>{props.title}</h3>
      </div>

      <div className={styles.cardFooter}>
        <h5>{props.link}</h5>
      </div>
    </div>
  );
}
