import React, { useState, useEffect } from 'react';
import { Tab, Tabs } from '@mui/material';
import Enroll from '~/components/leagueInfoTabs/opening/enroll';
import RegistrationList from '~/components/leagueInfoTabs/opening/regList';
import Schedule from '~/components/leagueInfoTabs/opening/schedule/schedule';
import ChooseTeam from '~/components/leagueInfoTabs/opening/enroll/chooseTeam';
import styles from '~/styles/leagueInfo/opening.module.css'; // Import the CSS module
import AddMembers from '~/components/leagueInfoTabs/opening/enroll/addMembers';

import { getRegisteredTeamOfUser } from '~/apiServices/teamService';
import HttpStatus from '~/constants/httpStatusCode';

const Opening = ({ leagueID }) => {
  const [tabValue, setTabValue] = useState(0);

  const [enrolledTeamAndTournamentID, setEnrolledTeamAndTournamentID] =
    useState([]);

  useEffect(() => {
    const fetchEnrolledTeam = async () => {
      try {
        const response = await getRegisteredTeamOfUser();

        if (response.status === HttpStatus.OK) {
          const userEnrolledTeamInfos = response.data.content;

          let newEnrolledTeamAndTournamentIDState = [];
          //Loop through enrolled team list to get the teamID and teamCreatorID:
          userEnrolledTeamInfos.forEach((enrolledTeam) => {
            const tempObj = {
              teamID: enrolledTeam.id,
              tournamentID: enrolledTeam.tournamentId,
            };
            newEnrolledTeamAndTournamentIDState.push(tempObj);
          });
          console.log(newEnrolledTeamAndTournamentIDState);
          setEnrolledTeamAndTournamentID(newEnrolledTeamAndTournamentIDState);
        } else if (response.status === HttpStatus.UNAUTHORIZED) {
          console.log('User unauthorized, please login again!!');
        } else {
          console.log('Unexpected server error!!');
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchEnrolledTeam();
  }, [tabValue]);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleEnrollClick = () => {
    setTabValue(0);
  };

  const renderPageContent = () => {
    if (tabValue === 0) {
      let flagObj = {};
      enrolledTeamAndTournamentID.forEach((item) => {
        if (item.tournamentID === leagueID) flagObj = item;
      });

      if (flagObj.teamID !== undefined) {
        return <AddMembers teamID={flagObj.teamID} />;
      } else {
        return <Enroll leagueID={leagueID} onEnrollClick={handleEnrollClick} />;
      }
    } else {
      return <RegistrationList leagueID={leagueID} />;
    }
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
        {/* <Tab
          label="Schedule"
          className={`${styles.tab} ${tabValue === 2 && styles.activeTab}`}
        /> */}
      </Tabs>
      <div className={styles.colorLine}></div>
      {/* {tabValue === 0 ? (
        <Enroll leagueID={leagueID} onEnrollClick={handleEnrollClick} />
      ) : tabValue === 1 ? (
        <RegistrationList leagueID={leagueID} />
      ) : tabValue === 2 ? (
        <Schedule />
      ) : (
        <ChooseTeam />
      )} */}

      {/* {tabValue === 0 ? (
        <Enroll leagueID={leagueID} onEnrollClick={handleEnrollClick} />
      ) : (
        <RegistrationList leagueID={leagueID} />
      )} */}

      {renderPageContent()}
    </div>
  );
};

export default Opening;
