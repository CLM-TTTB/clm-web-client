import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import styles from './createTeam.module.css';
import Button from '~/components/button';
import Layout from '~/components/layout';
import Input from '~/components/input';
import InputShort from '~/components/input-short';
import ImageButton from '~/components/imageButton';
import ImageButtonUniform from '~/components/imageButtonUniform';
import { FormControlLabel, FormGroup, Switch } from '@mui/material';
import Dropdown from '~/components/dropdownn';
import DropdownShort from '~/components/dropdown-short';
import { toast } from 'react-toastify';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { DatePicker } from '@mui/x-date-pickers';
import InputWide from '~/components/input-wide';
import AddMembers from './addMembers';

import { enrollTeamToLeague } from '~/apiServices/leagueService';
import { getTemplateInfosByName } from '~/apiServices/teamService';
import HttpStatus from '~/constants/httpStatusCode';

const CreateTeam = ({ leagueID, templateName }) => {
  const navigate = useNavigate();

  const [teamAvatar, setTeamAvatar] = useState('');
  const [teamName, setTeamName] = useState('');
  const [contactName, setContactName] = useState('');
  const [contactPhoneNumber, setContactPhoneNumber] = useState('');
  // const [ageRange, setAgeRange] = useState('');
  // const [location, setLocation] = useState('');
  const [uniform1, setUniform1] = useState('');
  const [uniform2, setUniform2] = useState('');
  const [uniform3, setUniform3] = useState('');
  const [description, setDescription] = useState('');

  const [created, setCreated] = useState(false);

  useEffect(() => {
    const fetchTemplateInfos = async () => {
      try {
        const response = await getTemplateInfosByName(templateName);

        if (response.status === HttpStatus.CREATED) {
          console.log(response.data);

          setTeamAvatar(response.data?.image);
          setDescription(response.data?.description);
          setTeamName(response.data?.name);
          setContactPhoneNumber(response.data?.phoneNo);
        } else {
          console.log('Unexpected server error!!');
        }
      } catch (err) {
        console.log(err);
      }
    };

    templateName !== 'Create New Team' && fetchTemplateInfos();
  }, []);

  const handleCreateTeam = async () => {
    if (
      !teamName ||
      // !contactName ||
      !contactPhoneNumber
      //||
      // !ageRange ||
      // !location
    ) {
      toast.error('Please fill out all fields');
    } else {
      try {
        const response = await enrollTeamToLeague(leagueID, {
          name: teamName,
          phoneNo: contactPhoneNumber,
        }); //handle Uniform later

        if (response.status === HttpStatus.CREATED) {
          toast.success('Team created successfully!');
          setTeamAvatar('');
          setTeamName('');
          // setContactName('');
          setContactPhoneNumber('');
          // setAgeRange('');
          // setLocation('');
          setUniform1('');
          setUniform2('');
          setUniform3('');
          setDescription('');
          setCreated(true);
        } else if (response.status === HttpStatus.NOT_FOUND) {
          console.log('Tournament with id not found');
        } else if (response.status === HttpStatus.FORBIDDEN) {
          console.log('Tournament is view only, user can not enroll the team');
        } else {
          console.log('Unexpected server error!!');
        }
      } catch (err) {
        console.log(err);
      }
    }
  };

  return created ? (
    <>
      <AddMembers></AddMembers>
    </>
  ) : (
    <div>
      <h1 className={styles.title}>Create Team</h1>

      <div className={styles.createTeamForm}>
        <div className={styles.form1}>
          <ImageButton label="Team Avatar" />
        </div>

        <div className={styles.form2}>
          <Input
            label="Team Name"
            placeholder="Team Name"
            value={teamName}
            onChange={(e) => setTeamName(e.target.value)}
          />

          {/* <Input
            label="Contact Name"
            placeholder="Contact Number"
            value={contactName}
            onChange={(e) => setContactName(e.target.value)}
          /> */}

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
      {/* 
      <div className={styles.createTeamForm}>
        <div className={styles.form5}>
          <ImageButtonUniform label="Uniform 1" />
        </div>

        <div className={styles.form6}>
          <ImageButtonUniform label="Uniform 2" />
        </div>

        <div className={styles.form7}>
          <ImageButtonUniform label="Uniform 2" />
        </div>
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
        <Button text="Create Team" onClick={handleCreateTeam}></Button>
      </div>

      <ToastContainer />
    </div>
  );
};

export default CreateTeam;
