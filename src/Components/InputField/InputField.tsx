import React, { useState, forwardRef } from "react";
import styles from "./inputfield.module.scss";
import EyeIcon from "../../assets/icons/visibility.svg";

interface InputGroupProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  icon: string;
  error?: string;
  iconAlt?: string;
}

const InputGroup = forwardRef<HTMLInputElement, InputGroupProps>(({
  label,
  type,
  placeholder,
  icon,
  error,
  iconAlt,
  ...props
}, ref) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className={styles.inputGroup}>
      <label>{label}</label>
      <div className={styles.inputWrapper}>
        <span className={styles.iconWrapper}>
          <img src={icon} alt={iconAlt || label} />
        </span>
        <input
          type={type === "password" ? (showPassword ? "text" : "password") : type}
          placeholder={placeholder}
          ref={ref}
          {...props}
        />
        {type === "password" && (
          <button
            type="button"
            className={styles.eyeIcon}
            onClick={() => setShowPassword(!showPassword)}
          >
            <img src={EyeIcon} alt={showPassword ? "Hide password" : "Show password"} />
          </button>
        )}
      </div>
      {error && <span className={styles.errorMessage}>{error}</span>}
    </div>
  );
});

InputGroup.displayName = "InputGroup";

export default InputGroup;
