import { DetailedHTMLProps, forwardRef } from "react";
import styles from "./Button.module.css";
import clsx from "clsx";

interface Props {
  secondary?: boolean;
  green?: boolean;
}

const Button = forwardRef<
  HTMLButtonElement,
  DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement> & Props, HTMLButtonElement>
>(({ children, secondary, green, ...rest }, ref) => {
  return (
    <button
      {...rest}
      ref={ref}
      className={clsx(styles.root, secondary && styles.secondary, green && styles.green)}
    >
      {children}
    </button>
  );
});

export default Button;
