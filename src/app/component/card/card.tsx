import styles from "./card.module.css";
import PlaceholderImage from "../placeholderImage/placeholderImage";
import { More } from "grommet-icons";

export default function Card(props: ArticleCard) {
  const getImage = (props: ArticleCard) => {
    if (props?.image?.length) return props.image;
    else if (props?.logo?.length) return props.logo;
  };
  return (
    <div className={styles.cardContainer}>
      <div className={styles.cardHeader}>
        <div>
          {props?.image?.length && props?.image[0] !== "/" ? (
            <img
              alt="Article Image"
              src={props?.image}
              className={styles.image}
              // style={{ objectFit: "cover" }}
              // onError={handleImageError}
            />
          ) : (
            <PlaceholderImage
              initial={
                props?.title?.[0] ?? props?.domain?.[0] ?? props?.url?.[0]
              }
            />
          )}

          {/* {!imageRendered && <div>Could Not load image</div>} */}
        </div>
      </div>
      <div className={styles.cardContent}>
        <h3 className={styles.title}>{props?.title ?? props?.domain}</h3>
      </div>

      <div className={styles.cardFooter}>
        <h5>{props?.domain ?? ""}</h5>
        {/* <More color="var(--text-primary)" /> */}
      </div>
    </div>
  );
}

// Make image height and width consistent

export interface ArticleCard {
  id: string;
  title?: string;
  isArticle: boolean;
  image?: string;
  author?: string;
  url: string;
  domain?: string;
  logo?: string;
  userId: string;
  createdAt: Date;
}
