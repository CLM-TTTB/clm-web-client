import React, { useState, useEffect } from 'react';
import DataTable from '~/components/table';

import styles from './regList.module.css';

const RegistrationList = () => {
  const [jsonData, setJsonData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/mockData/teams.json');
        const data = await response.json();
        setJsonData(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className={styles.parrentContainer}>
      <div className={styles.table}>
        <DataTable data={jsonData} />
      </div>
    </div>
  );
};

export default RegistrationList;
