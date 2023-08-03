import { PropsWithChildren } from "react";
import styles from "./Button.module.css";

const Button = ({ children }: PropsWithChildren) => {
  return <button className={styles.root}>{children}</button>;
};

export default Button;