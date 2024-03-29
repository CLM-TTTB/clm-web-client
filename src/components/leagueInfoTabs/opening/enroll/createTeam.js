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
import stylesAddMembers from '~/components/leagueInfoTabs/opening/enroll/addMembers.module.css';

import { enrollTeamToLeague } from '~/apiServices/leagueService';
import { getTemplateInfosByName } from '~/apiServices/teamService';
import HttpStatus from '~/constants/httpStatusCode';

const CreateTeam = ({ leagueID, templateName }) => {
  const navigate = useNavigate();

  const [teamAvatar, setTeamAvatar] = useState('');
  const [teamName, setTeamName] = useState('');
  const [contactPhoneNumber, setContactPhoneNumber] = useState('');
  const [description, setDescription] = useState('');
  const [data, setData] = useState([]);

  const [created, setCreated] = useState(false);

  const [enrolledTeamID, setEnrolledTeamID] = useState('');

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
          setData(response.data?.members);
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
          members: data,
        }); //handle Uniform later

        if (response.status === HttpStatus.CREATED) {
          setEnrolledTeamID(response.data.id);

          toast.success('Team created successfully!');
          setTeamAvatar('');
          setTeamName('');
          setContactPhoneNumber('');
          setDescription('');
          setCreated(true);
        } else if (response.status === HttpStatus.NOT_FOUND) {
          console.log('Tournament with id not found');
        } else if (response.status === HttpStatus.FORBIDDEN) {
          toast.error(
            'Tournament is view only, or user has already enrolled a team to this tournament',
          );
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
      <AddMembers teamID={enrolledTeamID}></AddMembers>
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

      <div className={stylesAddMembers.parent}>
        <h2 className={stylesAddMembers.title}>Current Members</h2>
        <table className={stylesAddMembers.table}>
          <thead>
            <tr className={stylesAddMembers.head}>
              <th>ID</th>
              <th>Name</th>
              <th>Age</th>
              {/* <th>Phone</th> */}
              <th>Jersey Number</th>
              <th>Note</th>
            </tr>
          </thead>
          <tbody className={stylesAddMembers.tbody}>
            {data.map((row, index) => (
              <tr
                className={stylesAddMembers.tr}
                key={index} //
              >
                <td>{index + 1}</td>
                <td>
                  <input
                    className={stylesAddMembers.cell}
                    type="text"
                    value={data[index].name}
                  />
                </td>
                <td>
                  <input
                    className={stylesAddMembers.cell}
                    type="text"
                    value={data[index].age}
                  />
                </td>
                {/* <td>
                <input
                  className={stylesAddMembers.cell}
                  type="text"
                  value={
                    selectedRowIndex === index ? data[index].Phone : row.Phone
                  }
                  onChange={(e) => handleInputChange(e, 'Phone')}
                />
              </td> */}
                <td>
                  <input
                    className={stylesAddMembers.cell}
                    type="text"
                    value={data[index].shirtNumber}
                  />
                </td>
                <td>
                  <input
                    className={stylesAddMembers.cell}
                    type="text"
                    value={data[index].description}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {/* <div className={stylesAddMembers.buttons}>
          <Button
            className={stylesAddMembers.addButton}
            text="Add"
          ></Button>
          <Button
            className={stylesAddMembers.addButton}
            onClick={handleRemoveRow}
          ></Button>
        </div> */}
      </div>

      <div className={styles.createTeamForm}>
        <Button text="Create Team" onClick={handleCreateTeam}></Button>
      </div>

      <ToastContainer />
    </div>
  );
};

export default CreateTeam;
