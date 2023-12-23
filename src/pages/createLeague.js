import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import styles from '../styles/createLeague.module.css';
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
import DatePickerComponent from '~/components/datePicker';
import dayjs, { Dayjs } from 'dayjs';

const CreateLeague = () => {
  useEffect(() => {
    console.log('CreateLeague page loaded!!!');
  }, []);

  const navigate = useNavigate();

  const [leagueName, setLeagueName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [location, setLocation] = useState('');
  const [ageRange, setAgeRange] = useState('');
  const [numOfPlayers, setNumOfPlayers] = useState('');
  const [competitionFormat, setCompetitionFormat] = useState('');
  const [numOfTeams, setNumOfTeams] = useState('');
  const [privacy, setPrivacy] = useState('Public');

  const [enrollmentDeadline, setEnrollmentDeadline] = useState();
  const [startEstimateDate, setStartEstimateDate] = useState();
  const [endEstimateDate, setEndEstimateDate] = useState();

  const [numOfPeople, setNumOfPeople] = useState('');

  const ShowPublicEnrollment = () => {
    if (privacy === 'Public') {
      return (
        <div className={styles.createLeagueForm}>
          <div className={styles.form5}>
            <label className={styles.label}>Enrollment Deadline</label>
            <div className={styles.datePickerContainer}>
              <DatePickerComponent
                value={enrollmentDeadline}
                onChange={(newDate) => setEnrollmentDeadline(newDate)}
              />
            </div>
          </div>
          {/* <Input
            label="Number of People"
            placeholder="Number of People"
            value={numOfPeople}
            onChange={(e) => setNumOfPeople(e.target.value)}
          /> */}
        </div>
      );
    }
    return null;
  };

  const handleCreateLeague = () => {
    if (
      leagueName.length < 1
      // ||
      // phoneNumber.length < 1 ||
      // location.length < 1 ||
      // ageRange.length < 1 ||
      // numOfPlayers.length < 1 ||
      // competitionFormat.length < 1 ||
      // numOfTeams.length < 1
    ) {
      toast.error('Please fill out all fields');
    } else {
      console.log(enrollmentDeadline);

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
        <DropdownShort
          label="Age Range"
          placeholder="Age Range"
          value={ageRange}
          onChange={(e) => setAgeRange(e.target.value)}
          options={['Under 18', '18-25', '26-35', '36-45', '46-55', '56+']}
          defaultValue="Under 18"
        />

        <Dropdown
          label="Number of players per team*"
          placeholder="Number of players per team"
          value={numOfPlayers}
          onChange={(e) => setNumOfPlayers(e.target.value)}
          options={['3', '5', '6', '7', '9', '11']}
          defaultValue="3"
        />
      </div>

      <div className={styles.createLeagueForm}>
        <DropdownShort
          label="Competition Format"
          placeholder="Competition Format"
          value={competitionFormat}
          onChange={(e) => setCompetitionFormat(e.target.value)}
          options={['Knock-out', 'Round-robin', 'Mixed']}
          defaultValue="Knock-out"
        />

        <Input
          label="Number of Teams"
          placeholder="Number of Teams"
          value={numOfTeams}
          onChange={(e) => setNumOfTeams(e.target.value)}
        />
      </div>

      <div className={styles.createLeagueForm}>
        <div className={styles.form6}>
          <label className={styles.label}>Estimate Start Date</label>
          <DatePickerComponent
            value={startEstimateDate}
            onChange={(newDate) => setStartEstimateDate(newDate)}
          />
        </div>

        <div className={styles.form7}>
          <label className={styles.label}>Estimate End Date</label>
          <DatePickerComponent
            value={endEstimateDate}
            onChange={(newDate) => setEndEstimateDate(newDate)}
          />
        </div>
      </div>

      <div className={styles.createLeagueForm}>
        <div className={styles.form3}>
          <DropdownShort
            label="Privacy"
            placeholder="Privacy"
            value={privacy}
            onChange={(e) => setPrivacy(e.target.value)}
            options={['Public', 'Private']}
            defaultValue="Public"
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
