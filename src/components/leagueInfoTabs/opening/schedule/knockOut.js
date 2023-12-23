import React, { useState } from 'react';
import styles from './schedule.module.css';
import Fixture from '../../fixture';
import sampleFixtures from '../(test) sampleSchedule';

const KnockOut = () => {
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
            result={fixture.result}
            date={fixture.date}
            time={fixture.time}
          />
        ))}
      </div>
    </>
  );
};

export default KnockOut;
