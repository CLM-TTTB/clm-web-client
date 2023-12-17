import React from 'react';
import styles from '~/styles/table.moudule.css'; // Import your CSS file or define styles inline

const DataTable = ({ data }) => {
  const renderTableHeader = () => {
    if (!data || data.length === 0) return null;

    const header = Object.keys(data[0]);

    return (
      <thead>
        <tr>
          {header.map((key) => (
            <th key={key}>{key}</th>
          ))}
        </tr>
      </thead>
    );
  };

  const renderTableData = () => {
    if (!data || data.length === 0) return null;

    return (
      <tbody>
        {data.map((row, index) => (
          <tr key={index}>
            {Object.values(row).map((value, index) => (
              <td key={index}>{value}</td>
            ))}
          </tr>
        ))}
      </tbody>
    );
  };

  return (
    <table className={styles.dataTable}>
      {renderTableHeader()} {renderTableData()}
    </table>
  );
};

export default DataTable;
