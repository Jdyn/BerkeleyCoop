import * as DialogPrimative from "@radix-ui/react-dialog";
import { ChangeEvent, FormEvent, useState } from "react";
import styles from "./Dialog.module.css";
import Button from "../Button/Button";
import buttonStyles from "../Button/Button.module.css";
import formatDate from "../../util/formatDate";
import formStyles from "../Form/index.module.css";

interface FormTemplate {
  title?: string;
  description?: string;
  type: string;
  fields: {
    name: string;
    type: string;
    key?: string;
    placeholder?: string;
  }[];
  submit: string;
}

interface Props {
	modal: [boolean, React.Dispatch<React.SetStateAction<boolean>>]
  title?: string;
  description?: string;
  onSubmit: (type: string, form: Record<string, unknown>) => void;
  isPending?: boolean;
  template: FormTemplate;
}

const DialogForm = ({ modal, title, description, ...rest }: Props) => {
  const { template, onSubmit } = rest;
	const [open, setOpen] = modal;
  const [form, setForm] = useState<Record<string, any>>({});

  const submitForm = (event: FormEvent): void => {
    event.preventDefault();
    onSubmit(template.type, form);
  };

  return (
    <DialogPrimative.Root open={open} onOpenChange={(newOpen) => setOpen(newOpen)}>
      <DialogPrimative.Trigger className={buttonStyles.root} onClick={() => setOpen(true)}>
        Create
      </DialogPrimative.Trigger>
      <DialogPrimative.Portal>
        <DialogPrimative.Overlay className={styles.overlay} />
        <DialogPrimative.Content asChild>
          <div className={styles.content}>
            {title && <DialogPrimative.Title>{title}</DialogPrimative.Title>}
            {description && (
              <DialogPrimative.Description>{description}</DialogPrimative.Description>
            )}
            <form className={formStyles.form} onSubmit={submitForm}>
              {template.fields.map((field) => (
                <fieldset className={formStyles.container} key={field.name}>
                  <label className={formStyles.label} htmlFor={field.name}>
                    {field.name}
                  </label>
                  <input
                    className={formStyles.input}
                    value={form[field.key || field.name] || ""}
                    type={field.type || field.key}
                    placeholder={field.placeholder}
                    min={formatDate(new Date(Date.now()))}
                    onChange={(event: ChangeEvent<HTMLInputElement>): void =>
                      setForm({
                        ...form,
                        [field.key || field.name]: event.target.value,
                      })
                    }
                  />
                </fieldset>
              ))}
              <div className={styles.group}>
                <Button type="submit">{template.submit}</Button>
                <Button onClick={() => setOpen(false)}>cancel</Button>
              </div>
            </form>
          </div>
        </DialogPrimative.Content>
      </DialogPrimative.Portal>
    </DialogPrimative.Root>
  );
};

export default DialogForm;
