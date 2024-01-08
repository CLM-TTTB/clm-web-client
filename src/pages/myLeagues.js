import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import LeagueCard from '~/components/leagueCard';
import Button from '~/components/button';
import MyLeaguesStyle from '~/styles/myLeagues.module.css';
import CardStyle from '~/styles/leagueCard.module.css';
import SearchLeagueStyle from '~/styles/searchLeague.module.css';
import Layout from '~/components/layout';

const MyLeagues = () => {
  const navigate = useNavigate();

  const [leagues, setLeagues] = useState([]);

  useEffect(() => {
    const fetchLeagues = async () => {
      try {
        // Replace the following with your actual API call
        const response = await fetch(`/mockData/leagues.json`);
        const data = await response.json();
        console.log('Fetched Data:', data); // Log the fetched data
        setLeagues(data);
      } catch (error) {
        console.error('Error fetching leagues:', error);
      }
    };

    fetchLeagues();
  }, []);

  const handleDetail = (leagueId) => {
    navigate(`/league/${encodeURIComponent(leagueId)}`);
  };

  return (
    <>
      <Layout>
        <hr className={CardStyle.horizontalLine} />
        <div className={MyLeaguesStyle.myLeaguesForm}>
          <h1 className={MyLeaguesStyle.title}>My Leagues</h1>

          <div className={MyLeaguesStyle.container}>
            <div className={MyLeaguesStyle.buttonContainer}>
              <Button
                text="Create New League"
                className={MyLeaguesStyle.button}
              />
            </div>

            <div className={SearchLeagueStyle.leagueGrid}>
              {leagues.map((league, index) => (
                <LeagueCard
                  key={index}
                  leagueName={league.leagueName}
                  competitionFormat={league.competitionFormat}
                  location={league.location}
                  profileSrc={league.profileSrc}
                  status={league.status}
                  onDetailClick={() =>
                    handleDetail(league.id ? league.id.toString() : '')
                  }
                />
              ))}
            </div>
          </div>
        </div>

        <div className={MyLeaguesStyle.space} />
        <hr className={CardStyle.horizontalLine} />
      </Layout>
    </>
  );
};

export default MyLeagues;
