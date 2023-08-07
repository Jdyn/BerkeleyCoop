import { memo, useEffect, useState } from "react";
import styles from "./Events.module.css";
import EventCard from "./EventCard/EventCard";
import DialogForm from "../../components/Modal/Modal";
import Form, { FormTemplate } from "../../components/Form";
import { useCreateEventMutation, useGetEventsQuery } from "../../api/event/event";
import { PlusCircleIcon } from "@heroicons/react/24/outline";
import Button from "../../components/Button/Button";

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
      name: "Start Date",
      type: "datetime-local",
      key: "start_date",
      placeholder: "Enter a start date",
    },
    {
      name: "End Date",
      type: "datetime-local",
      key: "end_date",
      placeholder: "Enter an end date",
    },
  ],
  submit: "Create",
};

const Events = memo(() => {
  const { data } = useGetEventsQuery();
  const [createEvent, { isSuccess, reset, error }] = useCreateEventMutation();
  const modal = useState(false);

  useEffect(() => {
    if (isSuccess) {
      modal[1](false);
      reset();
    }
  }, [isSuccess, modal, reset]);

  return (
    <>
      <h1 className={styles.header}>
        Events
        <DialogForm
          modal={modal}
          title="Create an event"
          description="Publish an event for others to join and participate!"
        >
          <Button green>
            <PlusCircleIcon width="20px" /> Create
          </Button>
          <Form
            template={template}
						errors={(error as any)?.data?.errors || {}}
            onSubmit={(_, form) => {
              createEvent({ event: form });
            }}
          />
        </DialogForm>
      </h1>
      <div className={styles.root}>
        {data?.events && data.events.map((item) => <EventCard key={item.id} event={item} />)}
      </div>
    </>
  );
});

export default Events;
