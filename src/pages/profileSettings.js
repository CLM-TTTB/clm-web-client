import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import styles from '../styles/profileSettings.module.css';
import Button from '~/components/button';
import Layout from '~/components/layout';
import Input from '~/components/input';
import ImageButton from '~/components/imageButton';
import { FormControlLabel, FormGroup, Switch } from '@mui/material';
import Dropdown from '~/components/dropdownn';
import DropdownShort from '~/components/dropdown-short';
import { toast } from 'react-toastify';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import DatePickerComponent from '~/components/datePicker';

const ProfileSettings = () => {
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');

  const handleSaveProfile = () => {
    toast.success('Profile saved successfully');
  };

  return (
    <Layout>
      <hr class="horizontal-line" />
      <h1 className={styles.title}>Profile Settings</h1>

      <div className={styles.profileSettingsForm}>
        <div className={styles.form1}>
          <ImageButton label="Profile Avatar" />
        </div>
        <div className={styles.form2}>
          <Input
            label="Name"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <Input
            label="Phone Number"
            placeholder="Phone Number"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />

          <Input
            label="Email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
      </div>

      <div className={styles.profileSettingsForm}>
        <Button text="Save" onClick={handleSaveProfile}></Button>
      </div>

      <ToastContainer />
    </Layout>
  );
};

export default ProfileSettings;
