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
import { createLeague } from '~/apiServices/leagueService';
import HttpStatus from '~/constants/httpStatusCode';

const CreateLeague = () => {
  useEffect(() => {
    console.log('CreateLeague page loaded!!!');
  }, []);

  const navigate = useNavigate();

  const [leagueName, setLeagueName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [location, setLocation] = useState('');
  const [ageRange, setAgeRange] = useState('U21');
  const [numOfPlayers, setNumOfPlayers] = useState('');
  const [competitionFormat, setCompetitionFormat] = useState('KNOCKOUT');
  const [numOfTeams, setNumOfTeams] = useState('');
  const [privacy, setPrivacy] = useState('Publish');

  const [enrollmentDeadline, setEnrollmentDeadline] = useState();
  const [startEstimateDate, setStartEstimateDate] = useState();
  const [endEstimateDate, setEndEstimateDate] = useState();

  const ageRangeOptions = [
    'U12',
    'U14',
    'U16',
    'U18',
    'U21',
    'U23',
    'U25',
    'U30',
    'U35',
    'U40',
    'U45',
  ];

  const ShowPublicEnrollment = () => {
    if (privacy === 'Publish') {
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

  const handleCreateLeague = async () => {
    // console.log(parseInt(numOfTeams));
    // console.log(parseInt(numOfPlayers));
    // console.log(leagueName);
    // console.log(phoneNumber);
    // console.log(location);
    // console.log(ageRange);
    // console.log(startEstimateDate.toISOString());
    // console.log(endEstimateDate.toISOString());
    // console.log(enrollmentDeadline.toISOString());
    // console.log(competitionFormat.toUpperCase().replace(/-/g, '_'));
    // console.log(privacy.toUpperCase().replace(/-/g, '_'));
    //** FOR DEBUGGING PURPOSE **

    if (
      leagueName.length < 1 ||
      phoneNumber.length < 1 ||
      location.length < 1 ||
      ageRange.length < 1 ||
      numOfPlayers.length < 1 ||
      numOfTeams.length < 1 ||
      !startEstimateDate ||
      !endEstimateDate ||
      !enrollmentDeadline //The enrollmentDeadline state will caused a bug if the privacy is 'Private'
    ) {
      toast.error('Please fill out all fields');
    } else {
      try {
        const response = await createLeague({
          maxTeams: numOfTeams,
          minTeams: 2,
          maxPlayersPerTeam: numOfPlayers,
          minPlayersPerTeam: 2,
          name: leagueName,
          phoneNo: phoneNumber,
          location: location,
          ageGroup: ageRange,
          startTime: startEstimateDate.toISOString(),
          endTime: endEstimateDate.toISOString(),
          registrationDeadline: enrollmentDeadline.toISOString(),
          competitionType: competitionFormat.toUpperCase().replace(/-/g, '_'),
          visibility: privacy.toUpperCase().replace(/-/g, '_'),
        });

        if (response.status === HttpStatus.CREATED) {
          toast.success('League created successfully!');

          setLeagueName('');
          setPhoneNumber('');
          setLocation('');
          setAgeRange('U21');
          setNumOfPlayers('');
          setCompetitionFormat('KNOCKOUT');
          setNumOfTeams('');
          setPrivacy('Publish');
          setStartEstimateDate();
          setEndEstimateDate();
          setEnrollmentDeadline();
        } else if (response.status === HttpStatus.BAD_REQUEST) {
          toast.error('The input field is not valid!!');
        } else if (response.status === HttpStatus.UNAUTHORIZED) {
          toast.error('Unauthorized, please login again to use this feature!!');
        } else {
          toast.error('Unexpected server error!!');
        }
      } catch (err) {
        console.log(err);
      }
    }
  };

  const handleStartEstimateDateChange = (newDate) => {
    if (enrollmentDeadline && newDate < enrollmentDeadline) {
      toast.error('Estimate Start Date cannot be before Enrollment Deadline');
    } else {
      setStartEstimateDate(newDate);
    }
  };

  const handleEndEstimateDateChange = (newDate) => {
    if (startEstimateDate && newDate < startEstimateDate) {
      toast.error('Estimate End Date cannot be before Estimate Start Date');
    } else {
      setEndEstimateDate(newDate);
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
          options={ageRangeOptions}
          defaultValue={ageRangeOptions[0]}
        />

        <Input
          label="Number of Players per Team"
          placeholder="Number of Players per Team"
          value={numOfPlayers}
          onChange={(e) => setNumOfPlayers(e.target.value)}
        />
      </div>

      <div className={styles.createLeagueForm}>
        <DropdownShort
          label="Competition Format"
          placeholder="Competition Format"
          value={competitionFormat}
          onChange={(e) => setCompetitionFormat(e.target.value)}
          options={['Knockout', 'Round-robin', 'Knockout-with-Round-robin']}
          defaultValue="Knockout"
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
            onChange={handleStartEstimateDateChange}
          />
        </div>

        <div className={styles.form7}>
          <label className={styles.label}>Estimate End Date</label>
          <DatePickerComponent
            value={endEstimateDate}
            onChange={handleEndEstimateDateChange}
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
            options={['Publish', 'Private']}
            // defaultValue="Publish"
          />
        </div>

        <div className={styles.form4}>
          <FormGroup>
            <FormControlLabel
              control={
                <Switch
                  disabled={privacy === 'Private'}
                  checked={privacy === 'Publish'}
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
