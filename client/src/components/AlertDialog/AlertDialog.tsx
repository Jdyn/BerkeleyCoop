import * as AlertDialog from '@radix-ui/react-alert-dialog';
import { MouseEventHandler, ReactNode } from 'react';
import clsx from 'clsx';

import styles from './Alert.module.css';

interface ModalProps {
	children?: ReactNode;
	title: string;
	description: string;
	submitText: string;
	onSubmit?: MouseEventHandler<HTMLButtonElement>;
	className?: string;
}

export function Alert({
	title,
	description,
	submitText,
	onSubmit,
	children,
	className
}: ModalProps): JSX.Element {
	return (
		<div className={clsx(styles.modalRoot, className)}>
			<AlertDialog.Root>
				<AlertDialog.Trigger asChild>{children}</AlertDialog.Trigger>
				<AlertDialog.Portal>
					<AlertDialog.Overlay className={styles.overlay} />
					<AlertDialog.Content className={styles.dialog}>
						<div className={styles.content}>
							<AlertDialog.Title>{title}</AlertDialog.Title>
							<AlertDialog.Description>{description}</AlertDialog.Description>
							<div className={styles.buttons}>
								<AlertDialog.Cancel asChild>
									<button className={styles.button} type="button">
										Cancel
									</button>
								</AlertDialog.Cancel>
								<AlertDialog.Action asChild>
									<button
										type="button"
										className={clsx(styles.button, styles.danger)}
										onClick={onSubmit}
									>
										{submitText}
									</button>
								</AlertDialog.Action>
							</div>
						</div>
					</AlertDialog.Content>
				</AlertDialog.Portal>
			</AlertDialog.Root>
		</div>
	);
}

Alert.defaultProps = {
	children: null,
	onSubmit: null,
	className: null
};

export default Alert;
