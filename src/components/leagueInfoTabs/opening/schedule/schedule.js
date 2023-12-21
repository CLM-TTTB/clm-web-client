import React, { useState } from 'react';
import styles from './schedule.module.css';

import RoundRobin from './roundRobin';
import KnockOut from './knockOut';

const FootballSchedule = () => {
  const [format, setFormat] = useState('Round Robin');

  return (
    <>
      <div className={styles.formats}>
        <div
          onClick={() => {
            setFormat('Round Robin');
          }}
        >
          ROUND ROBIN
        </div>
        <div
          onClick={() => {
            setFormat('Knock Out');
          }}
        >
          KNOCK OUT
        </div>
      </div>

      {format === 'Round Robin' ? <RoundRobin /> : <KnockOut />}
    </>
  );
};

export default FootballSchedule;
