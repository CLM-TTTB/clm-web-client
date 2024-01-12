import React, { useState } from 'react';
import players from './leagueInfoTabs/closed/(test) samplePlayers';
import players2 from './leagueInfoTabs/closed/(test) samplePlayers2';
import styles from '~/styles/matchDetailModal.module.css';

const MatchDetailModal = ({
  team,
  playerGoals,
  onAddGoal,
  yellowCards,
  redCards,
  onYellowCardChange,
  onRedCardChange,
}) => {
  // Conditionally select player data based on the team
  const selectedPlayers = team === 'Team1' ? players : players2;

  return (
    <div className={styles.parent}>
      <div className={styles.teamName}>{team}</div>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Players</th>
            <th>Goals</th>
            <th>Yellow</th>
            <th>Red</th>
          </tr>
        </thead>
        <tbody>
          {selectedPlayers.map((player) => (
            <tr className={styles.tr} key={player.id}>
              <td className={styles.td}>{player.name}</td>
              <td className={styles.td}>
                <div className={styles.cell}>
                  {player.id in playerGoals ? playerGoals[player.id] : 0}
                  <button
                    className={styles.button}
                    onClick={() => onAddGoal(player.id)}
                  >
                    +
                  </button>
                </div>
              </td>
              <td className={styles.td}>
                <input
                  type="checkbox"
                  checked={yellowCards[player.id] || false}
                  onChange={() => onYellowCardChange(player.id)}
                />
              </td>
              <td className={styles.td}>
                <input
                  type="checkbox"
                  checked={redCards[player.id] || false}
                  onChange={() => onRedCardChange(player.id)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MatchDetailModal;
