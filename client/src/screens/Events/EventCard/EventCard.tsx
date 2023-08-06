import styles from "./EventCard.module.css";
import { ReactComponent as EventImage } from "../../../images/event.svg";
import { dateRange, formatEventStatus, isStarted } from "../../../util/dates";

interface Props {
  event: any;
}

const EventCard = ({ event }: Props) => {
  return (
    <div className={styles.root}>
      <EventImage />
      <div className={styles.container}>
        <div className={styles.header}>
          <h3>Event</h3>
          <h2>{event.title}</h2>
          <span>{dateRange(event.startDate, event.endDate)}</span>
          {isStarted(event.startDate) && <div className={styles.started}>Event Started!</div>}
        </div>
        <div className={styles.wrapper}>
          <span>description:</span>
          <p className={styles.description}>{event.description}</p>
          <span>{formatEventStatus(event.startDate, event.endDate)}</span>
        </div>
      </div>
    </div>
  );
};

export default EventCard;
