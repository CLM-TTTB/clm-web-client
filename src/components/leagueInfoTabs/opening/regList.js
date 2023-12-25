import React, { useState, useEffect } from 'react';
import DataTable from '~/components/leagueInfoTabs/table';
import { getRegisteredTeamByID } from '~/apiServices/leagueService';

import styles from './regList.module.css';
import HttpStatus from '~/constants/httpStatusCode';

const RegistrationList = ({ leagueID }) => {
  const [registrationTeamData, setRegistrationTeamData] = useState([]);

  useEffect(() => {
    const fetchRegistrationTeamData = async () => {
      try {
        const response = await getRegisteredTeamByID(leagueID);

        if (response.status === HttpStatus.OK) {
          const tempData = response.data.content;
          console.log(tempData);
          tempData.forEach((item) => {
            const tempDisplayFormat = {
              ID: item?.id,
              TeamName: item?.name,
              NumOfPlayers: item?.members,
              PhoneContact: item?.phoneNo,
              CreatedDate: item?.createdAt,
              Status: item?.status,
            };
            console.log(tempDisplayFormat);
            setRegistrationTeamData((prevState) => [
              ...prevState,
              tempDisplayFormat,
            ]);
          });
          console.log(registrationTeamData);
        } else {
          console.log('Unexpected server error!');
        }
      } catch (error) {
        console.error('Error fetching data: ', error);
      }
    };

    fetchRegistrationTeamData();
  }, []);

  return (
    <div className={styles.parrentContainer}>
      <div className={styles.table}>
        <DataTable data={registrationTeamData} />
      </div>
    </div>
  );
};

export default RegistrationList;
