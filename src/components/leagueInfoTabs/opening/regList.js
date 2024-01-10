import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import styles from './regList.module.css';

import { getRegisteredTeamByID } from '~/apiServices/leagueService';
import HttpStatus from '~/constants/httpStatusCode';

const RegistrationList = ({ leagueID }) => {
  const [registrationTeamData, setRegistrationTeamData] = useState([]);
  const location = useLocation();
  const source = location.state && location.state.source;

  useEffect(() => {
    const fetchRegistrationTeamData = async () => {
      try {
        const response = await getRegisteredTeamByID(leagueID);
        if (response.status === HttpStatus.OK) {
          const tempData = response.data.content;
          setRegistrationTeamData(tempData);
        } else {
          console.log('Unexpected server error!');
        }
      } catch (error) {
        console.error('Error fetching data: ', error);
      }
    };
    fetchRegistrationTeamData();
  }, []);

  const handleAcceptReject = (id, status) => {
    // Update the status of the clicked row based on the button clicked
    const updatedData = registrationTeamData.map((team) =>
      team.id === id ? { ...team, status } : team,
    );
    setRegistrationTeamData(updatedData);
  };

  return (
    <div>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Team Name</th>
            <th>Number of Players</th>
            <th>Phone</th>
            <th>Created Date</th>
            <th>Status</th>
            {source === 'from myLeague' && <th>Action</th>}
          </tr>
        </thead>
        <tbody className={styles.tbody}>
          {registrationTeamData.map((team) => (
            <tr key={team.id}>
              <td>{team.id}</td>
              <td>{team.name}</td>
              <td>{team.member === undefined ? '0' : team.member.length}</td>
              <td>{team.phoneNo}</td>
              <td>{team.createdAt}</td>
              <td>{team.status}</td>
              {source === 'from myLeague' && (
                <td>
                  <button
                    className={styles.accept}
                    onClick={() => handleAcceptReject(team.id, 'Accepted')}
                  >
                    Accept
                  </button>
                  <button
                    className={styles.reject}
                    onClick={() => handleAcceptReject(team.id, 'Rejected')}
                  >
                    Reject
                  </button>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RegistrationList;
