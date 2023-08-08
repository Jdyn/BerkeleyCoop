import { useGetAccountQuery } from '../../api/account/account';
import { useGetAccountEventsQuery } from '../../api/event/event';
import Avatar from '../../components/Avatar/Avatar';
import Button from '../../components/Button';
import EventCard from '../Events/EventCard/EventCard';
import styles from './Home.module.css';

function Home() {
	const { data } = useGetAccountQuery();
	const { data: events } = useGetAccountEventsQuery();

	const user = data?.user
	return (
		<div className={styles.root}>
			<h1 className={styles.header}>Home</h1>
			<div className={styles.main}>
				<div className={styles.hero}>
					<div className={styles.background} />
					<div className={styles.wrapper}>
						<div className={styles.avatar}>
							<Avatar
								width="128px"
								height="128px"
								firstName={user?.firstName ?? ''}
								lastName={user?.lastName ?? ''}
							/>
						</div>
						<div className={styles.content}>
							<h1>
								<span>
									{user?.firstName} {user?.lastName}
								</span>
								<Button>Edit Profile</Button>
							</h1>
							<h4>{user?.house?.name}</h4>
							<p>{user?.bio ?? "They haven't said much about themselves yet."}</p>
						</div>
					</div>
				</div>
				<div className={styles.events}>
					<h2>My Events</h2>
					<div className={styles.eventsWrapper}>
						{events?.events &&
							events.events.map((item) => <EventCard key={item.id} event={item} />)}
					</div>
				</div>
			</div>
		</div>
	);
}

export default Home;
