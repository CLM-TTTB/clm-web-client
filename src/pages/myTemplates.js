import React, { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

import styles from '../../src/components/leagueInfoTabs/opening/enroll/createTeam.module.css';
import Button from '~/components/button';
import Layout from '~/components/layout';
import Input from '~/components/input';
import InputShort from '~/components/input-short';
import ImageButton from '~/components/imageButton';
import { FormControlLabel, FormGroup, Switch } from '@mui/material';
import Dropdown from '~/components/dropdownn';
import DropdownShort from '~/components/dropdown-short';
import { toast } from 'react-toastify';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { DatePicker } from '@mui/x-date-pickers';
import InputWide from '~/components/input-wide';
import MyLeaguesStyle from '../../src/styles/myLeagues.module.css';
import LeagueCard from '~/components/leagueCard';

const CreateTeamTemplate = () => {
  const navigate = useNavigate();
  const [leagues, setLeagues] = useState([]);

  const handleDetail = (leagueId) => {
    navigate(`/myTemplates/${encodeURIComponent(leagueId)}`);
  };

  return (
    <Layout>
      <hr class="horizontal-line" />
      <div className={MyLeaguesStyle.myLeaguesForm}>
        <h1 className={MyLeaguesStyle.title}>My Leagues</h1>

        <div className={MyLeaguesStyle.container}>
          <div className={MyLeaguesStyle.buttonContainer}>
            <Button
              text="Create New Template"
              className={MyLeaguesStyle.button}
            />
          </div>

          <div className={SearchLeagueStyle.leagueGrid}>
            {leagues.map((league, index) => (
              <LeagueCard
                key={index}
                leagueName={league.leagueName}
                onDetailClick={() =>
                  handleDetail(league.id ? league.id.toString() : '')
                }
              />
            ))}
          </div>
        </div>
      </div>

      <ToastContainer />
      <div className={styles.space} />
      <hr class="horizontal-line" />
    </Layout>
  );
};

export default CreateTeamTemplate;
