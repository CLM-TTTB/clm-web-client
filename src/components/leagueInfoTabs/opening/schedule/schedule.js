import React, { useState } from 'react';
import styles from './schedule.module.css';

import RoundRobin from './roundRobin';
import KnockOut from './knockOut';

const FootballSchedule = (leagueStatus) => {
  const [format, setFormat] = useState('Round Robin');

  return (
    <>
      <div className={styles.formats}>
        <button
          className={styles.button}
          onClick={() => {
            setFormat('Round Robin');
          }}
        >
          ROUND-ROBIN
        </button>
        <button
          className={styles.button}
          onClick={() => {
            setFormat('Knock Out');
          }}
        >
          KNOCK-OUT
        </button>
      </div>

      {format === 'Round Robin' ? <RoundRobin /> : <KnockOut />}
    </>
  );
};

export default FootballSchedule;
