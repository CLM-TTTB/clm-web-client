import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import teams from '~/components/leagueInfoTabs/closed/(test) sampleTeams';
import styles from '~/styles/teamInfo.module.css';
import avt from '~/images/leagueCard/avatar.png';
import Layout from '~/components/layout';

import { Tab, Tabs } from '@mui/material';

import General from './general';
import Members from './members';

import { getTeamInfosByTeamID } from '~/apiServices/teamService';
import HttpStatus from '~/constants/httpStatusCode';

const TeamInfo = () => {
  const { teamId } = useParams();
  // const team = teams.find((t) => t.id === parseInt(teamId));
  const [teamData, setTeamData] = useState([]);
  const [teamMemberInfos, setTeamMemberInfos] = useState([]);

  useEffect(() => {
    const fetchTeamInfos = async () => {
      try {
        const response = await getTeamInfosByTeamID(teamId);

        if (response.status === 200) {
          console.log(response.data);
          setTeamData(response.data);
          setTeamMemberInfos(response.data?.members);
        } else {
          console.log('Unexpected server error!!');
        }
      } catch (err) {
        console.log(err);
      }
    };

    fetchTeamInfos();
  }, []);

  const [tabValue, setTabValue] = useState(0);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  return (
    <Layout>
      <div className={styles.colorLine} />
      <div className={styles.parrentContainer}>
        <div className={styles.headerContainer}>
          <img className={styles.img} alt="" src={teamData.image} />
          <div className={styles.leagueInfo}>
            <div className={styles.title}>{teamData.name}</div>
            {/* <div className={styles.formatLocation}>
              {' '}
              {'Age range'}
              {' | '} {teamData.location}
            </div> */}
            <div className={styles.teamNumber}>
              {' '}
              {teamData.members?.length} members
            </div>
          </div>
        </div>

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
              label="Members"
              className={`${styles.tab} ${tabValue === 1 && styles.activeTab}`}
            />
          </Tabs>
          <div className={styles.colorLine}></div>
          {tabValue === 0 ? (
            <General />
          ) : (
            <Members teamMemberInfos={teamMemberInfos} />
          )}
        </div>
      </div>

      <div className={styles.colorLine2} />
    </Layout>
  );
};

export default TeamInfo;
