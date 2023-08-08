/* eslint-disable react/button-has-type */
import { DetailedHTMLProps, forwardRef, ButtonHTMLAttributes } from 'react';
import clsx from 'clsx';

import styles from './Button.module.css';

interface Props {
	secondary?: boolean;
	green?: boolean;
}

const Button = forwardRef<
	HTMLButtonElement,
	DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement> & Props, HTMLButtonElement>
>(({ children, secondary, green, type, ...rest }, ref) => (
	<button
		{...rest}
		type={type}
		ref={ref}
		className={clsx(styles.root, secondary && styles.secondary, green && styles.green)}
	>
		{children}
	</button>
));

export default Button;
