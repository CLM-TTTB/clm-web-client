import React, { useState } from 'react';
import styles from './schedule.module.css';
import Fixture from '../../fixture';
import sampleFixtures from '../(test) sampleSchedule';
import MatchResultModal from '~/components/matchResultModal';

const KnockOut = (leagueStatus, leagueFormat) => {
  const [toggleModal, setToggleModal] = useState(false);
  const [selectedFixture, setSelectedFixture] = useState(null);
  const [score1, setScore1] = useState(0);
  const [score2, setScore2] = useState(0);

  const [currentPage, setCurrentPage] = useState(1);

  const selectedRound = currentPage;
  const currentFixtures =
    currentPage === 0
      ? sampleFixtures
      : sampleFixtures.filter((fixture) => fixture.round === selectedRound);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
  const uniqueRounds = [
    ...new Set(sampleFixtures.map((fixture) => fixture.round)),
  ];
  const totalPages = uniqueRounds.length + 1;

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

  const handleResultClick = (fixture) => {
    setSelectedFixture(fixture);
    setScore1(fixture.resultA);
    setScore2(fixture.resultB);
    setToggleModal(true);
  };

  const handleScoreChange = (newScore1, newScore2) => {
    setScore1(newScore1);
    setScore2(newScore2);
  };

  const handleOverlayClick = () => {
    setToggleModal(false);
  };

  const handleModalClick = (e) => {
    e.stopPropagation();
  };

  return (
    <>
      <div>
        <div className={styles.pagination}>
          <div className={styles.round}>ROUND</div>
          <button className={styles.pageButton} onClick={handleShowAll}>
            All
          </button>
          {uniqueRounds
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
            ))}
        </div>

        {currentPage > 0 && (
          <div className={styles.roundParent}>{getRoundText(currentPage)}</div>
        )}
        {currentPage == 0 && (
          <div className={styles.roundParent}>ALL FIXTURES</div>
        )}

        {currentFixtures.map((fixture, index) => (
          <Fixture
            key={index}
            teamA={fixture.teamA}
            teamB={fixture.teamB}
            isCompleted={fixture.isCompleted}
            resultA={fixture.resultA}
            resultB={fixture.resultB}
            onResultClick={() => handleResultClick(fixture)}
            date={fixture.date}
            location={fixture.location}
          />
        ))}

        {toggleModal && selectedFixture && (
          <div className={styles.modalOverlay} onClick={handleOverlayClick}>
            <div className={styles.modal} onClick={handleModalClick}>
              <MatchResultModal
                teamName1={selectedFixture.teamA}
                teamName2={selectedFixture.teamB}
                score1={score1}
                score2={score2}
                onScoreChange={handleScoreChange}
                leagueStatus={leagueStatus}
                date={selectedFixture.date}
                gameLocation={selectedFixture.location}
              />
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default KnockOut;
