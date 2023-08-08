import { memo, useEffect, useMemo, useState } from 'react';
import { PlusCircleIcon } from '@heroicons/react/24/outline';
import styles from './Events.module.css';
import EventCard from './EventCard/EventCard';
import DialogForm from '../../components/Modal/Modal';
import Form, { FormTemplate } from '../../components/Form';
import { useCreateEventMutation, useGetEventsQuery } from '../../api/event/event';
import Button from '../../components/Button/Button';

const template: FormTemplate = {
	type: 'event',
	fields: [
		{
			name: 'Title',
			type: 'input',
			key: 'title',
			placeholder: 'Enter a title'
		},
		{
			name: 'Description',
			type: 'input',
			key: 'description',
			placeholder: 'Enter a description'
		},
		{
			name: 'Start Date',
			type: 'datetime-local',
			key: 'start_date',
			placeholder: 'Enter a start date'
		},
		{
			name: 'End Date',
			type: 'datetime-local',
			key: 'end_date',
			placeholder: 'Enter an end date'
		}
	],
	submit: 'Create'
};

const Events = memo(() => {
	const { data } = useGetEventsQuery();
	const [createEvent, { isSuccess, reset, error, isLoading }] = useCreateEventMutation();
	const modal = useState(false);

	useEffect(() => {
		if (isSuccess) {
			console.log('success');
			modal[1](false);
			reset();
		}
	}, [isSuccess, modal, reset]);

	const [thisWeek, upcoming] = useMemo(() => {
		const newEvents: any[] = [];
		const newUpcoming: any[] = [];
		const now = new Date();

		if (data?.events) {
			data?.events.forEach((obj) => {
				const startDate = new Date(obj.startDate);
				const timeDiff = startDate.getTime() - now.getTime();
				const daysDiff = timeDiff / (1000 * 60 * 60 * 24);

				if (daysDiff <= 7) {
					newEvents.push(obj);
				} else {
					newUpcoming.push(obj);
				}
			});
		}

		return [newEvents, newUpcoming];
	}, [data?.events]);

	return (
		<div className={styles.root}>
			<h1 className={styles.header}>
				Events
				<DialogForm
					modal={modal}
					title="Create an event"
					description="Publish an event for others to join and participate!"
				>
					<Button isLoading={isLoading}>
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
			<div className={styles.wrapper}>
				<div className={styles.list}>
					<div className={styles.listHeader}>
						<h2>Events This Week</h2>
						<p>Browse upcoming events happening this week.</p>
					</div>
					<div className={styles.events}>
						{thisWeek && thisWeek.map((item) => <EventCard key={item.id} event={item} />)}
					</div>
				</div>

				<div className={styles.list}>
					<div className={styles.listHeader}>
						<h2>Upcoming Events</h2>
						<p>Browse events coming up later this month.</p>
					</div>
					<div className={styles.events}>
						{upcoming && upcoming.map((item) => <EventCard key={item.id} event={item} />)}
					</div>
				</div>
			</div>
		</div>
	);
});

export default Events;
