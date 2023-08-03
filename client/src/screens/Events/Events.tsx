import { memo } from "react";
import { useUser } from "../../hooks/useUser";
import styles from "./Events.module.css";
import EventCard from "./EventCard/EventCard";
import Button from "../../components/Button/Button";

const items = [
  "item1",
  "item2",
  "item3",
  "item4",
  "item5",
  "item6",
  "item7",
  "item8",
  "item9",
  "item10",
  "item11",
  "item12",
  "item13",
  "item14",
  "item15",
  "item16",
  "item17",
  "item18",
  "item19",
  "item20",
  "item21",
  "item22",
  "item23",
  "item24",
];

const Events = memo(() => {
  const user = useUser();
  console.log(user);

  return (
    <>
      <h1 className={styles.header}>
        Events
          <Button>Create</Button>
      </h1>
      <div className={styles.root}>
        {items.map((item) => (
          <EventCard event={item} />
        ))}
      </div>
    </>
  );
});

export default Events;
