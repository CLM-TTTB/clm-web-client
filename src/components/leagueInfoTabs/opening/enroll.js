import React, { useEffect, useState, useParams } from 'react';

import styles from './enroll.module.css';
import Button from '~/components/button';

const Enroll = () => {
  return (
    <div className={styles.parrentContainer}>
      <div className={styles.dueDate}>Due date 06/01/2023</div>

      <div>Number of members: 5 - 22</div>
      <div>12d : 12h : 12m : 12s</div>
      <Button text="Enroll"></Button>
    </div>
  );
};

export default Enroll;
