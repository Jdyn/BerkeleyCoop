import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import styles from "./Auth.module.css";
// import Input from "../../common/Input";
import { useForm } from "react-hook-form";
import { ExclamationCircleIcon } from "@heroicons/react/20/solid";
import { useAccountSignInMutation, useAccountSignOutMutation } from "../../api/account/account";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const schema = Yup.object({
  email: Yup.string().email("Invalid email address").required(),
  password: Yup.string().max(20, "Must be 20 characters or less").required(),
});

type FormData = {
  email: string;
  password: string;
};

type Props = {
  type: "signin" | "signup";
};

const LogIn = (_props: Props): JSX.Element => {
  const [signIn, { isSuccess, error }] = useAccountSignInMutation();
	// const [signOut] = useAccountSignOutMutation();

  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ resolver: yupResolver(schema) });

  const onSubmit = handleSubmit((data) => {
    signIn(data);
  });

  // useEffect(() => {
  //   if (isSuccess) {
  //     navigate("/events");
  //   }
  // }, [isSuccess, navigate]);

  return (
    <div className={styles.root}>
      <div className={styles.info} />
      <div className={styles.container}>
        <div className={styles.wrapper}>
          <h1>Sign in to your account.</h1>
          <form className={styles.form} onSubmit={onSubmit}>
            <fieldset className={styles.field}>
              <label htmlFor="email">Email</label>
              <input {...register("email")} />
              {errors.email && (
                <div className={styles.error}>
                  <ExclamationCircleIcon />
                  <span>{errors.email.message}</span>
                </div>
              )}
            </fieldset>

            <fieldset className={styles.field}>
              <label htmlFor="password">Password</label>
              <input {...register("password")} />
              {errors.password && (
                <div className={styles.error}>
                  <ExclamationCircleIcon />
                  <div>{errors.password.message}</div>
                </div>
              )}
            </fieldset>
            {(error as any)?.data?.error && (
              <div className={styles.error}>
                <ExclamationCircleIcon />
                <div>{(error as any).data.error}</div>
              </div>
            )}

            <button type="submit">Sign In</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LogIn;
