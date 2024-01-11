import React, { useState, useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
// import { getTemplateByID } from '~/apiServices/teamService';

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

import { createNewTemplate } from '~/apiServices/teamService';
import HttpStatus from '~/constants/httpStatusCode';
import AuthEndpoint from '~/endpoints/authEndpoints';
import TeamInfo from './teamInfo/teamInfo';
import Members from './teamInfo/members';
import AddMembers from '~/components/leagueInfoTabs/opening/enroll/addMembers';
import AddMembersInTemplate from '~/components/addMembersInTemplate';

const TemplateDetail = () => {
  const navigate = useNavigate();

  const { templateId } = useParams();
  const { templateData, setTemplateData } = useState(null);

  const [teamAvatar, setTeamAvatar] = useState('');
  const [teamName, setTeamName] = useState('');
  const [templateName, setTemplateName] = useState('');
  const [contactPhoneNumber, setContactPhoneNumber] = useState('');
  //   const [ageRange, setAgeRange] = useState('');
  //   const [location, setLocation] = useState('');
  const [uniform1, setUniform1] = useState('');
  const [uniform2, setUniform2] = useState('');
  const [uniform3, setUniform3] = useState('');
  const [description, setDescription] = useState('');

  //   useEffect(() => {
  //     const fetchTemplateByID = async () => {
  //         try {
  //             const response = await getTemplateByID(templateId);
  //             if (response.status === HttpStatus.OK) {
  //                 const tempData = response.data;
  //                 console.log(tempData);
  //                 setTemplateData(tempData);
  //             } else {
  //                 console.log('Unexpected server error!');
  //             }
  //         } catch (error) {
  //             console.error('Error fetching data: ', error);
  //         }
  //     };

  //     fetchTemplateByID();
  //   }, []);

  //   if (!templateData) {
  //     return <div>Loading...</div>;
  //   }

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
        const response = await createNewTemplate({
          name: templateName,
          teamName: teamName,
          phoneNo: contactPhoneNumber,
        });

        if (response.status === HttpStatus.CREATED) {
          toast.success('Team created successfully!');
          setTeamAvatar('');
          setTemplateName('');
          setTeamName('');
          setContactPhoneNumber('');
          //   setAgeRange('');
          //   setLocation('');
          // setUniform1('');
          // setUniform2('');
          // setUniform3('');
          setDescription('');
        } else if (response.status === HttpStatus.FORBIDDEN) {
          toast.error(response.message);
        } else {
          console.log('Unexpected server error!!');
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
        <AddMembersInTemplate className={styles.nested} />
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
