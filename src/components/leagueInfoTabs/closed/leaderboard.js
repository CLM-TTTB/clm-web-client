import React from 'react';

import styles from './leaderboard.module.css';
import teams from './(test) sampleTeams';

const calculateRankings = (teams) => {
  const sortedTeams = teams.sort((a, b) => {
    const calculatePoints = (team) => team.wdl.win * 3 + team.wdl.draw;

    if (calculatePoints(a) !== calculatePoints(b)) {
      return calculatePoints(b) - calculatePoints(a);
    } else {
      return (
        b.goalsScored - b.goalsConceded - (a.goalsScored - a.goalsConceded)
      );
    }
  });

  const rankedTeams = sortedTeams.map((team, index) => ({
    ...team,
    ranking: index + 1,
  }));

  return rankedTeams;
};

const Leaderboard = () => {
  const rankedTeams = calculateRankings(teams);

  return (
    <div className={styles.table}>
      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>Team Name</th>
            <th>Matches Played</th>
            <th>W - D - L</th>
            <th>Goals Difference</th>
            <th>Red / Yellow</th>
            <th>Points</th>
          </tr>
        </thead>
        <tbody className={styles.tbody}>
          {rankedTeams.map((team) => (
            <tr key={team.id}>
              <td>{team.ranking}</td>
              <td>{team.teamName}</td>
              <td>{team.wdl.win + team.wdl.draw + team.wdl.lost}</td>
              <td>{`${team.wdl.win} - ${team.wdl.draw} - ${team.wdl.lost}`}</td>
              <td
                style={{
                  color:
                    team.goalsScored - team.goalsConceded > 0
                      ? 'green'
                      : team.goalsScored - team.goalsConceded < 0
                        ? 'red'
                        : 'black',
                }}
              >
                {`${team.goalsScored} / ${team.goalsConceded} ( ${
                  team.goalsScored - team.goalsConceded
                } )`}
              </td>
              <td>{`${team.red} / ${team.yellow}`}</td>
              <td className={styles.point}>
                {team.wdl.win * 3 + team.wdl.draw}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Leaderboard;
