import React, { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

import styles from '../styles/createLeague.module.css';
import Button from '~/components/button';
import Layout from '~/components/layout';
import Input from '~/components/input';
import InputShort from '~/components/input-short';
import ImageButton from '~/components/imageButton';
import { Switch } from '@mui/material';

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
        <InputShort
          label="Privacy"
          placeholder="Privacy"
          value={privacy}
          styles={styles.alignLeft}
          onChange={(e) => setPrivacy(e.target.value)}
        />

        <Switch Allow public enrollment />
      </div>
    </Layout>
  );
};

export default CreateLeague;
