import React, { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

import styles from '../styles/createLeague.module.css';
import Button from '~/components/button';
import Layout from '~/components/layout';
import Input from '~/components/input';
import InputShort from '~/components/input-short';
import ImageButton from '~/components/imageButton';
import { FormControlLabel, FormGroup, Switch } from '@mui/material';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import { toast } from 'react-toastify';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CreateLeague = () => {
  const navigate = useNavigate();

  const [leagueName, setLeagueName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [location, setLocation] = useState('');
  const [ageRange, setAgeRange] = useState('');
  const [numOfPlayers, setNumOfPlayers] = useState('');
  const [competitionFormat, setCompetitionFormat] = useState('');
  const [numOfTeams, setNumOfTeams] = useState('');
  const [privacy, setPrivacy] = useState('');

  const [enrollmentDeadline, setEnrollmentDeadline] = useState('');
  const [numOfPeople, setNumOfPeople] = useState('');

  const ShowPublicEnrollment = () => {
    if (privacy === 'Public') {
      return (
        <div className={styles.createLeagueForm}>
          <InputShort
            label="Enrollment Deadline"
            placeholder="Enrollment deadline"
            value={enrollmentDeadline}
            onChange={(e) => setEnrollmentDeadline(e.target.value)}
          />

          <Input
            label="Number of People"
            placeholder="Number of People"
            value={numOfPeople}
            onChange={(e) => setNumOfPeople(e.target.value)}
          />
        </div>
      );
    }
    return null;
  };

  const handleCreateLeague = () => {
    if (
      leagueName.length < 1 ||
      phoneNumber.length < 1 ||
      location.length < 1 ||
      ageRange.length < 1 ||
      numOfPlayers.length < 1 ||
      competitionFormat.length < 1 ||
      numOfTeams.length < 1 ||
      privacy.length < 1
    ) {
      alert('Please fill out all fields');
    } else {
      toast.success('League created successfully!');
      setLeagueName('');
      setPhoneNumber('');
      setLocation('');
      setAgeRange('');
      setNumOfPlayers('');
      setCompetitionFormat('');
      setNumOfTeams('');
      setPrivacy('');
    }
  };

  return (
    <Layout>
      <hr class="horizontal-line" />
      <h1 className={styles.title}>Create League</h1>

      <div className={styles.createLeagueForm}>
        <div className={styles.form1}>
          <ImageButton label="League Image" />
        </div>
        <div className={styles.form2}>
          <Input
            label="League Name"
            placeholder="League Name"
            value={leagueName}
            onChange={(e) => setLeagueName(e.target.value)}
          />

          <Input
            label="Phone Number"
            placeholder="Phone Number"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />

          <Input
            label="Location"
            placeholder="Location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
        </div>
      </div>

      <div className={styles.createLeagueForm}>
        <InputShort
          label="Age Range"
          placeholder="Age Range"
          value={ageRange}
          onChange={(e) => setAgeRange(e.target.value)}
        />

        <Input
          label="Number of players per team*"
          placeholder="Number of players per team"
          value={numOfPlayers}
          onChange={(e) => setNumOfPlayers(e.target.value)}
        />
      </div>

      <div className={styles.createLeagueForm}>
        <InputShort
          label="Competition Format"
          placeholder="Competition Format"
          value={competitionFormat}
          onChange={(e) => setCompetitionFormat(e.target.value)}
        />

        <Input
          label="Number of Teams"
          placeholder="Number of Teams"
          value={numOfTeams}
          onChange={(e) => setNumOfTeams(e.target.value)}
        />
      </div>

      <div className={styles.createLeagueForm}>
        <h3>
          {' '}
          For this configuration, the number of matches in the league is: 3
        </h3>
      </div>

      <div className={styles.createLeagueForm}>
        <div className={styles.form3}>
          <InputShort
            label="Privacy"
            placeholder="Privacy"
            value={privacy}
            styles={styles.alignLeft}
            onChange={(e) => setPrivacy(e.target.value)}
          />
        </div>

        <div className={styles.form4}>
          <FormGroup>
            <FormControlLabel
              control={
                <Switch
                  disabled={privacy === 'Private'}
                  checked={privacy === 'Public'}
                />
              }
              label="Allow public enrollment"
            />
          </FormGroup>
        </div>
      </div>

      <ShowPublicEnrollment />

      <div className={styles.createLeagueForm}>
        <Button text="Create League" onClick={handleCreateLeague}></Button>
      </div>

      <ToastContainer />
    </Layout>
  );
};

export default CreateLeague;
