import React, { useState } from 'react';
import styles from './schedule.module.css';
import Fixture from '../fixture';
import sampleFixtures from './(test) sampleSchedule';

const FootballSchedule = () => {
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

  return (
    <div>
      <div className={styles.pagination}>
        <div className={styles.round}>ROUND</div>
        <button className={styles.pageButton} onClick={handleShowAll}>
          All
        </button>
        {uniqueRounds.map((round, index) => (
          <button
            className={styles.pageButton}
            key={index + 1}
            onClick={() => handlePageChange(round)}
          >
            {round}
          </button>
        ))}
      </div>

      {currentPage > 0 && (
        <div className={styles.roundParent}>
          ROUND <span>{currentPage}</span>
        </div>
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
  );
};

export default FootballSchedule;
