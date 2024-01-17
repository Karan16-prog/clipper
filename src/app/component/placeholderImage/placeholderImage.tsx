import styles from "./placeholderImage.module.css";
import { ibmSerif } from "@/app/fonts/font";

export default function PlaceholderImage({ initial }: { initial: string }) {
  const randomIndex = Math.floor(mapStringToNumber(initial));

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

function mapStringToNumber(inputString: string, defaultValue = 0) {
  if (/[a-zA-Z]/.test(inputString)) {
    const charCode = inputString.toLowerCase().charCodeAt(0);
    return charCode % 11;
  } else if (/^\d$/.test(inputString)) {
    return parseInt(inputString, 10);
  } else {
    return defaultValue;
  }
}

const colors = [
  {
    base: "#00CB7780",
    text: "#00CB77",
  },
  {
    base: "#FF573380",
    text: "#FF5733",
  },
  {
    base: "#3498DB80",
    text: "#3498DB",
  },
  {
    base: "#9B59B680",
    text: "#9B59B6",
  },
  {
    base: "#F1C40F80",
    text: "#F1C40F",
  },
  {
    base: "#E74C3C80",
    text: "#E74C3C",
  },
  {
    base: "#2ECC7180",
    text: "#2ECC71",
  },
  {
    base: "#8E44AD80",
    text: "#8E44AD",
  },
  {
    base: "#7F8C8D80",
    text: "#7F8C8D",
  },
  {
    base: "#3498D180",
    text: "#3498D1",
  },
  {
    base: "#FF00FF80",
    text: "#FF00FF",
  },
];
