/* eslint-disable jsx-a11y/label-has-associated-control */
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
// import Input from "../../common/Input";
import { Controller, FieldError, useForm } from 'react-hook-form';
import { ExclamationCircleIcon } from '@heroicons/react/20/solid';
import { useEffect, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../../components/Button/Button';
import styles from './Auth.module.css';
import { useAccountSignUpMutation } from '../../api/account/account';
import Select from '../../components/Select/Select';
import { useGetHousesQuery } from '../../api/chat/chat';

const schema = Yup.object({
	email: Yup.string().email('Invalid email address').required(),
	password: Yup.string().max(20, 'Must be 20 characters or less').required(),
	last_name: Yup.string().max(20, 'Must be 20 characters or less').required(),
	first_name: Yup.string().max(20, 'Must be 20 characters or less').required(),
	house_id: Yup.object().required('Please select a house')
});

type FormData = {
	email: string;
	password: string;
	first_name: string;
	last_name: string;
	house_id: any;
};

type Props = {
	type: 'signin' | 'signup';
};

function SignUp(_props: Props) {
	const [signUp, { isSuccess, error }] = useAccountSignUpMutation();
	const navigate = useNavigate();
	const {
		control,
		register,
		handleSubmit,
		formState: { errors }
	} = useForm<FormData>({ resolver: yupResolver(schema) });

	const onSubmit = handleSubmit((data) => {
		signUp({ ...data, house_id: data.house_id.value });
	});

	const { data } = useGetHousesQuery();
	const houses = useMemo(
		() => data?.houses?.map((house) => ({ label: house.name, value: `${house.id}` })) ?? [],
		[data]
	);

	useEffect(() => {
		if (isSuccess) {
			navigate('/');
		}
	}, [isSuccess, navigate]);
	console.log(error);
	return (
		<div className={styles.root}>
			<div className={styles.hero}>
				<div className={styles.info}>
					<h1>The Berkeley Student Cooperative</h1>
					{/* <p>Join the BSC and start connecting with other members from all over the world.</p> */}
				</div>
			</div>
			<div className={styles.container}>
				<div className={styles.wrapper}>
					<h1>Sign up for an account.</h1>
					<form className={styles.form} onSubmit={onSubmit}>
						<label className={styles.field} htmlFor="email">
							Email
							<input {...register('email')} type="email" />
							{errors.email && (
								<div className={styles.error}>
									<ExclamationCircleIcon />
									<span>{errors.email.message}</span>
								</div>
							)}
						</label>
						<label className={styles.field} htmlFor="first name">
							First Name
							<input {...register('first_name')} type="input" />
							{errors.email && (
								<div className={styles.error}>
									<ExclamationCircleIcon />
									<span>{errors?.first_name?.message}</span>
								</div>
							)}
						</label>
						<label className={styles.field} htmlFor="last name">
							Last Name
							<input {...register('last_name')} type="input" />
							{errors.email && (
								<div className={styles.error}>
									<ExclamationCircleIcon />
									<span>{errors?.last_name?.message}</span>
								</div>
							)}
						</label>
						<label className={styles.field} htmlFor="house input">
							Your House
							<Controller
								control={control}
								defaultValue={{}}
								name="house_id"
								render={({ field: { onChange, value } }) => (
									<Select
										id="house input"
										value={value}
										onChange={(newValue) => {
											onChange(newValue);
										}}
										options={houses}
									/>
								)}
							/>
							{errors.house_id && (
								<div className={styles.error}>
									<ExclamationCircleIcon />
									<div>{(errors.house_id as FieldError).message}</div>
								</div>
							)}
						</label>

						<label className={styles.field} htmlFor="password">
							Password
							<input {...register('password')} type="password" />
							{errors.password && (
								<div className={styles.error}>
									<ExclamationCircleIcon />
									<div>{errors.password.message}</div>
								</div>
							)}
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
						<Button type="submit">Sign Up</Button>
					</form>
					<Link className={styles.link} to="/signin">
						Already have an account? Sign In
					</Link>
				</div>
			</div>
		</div>
	);
}

export default SignUp;
