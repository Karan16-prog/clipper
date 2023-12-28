import styles from "./card.module.css";
import { ICard } from "./cardWrapper";
import PlaceholderImage from "../placeholderImage/placeholderImage";
import { More } from "grommet-icons";

export default function Card(props: ICard) {
  return (
    <div className={styles.cardContainer}>
      <div className={styles.cardHeader}>
        <div>
          {/* <img
            alt="Article Image"
            src={props.image}
            className={styles.image}
            // style={{ objectFit: "cover" }}
            // onError={handleImageError}
          /> */}
          <PlaceholderImage initial="H" />
          {/* {!imageRendered && <div>Could Not load image</div>} */}
        </div>
      </div>
      <div className={styles.cardContent}>
        <h3 className={styles.title}>{props.title}</h3>
      </div>

      <div className={styles.cardFooter}>
        <h5>{props.link}</h5>
        <More color="var(--text-primary)" />
      </div>
    </div>
  );
}

// Make image height and width consistent
