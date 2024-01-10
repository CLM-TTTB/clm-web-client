// Enroll.jsx

import React, { useState, useEffect } from 'react';
import styles from './enroll.module.css';
import Button from '~/components/button';
import ChooseTeam from '~/components/leagueInfoTabs/opening/enroll/chooseTeam'; // Import the ChooseTeam component
import HttpStatus from '~/constants/httpStatusCode';
import { getLeagueByID } from '~/apiServices/leagueService';

const Enroll = ({ leagueID, onEnrollClick }) => {
  const [enrollClicked, setEnrollClicked] = useState(false);
  const [registrationDeadline, setRegistrationDeadline] = useState();

  useEffect(() => {
    const fetchLeagueByID = async () => {
      try {
        console.log(leagueID);
        const response = await getLeagueByID(leagueID);

        if (response.status === HttpStatus.OK) {
          setRegistrationDeadline(response.data.registrationDeadline);
        } else if (response.status === HttpStatus.NOT_FOUND) {
          console.log('League by id does not found!!');
        } else if (response.status === HttpStatus.UNAUTHORIZED) {
          console.log('User unauthorized, please login again!!');
        } else {
          console.log('Unexpected server error!!');
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchLeagueByID();
  }, []);

  const handleEnrollClick = () => {
    setEnrollClicked(true);
    if (onEnrollClick) {
      onEnrollClick();
    }
  };

  return (
    <div>
      {enrollClicked ? (
        <ChooseTeam leagueID={leagueID} />
      ) : (
        <>
          <div className={styles.parrentContainer}>
            <div>
              Due date{' '}
              <span className={styles.dueDate}>{registrationDeadline}</span>
            </div>
            {/* <div>
              Number of members: <span className={styles.teamNumber}>5-22</span>
            </div> */}
            <h1 className={styles.countdown}>12d : 12h : 12m : 12s</h1>
            <Button text="Enroll" onClick={handleEnrollClick}></Button>
          </div>
        </>
      )}
    </div>
  );
};

export default Enroll;
