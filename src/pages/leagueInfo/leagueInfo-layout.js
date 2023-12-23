import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import styles from '~/styles/leagueInfo/leagueInfo-layout.module.css';
import avt from '~/images/leagueCard/avatar.png';

import Opening from './opening';
import Closed from './closed';

import Layout from '~/components/layout';

const LeagueDetailPage = () => {
  const { leagueId } = useParams();
  const [leagueData, setLeagueData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`/mockData/leagues.json`);
        const data = await response.json();

        const selectedLeague = data.find(
          (league) => league.id === parseInt(leagueId, 10),
        );

        if (selectedLeague) {
          setLeagueData(selectedLeague);
        } else {
          console.error('League not found');
        }
      } catch (error) {
        console.error('Error fetching league data:', error);
      }
    };

    fetchData();
  }, [leagueId]);

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
            <div className={styles.title}>{leagueData.leagueName}</div>
            <div className={styles.formatLocation}>
              {' '}
              {leagueData.competitionFormat}
              {' | '} {leagueData.location}
            </div>
            <div className={styles.teamNumber}>
              {' '}
              {leagueData.teamNumber} teams{' '}
            </div>
          </div>
        </div>

        {leagueData.status.toLowerCase() === 'opening' ? (
          <Opening leagueData={leagueData} />
        ) : (
          <Closed leagueData={leagueData} />
        )}
      </div>

      <div className={styles.colorLine2} />
    </Layout>
  );
};

export default LeagueDetailPage;
