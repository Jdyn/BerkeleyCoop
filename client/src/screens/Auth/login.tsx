import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { ExclamationCircleIcon } from '@heroicons/react/20/solid';
import { useEffect } from 'react';
import { useAccountSignInMutation } from '../../api/account/account';
import Button from '../../components/Button/Button';
import styles from './Auth.module.css';
import Input from '../../components/Input';

const schema = Yup.object({
	email: Yup.string().email('Invalid email address').required(),
	password: Yup.string().max(20, 'Must be 20 characters or less').required()
});

type FormData = {
	email: string;
	password: string;
};

type Props = {
	type: 'signin' | 'signup';
};

function LogIn(_props: Props) {
	const [signIn, { isSuccess, error, isLoading }] = useAccountSignInMutation();

	const navigate = useNavigate();
	const {
		register,
		handleSubmit,
		formState: { errors }
	} = useForm<FormData>({ resolver: yupResolver(schema) });

	const onSubmit = handleSubmit((data) => {
		signIn(data);
	});
	console.log(isSuccess)
	useEffect(() => {
		if (isSuccess) {
			console.log('navigating')
			navigate('/');
		}
	}, [isSuccess, navigate]);

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
					<h1>Sign in to your account.</h1>
					<form className={styles.form} onSubmit={onSubmit}>
						<label className={styles.field} htmlFor="email">
							Email
							<Input register={register} name="email" type="email" />
							{errors.email && (
								<div className={styles.error}>
									<ExclamationCircleIcon />
									<span>{errors.email.message}</span>
								</div>
							)}
						</label>

						<label className={styles.field} htmlFor="password">
							Password
							<Input register={register} name="password" type="password" />
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
						<Button type="submit" isLoading={isLoading}>
							Sign In
						</Button>
					</form>
					<Link className={styles.link} to="/signup">
						Don't have an account yet? Sign up
					</Link>
				</div>
			</div>
		</div>
	);
}

export default LogIn;
