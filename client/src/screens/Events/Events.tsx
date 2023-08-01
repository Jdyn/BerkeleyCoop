import styles from "./Events.module.css";

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

const Events = () => {
  return (
    <>
      <h1>Events</h1>
      <div className={styles.root}>
        {items.map((item) => (
          <div key={item} className={styles.item} />
        ))}
      </div>
    </>
  );
};

export default Events;
