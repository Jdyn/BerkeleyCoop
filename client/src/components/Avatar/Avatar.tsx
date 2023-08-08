import * as AvatarPrimative from '@radix-ui/react-avatar';
import styles from './Avatar.module.css';

function getInitials(firstName: string, lastName: string): string {
	const firstNameInitial = firstName.charAt(0).toUpperCase();
	const lastNameInitial = lastName.charAt(0).toUpperCase();
	return firstNameInitial + lastNameInitial;
}

interface Props {
	firstName: string;
	lastName: string;
	width?: string;
	height?: string;
}

function Avatar({ firstName, lastName ,width, height }: Props) {
	return (
		<AvatarPrimative.Root className={styles.root}>
			{/* <AvatarPrimative.Image
        className={styles.image}
        src="https://images.unsplash.com/photo-1492633423870-43d1cd2775eb?&w=128&h=128&dpr=2&q=80"
        alt="Colm Tuite"
      /> */}
			<AvatarPrimative.Fallback style={{ width, height}} className={styles.fallback} delayMs={1}>
				{getInitials(firstName, lastName)}
			</AvatarPrimative.Fallback>
		</AvatarPrimative.Root>
	);
};

Avatar.defaultProps = {
	width: '45px',
	height: '45px'
}

export default Avatar;
