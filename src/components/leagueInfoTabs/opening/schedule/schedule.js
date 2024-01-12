import React, { useState } from 'react';
import styles from './schedule.module.css';

import RoundRobin from './roundRobin';
import KnockOut from './knockOut';

const FootballSchedule = ({ leagueID, leagueFormat }) => {
  const [format, setFormat] = useState(leagueFormat);

  const renderScheduleChoosingButton = () => {
    if (leagueFormat === 'ROUND_ROBIN') {
      return (
        <button
          className={styles.button}
          onClick={() => {
            setFormat('ROUND_ROBIN');
          }}
        >
          ROUND-ROBIN
        </button>
      );
    } else if (leagueFormat === 'KNOCKOUT') {
      return (
        <button
          className={styles.button}
          onClick={() => {
            setFormat('KNOCKOUT');
          }}
        >
          KNOCK-OUT
        </button>
      );
    } else {
      return (
        <>
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
        </>
      );
    }
  };

  return (
    <>
      <div className={styles.formats}>{renderScheduleChoosingButton()}</div>

      {format === 'KNOCKOUT' ? (
        <KnockOut leagueID={leagueID} />
      ) : (
        <RoundRobin />
      )}
    </>
  );
};

export default FootballSchedule;
