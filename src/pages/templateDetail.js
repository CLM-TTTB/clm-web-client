import React, { useState, useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';

import styles from '../../src/components/leagueInfoTabs/opening/enroll/createTeam.module.css';
import Button from '~/components/button';
import Layout from '~/components/layout';
import Input from '~/components/input';
import ImageButton from '~/components/imageButton';
import { toast } from 'react-toastify';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import InputWide from '~/components/input-wide';
import style2 from '../../src/styles/templateDetail.module.css';
import stylesAddMembers from '~/components/leagueInfoTabs/opening/enroll/addMembers.module.css';

import {
  createNewTemplate,
  getTemplateInfosByID,
  editTemplatePlayersInfos,
} from '~/apiServices/teamService';
import HttpStatus from '~/constants/httpStatusCode';
import AuthEndpoint from '~/endpoints/authEndpoints';
import TeamInfo from './teamInfo/teamInfo';
import Members from './teamInfo/members';
import AddMembers from '~/components/leagueInfoTabs/opening/enroll/addMembers';
import AddMembersInTemplate from '~/components/addMembersInTemplate';

const TemplateDetail = () => {
  const navigate = useNavigate();

  const { templateId } = useParams();

  const [teamAvatar, setTeamAvatar] = useState('');
  const [teamName, setTeamName] = useState('');
  const [templateName, setTemplateName] = useState('');
  const [contactPhoneNumber, setContactPhoneNumber] = useState('');
  const [description, setDescription] = useState('');

  const [data, setData] = useState([]);
  const [selectedRowIndex, setSelectedRowIndex] = useState(null);

  const fetchTemplateInfos = async () => {
    try {
      const response = await getTemplateInfosByID(templateId);
      if (response.status === HttpStatus.OK) {
        setTeamAvatar(response.data?.image);
        setTemplateName(response.data?.name);
        setTeamName(response.data?.teamName);
        setContactPhoneNumber(response.data?.phoneNo);
        setDescription(response.data?.description);
        setData(response.data?.members);
        console.log(response.data?.members);
      } else {
        console.log('Unexpected server error!');
      }
    } catch (error) {
      console.error('Error fetching data: ', error);
    }
  };

  useEffect(() => {
    fetchTemplateInfos();
  }, []);

  // if (!templateData) {
  //   return <div>Loading...</div>;
  // }

  const handleRowClick = (index) => {
    setSelectedRowIndex(index);
  };

  const handleInputChange = (e, fieldName) => {
    const updatedData = [...data];
    updatedData[selectedRowIndex][fieldName] = e.target.value;
    setData(updatedData);
  };

  const handleAddRow = () => {
    // const newId = data.length + 1;
    setData((prevData) => [
      ...prevData,
      {
        // ID: newId,
        name: '',
        age: '',
        // Phone: '',
        shirtNumber: '',
        description: '',
      },
    ]);
    setSelectedRowIndex(data.length);
  };

  const handleRemoveRow = () => {
    if (data.length === 0) {
      toast.error('No row to remove');
      return;
    }
    const updatedData = [...data];
    updatedData.splice(selectedRowIndex, 1);
    setData(updatedData);
    setSelectedRowIndex(null);
  };

  const handleSaveTemplate = async () => {
    if (
      !teamName ||
      !templateName ||
      !contactPhoneNumber
      //   ||
      //   !ageRange ||
      //   !location
    ) {
      toast.error('Please fill out all fields');
    } else if (
      contactPhoneNumber.length < 10 ||
      contactPhoneNumber.length > 10
    ) {
      toast.error('Phone number must only contain 10 digits');
    } else if (contactPhoneNumber[0] !== '0') {
      toast.error('Phone number should start with 0');
    } else {
      try {
        console.log(data);

        const response = await editTemplatePlayersInfos(templateId, {
          image: teamAvatar,
          name: templateName,
          teamName: teamName,
          phoneNo: contactPhoneNumber,
          description: description,
          members: data,
        });

        if (response.status === HttpStatus.OK) {
          toast.success('Template updated successfully!');

          setTeamAvatar('');
          setTemplateName('');
          setTeamName('');
          setContactPhoneNumber('');
          setDescription('');
          setData([]);

          fetchTemplateInfos();
        } else if (response.status === HttpStatus.NOT_FOUND) {
          console.log('User are not the creator of this template');
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
      <h1 className={styles.title}>Template: {templateName}</h1>

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

      <div className={styles.form2}>
        <InputWide
          label="Description"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>

      <div className={styles.createTeamForm}>
        <div className={stylesAddMembers.parent}>
          <h2 className={stylesAddMembers.title}>Add Members</h2>
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
                  onClick={() => handleRowClick(index)}
                >
                  <td>{index + 1}</td>
                  <td>
                    <input
                      className={stylesAddMembers.cell}
                      type="text"
                      value={
                        selectedRowIndex === index ? data[index].name : row.name
                      }
                      onChange={(e) => handleInputChange(e, 'name')}
                    />
                  </td>
                  <td>
                    <input
                      className={stylesAddMembers.cell}
                      type="text"
                      value={
                        selectedRowIndex === index ? data[index].age : row.age
                      }
                      onChange={(e) => handleInputChange(e, 'age')}
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
                      value={
                        selectedRowIndex === index
                          ? data[index].shirtNumber
                          : row.shirtNumber
                      }
                      onChange={(e) => handleInputChange(e, 'shirtNumber')}
                    />
                  </td>
                  <td>
                    <input
                      className={stylesAddMembers.cell}
                      type="text"
                      value={
                        selectedRowIndex === index
                          ? data[index].description
                          : row.description
                      }
                      onChange={(e) => handleInputChange(e, 'description')}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className={stylesAddMembers.buttons}>
            <Button
              className={stylesAddMembers.addButton}
              onClick={handleAddRow}
              text="Add"
            ></Button>
            <Button
              className={stylesAddMembers.addButton}
              onClick={handleRemoveRow}
              text="Remove"
            ></Button>
          </div>
        </div>
      </div>

      <div className={styles.createTeamForm}>
        <Button text="Save Template" onClick={handleSaveTemplate}></Button>
      </div>

      <ToastContainer />
      <div className={styles.space} />
      <hr class="horizontal-line" />
    </Layout>
  );
};

export default TemplateDetail;
