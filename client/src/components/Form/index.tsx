import { useState, FormEvent, ChangeEvent } from "react";
import Button from "../Button/Button";
import styles from "./index.module.css";
import formatDate from "../../util/formatDate";

export interface FormTemplate {
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
  onSubmit: (type: string, form: Record<string, unknown>) => void;
  isPending?: boolean;
  template: FormTemplate;
}

const Form = (props: Props): JSX.Element => {
  const { onSubmit, template, isPending } = props;

  const [form, setForm] = useState<Record<string, any>>({});

  const submitForm = (event: FormEvent): void => {
    event.preventDefault();
    onSubmit(template.type, form);
  };
	console.log(formatDate(new Date(Date.now())))
	
  return (
    <form className={styles.form} onSubmit={submitForm}>
      {template.fields.map((field) => (
        <fieldset className={styles.container} key={field.name}>
          <label className={styles.label} htmlFor={field.name}>
            {field.name}
          </label>
          <input
            className={styles.input}
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
      <Button isPending={isPending}>{template.submit}</Button>
    </form>
  );
};

Form.defaultProps = {
  isPending: false,
};

export default Form;
