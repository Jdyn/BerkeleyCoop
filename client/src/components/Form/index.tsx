import { useState, FormEvent, ChangeEvent } from 'react';
import Button from '../Button/Button';
import formatDate from '../../util/formatDate';

import styles from './index.module.css';

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
	errors?: any;
}

function Form(props: Props) {
	const { onSubmit, template, errors } = props;

	const [form, setForm] = useState<Record<string, any>>({});

	const submitForm = (event: FormEvent): void => {
		event.preventDefault();
		onSubmit(template.type, form);
	};

	return (
		<form className={styles.form} onSubmit={submitForm}>
			{template.fields.map((field) => (
				<fieldset className={styles.container} key={field.name}>
					<label className={styles.label} htmlFor={field.name}>
						{field.name}
					</label>
					<input
						className={styles.input}
						value={form[field.key || field.name] || ''}
						type={field.type || field.key}
						placeholder={field.placeholder}
						min={formatDate(new Date(Date.now()))}
						onChange={(event: ChangeEvent<HTMLInputElement>): void =>
							setForm({
								...form,
								[field.key || field.name]: event.target.value
							})
						}
					/>
					{errors[field.key || field.name] && (
						<span className={styles.error}>{errors[field.key || field.name]}</span>
					)}
				</fieldset>
			))}
			<Button type="submit">{template.submit}</Button>
		</form>
	);
}

Form.defaultProps = {
	isPending: false,
	errors: null
};

export default Form;
