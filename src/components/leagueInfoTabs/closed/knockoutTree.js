import React, { useState, useEffect } from 'react';
import styles from './knockoutTree.module.css';

import cup from '~/images/cup.png';

const KnockoutTree = ({ leagueRounds }) => {
  const [tournamentData, setTournamentData] = useState(null);
  let gap = 50;

  console.log(leagueRounds);

  const rounds = leagueRounds;

  const generateGames = (games) => {
    return games.map((game) => ({
      id: game.gameId,
      teamA: game.teams.first ? game.teams.first.name : '-',
      teamB: game.teams.second ? game.teams.second.name : '-',
    }));
  };

  const games = rounds.map((round) => generateGames(round.games));

  return (
    //COLUMN = ROUND, ROW = GAME
    <div className={styles.treeContainer}>
      {games.map((roundGames, columnIndex) => {
        gap *= 2;

        return (
          <div key={columnIndex} className={styles.column}>
            {roundGames.map((game, rowIndex) => (
              <div key={rowIndex} className={styles.game}>
                {rowIndex % 2 === 1 && rowIndex > 0 && (
                  <div style={{ height: `${gap}px` }}></div>
                )}
                <div className={styles.gameBoxParent}>
                  {columnIndex > 0 && (
                    <div className={styles.connectorParent}>
                      <div className={styles.connector}>
                        <div className={styles.connectorHorizontal} />
                        <div className={styles.connectorHorizontal} />
                      </div>
                      <div
                        style={{ height: `${gap / 2}px` }}
                        className={styles.connectorVertical}
                      />
                      <div className={styles.connectorHorizontal} />
                    </div>
                  )}
                  <div className={styles.gameBoxContainer}>
                    <div className={styles.gameBoxDecorator}></div>
                    <div className={styles.gameBox}>
                      <div className={styles.team}>{game.teamA}</div>
                      {' vs '}
                      <div className={styles.team}>{game.teamB}</div>
                    </div>
                  </div>
                </div>
                {rowIndex % 2 === 0 && (
                  <div style={{ height: `${gap}px` }}></div>
                )}
              </div>
            ))}
            {roundGames.length % 2 != 0 && columnIndex === 0 && (
              <>
                <div style={{ height: '20px' }}></div>
                <div className={styles.gameBoxContainer}>
                  <div className={styles.gameBoxDecorator}></div>
                  <div className={styles.gameBox}>
                    {' '}
                    <div className={styles.team}>-</div>
                    {' vs '}
                    <div className={styles.team}>-</div>
                  </div>
                </div>
              </>
            )}
          </div>
        );
      })}

      <div className={styles.winnerColumn}>
        <img className={styles.cup} alt="cup" src={cup}></img>
        <div className={styles.winner}>CHAMPIONS</div>
      </div>
    </div>
  );
};

export default KnockoutTree;
