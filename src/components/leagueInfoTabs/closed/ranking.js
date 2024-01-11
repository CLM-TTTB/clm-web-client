import React, { useState } from 'react';

import Leaderboard from './leaderboard';
import KnockoutTree from './knockoutTree';

import styles from './ranking.module.css';

const Ranking = () => {
  //SET THE FORMAT ('round-robin' => Leaderboard, 'knock-out'=> TREE, 'mixed' => Both)
  const [format, setFormat] = useState('mixed');
  const [activeTab, setActiveTab] = useState('leaderboard');

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div>
      {format === 'round-robin' && <Leaderboard />}
      {format === 'knock-out' && <KnockoutTree />}
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
          {activeTab === 'knockout-tree' && <KnockoutTree />}
        </div>
      )}
    </div>
  );
};

export default Ranking;
