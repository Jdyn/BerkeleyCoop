/* eslint-disable eqeqeq */
/* eslint-disable jsx-a11y/label-has-associated-control */
import { useEffect, useMemo, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import clsx from 'clsx';
import {
	ArrowLongRightIcon,
	BuildingStorefrontIcon,
	ChatBubbleLeftRightIcon,
	ExclamationCircleIcon,
	PaperAirplaneIcon,
	PlusCircleIcon
} from '@heroicons/react/24/outline';
import { Controller, useForm } from 'react-hook-form';
import { HashtagIcon } from '@heroicons/react/20/solid';
import { useChannel } from '../../hooks/socket/useChannel';
import useEvent from '../../hooks/socket/useEvent';
import { useUser } from '../../hooks/useUser';
import { formatTimeAgo } from '../../util/dates';
import Modal from '../../components/Modal/Modal';
import { useCreateRoomMutation, useGetHousesQuery } from '../../api/chat/chat';
import Select from '../../components/Select/Select';
import Button from '../../components/Button';
import formStyles from '../../components/Form/index.module.css';
import styles from './Chat.module.css';
import Input from '../../components/Input';

function Chat() {
	const { id } = useParams<{ id: string }>();
	const navigate = useNavigate();
	const modal = useState(false);
	const [messages, setMessages] = useState<any[]>([]);
	const [rooms, setRooms] = useState<any[]>([]);
	const channel = useChannel(id ? `chat:${id}` : `chat:lobby`);
	const { data } = useGetHousesQuery();
	const [createRoom, { isSuccess, error, isLoading, reset }] = useCreateRoomMutation();

	const { control, register, handleSubmit } = useForm<any>();

	const houses = useMemo(
		() => data?.houses?.map((house) => ({ label: house.name, value: house })) ?? [],
		[data]
	);

	const user = useUser();

	useEffect(() => {
		if (isSuccess) {
			modal[1](false);
			reset();
			navigate('/chats', { replace: true });
		}
	}, [isSuccess, modal, navigate, reset]);

	useEvent(channel, 'shout', (message) => {
		setMessages((prev) => [...prev, message]);
	});

	useEvent(channel, 'lobby', (message) => {
		setRooms(message.rooms);
	});

	useEvent(channel, 'messages', (message) => {
		setMessages(message.messages);
	});

	const currentRoom = useMemo(
		() => rooms.find((room) => room.id === parseInt(id as string, 10)),
		[rooms, id]
	);

	const onSubmit = handleSubmit((newData) => {
		const payload = {
			room: { ...newData, houses: newData.houses.map((option: any) => option.value.name) }
		};
		createRoom(payload);
	});

	return (
		<div className={styles.root}>
			<h1 className={styles.header}>
				Chat
				<Modal
					modal={modal}
					title="Create a new room?"
					description="Publish an event for others to join and participate!"
				>
					<Button>
						<PlusCircleIcon width="20px" /> Create
					</Button>
					<div className={styles.formContent}>
						<form className={formStyles.form} onSubmit={onSubmit}>
							<label htmlFor="name input" className={formStyles.container}>
								Room name
								<Input
									register={register}
									name="name"
									type="input"
									id="name input"
									placeholder="Enter a name..."
								/>
							</label>
							<label htmlFor="description input" className={formStyles.container}>
								Room description
								<Input
									register={register}
									name="description"
									type="input"
									placeholder="Enter a description..."
								/>
							</label>
							<label className={formStyles.container} htmlFor="house input">
								Invite houses
								<Controller
									control={control}
									defaultValue={[]}
									name="houses"
									render={({ field: { onChange, value, ref } }) => (
										<div ref={ref}>
											<Select
												id="house input"
												value={value}
												onChange={(newValue) => {
													onChange(
														newValue.filter(
															(obj, index) =>
																newValue.findIndex((item) => item.value.id === obj.value.id) ===
																index
														)
													);
												}}
												options={houses}
												isMulti
											/>
										</div>
									)}
								/>
							</label>
							{(error as any)?.data?.error && (
								<div className={styles.error}>
									<ExclamationCircleIcon />
									<div>{(error as any).data.error}</div>
								</div>
							)}
							{(error as any)?.data?.errors && (
								<div className={styles.error}>
									<ExclamationCircleIcon />
									<div>
										{Object.entries((error as any).data.errors).map(([key, value]: [any, any]) => (
											<>
												<h4>{key}</h4>
												<ul key={key}>
													{value.map((v: string) => (
														<li key={v}>{v}</li>
													))}
												</ul>
											</>
										))}
									</div>
								</div>
							)}
							<Button isLoading={isLoading} type="submit">
								Create
							</Button>
						</form>
					</div>
				</Modal>
			</h1>
			<main className={styles.wrapper}>
				<div className={styles.rooms}>
					<div className={styles.roomHeader}>
						<h2>
							<BuildingStorefrontIcon width="32px" /> <span>Rooms</span>
						</h2>
					</div>
					{rooms.map((room) => (
						<Link
							to={`${room.id}`}
							className={clsx(styles.roomItem, room.id == id && styles.active)}
							key={room.id}
						>
							<h3>
								<HashtagIcon width="18px" /> {room.name}
							</h3>
							<p>{room.description}</p>
							<div className={styles.houseList} style={{ maxHeight: '50px' }}>
								{room.houses.map((house: any) => (
									<span
										className={clsx(styles.housePill, room.id == id && styles.activePill)}
										key={house.name}
									>
										{house.name}
									</span>
								))}
							</div>
						</Link>
					))}
				</div>
				<div className={styles.window}>
					{currentRoom?.name && (
						<div className={styles.windowHeader}>
							<h2>
								<ChatBubbleLeftRightIcon width="32px" /> {currentRoom.name}
							</h2>
							<div className={clsx(styles.houseList, styles.text)}>
								{currentRoom.houses?.map((house: any) => (
									<span className={styles.housePill} key={house.name}>
										{house.name}
									</span>
								))}
							</div>
							{currentRoom.event && (
								<Link to={`/events/${currentRoom.event?.id}`}>
									{`This chat has an event: ${currentRoom.event.title}!`}
									<ArrowLongRightIcon width="24px" />
								</Link>
							)}
						</div>
					)}
					<div className={styles.chatList}>
						<div className={styles.chatContent}>
							{messages.map((message) => (
								<div
									className={clsx(
										styles.message,
										message.user.id === user?.id && styles.ownMessage
									)}
									key={message.id}
								>
									<h4
										className={styles.messageHeader}
										style={{
											flexDirection: message.user.id === user?.id ? 'row' : 'row-reverse'
										}}
									>
										<div>{formatTimeAgo(message.inserted_at)}</div>
										<span>{message.username}</span>
									</h4>
									<div
										className={clsx(
											styles.messageContent,
											message.user.id === user?.id && styles.selfMessageContent
										)}
									>
										<p>{message.content}</p>
									</div>
								</div>
							))}
						</div>
					</div>
					<form
						className={styles.inputForm}
						onSubmit={(e) => {
							e.preventDefault();
							const input = document.getElementById('message') as HTMLInputElement;
							channel?.push('shout', { content: input.value });
							input.value = '';
						}}
					>
						<input id="message" className={styles.input} placeholder="Enter a message..." />
						<button title="Send a chat message" className={styles.submit} type="submit">
							<PaperAirplaneIcon width="24px" />
						</button>
					</form>
				</div>
			</main>
		</div>
	);
}

export default Chat;
