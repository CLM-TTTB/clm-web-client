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
import style2 from '../../src/styles/searchLeague.module.css';

import { createNewTemplate } from '~/apiServices/teamService';
import HttpStatus from '~/constants/httpStatusCode';
import AuthEndpoint from '~/endpoints/authEndpoints';

const CreateTeamTemplate = () => {
  const navigate = useNavigate();

  const [teamAvatar, setTeamAvatar] = useState('');
  const [teamName, setTeamName] = useState('');
  const [templateName, setTemplateName] = useState('');
  const [contactPhoneNumber, setContactPhoneNumber] = useState('');
  //   const [ageRange, setAgeRange] = useState('');
  //   const [location, setLocation] = useState('');
  const [uniform1, setUniform1] = useState('');
  const [uniform2, setUniform2] = useState('');
  const [uniform3, setUniform3] = useState('');
  const [description, setDescription] = useState('');

  const handleCreateTeam = async () => {
    if (
      !teamName ||
      !templateName ||
      !contactPhoneNumber
      //   ||
      //   !ageRange ||
      //   !location
    ) {
      toast.error('Please fill out all fields');
    } else {
      try {
        const response = await createNewTemplate({
          name: templateName,
          teamName: teamName,
          phoneNo: contactPhoneNumber,
        });

        if (response.status === HttpStatus.CREATED) {
          toast.success('Team created successfully!');
          setTeamAvatar('');
          setTemplateName('');
          setTeamName('');
          setContactPhoneNumber('');
          //   setAgeRange('');
          //   setLocation('');
          // setUniform1('');
          // setUniform2('');
          // setUniform3('');
          setDescription('');
        } else if (response.status === HttpStatus.FORBIDDEN) {
          toast.error(response.message);
        } else {
          console.log('Unexpected server error!!');
        }
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <Layout>
      <hr class="horizontal-line" />
      <h1 className={styles.title}>Create Team Template</h1>

      <div className={styles.createTeamForm}>
        <div className={styles.form1}>
          <ImageButton label="Team Avatar" />
        </div>

        <div className={styles.form2}>
          <Input
            label="Template Name"
            placeholder="Template Name"
            value={templateName}
            onChange={(e) => setTemplateName(e.target.value)}
          />

          <Input
            label="Team Name"
            placeholder="Team Name"
            value={teamName}
            onChange={(e) => setTeamName(e.target.value)}
          />

          <Input
            label="Contact Phone Number"
            placeholder="Contact Phone Number"
            value={contactPhoneNumber}
            onChange={(e) => setContactPhoneNumber(e.target.value)}
          />
        </div>
      </div>

      {/* <div className={styles.createTeamForm}>
        <DropdownShort
          label="Age Range"
          value={ageRange}
          onChange={(e) => setAgeRange(e.target.value)}
          options={['Under 18', '18-25', '26-35', '36-45', '46-55', '56+']}
          defaultValue="Under 18"
        />

        <Input
          label="Location*"
          placeholder="Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
      </div> */}

      <div className={styles.form2}>
        <InputWide
          label="Description"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>

      <div className={styles.createTeamForm}>
        <Button text="Save Template" onClick={handleCreateTeam}></Button>
      </div>

      <ToastContainer />
      <div className={styles.space} />
      <hr class="horizontal-line" />
    </Layout>
  );
};

export default CreateTeamTemplate;