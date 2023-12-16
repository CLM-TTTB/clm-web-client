import React, { useState } from 'react';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import InputShort from '~/components/input-short';
import styles from '~/styles/datePicker.module.css';
import { grey } from '@mui/material/colors';

const DatePickerComponent = ({ label, value, onChange }) => {
  const accent = grey[50];
  return (
    <LocalizationProvider
      dateAdapter={AdapterDayjs}
      className={styles.inputContainer}
    >
      <DatePicker
        className={styles.datePicker}
        sx={{ color: accent }}
        label={label}
        value={value}
        onChange={onChange}
        renderInput={(params) => (
          <InputShort {...params} className={styles.datePicker} />
        )}
        format="DD/MM/YYYY"
      />
    </LocalizationProvider>
  );
};

// const DatePickerComponent = () => {
//     return (
//         <LocalizationProvider dateAdapter={AdapterDayjs}>
//             <DatePicker>
//                 <InputShort
//                     className={styles.datePicker}
//                     placeholder="Date"
//                 />
//             </DatePicker>
//         </LocalizationProvider>
//     )
//     };

export default DatePickerComponent;