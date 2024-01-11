import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

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
import styles from '../../src/styles/myTemplates.module.css';
import TemplateCard from '~/components/templateCard';

import { getAllMyTeamTemplates } from '~/apiServices/teamService';
import HttpStatus from '~/constants/httpStatusCode';

const CreateTeamTemplate = () => {
  const navigate = useNavigate();
  const [teams, setTeams] = useState([]);

  useEffect(() => {
    const fetchAllMyTemplates = async () => {
      try {
        const response = await getAllMyTeamTemplates(false);

        if (response.status === HttpStatus.OK) {
          setTeams(response.data);
        } else if (response.status === HttpStatus.UNAUTHORIZED) {
          console.log('Unauthorized user!!');
        } else {
          console.log('Unexpected server error!!');
        }
      } catch (err) {
        console.log(err);
      }
    };

    fetchAllMyTemplates();
  }, []);

  const handleDetail = (leagueId) => {
    navigate(`/myTemplates/${encodeURIComponent(leagueId)}`);
  };

  const onCreateNewTemplatePress = () => {
    navigate('/teamTemplate');
  };

  return (
    <Layout>
      <hr class="horizontal-line" />
      <div className={styles.myLeaguesForm}>
        <h1 className={styles.title}>My Templates</h1>

        <div>
          <div className={styles.buttonContainer}>
            <Button
              onClick={onCreateNewTemplatePress}
              text="Create New Template"
              className={styles.button}
            />
          </div>

          <div className={styles.cardContainer}>
            {teams.map((team) => (
              <TemplateCard
                teamName={team.name}
                profileSrc={team.image}
                // win={team.wdl.win}
                // draw={team.wdl.draw}
                // lost={team.wdl.lost}
                onDetailClick={() => handleDetail(team)}
                numOfPlayers={team.members.length}
              />
            ))}
          </div>
        </div>
      </div>

      <ToastContainer />
      <div className={styles.space} />
    </Layout>
  );
};

export default CreateTeamTemplate;
