import { InputHTMLAttributes } from 'react';
import { UseFormRegister } from 'react-hook-form';
import styles from './Input.module.css';

function Input({
	register,
	...rest
}: InputHTMLAttributes<HTMLInputElement> & { register?: UseFormRegister<any> }) {
	return register ? <input {...register(rest?.name as string)} {...rest} className={styles.input} /> : <input {...rest} className={styles.input} />;
}

Input.defaultProps = {
	register: () => {}
};

export default Input;
