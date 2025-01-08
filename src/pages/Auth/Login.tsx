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
import { Constants } from "../Constants";
import { toast } from "react-toastify";

type FormData = yup.InferType<typeof schema>;

const Login = () => {
  const navigate = useNavigate();

  //react hook form to handle the form data and YUP validation
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  const { login } = useContext(AuthContext);

  //onSubmit function to handle the form data
  const onSubmit = async (data: FormData) => {
    try {
      //api call to login
      const apidata = await authController.login(data);

      //storing data in local storage and context
      login(
        {
          username: apidata.username,
          firstName: apidata.firstName,
          email: apidata.email,
          gender: apidata.gender,
        },
        apidata.accessToken
      );

      localStorage.setItem("rememberMe", JSON.stringify(data?.rememberMe));

      reset();

      toast.success("User Login successful");

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
        <h1 className={styles.title}>{Constants.WELCOME_TO}</h1>
        <h2 className={styles.brandName}>{Constants.BRAND_NAME}</h2>

        <button className={styles.socialButton}>
          <img src={GoogleIcon} alt="Google" />
          {Constants.LOGIN_WITH_GOOGLE}
        </button>

        <button className={styles.socialButton}>
          <img src={FacebookIcon} alt="Facebook" />
          {Constants.LOGIN_WITH_FACEBOOK}
        </button>

        <div className={styles.divider}>OR</div>

        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
          <InputGroup
            label={Constants.USER_NAME}
            type="text"
            placeholder="username"
            error={errors.username?.message}
            icon={UserIcon}
            {...register("username")}
          />

          <InputGroup
            label={Constants.EMAIL}
            type="email"
            placeholder="username@email.com"
            error={errors.email?.message}
            icon={EmailIcon}
            {...register("email")}
          />

          <InputGroup
            label={Constants.PASSWORD}
            type="password"
            placeholder="Password"
            error={errors.password?.message}
            icon={LockIcon}
            {...register("password")}
          />

          <div className={styles.rememberForgotRow}>
            <label className={styles.checkboxLabel}>
              <input type="checkbox" {...register("rememberMe")} />
              {Constants.REMEMBER_ME}
            </label>
            <a href="#" className={styles.forgotPassword}>
              {Constants.FORGOT_PASSWORD}
            </a>
          </div>

          <button type="submit" className={styles.loginButton}>
            {Constants.LOGIN}
          </button>
        </form>

        <p className={styles.signupPrompt}>
          {Constants.SIGNUP_PROMPT}{" "}
          <a href="#" className={styles.signupLink}>
            {Constants.SIGNUP_LINK}
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
