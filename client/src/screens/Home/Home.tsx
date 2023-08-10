/* eslint-disable jsx-a11y/label-has-associated-control */
import { useEffect, useMemo, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import * as Switch from '@radix-ui/react-switch';
import { ExclamationCircleIcon } from '@heroicons/react/20/solid';
import { useAccountUpdateMutation, useGetAccountQuery } from '../../api/account/account';
import { useGetAccountEventsQuery } from '../../api/event/event';
import Avatar from '../../components/Avatar/Avatar';
import Button from '../../components/Button';
import EventCard from '../Events/EventCard/EventCard';
import styles from './Home.module.css';
import formStyles from '../../components/Form/index.module.css';
import Input from '../../components/Input';

function Home() {
	const { data } = useGetAccountQuery();
	const { data: events } = useGetAccountEventsQuery();
	const [updateUser, { isSuccess, reset, error }] = useAccountUpdateMutation();
	const [showEdit, setEdit] = useState(false);
	const {
		register,
		handleSubmit,
		control,
		reset: resetForm
	} = useForm({
		defaultValues: useMemo(
			() => ({
				hide_house: data?.user?.hideHouse,
				hide_name: data?.user?.hideName,
				username: data?.user?.username,
				bio: data?.user?.bio
			}),
			[data?.user]
		)
	});

	const user = data?.user;

	useEffect(() => {
		resetForm({
			hide_house: data?.user?.hideHouse,
			hide_name: data?.user?.hideName,
			username: data?.user?.username,
			bio: data?.user?.bio
		});
	}, [data?.user, resetForm]);

	const onSubmit = handleSubmit((payload: any) => {
		console.log(payload);
		updateUser(payload);
	});

	useEffect(() => {
		if (isSuccess) {
			setEdit(false);
			reset();
		}
	}, [isSuccess, reset]);

	return (
		<div className={styles.root}>
			<h1 className={styles.header}>Home</h1>
			<div className={styles.main}>
				<div className={styles.hero}>
					<div className={styles.background} />
					<div className={styles.wrapper}>
						<div className={styles.avatar}>
							<Avatar
								width="128px"
								height="128px"
								firstName={user?.firstName ?? ''}
								lastName={user?.lastName ?? ''}
							/>
						</div>
						<div className={styles.content}>
							<h1>
								<span>{user?.username}</span>
								<Button onClick={() => setEdit((prev) => !prev)}>
									{showEdit ? 'Cancel' : 'Edit Profile'}
								</Button>
							</h1>
							<form
								className={styles.form}
								onSubmit={onSubmit}
								style={{ display: showEdit ? 'flex' : 'none' }}
							>
								<h3>General</h3>
								<label className={styles.formLabel} htmlFor="username">
									New Display Name
									<Input
										register={register}
										name="username"
										type="username"
										placeholder="Enter a new display name"
									/>
								</label>
								<label className={styles.formLabel} htmlFor="bio">
									New Bio
									<textarea
										style={{ resize: 'vertical' }}
										className={formStyles.input}
										{...register('bio')}
										placeholder="Enter a new bio"
									/>
								</label>
								<h3>Privacy</h3>
								<label className={styles.switchLabel}>
									<span> Would you like to hide your real name to other members?</span>
									<Controller
										control={control}
										name="hide_name"
										render={({ field: { onChange, value } }) => (
											<Switch.Root
												className={styles.switchRoot}
												value={value}
												checked={value}
												onCheckedChange={(newValue) => onChange(newValue)}
											>
												<Switch.Thumb className={styles.switchThumb} />
											</Switch.Root>
										)}
									/>
								</label>
								<label className={styles.switchLabel}>
									<span> Would you like to hide your house to other members?</span>
									<Controller
										control={control}
										name="hide_house"
										render={({ field: { onChange, value } }) => (
											<Switch.Root
												className={styles.switchRoot}
												value={value}
												checked={value}
												onCheckedChange={(newValue) => onChange(newValue)}
											>
												<Switch.Thumb className={styles.switchThumb} />
											</Switch.Root>
										)}
									/>
								</label>
								<Button type="submit">Save</Button>
								{(error as any)?.data?.errors && (
									<div className={styles.error}>
										<ExclamationCircleIcon />
										<div>
											{Object.entries((error as any).data.errors).map(
												([key, value]: [any, any]) => (
													<>
														<h4>{key}</h4>
														<ul key={key}>
															{value.map((v: string) => (
																<li key={v}>{v}</li>
															))}
														</ul>
													</>
												)
											)}
										</div>
									</div>
								)}
							</form>
							<div className={styles.info} style={{ display: !showEdit ? 'flex' : 'none' }}>
								<span>
									{user?.firstName} {user?.lastName}
								</span>
								<h4>{user?.house?.name}</h4>

								<p>{user?.bio ?? "They haven't said much about themselves yet."}</p>
							</div>
						</div>
					</div>
				</div>
				<div className={styles.events}>
					<h2>My Events</h2>
					<div className={styles.eventsWrapper}>
						{events?.events &&
							events.events.map((item) => <EventCard key={item.id} event={item} />)}
					</div>
				</div>
			</div>
		</div>
	);
}

export default Home;
