import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import styles from "./login.module.scss";
import UserIcon from "../../assets/icons/user.svg";
import EmailIcon from "../../assets/icons/mail.svg";
import LockIcon from "../../assets/icons/key.svg";
import GoogleIcon from "../../assets/icons/google icon.svg";
import FacebookIcon from "../../assets/icons/facebook icon.svg";
import LoginIllustration from "../../assets/icons/Illustration.svg";
import InputGroup from "../../Components/InputField/InputField";
import { schema } from "./validation";
import { useContext } from "react";
import { AuthContext } from "../../Context/AuthContext";
import { useNavigate } from "react-router-dom";
import { authController } from "../../Controller/AuthController";

type FormData = yup.InferType<typeof schema>;

const Login = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  const { login } = useContext(AuthContext);

  const onSubmit = async (data: FormData) => {
    try {
      const apidata = await authController.login(data);

      login(apidata.username, apidata.accessToken, apidata.email, apidata.firstName, apidata.gender);
      reset();

      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={styles.loginContainer}>
      <img
        src={LoginIllustration}
        alt="Login Illustration"
        className={styles.illustration}
        loading="lazy"
      />
      <div className={styles.loginCard}>
        <h1 className={styles.title}>Welcome to</h1>
        <h2 className={styles.brandName}>Unstop</h2>

        <button className={styles.socialButton}>
          <img src={GoogleIcon} alt="Google" />
          Login with Google
        </button>

        <button className={styles.socialButton}>
          <img src={FacebookIcon} alt="Facebook" />
          Login with Facebook
        </button>

        <div className={styles.divider}>OR</div>

        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
          <InputGroup
            label="User name"
            type="text"
            placeholder="username"
            error={errors.username?.message}
            icon={UserIcon}
            {...register("username")}
          />

          <InputGroup
            label="Email"
            type="email"
            placeholder="username@email.com"
            error={errors.email?.message}
            icon={EmailIcon}
            {...register("email")}
          />

          <InputGroup
            label="Password"
            type="password"
            placeholder="Password"
            error={errors.password?.message}
            icon={LockIcon}
            {...register("password")}
          />

          <div className={styles.rememberForgotRow}>
            <label className={styles.checkboxLabel}>
              <input type="checkbox" {...register("rememberMe")} />
              Remember me
            </label>
            <a href="#" className={styles.forgotPassword}>
              Forgot Password?
            </a>
          </div>

          <button type="submit" className={styles.loginButton}>
            Login
          </button>
        </form>

        <p className={styles.signupPrompt}>
          Don't have an account?{" "}
          <a href="#" className={styles.signupLink}>
            Register
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
