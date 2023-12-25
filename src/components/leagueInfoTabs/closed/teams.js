import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom'; // Import Link from React Router
import TeamCard from '~/components/teamCard';
import styles from './teams.module.css';

import { getTeamsInLeagueByID } from '~/apiServices/leagueService';
import HttpStatus from '~/constants/httpStatusCode';

const Teams = ({ leagueID }) => {
  const [teams, setTeams] = useState([]);
  console.log('LeagueID: ' + leagueID);

  useEffect(() => {
    const fetchTeamsInLeague = async () => {
      try {
        const response = await getTeamsInLeagueByID(leagueID);

        if (response.status === HttpStatus.OK) {
          console.log('Fetch teams successfully');
          setTeams(response.data.content);
        } else {
          console.log('Unexpected server error!!');
        }
      } catch (err) {
        console.log(err);
      }
    };

    fetchTeamsInLeague();
  }, []);

  const navigate = useNavigate();

  const location = useLocation();
  const handleDetail = (team) => {
    const leagueId = location.pathname.split('/').pop();
    navigate(`/teamInfo/${team.id}`, { state: { prevLeagueId: leagueId } });
  };

  return (
    <>
      <div className={styles.teamsForm}>
        <div className={styles.container}>
          <div className={styles.teamGrid}>
            {teams.map((team) => (
              <div
                // key={team.id}
                // to={{
                //   pathname: `/teamInfo/${team.id}`, // Define your route path
                //   state: { teamData: team }, // Pass team's data as state
                // }}
                className={styles.link} // Add your styling for the link
              >
                <TeamCard
                  teamName={team.name}
                  profileSrc={team.image}
                  // win={team.wdl.win}
                  // draw={team.wdl.draw}
                  // lost={team.wdl.lost}
                  onDetailClick={() => handleDetail(team)}
                  numOfPlayers={team.members.length}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Teams;
