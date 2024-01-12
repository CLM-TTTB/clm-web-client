import React, { useState } from 'react';
import styles from './schedule.module.css';

import RoundRobin from './roundRobin';
import KnockOut from './knockOut';

const FootballSchedule = ({ leagueID, leagueFormat }) => {
  const [format, setFormat] = useState();

  return (
    <>
      <div className={styles.formats}>
        <button
          className={styles.button}
          onClick={() => {
            setFormat('ROUND_ROBIN');
          }}
        >
          ROUND-ROBIN
        </button>
        <button
          className={styles.button}
          onClick={() => {
            setFormat('KNOCKOUT');
          }}
        >
          KNOCK-OUT
        </button>
      </div>

      {format === 'KNOCKOUT' ? <KnockOut /> : <RoundRobin />}
    </>
  );
};

export default FootballSchedule;
