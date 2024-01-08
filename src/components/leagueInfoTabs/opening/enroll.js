// Enroll.jsx

import React, { useState } from 'react';
import styles from './enroll.module.css';
import Button from '~/components/button';
import ChooseTeam from '~/components/leagueInfoTabs/opening/enroll/chooseTeam'; // Import the ChooseTeam component

const Enroll = ({ onEnrollClick }) => {
  const [enrollClicked, setEnrollClicked] = useState(false);

  const handleEnrollClick = () => {
    setEnrollClicked(true);
    if (onEnrollClick) {
      onEnrollClick();
    }
  };

  return (
    <div>
      {enrollClicked ? (
        <ChooseTeam />
      ) : (
        <>
          <div className={styles.parrentContainer}>
            <div>
              Due date <span className={styles.dueDate}>06/01/2023</span>
            </div>
            <div>
              Number of members: <span className={styles.teamNumber}>5-22</span>
            </div>
            <h1 className={styles.countdown}>12d : 12h : 12m : 12s</h1>
            <Button text="Enroll" onClick={handleEnrollClick}></Button>
          </div>
        </>
      )}
    </div>
  );
};

export default Enroll;
