import styles from "./EventCard.module.css";

interface Props {
  event: any;
}

const EventCard = (props: Props) => {
  return <div className={styles.root}></div>;
};

export default EventCard;
