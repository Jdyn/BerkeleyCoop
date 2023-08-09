import { lastUpdated } from '../../util/dates';
import Avatar from '../Avatar/Avatar';
import styles from './UserListCard.module.css';

interface Props {
	user: any;
	online?: boolean;
}

function UserListCard({ user, online }: Props) {
	return (
		<div className={styles.root}>
			<Avatar firstName={user.firstName} lastName={user.lastName} />
			<div className={styles.header}>
				<h4 className={styles.name}>
					{/* {user.firstName} {user.lastName} */}
					{user.username}
				</h4>
				<div>{user.house && <div className={styles.house}>{user.house.name}</div>}</div>
				<div className={styles.status}>
					{online ? (
						<>
							<span className={styles.indicator} />
							Online Now
						</>
					) : (
						`Seen ${lastUpdated(user.lastSeen)}`
					)}
				</div>
			</div>
		</div>
	);
}

UserListCard.defaultProps = {
	online: false
};

export default UserListCard;
