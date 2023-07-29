import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import styles from "./LogIn.module.css";
import Input from "../../common/Input";
import { useForm } from "react-hook-form";

const schema = Yup.object({
  email: Yup.string().email("Invalid email address").required(),
  password: Yup.string().max(20, "Must be 20 characters or less").required(),
});

type FormData = {
  email: string;
  password: string;
};

const LogIn = (): JSX.Element => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ resolver: yupResolver(schema) });

  const onSubmit = handleSubmit((data) => console.log(data));

  return (
    <div className={styles.root}>
      <div className={styles.info} />
      <div className={styles.container}>
        <div className={styles.wrapper}>
          <h1>Sign in to your account.</h1>
          <form onSubmit={onSubmit}>
            <input {...register("email")} />
            <p>{errors.email?.message}</p>

            <input {...register("password")} />
            <p>{errors.password?.message}</p>

            <input type="submit" />
          </form>
        </div>
      </div>
    </div>
  );
};

export default LogIn;
