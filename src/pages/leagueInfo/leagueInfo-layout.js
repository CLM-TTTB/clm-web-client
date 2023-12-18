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
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Replace this with your actual path to the JSON file
        const response = await fetch(`/mockData/leagues.json`);
        const data = await response.json();

        // Find the league with the matching ID
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
      <div className={styles.parrentContainer}>
        <div className={styles.headerContainer}>
          <img className={styles.img} alt="" src={avt} />
          <div className={styles.leagueInfo}>
            <div className={styles.title}>{leagueData.leagueName}</div>
            <p>
              {' '}
              {leagueData.location} | {leagueData.competitionFormat}
            </p>
            <p> {leagueData.teamNumber} teams </p>
          </div>
        </div>

        {leagueData.status.toLowerCase() === 'opening' ? (
          <Opening leagueData={leagueData} />
        ) : (
          <Closed leagueData={leagueData} />
        )}

        <button onClick={() => navigate('/searchLeague')}>Go Back</button>
      </div>
    </Layout>
  );
};

export default LeagueDetailPage;
