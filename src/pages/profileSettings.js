import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuth from '~/hooks/useAuth';

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

import sessionStorage from '~/utils/sessionStorage';
import localStorage from '~/utils/localStorage';
import StorageKey from '~/constants/storageKeys';
import { updateUserProfile } from '~/apiServices/authService';
import HttpStatus from '~/constants/httpStatusCode';

const ProfileSettings = () => {
  const navigate = useNavigate();

  const { userInfos, setUserInfos } = useAuth();

  const [name, setName] = useState(userInfos.name);
  const [phoneNumber, setPhoneNumber] = useState(userInfos.phoneNo);

  const handleSaveProfile = async () => {
    const phoneRegex =
      '^(\\+84|0)(3[2-9]|5[2689]|7[06-9]|8[1-9]|9[0-46-9])\\d{7}$';

    if (phoneNumber && !phoneNumber.match(phoneRegex)) {
      toast.error('Invalid phone number, please re-check!!');
    } else {
      try {
        const response = await updateUserProfile(name, phoneNumber);

        if (response.status === HttpStatus.OK) {
          const rememberMe = await localStorage.getItem(StorageKey.REMEMBER_ME);

          if (rememberMe) {
            const tempUserInfos = {
              ...userInfos,
              name: response.data.name,
              phoneNo: response.data.phoneNo,
            };
            console.log(response.data.name);
            console.log(response.data.phoneNo);
            console.log(tempUserInfos);

            localStorage.setItem(StorageKey.USER_INFOS, tempUserInfos);
            setUserInfos(tempUserInfos);
          } else {
            const tempUserInfos = {
              ...userInfos,
              name: response.data.name,
              phoneNo: response.data.phoneNo,
            };
            console.log(response.data.name);
            console.log(response.data.phoneNo);
            console.log(tempUserInfos);

            sessionStorage.setItem(StorageKey.USER_INFOS, tempUserInfos);
            setUserInfos(tempUserInfos);
          }
          toast.success('Profile saved successfully');
        } else {
          toast.error('Unexpected server error!!');
        }
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <Layout>
      <hr class="horizontal-line" />
      <h1 className={styles.title}>Profile Settings</h1>

      <div className={styles.profileSettingsForm}>
        {/* <div className={styles.form1}>
          <ImageButton label="Profile Avatar" />
        </div> */}
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
