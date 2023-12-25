import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import styles from '~/styles/leagueInfo/leagueInfo-layout.module.css';
import avt from '~/images/leagueCard/avatar.png';

import Opening from './opening';
import Closed from './closed';
import Layout from '~/components/layout';

import HttpStatus from '~/constants/httpStatusCode';
import { getLeagueByID } from '~/apiServices/leagueService';

const LeagueDetailPage = () => {
  const { leagueId } = useParams();
  const [leagueData, setLeagueData] = useState(null);

  useEffect(() => {
    const fetchLeagueByID = async () => {
      try {
        const response = await getLeagueByID(leagueId);

        if (response.status === HttpStatus.OK) {
          setLeagueData(response.data);
        } else if (response.status === HttpStatus.NOT_FOUND) {
          console.log('League by id does not found!!');
        } else if (response.status === HttpStatus.UNAUTHORIZED) {
          console.log('User unauthorized, please login again!!');
        } else {
          console.log('Unexpected server error!!');
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchLeagueByID();
  }, []);

  if (!leagueData) {
    return <div>Loading...</div>;
  }

  return (
    <Layout>
      <div className={styles.colorLine} />
      <div className={styles.parrentContainer}>
        <div className={styles.headerContainer}>
          <img className={styles.img} alt="" src={avt} />
          <div className={styles.leagueInfo}>
            <div className={styles.title}>{leagueData.name}</div>
            <div className={styles.formatLocation}>
              {' '}
              {leagueData.competitionType}
              {' | '} {leagueData.location}
            </div>
            <div className={styles.teamNumber}>
              {' '}
              {leagueData.maxTeams} teams{' '}
            </div>
          </div>
        </div>

        {leagueData.status.toLowerCase() === 'opening' ? (
          <Opening leagueID={leagueId} />
        ) : (
          <Closed leagueID={leagueId} />
        )}
      </div>

      <div className={styles.colorLine2} />
    </Layout>
  );
};

export default LeagueDetailPage;
