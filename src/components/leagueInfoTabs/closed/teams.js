import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Import Link from React Router
import TeamCard from '~/components/teamCard';
import styles from './teams.module.css';
import teams from './(test) sampleTeams';

const Teams = (teamData) => {
  const navigate = useNavigate();
  const handleDetail = (team) => {
    navigate('/teamInfo', { state: { teamData } });
  };

  return (
    <>
      <div className={styles.teamsForm}>
        <div className={styles.container}>
          <div className={styles.teamGrid}>
            {teams.map((team) => (
              <Link
                key={team.id}
                to={{
                  pathname: `/teamInfo/${team.id}`, // Define your route path
                  state: { teamData: team }, // Pass team's data as state
                }}
                className={styles.link} // Add your styling for the link
              >
                <TeamCard
                  teamName={team.teamName}
                  profileSrc={team.profileSrc}
                  win={team.wdl.win}
                  draw={team.wdl.draw}
                  lost={team.wdl.lost}
                  onDetailClick={() => handleDetail(team)}
                />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Teams;
