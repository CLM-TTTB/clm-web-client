import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import styles from '../../src/styles/matchResultModal.module.css';
import cardStyle from '../../src/styles/leagueCard.module.css';
import MatchDetailModal from './matchDetailModal';

import { toast } from 'react-toastify';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import {
  updateKnockoutGameResult,
  updateGameDetails,
} from '~/apiServices/leagueService';
import HttpStatus from '~/constants/httpStatusCode';

const MatchResultModal = ({
  leagueID,
  gameID,
  team1ID,
  team2ID,
  teamName1,
  teamName2,
  score1,
  score2,
  fullStartTime,
  // property1,
  // property2,
  handleSavePress,
  gameLocation, //the name 'location' is already use for routing
}) => {
  const location = useLocation();
  const source = location.state && location.state.source;

  const [isEditMode, setIsEditMode] = useState(false);
  const [editedScore1, setEditedScore1] = useState(score1);
  const [editedScore2, setEditedScore2] = useState(score2);

  const [editedLocation, setEditedLocation] = useState(gameLocation);

  const [selectedTeam, setSelectedTeam] = useState('');
  const [toggleDetailModal, setToggleDetailModal] = useState(false);
  const [enableEditResult, setEnableEditResult] = useState(false);

  // const [goalCountsTeam1, setGoalCountsTeam1] = useState({});
  // const [goalCountsTeam2, setGoalCountsTeam2] = useState({});

  // const [yellowCardsTeam1, setYellowCardsTeam1] = useState({});
  // const [yellowCardsTeam2, setYellowCardsTeam2] = useState({});

  // const [redCardsTeam1, setRedCardsTeam1] = useState({});
  // const [redCardsTeam2, setRedCardsTeam2] = useState({});

  const [inputYear, setInputYear] = useState('');
  const [inputMonth, setInputMonth] = useState(''); // Assuming the default month is January (01)
  const [inputDay, setInputDay] = useState(''); // Assuming the default day is the first day (01)
  const [inputHour, setInputHour] = useState(''); // Assuming the default hour is midnight (00)
  const [inputMinute, setInputMinute] = useState(''); // Assuming the default minute is 00

  useEffect(() => {
    fullStartTime === null
      ? setEnableEditResult(false)
      : setEnableEditResult(true);

    const tempStartTime = fullStartTime === null ? new Date() : fullStartTime;

    setInputYear(tempStartTime.getFullYear());
    const month =
      tempStartTime.getUTCMonth() + 1 < 10
        ? `0${tempStartTime.getUTCMonth() + 1}`
        : tempStartTime.getUTCMonth() + 1; // Month is zero-based, so add 1
    const day =
      tempStartTime.getUTCDate() < 10
        ? `0${tempStartTime.getUTCDate()}` //handle if the output of date, month, hour, minute is < 10
        : tempStartTime.getUTCDate();
    const hour =
      tempStartTime.getUTCHours() < 10
        ? `0${tempStartTime.getUTCHours()}`
        : tempStartTime.getUTCHours();
    const minute =
      tempStartTime.getUTCMinutes() < 10
        ? `0${tempStartTime.getUTCMinutes()}`
        : tempStartTime.getUTCMinutes();

    setInputMonth(month);
    setInputDay(day);
    setInputHour(hour);
    setInputMinute(minute);
  }, []);

  const updateGameResult = async (
    winner,
    winnerGoalsFor,
    winnerGoalsAgainst,
  ) => {
    try {
      const response = await updateKnockoutGameResult(
        leagueID,
        gameID,
        winner,
        winnerGoalsFor,
        winnerGoalsAgainst,
      );
      if (response.status === HttpStatus.OK) {
        toast.success('Score updated successfully');
        setIsEditMode(false);
        handleSavePress();
      } else {
        toast.error('Unexpected server error, please try again later');
      }
    } catch (err) {
      console.log(err);
    }
  };

  const updateGameInfos = async () => {
    try {
      let formattedDate = `${inputYear}-${inputMonth}-${inputDay}T${inputHour}:${inputMinute}:00.000z`;
      console.log(formattedDate);
      // console.log(editedLocation);

      const response = await updateGameDetails(leagueID, gameID, {
        stadium: editedLocation,
        startTime: formattedDate,
      });

      if (response.status === HttpStatus.OK) {
        toast.success('Game details updated successfully!!');
        setEnableEditResult(true);
        handleSavePress();
      } else if (response.status === HttpStatus.BAD_REQUEST) {
        toast.error('Invalid date or time format, please re-check!!');
      } else {
        toast.error('Unexpected server error!!');
      }
    } catch (err) {
      console.log(err);
    }
  };

  // const handleAddGoal = (team, playerId) => {
  //   if (team === 'Team1') {
  //     setGoalCountsTeam1((prevCounts) => ({
  //       ...prevCounts,
  //       [playerId]: (prevCounts[playerId] || 0) + 1,
  //     }));
  //   } else if (team === 'Team2') {
  //     setGoalCountsTeam2((prevCounts) => ({
  //       ...prevCounts,
  //       [playerId]: (prevCounts[playerId] || 0) + 1,
  //     }));
  //   }
  // };

  // const handleYellowCardChange = (team, playerId) => {
  //   if (team === 'Team1') {
  //     setYellowCardsTeam1((prevCards) => ({
  //       ...prevCards,
  //       [playerId]: !prevCards[playerId],
  //     }));
  //   } else if (team === 'Team2') {
  //     setYellowCardsTeam2((prevCards) => ({
  //       ...prevCards,
  //       [playerId]: !prevCards[playerId],
  //     }));
  //   }
  // };

  // const handleRedCardChange = (team, playerId) => {
  //   if (team === 'Team1') {
  //     setRedCardsTeam1((prevCards) => ({
  //       ...prevCards,
  //       [playerId]: !prevCards[playerId],
  //     }));
  //   } else if (team === 'Team2') {
  //     setRedCardsTeam2((prevCards) => ({
  //       ...prevCards,
  //       [playerId]: !prevCards[playerId],
  //     }));
  //   }
  // };

  const handleEditClick = () => {
    setIsEditMode(!isEditMode);
  };

  const handleSaveClick = async () => {
    if (enableEditResult) {
      if (editedScore1 === editedScore2)
        toast.error('Knock out match result cannot be draw, please re-check!!');
      else {
        let winnerGoalsFor, winnerGoalsAgainst, winner;
        if (editedScore1 > editedScore2) {
          winner = team1ID;
          winnerGoalsFor = editedScore1;
          winnerGoalsAgainst = editedScore2;
        } else {
          winner = team2ID;
          winnerGoalsFor = editedScore2;
          winnerGoalsAgainst = editedScore1;
        }
        await updateGameResult(winner, winnerGoalsFor, winnerGoalsAgainst);

        if (
          inputYear === '' ||
          inputMonth === '' ||
          inputDay === '' ||
          inputHour === '' ||
          inputMinute === ''
        ) {
          toast.error(
            'Please fill in all the time information fields before saving!!',
          );
        } else {
          await updateGameInfos();
        }
      }
    } else {
      if (
        inputYear === '' ||
        inputMonth === '' ||
        inputDay === '' ||
        inputHour === '' ||
        inputMinute === ''
      ) {
        toast.error(
          'Please fill in all the time information fields before saving!!',
        );
      } else {
        updateGameInfos();
      }
    }
  };

  const handleTeamClick = (teamName) => {
    setSelectedTeam(teamName);
    setToggleDetailModal(!toggleDetailModal);
  };

  return (
    <>
      <div className={styles.modalContainer}>
        <div className={styles.titleContainer}>
          <div></div>
          <div className={styles.title}>
            <div className={styles.date}>
              {isEditMode ? (
                <div className={styles.dateInput}>
                  <input
                    className={styles.dateEdit}
                    type="text"
                    placeholder="DD"
                    value={inputDay}
                    onChange={(e) => setInputDay(e.target.value)}
                  />
                  -
                  <input
                    className={styles.dateEdit}
                    type="text"
                    placeholder="MM"
                    value={inputMonth}
                    onChange={(e) => setInputMonth(e.target.value)}
                  />
                  -
                  <input
                    className={styles.yearEdit}
                    type="text"
                    placeholder="YYYY"
                    value={inputYear}
                    onChange={(e) => setInputYear(e.target.value)}
                  />
                  <div className={styles.space} />
                  <input
                    className={styles.dateEdit}
                    type="text"
                    placeholder="hh"
                    value={inputHour}
                    onChange={(e) => setInputHour(e.target.value)}
                  />
                  :
                  <input
                    className={styles.dateEdit}
                    type="text"
                    placeholder="mm"
                    value={inputMinute}
                    onChange={(e) => setInputMinute(e.target.value)}
                  />
                </div>
              ) : (
                //RETURN STRING: formattedDate (2023-01-11T08:23:00.000z)

                <p>
                  {inputDay}/{inputMonth}/{inputYear}
                  {' - '}
                  {inputHour}:{inputMinute}
                </p>
              )}
            </div>

            <div className={styles.location}>
              {isEditMode ? (
                <input
                  className={styles.locationEdit}
                  placeholder="Location"
                  type="text"
                  value={editedLocation}
                  onChange={(e) => setEditedLocation(e.target.value)}
                />
              ) : (
                editedLocation
              )}
            </div>
          </div>

          <div className={styles.buttonContainer}>
            {source === 'from myLeague' && (
              <div>
                {isEditMode ? (
                  <button className={styles.button} onClick={handleSaveClick}>
                    Save
                  </button>
                ) : (
                  <button className={styles.button} onClick={handleEditClick}>
                    Edit
                  </button>
                )}
              </div>
            )}
          </div>
        </div>

        <div className={styles.contentContainer}>
          <div className={styles.scoreContainer}>
            <div className={styles.team1}>
              <div className={cardStyle.profilePicParent}>
                <img
                  className={cardStyle.profilePic}
                  alt=""
                  src={cardStyle.profileSrc}
                />
                <div
                  onClick={() => handleTeamClick(teamName1)}
                  className={styles.teamName}
                >
                  {teamName1}
                </div>
              </div>
            </div>

            <div className={styles.scoreParent}>
              <div className={styles.score}>
                {isEditMode && enableEditResult ? (
                  <>
                    <input
                      className={styles.scoreEdit}
                      type="text"
                      value={editedScore1}
                      onChange={(e) => setEditedScore1(e.target.value)}
                    />
                    <h1 className={styles.devider}> - </h1>
                    <input
                      className={styles.scoreEdit}
                      type="text"
                      value={editedScore2}
                      onChange={(e) => setEditedScore2(e.target.value)}
                    />
                  </>
                ) : (
                  <>
                    <h1>{editedScore1}</h1>
                    <h1 className={styles.devider}> - </h1>
                    <h1>{editedScore2}</h1>
                  </>
                )}
              </div>

              {/* <div className={styles.yellowCard}>YELLOW CARD</div>
              <div className={styles.redCard}>RED CARD</div> */}
            </div>

            <div>
              <div className={cardStyle.profilePicParent}>
                <img
                  className={cardStyle.profilePic}
                  alt=""
                  src={cardStyle.profileSrc}
                />
                <div
                  onClick={() => handleTeamClick(teamName2)}
                  className={styles.teamName}
                >
                  {teamName2}
                </div>
              </div>
              <div className={styles.space} />
            </div>
          </div>

          {/* <div className={styles.propertyContainer}>
            <div className={styles.property}>
              <div className={styles.num1}>
                <h4>
                  {' '}
                  {Object.values(yellowCardsTeam1).filter((value) => value)
                    .length || 0}{' '}
                </h4>
              </div>
              <div className={styles.num2}>
                <h4> {property1} </h4>
              </div>
              <div className={styles.num3}>
                <h4>
                  {' '}
                  {Object.values(yellowCardsTeam2).filter((value) => value)
                    .length || 0}{' '}
                </h4>
              </div>
            </div>
          </div> */}

          {/* <div className={styles.propertyContainer}>
            <div className={styles.property}>
              <div className={styles.num1}>
                <h4>
                  {' '}
                  {Object.values(redCardsTeam1).filter((value) => value)
                    .length || 0}{' '}
                </h4>
              </div>
              <div className={styles.num2}>
                <h4> {property2} </h4>
              </div>
              <div className={styles.num3}>
                <h4>
                  {' '}
                  {Object.values(redCardsTeam2).filter((value) => value)
                    .length || 0}{' '}
                </h4>
              </div>
            </div>
          </div> */}
        </div>
        {/* {toggleDetailModal && (
          <MatchDetailModal
            className={styles.modal}
            team={selectedTeam}
            playerGoals={
              selectedTeam === teamName1 ? goalCountsTeam1 : goalCountsTeam2
            }
            yellowCards={
              selectedTeam === teamName1 ? yellowCardsTeam1 : yellowCardsTeam2
            }
            redCards={
              selectedTeam === teamName1 ? redCardsTeam1 : redCardsTeam2
            }
            onAddGoal={(playerId) => handleAddGoal(selectedTeam, playerId)}
            onYellowCardChange={(playerId) =>
              handleYellowCardChange(selectedTeam, playerId)
            }
            onRedCardChange={(playerId) =>
              handleRedCardChange(selectedTeam, playerId)
            }
          />
        )} */}
      </div>
    </>
  );
};

export default MatchResultModal;
