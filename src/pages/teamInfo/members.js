import React from 'react';
import members from '~/components/leagueInfoTabs/opening/enroll/(test) sampleMembers';
import styles from '~/styles/teamInfo.module.css';

const Members = ({ teamMemberInfos }) => {
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
          {teamMemberInfos.map((member, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{member.name}</td>
              <td>{member.shirtNumber}</td>
              <td>{member.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Members;
