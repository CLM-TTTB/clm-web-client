// AddMembers.jsx
import React, { useState, useEffect } from 'react';
import members from './(test) sampleMembers';
import styles from './addMembers.module.css';
import Button from '~/components/button';

import { toast } from 'react-toastify';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import {
  getTeamInfosByTeamID,
  editTeamPlayersInfos,
} from '~/apiServices/teamService';
import HttpStatus from '~/constants/httpStatusCode';

const AddMembers = ({ teamID }) => {
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
    const newId = data.length + 1;
    setData((prevData) => [
      ...prevData,
      {
        // ID: newId,
        name: '',
        age: '',
        // Phone: '',
        // 'Jersey Number': '',
        // Note: '',
      },
    ]);
    setSelectedRowIndex(data.length);
  };

  const handleSave = async () => {
    try {
      const response = await editTeamPlayersInfos(teamID, data);

      if (response.status === HttpStatus.OK) {
        toast.success('Players info update successfully!!');
      } else {
        toast.error('Unexpected server errors');
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className={styles.parent}>
      <h1 className={styles.title}>Add Members</h1>
      <table border="1">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Age</th>
            <th>Phone</th>
            <th>Jersey Number</th>
            <th>Note</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => (
            <tr
              className={styles.tr}
              key={row.ID}
              onClick={() => handleRowClick(index)}
            >
              <td>{row.ID}</td>
              <td>
                <input
                  className={styles.cell}
                  type="text"
                  value={
                    selectedRowIndex === index ? data[index].Name : row.Name
                  }
                  onChange={(e) => handleInputChange(e, 'Name')}
                />
              </td>
              <td>
                <input
                  className={styles.cell}
                  type="text"
                  value={selectedRowIndex === index ? data[index].Age : row.Age}
                  onChange={(e) => handleInputChange(e, 'Age')}
                />
              </td>
              <td>
                <input
                  className={styles.cell}
                  type="text"
                  value={
                    selectedRowIndex === index ? data[index].Phone : row.Phone
                  }
                  onChange={(e) => handleInputChange(e, 'Phone')}
                />
              </td>
              <td>
                <input
                  className={styles.cell}
                  type="text"
                  value={
                    selectedRowIndex === index
                      ? data[index]['Jersey Number']
                      : row['Jersey Number']
                  }
                  onChange={(e) => handleInputChange(e, 'Jersey Number')}
                />
              </td>
              <td>
                <input
                  className={styles.cell}
                  type="text"
                  value={
                    selectedRowIndex === index ? data[index].Note : row.Note
                  }
                  onChange={(e) => handleInputChange(e, 'Note')}
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
          onClick={handleSave}
          text="Save"
        ></Button>
      </div>
      <ToastContainer />
    </div>
  );
};

export default AddMembers;
