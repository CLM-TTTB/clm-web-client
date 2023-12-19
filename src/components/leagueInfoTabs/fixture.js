import React from 'react';
import styles from './fixture.module.css';

const Fixture = ({ teamA, teamB, isCompleted, result, date, time }) => {
  return (
    <div className={styles.fixtureContainer}>
      <div className={styles.team}>{teamA}</div>

      {isCompleted ? (
        <div className={styles.result}>{result}</div>
      ) : (
        <div className={styles.dateTime}>
          <p className={styles.time}>{time}</p>
          <p className={styles.date}>{date}</p>
        </div>
      )}

      <div className={styles.team}>{teamB}</div>
    </div>
  );
};

export default Fixture;
