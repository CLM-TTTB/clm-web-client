import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import styles from '../styles/guide.module.css';
import Layout from '~/components/layout';
import { CL1, CL2, SL2, SU1 } from '../../src/images/guidePage';
import { SU2 } from '../../src/images/guidePage';
import { SU3 } from '../../src/images/guidePage';
import { LI11 } from '../../src/images/guidePage';
import { LI12 } from '../../src/images/guidePage';
import { LI2 } from '../../src/images/guidePage';

const Guide = () => {
  return (
    <Layout>
      <hr class="horizontal-line" />
      <h1 className={styles.title}>Guide</h1>

      {/* Section 1 */}
      <div className={styles.section}>
        <text>1. Sign Up</text>
      </div>

      <div className={styles.contentContainer}>
        <text className={styles.step}> Step 1: </text>
        <text>Click on “Sign Up” button on the navigation bar</text>
      </div>

      <div className={styles.imgContainer}>
        <img src={SU1} className={styles.img} />
      </div>

      <div className={styles.contentContainer}>
        <text className={styles.step}> Step 2: </text>
        <text>
          Fill out all the fields display on the screen (“Email Address”,
          “Password” and “Re-enter Password”)
        </text>
      </div>

      <div className={styles.imgContainer}>
        <img src={SU2} className={styles.img} />
      </div>

      <div className={styles.contentContainer}>
        <text className={styles.step}> Step 3: </text>
        <text> Click on “Sign Up” button at below of the form</text>
      </div>

      <div className={styles.imgContainer}>
        <img src={SU3} />
      </div>

      <div className={styles.contentContainer}>
        <text className={styles.step}> Step 4: </text>
        <text>
          {' '}
          You may be navigated to a Authenticate page, which makes you enter the
          code sent through email.
        </text>
      </div>

      <div className={styles.contentContainer}>
        <text className={styles.step}> Step 5: </text>
        <text>
          {' '}
          Just take a look in you email message and type the code into the page.
        </text>
      </div>

      <div className={styles.contentContainer}>
        <text className={styles.step}> Step 6: </text>
        <text>
          You just need to wait for a second, if nothing wrong, you will be
          notified as successfully signed up.
        </text>
      </div>

      {/* Section 2 */}
      <div className={styles.section}>
        <text>2. Log in</text>
      </div>

      <div className={styles.contentContainer}>
        <text className={styles.step}> Step 1: </text>
        <text>
          Click on “Login” button on the navigation bar or the yellow underline
          text “Login” in the “Sign Up” form.
        </text>
      </div>

      <div className={styles.imgContainer}>
        <img src={LI11} className={styles.img} />
      </div>

      <div className={styles.imgContainer}>
        <img src={LI12} className={styles.img2} />
      </div>

      <div className={styles.contentContainer}>
        <text className={styles.step}> Step 2: </text>
        <text>
          “Login” form will display, please fill out all the fields and click
          “Login” button, you'll be logged into the system.
        </text>
      </div>

      <div className={styles.imgContainer}>
        <img src={LI2} className={styles.img2} />
      </div>

      {/* Section 3 */}
      <div className={styles.section}>
        <text>3. Create League</text>
      </div>

      <div className={styles.contentContainer}>
        <text className={styles.step}> Step 1: </text>
        <text>Click on “League” -> “Create League”.</text>
      </div>

      <div className={styles.imgContainer}>
        <img src={CL1} className={styles.img2} />
      </div>

      <div className={styles.contentContainer}>
        <text className={styles.step}> Step 2: </text>
        <text>
          You would be directed to “Create League” form. Please fill out the
          fields so that you could be succeeded.
        </text>
      </div>

      <div className={styles.imgContainer}>
        <img src={CL2} className={styles.img2} />
      </div>

      {/* Section 4 */}
      <div className={styles.section}>
        <text>4. Search League</text>
      </div>

      <div className={styles.contentContainer}>
        <text className={styles.step}> Step 1: </text>
        <text>Click on “League” -> “Search League”.</text>
      </div>

      <div className={styles.contentContainer}>
        <text className={styles.step}> Step 2: </text>
        <text>
          The search bar allows you to search leagues by Name or Location.
        </text>
      </div>

      <div className={styles.contentContainer2}>
        <text>
          Moreover, you can filter by Competition Format or/and Status, and can
          sort them by some listed criterias.
        </text>
      </div>

      <div className={styles.imgContainer}>
        <img src={SL2} className={styles.img} />
      </div>

      {/* Section 5 */}
      <div className={styles.section}>
        <text>5. Competition Format</text>
      </div>

      <div className={styles.contentContainer3}>
        <text className={styles.step}> Knock-out: </text>
        <p>
          In a knockout competition format, participants compete in a series of
          rounds, and each round eliminates a certain number of contestants. The
          winners of each round proceed to the next stage, while the losers are
          eliminated from the competition. This process continues until there is
          only one participant or team remaining, who is then declared the
          overall winner.{' '}
        </p>
      </div>

      <div className={styles.contentContainer3}>
        <text className={styles.step}> Round Robin: </text>
        <p>
          The round-robin format involves each participant playing against every
          other participant in the competition. This ensures that each
          contestant has an equal opportunity to compete against all others.
          Points or rankings are typically awarded based on the outcomes of
          these individual matchups.{' '}
        </p>
      </div>

      <div className={styles.contentContainer3}>
        <text className={styles.step}> Knockout with Round Robin: </text>
        <p>
          The knockout with round-robin format combines elements of both
          knockout and round-robin structures. Participants initially compete in
          a round-robin phase, playing against every other participant in their
          group. Following the round-robin stage, the top performers or specific
          qualifiers from each group advance to a knockout phase. The knockout
          phase then proceeds in a manner similar to a standard knockout
          tournament, ultimately culminating in the crowning of a winner. This
          format combines the fairness of round-robin play with the excitement
          of knockout-style elimination.{' '}
        </p>
      </div>
    </Layout>
  );
};

export default Guide;
