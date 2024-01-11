// AddMembers.jsx
import React, { useState, useEffect } from 'react';
import styles from '~/components/leagueInfoTabs/opening/enroll/addMembers.module.css';
import Button from '~/components/button';

import { toast } from 'react-toastify';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import {
  getTeamInfosByTeamID,
  editTeamPlayersInfos,
} from '~/apiServices/teamService';
import HttpStatus from '~/constants/httpStatusCode';

const AddMembersInTemplate = ({ teamID }) => {
  const [data, setData] = useState([]);
  const [selectedRowIndex, setSelectedRowIndex] = useState(null);

  useEffect(() => {
    const fetchTeamInfos = async () => {
      try {
        const response = await getTeamInfosByTeamID(teamID);

        if (response.status === HttpStatus.OK) {
          setData(response.data.members);
        } else {
          console.log('Unexpected server error!!');
        }
      } catch (err) {
        console.log(err);
      }
    };

    fetchTeamInfos();
  }, []);

  const handleRowClick = (index) => {
    setSelectedRowIndex(index);
  };

  const handleInputChange = (e, fieldName) => {
    const updatedData = [...data];
    updatedData[selectedRowIndex][fieldName] = e.target.value;
    setData(updatedData);
  };

  const handleAddRow = () => {
    // const newId = data.length + 1;
    setData((prevData) => [
      ...prevData,
      {
        // ID: newId,
        name: '',
        age: '',
        // Phone: '',
        shirtNumber: '',
        description: '',
      },
    ]);
    setSelectedRowIndex(data.length);
  };

  const handleRemoveRow = () => {
    if (data.length === 0) {
      toast.error('No row to remove');
      return;
    }
    const updatedData = [...data];
    updatedData.splice(selectedRowIndex, 1);
    setData(updatedData);
    setSelectedRowIndex(null);
  };

  return (
    <div className={styles.parent}>
      <h2 className={styles.title}>Add Members</h2>
      <table className={styles.table}>
        <thead>
          <tr className={styles.head}>
            <th>ID</th>
            <th>Name</th>
            <th>Age</th>
            {/* <th>Phone</th> */}
            <th>Jersey Number</th>
            <th>Note</th>
          </tr>
        </thead>
        <tbody className={styles.tbody}>
          {data.map((row, index) => (
            <tr
              className={styles.tr}
              key={index} //
              onClick={() => handleRowClick(index)}
            >
              <td>{index + 1}</td>
              <td>
                <input
                  className={styles.cell}
                  type="text"
                  value={
                    selectedRowIndex === index ? data[index].name : row.name
                  }
                  onChange={(e) => handleInputChange(e, 'name')}
                />
              </td>
              <td>
                <input
                  className={styles.cell}
                  type="text"
                  value={selectedRowIndex === index ? data[index].age : row.age}
                  onChange={(e) => handleInputChange(e, 'age')}
                />
              </td>
              {/* <td>
                <input
                  className={styles.cell}
                  type="text"
                  value={
                    selectedRowIndex === index ? data[index].Phone : row.Phone
                  }
                  onChange={(e) => handleInputChange(e, 'Phone')}
                />
              </td> */}
              <td>
                <input
                  className={styles.cell}
                  type="text"
                  value={
                    selectedRowIndex === index
                      ? data[index].shirtNumber
                      : row.shirtNumber
                  }
                  onChange={(e) => handleInputChange(e, 'shirtNumber')}
                />
              </td>
              <td>
                <input
                  className={styles.cell}
                  type="text"
                  value={
                    selectedRowIndex === index
                      ? data[index].description
                      : row.description
                  }
                  onChange={(e) => handleInputChange(e, 'description')}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className={styles.buttons}>
        <Button
          className={styles.addButton}
          onClick={handleAddRow}
          text="Add"
        ></Button>
        <Button
          className={styles.addButton}
          onClick={handleRemoveRow}
          text="Remove"
        ></Button>
      </div>
      <ToastContainer />
    </div>
  );
};

export default AddMembersInTemplate;
