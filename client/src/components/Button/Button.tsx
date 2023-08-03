import { PropsWithChildren, forwardRef } from "react";
import styles from "./Button.module.css";

const Button = forwardRef<HTMLButtonElement, PropsWithChildren>(({ children }: PropsWithChildren, ref) => {
  return (
    <button ref={ref} className={styles.root}>
      {children}
    </button>
  );
});

export default Button;
