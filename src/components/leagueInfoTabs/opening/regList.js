import React, { useState, useEffect } from 'react';
import styles from './regList.module.css';

const RegistrationList = () => {
  const [jsonData, setJsonData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/mockData/teams.json');
        const data = await response.json();
        const teamsWithStatus = data.map((team) => ({
          ...team,
          status: 'Pending',
        }));
        setJsonData(teamsWithStatus);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleAcceptReject = (id, status) => {
    // Update the status of the clicked row based on the button clicked
    const updatedData = jsonData.map((team) =>
      team.id === id ? { ...team, status } : team,
    );
    setJsonData(updatedData);
  };

  return (
    <div>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Team Name</th>
            <th>Members</th>
            <th>Contact Person</th>
            <th>Phone</th>
            <th>Date</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody className={styles.tbody}>
          {jsonData.map((team) => (
            <tr key={team.id}>
              <td>{team.id}</td>
              <td>{team.teamName}</td>
              <td>{team.member}</td>
              <td>{team.contactPerson}</td>
              <td>{team.phone}</td>
              <td>{team.date}</td>
              <td>{team.status}</td>
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
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RegistrationList;
