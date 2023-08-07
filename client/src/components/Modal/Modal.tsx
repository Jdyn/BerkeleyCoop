import * as Dialog from "@radix-ui/react-dialog";
import { ReactNode } from "react";
import styles from "./Modal.module.css";
import Button from "../Button/Button";

interface Props {
  modal: [boolean, React.Dispatch<React.SetStateAction<boolean>>];
  title?: string;
  description?: string;
  children: [ReactNode, ReactNode];
}

const Modal = ({ children, modal, title, description }: Props) => {
  const [open, setOpen] = modal;

  return (
    <Dialog.Root open={open} onOpenChange={(newOpen) => setOpen(newOpen)}>
      <Dialog.Trigger onClick={() => setOpen(true)} asChild>
        {children[0]}
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className={styles.overlay} />
        <Dialog.Content asChild>
          <div className={styles.content}>
            {title && <Dialog.Title>{title}</Dialog.Title>}
            {description && <Dialog.Description>{description}</Dialog.Description>}
            {children[1]}
            <Dialog.Close asChild><Button secondary>Cancel</Button></Dialog.Close>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default Modal;
