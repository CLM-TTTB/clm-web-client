import React from 'react';
import styles from '~/styles/dropdown-short.module.css';

const DropdownShort = ({ label, options, value, onChange }) => {
  return (
    <div className={styles.dropdownContainer}>
      <label className={styles.label}>{label}</label>
      <div className={styles.dropdownWrapper}>
        <select className={styles.dropdown} value={value} onChange={onChange}>
          {options.map((option, index) => (
            <option className={styles.option} key={index} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default DropdownShort;
