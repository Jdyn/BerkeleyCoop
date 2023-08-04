import styles from "./EventCard.module.css";
import { ReactComponent as EventImage } from '../../../images/event.svg'
interface Props {
  event: any;
}

const EventCard = ({event}: Props) => {

  return <div className={styles.root}>
		<EventImage />
		<div className={styles.container}>
			<h2>Event</h2>
			<h4>{event.title}</h4>
			<p>
				{event.description}
			</p>
		</div>
	</div>;
};

export default EventCard;
