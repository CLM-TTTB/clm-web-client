import React from 'react';
import members from '~/components/leagueInfoTabs/opening/enroll/(test) sampleMembers';
import styles from '~/styles/teamInfo.module.css';

const Members = () => {
  return (
    <div className={styles.table}>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Jersey Number</th>
            <th>Note</th>
          </tr>
        </thead>
        <tbody>
          {members.map((member) => (
            <tr key={member.ID}>
              <td>{member.ID}</td>
              <td>{member.Name}</td>
              <td>{member.DOB}</td>
              <td>{member.Phone}</td>
              <td>{member['Jersey Number']}</td>
              <td>{member.Note}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Members;
