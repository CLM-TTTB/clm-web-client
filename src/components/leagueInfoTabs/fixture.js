// Fixture.js

import React from 'react';
import styles from './fixture.module.css';

const Fixture = ({
  teamA,
  teamB,
  isCompleted,
  resultA,
  resultB,
  date,
  time,
  onResultClick,
}) => {
  return (
    <div className={styles.fixtureContainer}>
      <div className={styles.team}>{teamA}</div>

      <div className={styles.dateTime} onClick={onResultClick}>
        <div className={styles.result}>
          <div>{resultA}</div>
          <div>{' - '}</div>
          <div>{resultB}</div>
        </div>
      </div>

      <div className={styles.team}>{teamB}</div>
    </div>
  );
};

export default Fixture;
