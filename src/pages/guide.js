import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import styles from '../styles/guide.module.css';
import Layout from '~/components/layout';
import { SU1 } from '../../src/images/guidePage';
import { SU2 } from '../../src/images/guidePage';
import { SU3 } from '../../src/images/guidePage';

const Guide = () => {
  return (
    <Layout>
      <hr class="horizontal-line" />
      <h1 className={styles.title}>Guide</h1>

      <div className={styles.section}>
        <text>1. Sign Up</text>
      </div>

      <div className={styles.contentContainer}>
        <text>Step 1: Click on “Sign Up” button on the navigation bar</text>
      </div>

      <div className={styles.imgContainer}>
        <img src={SU1} className={styles.img} />
      </div>

      <div className={styles.contentContainer}>
        <text>
          Step 2: Fill out all the fields display on the screen (“Email
          Address”, “Password” and “Re-enter Password”)
        </text>
      </div>

      <div className={styles.imgContainer}>
        <img src={SU2} className={styles.img} />
      </div>

      <div className={styles.contentContainer}>
        <text>Step 3: Click on “Sign Up” button at below of the form</text>
      </div>

      <div className={styles.imgContainer}>
        <img src={SU3} />
      </div>

      <div className={styles.contentContainer}>
        <text>
          Step 4: You may be navigated to a Authenticate page, which makes you
          enter the code sent through email. Therefore, just take a look in you
          email message and type the code into the page.
        </text>
      </div>

      <div className={styles.contentContainer}>
        <text>
          Step 5: You just need to wait for a second, if nothing wrong, you will
          be notified as successfully signed up.
        </text>
      </div>
    </Layout>
  );
};

export default Guide;
