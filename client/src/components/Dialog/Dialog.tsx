import * as DialogPrimative from "@radix-ui/react-dialog";
import { ReactNode } from "react";
import styles from "./Dialog.module.css";
import Button from "../Button/Button";
import buttonStyles from "../Button/Button.module.css";

interface Props {
  children: ReactNode;
  title?: string;
  description?: string;
}

const Dialog = ({ children, title, description }: Props) => {
  return (
    <DialogPrimative.Root>
      <DialogPrimative.Trigger className={buttonStyles.root}>Create</DialogPrimative.Trigger>
      <DialogPrimative.Portal>
        <DialogPrimative.Overlay className={styles.overlay} />
        <DialogPrimative.Content asChild>
          <div className={styles.content}>
            {title && <DialogPrimative.Title>{title}</DialogPrimative.Title>}
            {description && (
              <DialogPrimative.Description>{description}</DialogPrimative.Description>
            )}
            {children}
          </div>
        </DialogPrimative.Content>
      </DialogPrimative.Portal>
    </DialogPrimative.Root>
  );
};

export default Dialog;
