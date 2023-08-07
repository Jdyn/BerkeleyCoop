import styles from "./EventCard.module.css";
import { ReactComponent as EventImage } from "../../../images/event.svg";
import { dateRange, formatEventStatus, isStarted } from "../../../util/dates";
import AlertDialog from "../../../components/AlertDialog/AlertDialog";
import { TrashIcon } from "@heroicons/react/24/outline";
import { useDeleteEventMutation } from "../../../api/event/event";
import { useUser } from "../../../hooks/useUser";

interface Props {
  event: any;
}

const EventCard = ({ event }: Props) => {
  const [deleteEvent] = useDeleteEventMutation();
  const user = useUser();
	console.log(event)
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
      {user?.id === event?.creator?.id && (
        <AlertDialog
          className={styles.alert}
          title="Are you sure you want to delete this event?"
          description="This will permanently delete your event. This cannot be undone."
          submitText="Delete"
          onSubmit={(e) => {
            deleteEvent(event.id);
          }}
        >
          <TrashIcon width="24px" />
        </AlertDialog>
      )}
    </div>
  );
};

export default EventCard;
