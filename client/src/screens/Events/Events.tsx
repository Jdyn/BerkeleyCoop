import { memo } from "react";
import { useUser } from "../../hooks/useUser";
import styles from "./Events.module.css";
import EventCard from "./EventCard/EventCard";
import Dialog from "../../components/Dialog/Dialog";
import Form, { FormTemplate } from "../../components/Form";

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

const template: FormTemplate = {
  type: "event",
  fields: [
    {
      name: "Title",
      type: "input",
      key: "title",
      placeholder: "Enter a title",
    },
    {
      name: "Description",
      type: "input",
      key: "description",
      placeholder: "Enter a description",
    },
		{
      name: "Start date",
      type: "datetime-local",
      key: "start_date",
      placeholder: "Enter a start date",
    },
		{
      name: "End date",
      type: "datetime-local",
      key: "end_date",
      placeholder: "Enter an end date",
    },
  ],
  submit: "Create Event",
};

const Events = memo(() => {
  // const user = useUser();

  return (
    <>
      <h1 className={styles.header}>
        Events
        <Dialog
          title="Create an event"
          description="Publish an event for others to join and participate!"
        >
          <Form
            template={template}
            onSubmit={(_type, payload) => {
              console.log(payload);
            }}
          />
        </Dialog>
      </h1>
      <div className={styles.root}>
        {items.map((item) => (
          <EventCard key={item} event={item} />
        ))}
      </div>
    </>
  );
});

export default Events;
