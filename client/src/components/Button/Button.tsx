/* eslint-disable react/button-has-type */
import { DetailedHTMLProps, forwardRef, ButtonHTMLAttributes } from 'react';
import clsx from 'clsx';
import {ReactComponent as Loader } from '../../images/loader.svg';
import styles from './Button.module.css';

interface Props {
	secondary?: boolean;
	green?: boolean;
	isLoading?: boolean;
}

const Button = forwardRef<
	HTMLButtonElement,
	DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement> & Props, HTMLButtonElement>
>(({ children, secondary, green, type, isLoading, ...rest }, ref) => (
	<button
		{...rest}
		type={type ?? 'button'}
		ref={ref}
		disabled={isLoading}
		className={clsx(styles.root, secondary && styles.secondary, green && styles.green)}
	>
		{isLoading ? <Loader className={styles.spin} width="14px" />: children}
		{/* <Loader className={styles.spin} width="24px" /> */}
	</button>
));

export default Button;
