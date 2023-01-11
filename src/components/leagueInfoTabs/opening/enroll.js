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
  const [countdown, setCountdown] = useState(0);

  useEffect(() => {
    const fetchLeagueByID = async () => {
      try {
        const response = await getLeagueByID(leagueID);

        if (response.status === HttpStatus.OK) {
          const deadline = new Date(response.data.registrationDeadline);
          const options = { year: 'numeric', month: 'long', day: 'numeric' };
          setRegistrationDeadline(
            deadline.toLocaleDateString(undefined, options),
          );

          // Calculate the remaining time in milliseconds
          const remainingTime = deadline.getTime() - Date.now();
          setCountdown(remainingTime);

          // Start the countdown timer
          const timer = setInterval(() => {
            setCountdown((prevCountdown) => prevCountdown - 500);
          }, 1000); // Change interval duration to 1000 milliseconds

          // Clean up the timer when the component unmounts
          return () => clearInterval(timer);
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

  // Format the remaining time into days, hours, minutes, and seconds
  const formatTime = () => {
    const days = Math.floor(countdown / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
      (countdown % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
    );
    const minutes = Math.floor((countdown % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((countdown % (1000 * 60)) / 1000);

    return `${days}d : ${hours}h : ${minutes}m : ${seconds}s`;
  };

  return (
    <div>
      {enrollClicked ? (
        <ChooseTeam leagueID={leagueID} />
      ) : (
        <>
          <div className={styles.parrentContainer}>
            <div>
              Due date:{' '}
              <span className={styles.dueDate}>{registrationDeadline}</span>
            </div>
            {/* <div>
              Number of members: <span className={styles.teamNumber}>5-22</span>
            </div> */}
            <h1 className={styles.countdown}>{formatTime()}</h1>
            <Button text="Enroll" onClick={handleEnrollClick}></Button>
          </div>
        </>
      )}
    </div>
  );
};

export default Enroll;
