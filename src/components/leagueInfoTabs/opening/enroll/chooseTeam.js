import React, { useState, useEffect } from 'react';
import CreateTeam from '~/components/leagueInfoTabs/opening/enroll/createTeam';
import Template from '~/pages/template';
import AddMembers from './addMembers';
import styles from './chooseTeam.module.css';
import Button from '~/components/button';

import { getAllMyTeamTemplates } from '~/apiServices/teamService';
import HttpStatus from '~/constants/httpStatusCode';

const ChooseTeam = ({ leagueID, onEnrollClick }) => {
  const [selectedValue, setSelectedValue] = useState('Create New Team');
  const [showNextComponent, setShowNextComponent] = useState(false);
  const [showDropdown, setShowDropdown] = useState(true);
  // const [showAddMembers, setShowAddMembers] = useState(false);
  const [templates, setTemplates] = useState([]);

  useEffect(() => {
    const fetchTemplates = async () => {
      try {
        const response = await getAllMyTeamTemplates(true);

        if (response.status === HttpStatus.OK) {
          setTemplates(response.data);
        } else if (response.status === HttpStatus.UNAUTHORIZED) {
          console.log('Unauthorized user!!');
        } else {
          console.log('Unexpected server error!!');
        }
      } catch (err) {
        console.log(err);
      }
    };

    fetchTemplates();
  }, []);

  const templateOptions = templates.map((template, index) => (
    <option key={index} value={template} className={styles.subItem}>
      {`From ${template}`}
    </option>
  ));

  const handleTeamChoice = (event) => {
    setSelectedValue(event.target.value);
  };

  const handleNextClick = () => {
    setShowNextComponent(true);
    setShowDropdown(false);
  };

  const handleBackClick = () => {
    setShowNextComponent(false);
    setShowDropdown(true);
    setSelectedValue('Create New Team');
    // setShowAddMembers(false);
  };

  // const handleCreateTeam = () => {
  //   setShowAddMembers(true);
  // };

  const renderComponent = () => {
    // if (showAddMembers) {
    //   return <AddMembers />;
    // }
    return (
      <CreateTeam
        // onCreateTeam={handleCreateTeam}
        leagueID={leagueID}
        templateName={selectedValue}
      />
    );
    // switch (selectedValue) {
    //   case 'Create New Team':
    //     return (
    //       <CreateTeam onCreateTeam={handleCreateTeam} leagueID={leagueID} />
    //     );
    //   default:
    //     //HANDLE TEMPLATE CHOICES
    //     return <CreateTeam onCreateTeam={handleCreateTeam} />;
    // }
  };

  useEffect(() => {
    setSelectedValue('Create New Team');
  }, []);

  return (
    <div className={styles.parent}>
      {showDropdown && (
        <>
          <div className={styles.label}>Choose Team</div>
          <div className={styles.customSelect}>
            <select
              className={`${styles.dropDown} ${styles.customDropDown}`}
              value={selectedValue}
              onChange={handleTeamChoice}
            >
              {templateOptions}
              <option className={styles.subItem} value="Create New Team">
                Create New Team
              </option>
            </select>
            <div className={styles.customArrow}></div>
          </div>
          <Button text="Next" onClick={handleNextClick} />
        </>
      )}

      {showNextComponent && (
        <>
          <div className={styles.backButton} onClick={handleBackClick}>
            Back
          </div>
          {renderComponent()}
        </>
      )}
    </div>
  );
};

export default ChooseTeam;
