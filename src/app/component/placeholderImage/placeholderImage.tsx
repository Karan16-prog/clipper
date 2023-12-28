import styles from "./placeholderImage.module.css";
import { ibmSerif } from "@/app/fonts/font";

export default function PlaceholderImage({ initial }: { initial: string }) {
  const randomIndex = Math.floor(Math.random() * colors.length);

  return (
    <div
      style={{ backgroundColor: `${colors[randomIndex].base}` }}
      className={styles.container}
    >
      <p
        style={{ color: `${colors[randomIndex].text}` }}
        className={ibmSerif.className}
      >
        {initial}
      </p>
    </div>
  );
}

const colors = [
  {
    base: "#00CB7780", // Green with opacity
    text: "#00CB77", // Related text color
  },
  {
    base: "#FF573380", // Orange with opacity
    text: "#FF5733", // Related text color
  },
  {
    base: "#3498DB80", // Blue with opacity
    text: "#3498DB", // Related text color
  },
  {
    base: "#9B59B680", // Purple with opacity
    text: "#9B59B6", // Related text color
  },
  {
    base: "#F1C40F80", // Yellow with opacity
    text: "#F1C40F", // Related text color
  },
  {
    base: "#E74C3C80", // Red with opacity
    text: "#E74C3C", // Related text color
  },
  {
    base: "#2ECC7180", // Emerald (Green) with opacity
    text: "#2ECC71", // Related text color
  },
  {
    base: "#8E44AD80", // Dark Purple with opacity
    text: "#8E44AD", // Related text color
  },
  {
    base: "#7F8C8D80", // Medium Gray with opacity
    text: "#7F8C8D", // Related text color
  },
  {
    base: "#3498D180", // Cyan with opacity
    text: "#3498D1", // Related text color
  },
  {
    base: "#FF00FF80", // Magenta with opacity
    text: "#FF00FF", // Related text color
  },
];
