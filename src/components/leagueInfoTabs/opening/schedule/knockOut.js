import React, { useState, useEffect } from 'react';
import styles from './schedule.module.css';
import Fixture from '~/components/leagueInfoTabs/fixture';
import MatchResultModal from '~/components/matchResultModal';
import { toast } from 'react-toastify';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useLocation, Location } from 'react-router-dom';

import {
  updateKnockoutScheduleTree,
  generateKnockoutScheduleTree,
  getAcceptedTeamByID,
} from '~/apiServices/leagueService';
import HttpStatus from '~/constants/httpStatusCode';

const KnockOut = ({ leagueStatus, leagueID }) => {
  const [toggleModal, setToggleModal] = useState(false);
  const [selectedFixture, setSelectedFixture] = useState(null);
  const [selectedGamesPeRound, setSelectedGamesPeRound] = useState(null);
  const [score1, setScore1] = useState(0);
  const [score2, setScore2] = useState(0);

  const [currentPage, setCurrentPage] = useState(0);

  const [leagueRounds, setLeaguesRounds] = useState([]);

  const location = useLocation();
  const source = location.state && location.state.source;

  const regenerateSchedule = async () => {
    try {
      const response = await generateKnockoutScheduleTree(leagueID);

      if (response.status === HttpStatus.OK) {
        // console.log(response.data?.rounds);
        setLeaguesRounds(response.data?.rounds);
      } else {
        toast.error('Unexpected server errors');
      }
    } catch (err) {
      console.log(err);
    }
  };

  const fetchScheduleByTree = async () => {
    try {
      const response = await updateKnockoutScheduleTree(leagueID);

      if (response.status === HttpStatus.OK) {
        console.log(response.data?.rounds);
        setLeaguesRounds(response.data?.rounds);
      } else {
        console.log('Unexpected server errors');
      }
    } catch (err) {
      console.log(err);
    }
  };

  const onGenerateSchedulePress = async () => {
    setLeaguesRounds([]);
    try {
      const response = await getAcceptedTeamByID(leagueID);

      if (response.status === HttpStatus.OK) {
        console.log(response.data.totalItems);
        if (response.data.totalItems % 2 !== 0) {
          toast.error(
            `Knock-out format number of team must be an even number but your number of team accepted into this League is an odd number (${response.data.totalItems} teams)`,
          );
        } else {
          regenerateSchedule();
        }
      } else {
        console.log('Unexpected server error!!');
      }
    } catch (err) {
      console.log(err);
    }

    // if(numberOfEnrolledTeam % 2 !== 0){
    //   toast.error(
    //     `Knock-out format number of team must be an even number but your number of team accepted into this League is an odd number (${numberOfEnrolledTeam} teams)`,
    //   );
    // } else{
    //   regenerateSchedule();
    // }
  };

  useEffect(() => {
    fetchScheduleByTree();
  }, []);

  const selectedRound = currentPage;
  const currentRounds =
    currentPage === 0
      ? leagueRounds
      : leagueRounds.filter(
          (round, index) => round[index] === selectedRound - 1,
        );

  // console.log(currentRounds);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // const uniqueRounds = [
  //   ...new Set(leagueRoundFixtures.map((index) => index)),
  // ];

  const uniqueRounds = leagueRounds.map((_, index) => index + 1);
  // const totalPages = uniqueRounds.length + 1;

  const handleShowAll = () => {
    setCurrentPage(0);
  };

  const getButtonText = (round) => {
    if (round <= 3)
      switch (round) {
        case 1:
          return 'F';
        case 2:
          return 'SF';
        case 3:
          return 'QF';
        default:
          return '';
      }
    else {
      return `1/${Math.pow(2, round)}`;
    }
  };

  const getRoundText = (currentPage) => {
    if (currentPage <= 3)
      switch (currentPage) {
        case 1:
          return 'FINAL';
        case 2:
          return 'SEMI-FINAL';
        case 3:
          return 'QUARTER-FINAL';
        default:
          return '';
      }
    else {
      return `ROUND 1/${Math.pow(2, currentPage)}`;
    }
  };

  const handleResultClick = (game, gamesPerRound) => {
    setSelectedFixture(game);
    setSelectedGamesPeRound(gamesPerRound);
    setScore1(game.teams?.first?.name);
    setScore2(game.teams?.first?.name);
    setToggleModal(true);
  };

  const handleSavePress = () => {
    fetchScheduleByTree();
  };

  const handleOverlayClick = () => {
    setToggleModal(false);
  };

  const handleModalClick = (e) => {
    e.stopPropagation();
  };

  const isoStringDateIntoDateString = (isoStringDate) => {
    if (isoStringDate === null) {
      return null;
    }

    const tempDate = new Date(isoStringDate);
    // console.log(tempDate);
    const year = tempDate.getUTCFullYear();
    const month =
      tempDate.getUTCMonth() + 1 < 10
        ? `0${tempDate.getUTCMonth() + 1}`
        : tempDate.getUTCMonth() + 1; // Month is zero-based, so add 1
    const day =
      tempDate.getUTCDate() < 10
        ? `0${tempDate.getUTCDate()}` //handle if the output of date, month, hour, minute is < 10
        : tempDate.getUTCDate();
    const hour =
      tempDate.getUTCHours() < 10
        ? `0${tempDate.getUTCHours()}`
        : tempDate.getUTCHours();
    const minute =
      tempDate.getUTCMinutes() < 10
        ? `0${tempDate.getUTCMinutes()}`
        : tempDate.getUTCMinutes();

    return `${day}/${month}/${year}  -  ${hour}:${minute}`;
  };

  return (
    <>
      <div>
        <div className={styles.pagination}>
          <div className={styles.round}>ROUND</div>
          <button className={styles.pageButton} onClick={handleShowAll}>
            All
          </button>
          {/* {uniqueRounds
            .slice()
            .reverse()
            .map((round, index) => (
              <button
                className={styles.pageButton}
                key={index + 1}
                onClick={() => handlePageChange(round)}
              >
                {getButtonText(round)}
              </button>
            ))} */}
        </div>

        {currentPage > 0 && (
          <div className={styles.roundParent}>{getRoundText(currentPage)}</div>
        )}
        {currentPage === 0 && (
          <div className={styles.roundParent}>ALL FIXTURES</div>
        )}

        {currentRounds.flatMap((round, index) => {
          const gamesPerRound = round.games;
          {
            /* console.log(gamesPerRound); */
          }
          return gamesPerRound.map((game) => (
            <Fixture
              key={game.id}
              teamA={game.teams?.first?.name}
              teamB={game.teams?.second?.name}
              isCompleted={gamesPerRound.finished}
              resultA={game.score[0]}
              resultB={game.score[1]}
              onResultClick={() => handleResultClick(game, gamesPerRound)}
              date={isoStringDateIntoDateString(game.startTime)}
              location={game.stadium}
            />
          ));
        })}

        {source === 'from myLeague' && (
          <button className={styles.button} onClick={onGenerateSchedulePress}>
            Generate New Schedule (Caution!! This action will regenerate the
            schedule and result of League)
          </button>
        )}

        {toggleModal && selectedFixture && (
          <div className={styles.modalOverlay} onClick={handleOverlayClick}>
            <div className={styles.modal} onClick={handleModalClick}>
              <MatchResultModal
                leagueID={leagueID}
                team1ID={selectedFixture.teams?.first?.id}
                team2ID={selectedFixture.teams?.second?.id}
                teamName1={selectedFixture.teams?.first?.name}
                teamName2={selectedFixture.teams?.second?.name}
                score1={selectedFixture.score[0]}
                score2={selectedFixture.score[1]}
                handleSavePress={handleSavePress}
                // leagueStatus={leagueStatus}
                fullStartTime={
                  selectedFixture.startTime === null
                    ? null
                    : new Date(selectedFixture.startTime)
                }
                gameLocation={selectedFixture.stadium}
                gameID={selectedFixture.id}
              />
            </div>
          </div>
        )}
        <ToastContainer />
      </div>
    </>
  );
};

export default KnockOut;
