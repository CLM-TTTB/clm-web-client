import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import styles from '../../src/styles/matchResultModal.module.css';
import cardStyle from '../../src/styles/leagueCard.module.css';
import MatchDetailModal from './matchDetailModal';

import { toast } from 'react-toastify';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { updateKnockoutGameResult } from '~/apiServices/leagueService';
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
  property1,
  property2,
  onScoreChange,
  date,
  gameLocation, //the name 'location' is already use for routing
}) => {
  const location = useLocation();
  const source = location.state && location.state.source;

  const [isEditMode, setIsEditMode] = useState(false);
  const [editedScore1, setEditedScore1] = useState(score1);
  const [editedScore2, setEditedScore2] = useState(score2);

  const [editedDate, setEditedDate] = useState(date);
  const [editedLocation, setEditedLocation] = useState(gameLocation);

  const [selectedTeam, setSelectedTeam] = useState('');
  const [toggleDetailModal, setToggleDetailModal] = useState(false);

  const [goalCountsTeam1, setGoalCountsTeam1] = useState({});
  const [goalCountsTeam2, setGoalCountsTeam2] = useState({});

  const [yellowCardsTeam1, setYellowCardsTeam1] = useState({});
  const [yellowCardsTeam2, setYellowCardsTeam2] = useState({});

  const [redCardsTeam1, setRedCardsTeam1] = useState({});
  const [redCardsTeam2, setRedCardsTeam2] = useState({});

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
    const winner = editedScore1 > editedScore2 ? team1ID : team2ID;
    console.log(gameID);
    try {
      const response = await updateKnockoutGameResult(
        leagueID,
        gameID,
        winner,
        editedScore1,
        editedScore2,
      );
      if (response.status === HttpStatus.OK) {
        toast.success('Score updated successfully');
        setIsEditMode(false);
        onScoreChange();
      } else {
        toast.error('Unexpected server error, please try again later');
      }
    } catch (err) {
      console.log(err);
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
            <h3 className={styles.date}>
              {isEditMode ? (
                <input
                  className={styles.dateEdit}
                  type="text"
                  value={editedDate}
                  onChange={(e) => setEditedDate(e.target.value)}
                />
              ) : (
                editedDate
              )}
            </h3>

            <div className={styles.location}>
              {isEditMode ? (
                <input
                  className={styles.locationEdit}
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
                {isEditMode ? (
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
                    <h1>{score1}</h1>
                    <h1 className={styles.devider}> - </h1>
                    <h1>{score2}</h1>
                  </>
                )}
              </div>

              <div className={styles.yellowCard}>YELLOW CARD</div>
              <div className={styles.redCard}>RED CARD</div>
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
            </div>
          </div>

          <div className={styles.propertyContainer}>
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
          </div>

          <div className={styles.propertyContainer}>
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
          </div>
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
