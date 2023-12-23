import React, { useState } from 'react';
import players from './(test) samplePlayers';

import arrow from '~/images/arrow-dark.png';
import styles from './stats.module.css';

function Stats() {
  const [sortColumn, setSortColumn] = useState(null);
  const [sortOrder, setSortOrder] = useState('asc');

  const handleSort = (column) => {
    if (sortColumn === column) {
      // Toggle sort order if clicking on the same column
      setSortOrder((prevOrder) => (prevOrder === 'asc' ? 'desc' : 'asc'));
    } else {
      // Set the new column and default to ascending order
      setSortColumn(column);
      setSortOrder('asc');
    }
  };

  const sortedPlayers = [...players].sort((a, b) => {
    if (sortColumn) {
      return sortOrder === 'desc'
        ? a[sortColumn] - b[sortColumn]
        : b[sortColumn] - a[sortColumn];
    }
    return 0;
  });

  return (
    <div className={styles.table}>
      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Number</th>
            <th>Team</th>
            <th onClick={() => handleSort('goals')}>
              <div className={styles.sorter}>
                <div className={styles.label}>Goals</div>
                <img
                  className={styles.arrow}
                  alt=""
                  src={arrow}
                  style={{
                    transform: sortOrder === 'desc' ? 'rotate(180deg)' : 'none',
                  }}
                />
              </div>
            </th>
            <th onClick={() => handleSort('yellow')}>
              <div className={styles.sorter}>
                <div className={styles.label}>Yellow</div>
                <img
                  className={styles.arrow}
                  alt=""
                  src={arrow}
                  style={{
                    transform: sortOrder === 'desc' ? 'rotate(180deg)' : 'none',
                  }}
                />
              </div>
            </th>
            <th onClick={() => handleSort('red')}>
              <div className={styles.sorter}>
                <div className={styles.label}>Red</div>
                <img
                  className={styles.arrow}
                  alt=""
                  src={arrow}
                  style={{
                    transform: sortOrder === 'desc' ? 'rotate(180deg)' : 'none',
                  }}
                />
              </div>
            </th>
          </tr>
        </thead>
        <tbody className={styles.tbody}>
          {sortedPlayers.map((player, index) => (
            <tr key={index + 1}>
              <td>{index + 1}</td>
              <td>{player.name}</td>
              <td>{player.jerseyNumber}</td>
              <td>{player.team}</td>
              <td>{player.goals}</td>
              <td>{player.yellow}</td>
              <td>{player.red}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Stats;
