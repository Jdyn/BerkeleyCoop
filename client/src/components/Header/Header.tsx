import { HomeModernIcon } from "@heroicons/react/24/outline";
import styles from "./Header.module.css";

const Headers = () => {
  return (
    <nav className={styles.root}>
      <h1>
        <HomeModernIcon width="32px" />
        BSC
      </h1>
    </nav>
  );
};

export default Headers;
