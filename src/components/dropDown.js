// CustomDropdown.js
import React, { useState } from 'react';
import classNames from 'classnames';
import styles from '~/styles/dropDown.module.css';
import arrow from '~/images/header/arrow.png';

const CustomDropdown = ({ label, options, onChange }) => {
  const [selectedOption, setSelectedOption] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  const handleOptionClick = (option) => {
    setSelectedOption(option === '(none)' ? '' : option);
    onChange(option === '(none)' ? '' : option);
    setIsOpen(false);
  };

  // Replace the placeholder with "None"
  const dropdownOptions = options.map((option) =>
    option === '' ? '(none)' : option,
  );

  return (
    <div className={styles.dropdownWrapper}>
      <div className={styles.dropdownContainer}>
        <div
          className={classNames(styles.dropdownHeader, {
            [styles.open]: isOpen,
          })}
          onClick={() => setIsOpen(!isOpen)}
        >
          <div className={styles.dropdownHeaderText}>
            {selectedOption || label}
          </div>

          <img className={styles.arrow} src={arrow} />
        </div>
        {isOpen && (
          <div
            className={`${styles.dropdownList} ${styles.roundedCorners1} ${styles.topLeftTopRight1}`}
          >
            {dropdownOptions.map((option) => (
              <div
                key={option}
                className={styles.dropdownItem}
                onClick={() => handleOptionClick(option)}
              >
                {option}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CustomDropdown;
