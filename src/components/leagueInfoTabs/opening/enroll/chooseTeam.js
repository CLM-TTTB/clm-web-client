import React, { useState, useEffect } from 'react';
import CreateTeam from '~/components/leagueInfoTabs/opening/enroll/createTeam';
import Template from '~/pages/template';
import AddMembers from './addMembers';
import styles from './chooseTeam.module.css';
import Button from '~/components/button';

const ChooseTeam = ({ onEnrollClick }) => {
  const [selectedValue, setSelectedValue] = useState('From Template');
  const [showNextComponent, setShowNextComponent] = useState(false);
  const [showDropdown, setShowDropdown] = useState(true);
  const [showAddMembers, setShowAddMembers] = useState(false);

  const templates = ['Template 1', 'Template 2', 'Template 3']; // Add your template names here
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
    setSelectedValue('From Template');
    setShowAddMembers(false);
  };

  const handleCreateTeam = () => {
    setShowAddMembers(true);
  };

  const renderComponent = () => {
    if (showAddMembers) {
      return <AddMembers />;
    }

    switch (selectedValue) {
      case 'Create New Team':
        return <CreateTeam onCreateTeam={handleCreateTeam} />;
      default:
        //HANDLE TEMPLATE CHOICES
        return <CreateTeam onCreateTeam={handleCreateTeam} />;
    }
  };

  useEffect(() => {
    setSelectedValue('From Template');
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
