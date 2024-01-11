import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import styles from './regList.module.css';

import { toast } from 'react-toastify';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import {
  getRegisteredTeamByID,
  acceptRejectTeamEnrollment,
} from '~/apiServices/leagueService';
import HttpStatus from '~/constants/httpStatusCode';

const RegistrationList = ({ leagueID }) => {
  const [registrationTeamData, setRegistrationTeamData] = useState([]);
  const location = useLocation();
  const source = location.state && location.state.source;

  const fetchRegistrationTeamData = async () => {
    try {
      const response = await getRegisteredTeamByID(leagueID);
      if (response.status === HttpStatus.OK) {
        const tempData = response.data.content;
        console.log(tempData);
        setRegistrationTeamData(tempData);
      } else {
        console.log('Unexpected server error!');
      }
    } catch (error) {
      console.error('Error fetching data: ', error);
    }
  };

  useEffect(() => {
    fetchRegistrationTeamData();
  }, []);

  // const handleAcceptReject = (id, status) => {
  //   // Update the status of the clicked row based on the button clicked
  //   const updatedData = registrationTeamData.map((team) =>
  //     team.id === id ? { ...team, status } : team,
  //   );
  //   setRegistrationTeamData(updatedData);
  // };

  const handleAcceptReject = async (teamID, isAcceptAction) => {
    try {
      const response = await acceptRejectTeamEnrollment(
        leagueID,
        teamID,
        isAcceptAction,
      );

      if (response.status === HttpStatus.NO_CONTENT) {
        toast.success('Status changed successfully !!');
        fetchRegistrationTeamData();
      } else if (response.status === HttpStatus.NOT_FOUND) {
        console.log('Team or League not found!!');
      } else if (response.status === HttpStatus.FORBIDDEN) {
        toast.error(
          'The number of teams has reached the max number of teams or the number of team players is not valid !!',
        );
      } else {
        console.log('Unexpected error message');
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <table className={styles.table}>
        <thead>
          <tr className={styles.head}>
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
          {registrationTeamData.map((team, index) => (
            <tr key={team.id}>
              <td>{team.id}</td>
              <td>{team.name}</td>
              <td>{team.members.length}</td>
              <td>{team.phoneNo}</td>
              <td>{team.createdAt}</td>
              <td>{team.status}</td>
              {source === 'from myLeague' && (
                <td>
                  <button
                    className={styles.accept}
                    onClick={() => handleAcceptReject(team.id, true)}
                  >
                    Accept
                  </button>
                  <button
                    className={styles.reject}
                    onClick={() => handleAcceptReject(team.id, false)}
                  >
                    Refused
                  </button>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>

      <ToastContainer />
    </div>
  );
};

export default RegistrationList;
