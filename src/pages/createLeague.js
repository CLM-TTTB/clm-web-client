import React, { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

import styles from '../styles/createLeague.module.css';
import Button from '~/components/button';
import Layout from '~/components/layout';
import Input from '~/components/input';
import InputShort from '~/components/input-short';

const CreateLeague = () => {
  const navigate = useNavigate();

  const [leagueName, setLeagueName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [location, setLocation] = useState('');
  const [privacy, setPrivacy] = useState('');
  const [numOfPlayers, setNumOfPlayers] = useState('');
  const [competionFormat, setCompetitionFormat] = useState('');
  const [numOfTeams, setNumOfTeams] = useState('');

  return (
    <Layout>
      <hr class="horizontal-line" />
      <h1 className={styles.title}>Create League</h1>
      <div className={styles.createLeagueForm}>
        <InputShort
          label="League Name"
          placeholder="League Name"
          value={leagueName}
          onChange={(e) => setLeagueName(e.target.value)}
          margin-right="10px"
          style={{ marginRight: '10px' }}
        />
        <Input
          label="Phone Number"
          placeholder="Phone Number"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
        />
      </div>
      <div className={styles.createLeagueForm}>
        <InputShort
          label="League Name"
          placeholder="League Name"
          value={leagueName}
          onChange={(e) => setLeagueName(e.target.value)}
          margin-right="10px"
          style={{ marginRight: '10px' }}
        />
        <Input
          label="Phone Number"
          placeholder="Phone Number"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
        />
      </div>
      <div className={styles.createLeagueForm}>
        <Input
          label="Phone Number"
          placeholder="Phone Number"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
        />
      </div>
    </Layout>
  );
};

export default CreateLeague;
