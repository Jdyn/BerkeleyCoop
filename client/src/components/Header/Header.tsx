import { HomeModernIcon } from '@heroicons/react/24/outline';
import styles from './Header.module.css';
// import { useGetAccountQuery } from '../../api/account/account';

function Headers() {
	// const { data } = useGetAccountQuery();

	return (
		<nav className={styles.root}>
			<h1>
				<HomeModernIcon width="32px" />
				BSC
			</h1>
			{/* <div className={styles.actions}>
				{data?.user && (
					<>
					Hello, {data.user.firstName}
					</>
				)}
			</div> */}
		</nav>
	);
}

export default Headers;
