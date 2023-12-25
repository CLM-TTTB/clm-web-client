import React, { useState } from 'react';
import { Tab, Tabs } from '@mui/material';
import General from '~/components/leagueInfoTabs/closed/general';
import Schedule from '~/components/leagueInfoTabs/opening/schedule/schedule';
import Ranking from '~/components/leagueInfoTabs/closed/ranking';
import Teams from '~/components/leagueInfoTabs/closed/teams';
import Stats from '~/components/leagueInfoTabs/closed/stats';

import styles from '~/styles/leagueInfo/opening.module.css';

const Closed = ({ leagueID }) => {
  const [tabValue, setTabValue] = useState(0);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleEnrollClick = () => {
    setTabValue(0);
  };

  return (
    <div>
      <Tabs
        value={tabValue}
        onChange={handleTabChange}
        centered
        className={styles.tabsContainer}
      >
        <Tab
          label="General"
          className={`${styles.tab} ${tabValue === 0 && styles.activeTab}`}
        />
        <Tab
          label="Schedule"
          className={`${styles.tab} ${tabValue === 1 && styles.activeTab}`}
        />
        <Tab
          label="Ranking"
          className={`${styles.tab} ${tabValue === 2 && styles.activeTab}`}
        />
        <Tab
          label="Teams"
          className={`${styles.tab} ${tabValue === 3 && styles.activeTab}`}
        />
        <Tab
          label="Stats"
          className={`${styles.tab} ${tabValue === 4 && styles.activeTab}`}
        />
      </Tabs>
      <div className={styles.colorLine}></div>
      {tabValue === 0 ? (
        <General />
      ) : tabValue === 1 ? (
        <Schedule />
      ) : tabValue === 2 ? (
        <Ranking />
      ) : tabValue === 3 ? (
        <Teams leagueID={leagueID} />
      ) : (
        <Stats />
      )}
    </div>
  );
};

export default Closed;
