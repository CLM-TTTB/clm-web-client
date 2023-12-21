import React, { useState } from 'react';
import { Tab, Tabs } from '@mui/material';
import Enroll from '~/components/leagueInfoTabs/opening/enroll';
import RegistrationList from '~/components/leagueInfoTabs/opening/regList';
import Schedule from '~/components/leagueInfoTabs/opening/schedule/schedule';
import ChooseTeam from '~/components/leagueInfoTabs/opening/enroll/chooseTeam';
import styles from '~/styles/leagueInfo/opening.module.css'; // Import the CSS module

const Opening = ({ leagueData }) => {
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
          label="Enroll"
          className={`${styles.tab} ${tabValue === 0 && styles.activeTab}`}
        />
        <Tab
          label="Registration List"
          className={`${styles.tab} ${tabValue === 1 && styles.activeTab}`}
        />
        <Tab
          label="Schedule"
          className={`${styles.tab} ${tabValue === 2 && styles.activeTab}`}
        />
      </Tabs>
      <div className={styles.colorLine}></div>
      {tabValue === 0 ? (
        <Enroll onEnrollClick={handleEnrollClick} />
      ) : tabValue === 1 ? (
        <RegistrationList />
      ) : tabValue === 2 ? (
        <Schedule />
      ) : (
        <ChooseTeam />
      )}
    </div>
  );
};

export default Opening;
