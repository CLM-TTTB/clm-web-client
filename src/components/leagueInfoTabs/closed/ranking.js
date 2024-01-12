import React, { useState, useEffect } from 'react';

import Leaderboard from './leaderboard';
import KnockoutTree from './knockoutTree';

import styles from './ranking.module.css';

import { updateKnockoutScheduleTree } from '~/apiServices/leagueService';
import HttpStatus from '~/constants/httpStatusCode';

const Ranking = ({ leagueID }) => {
  //SET THE FORMAT ('round-robin' => Leaderboard, 'knock-out'=> TREE, 'mixed' => Both)
  const [format, setFormat] = useState('mixed');
  const [activeTab, setActiveTab] = useState('leaderboard');
  const [leagueRounds, setLeagueRounds] = useState([]);

  const fetchScheduleByTree = async () => {
    try {
      const response = await updateKnockoutScheduleTree(leagueID);

      if (response.status === HttpStatus.OK) {
        // console.log(response.data?.rounds);
        setLeagueRounds(response.data?.rounds);
      } else {
        console.log('Unexpected server errors');
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchScheduleByTree();
  }, []);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div>
      {format === 'round-robin' && <Leaderboard />}
      {format === 'knock-out' && <KnockoutTree leagueRounds={leagueRounds} />}
      {format === 'mixed' && (
        <div>
          <div className={styles.buttonParent}>
            <button
              className={styles.button}
              onClick={() => handleTabChange('leaderboard')}
            >
              ROUND-ROBIN
            </button>
            <button
              className={styles.button}
              onClick={() => handleTabChange('knockout-tree')}
            >
              KNOCK-OUT
            </button>
          </div>
          {activeTab === 'leaderboard' && <Leaderboard />}
          {activeTab === 'knockout-tree' && (
            <KnockoutTree leagueRounds={leagueRounds} />
          )}
        </div>
      )}
    </div>
  );
};

export default Ranking;
