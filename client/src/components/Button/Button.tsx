import { DetailedHTMLProps, forwardRef } from "react";
import styles from "./Button.module.css";

const Button = forwardRef<
  HTMLButtonElement,
  DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>
>(({ children, ...rest }, ref) => {
  return (
    <button {...rest} ref={ref} className={styles.root}>
      {children}
    </button>
  );
});

export default Button;
