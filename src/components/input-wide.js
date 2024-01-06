// InputComponent.js
import React from 'react';
import styles from '~/styles/input-wide.module.css';

const InputWide = ({ label, onChange, value }) => {
  return (
    <div className={styles.inputContainer}>
      <label className={styles.label}>{label}</label>
      <div className={styles.inputWrapper}>
        <input className={styles.input} value={value} onChange={onChange} />
      </div>
    </div>
  );
};

export default InputWide;
