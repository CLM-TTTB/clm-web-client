import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import LeagueCard from '~/components/leagueCard';
import Button from '~/components/button';
import MyLeaguesStyle from '~/styles/myLeagues.module.css';
import CardStyle from '~/styles/leagueCard.module.css';
import SearchLeagueStyle from '~/styles/searchLeague.module.css';
import Layout from '~/components/layout';
import { getAllMyLeagues } from '~/apiServices/leagueService';
import HttpStatus from '~/constants/httpStatusCode';

const MyLeagues = () => {
  const navigate = useNavigate();

  const [leagues, setLeagues] = useState([]);

  const fetchLeagues = async () => {
    try {
      const response = await getAllMyLeagues();

      if (response.status === HttpStatus.OK) {
        setLeagues(response.data.content);
      } else if (response.status === HttpStatus.UNAUTHORIZED) {
        console.log('User unauthorized, please login again!!');
      } else {
        console.log('Unexpected server error!!');
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchLeagues();
  }, []);

  const handleDetail = (leagueId) => {
    navigate(`/league/${encodeURIComponent(leagueId)}`, {
      state: { source: 'from myLeague' },
    });
  };

  const onCreateNewLeaguePress = () => {
    navigate('/createLeague');
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
                onClick={onCreateNewLeaguePress}
                text="Create New League"
                className={MyLeaguesStyle.button}
              />
            </div>

            <div className={SearchLeagueStyle.leagueGrid}>
              {leagues.map((league, index) => (
                <LeagueCard
                  key={index}
                  leagueName={league.name}
                  competitionFormat={league.competitionType}
                  location={league.location}
                  profileSrc={league.image}
                  numOfTeams={league.maxTeams}
                  status={league.enrollmentOpen.toString()}
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
