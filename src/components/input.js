// InputComponent.js
import React, { useState } from 'react';
import styles from '~/styles/input.module.css';

const Input = ({
  label,
  error,
  errorInfo,
  onChange,
  value,
  type, // Added 'type' prop to differentiate between 'text' and 'password'
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const inputClassName = error ? styles.errorInput : styles.input;
  const inputType = type === 'password' ? (showPassword ? 'text' : 'password') : 'text';

  return (
    <div className={styles.inputContainer}>
      <label className={styles.label}>{label}</label>
      <div className={styles.inputWrapper}>
        <input
          className={inputClassName}
          type={inputType}
          value={value}
          onChange={onChange}
        />
        {type === 'password' && (
          <button
            className={styles.visibilityButton}
            onClick={() => setShowPassword(!showPassword)}
            type="button"
          >
            {showPassword ? 'Hide' : 'Show'}
          </button>
        )}
      </div>
      {error && <div className={styles.errorInfo}>{errorInfo}</div>}
    </div>
  );
};

export default Input;
