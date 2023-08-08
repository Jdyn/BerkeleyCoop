import { ChevronDoubleLeftIcon } from '@heroicons/react/24/outline';
import { Link, useParams } from 'react-router-dom';
import styles from './Event.module.css';
import { useGetEventQuery } from '../../../api/event/event';

function Event() {
	const { id } = useParams<{ id: string }>();
	const { data } = useGetEventQuery(id);

	return (
		<div className={styles.root}>
			<h1 className={styles.header}>
				<Link to="/events">
					<ChevronDoubleLeftIcon width="25px" />
				</Link>
				{data?.event?.title}
			</h1>
			<div className={styles.wrapper}>

			</div>
		</div>
	);
}

export default Event;
