// InputComponent.js
import React from 'react';
import styles from '~/styles/input-short.module.css';

const Input = ({
  label,
  error,
  errorInfo,
  onChange,
  value,
  toggleVisibility,
  showPassword,
}) => {
  const inputClassName = error ? styles.errorInput : styles.input;
  const inputType = showPassword ? 'password' : 'text';

  const isPasswordEmpty = value.trim().length === 0;

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
        {toggleVisibility && !isPasswordEmpty && (
          <button
            className={styles.visibilityButton}
            onClick={toggleVisibility}
            type="button"
          >
            {showPassword ? 'Show' : 'Hide'}
          </button>
        )}
      </div>
      {error && <div className={styles.errorInfo}>{errorInfo}</div>}
    </div>
  );
};

export default Input;
