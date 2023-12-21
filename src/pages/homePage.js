import React, { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

import styles from '../styles/homePage.module.css';
import Button from '~/components/button';

import background1 from '../images/homePage/homeBackground-1.png';
import background2 from '../images/homePage/homeBackground-2.png';
import background3 from '../images/homePage/homeBackground-3.png';
import icon1 from '../images/homePage/section3_icon1.png';
import icon2 from '../images/homePage/section3_icon2.png';
import icon3 from '../images/homePage/section3_icon3.png';
import background4 from '../images/homePage/homeBackground-4.png';
import logoGK from '../images/homePage/homeLogoGK.png';
import Layout from '~/components/layout';

const HOME = () => {
  const navigate = useNavigate();
  const [isSubItemsLeaguesOpen, setSubItemsLeaguesOpen] = useState(false);
  const [isSubItemsTeamsOpen, setSubItemsTeamsOpen] = useState(false);
  const [isSubItemsLanguagesOpen, setSubItemsLanguagesOpen] = useState(false);
  const [isLoggedIn, setLoggedIn] = useState(false);

  return (
    <Layout>
      <div
        className={`${styles.section} ${styles.background1}`}
        style={{ height: '640px', backgroundImage: `url(${background1})` }}
      >
        <div className={`${styles.overlay} ${styles.overlayColor}`}>
          <img className={styles.goalieIcon} alt="" src={logoGK} />

          <div className={styles.titleParent}>
            <div className={styles.titleContainer}>
              <p className={styles.title}>Manage leagues</p>
              <p className={styles.title}>
                easier with{' '}
                <span
                  style={{ color: '#ffdc11', fontWeight: 'bold', fontSize: 80 }}
                >
                  CLM
                </span>
              </p>
            </div>
          </div>

          <div className={styles.gridContainer}>
            <div className={styles.button1}>
              <Button
                text="Create League"
                onClick={() => {
                  navigate('/createLeague');
                }}
              />
            </div>
            <div className={styles.button2}>
              <Button
                text="Search League"
                onClick={() => {
                  navigate('/searchLeague');
                }}
              />
            </div>
          </div>

          <div className={styles.countingContainer}>
            <div className={styles.countingBox}>
              <div className={styles.countingLabel}>12345</div>
              <div className={styles.countingText}>Leagues</div>
            </div>
            <div className={styles.countingBox}>
              <div className={styles.countingLabel}>12345</div>
              <div className={styles.countingText}>Teams</div>
            </div>
            <div className={styles.countingBox}>
              <div className={styles.countingLabel}>12345</div>
              <div className={styles.countingText}>Players</div>
            </div>
            <div className={styles.countingBox}>
              <div className={styles.countingLabel}>12345</div>
              <div className={styles.countingText}>Matches</div>
            </div>
          </div>
        </div>
      </div>

      <div
        className={`${styles.section} ${styles.background2}`}
        style={{ height: '640px', backgroundImage: `url(${background2})` }}
      >
        <div className={`${styles.overlay} ${styles.overlayColor}`}>
          <div className={styles.screen2Layout}>
            <div className={styles.titleParent2}>
              <div className={styles.title}>
                Operate leagues with{' '}
                <span
                  style={{ color: '#ffdc11', fontWeight: 'bold', fontSize: 80 }}
                >
                  CLM
                </span>
              </div>
            </div>

            <div className={styles.operateContainer}>
              <div className={styles.operateItem}>
                <div className={styles.operateNumber}>1</div>
                <div className={styles.operateTextContainer}>
                  <div className={styles.operateLabel}>Create League</div>
                  <div className={styles.operateText}>
                    Create your own leagues with some basic information.
                  </div>
                </div>
              </div>

              <div className={styles.operateItem}>
                <div className={styles.operateNumber}>2</div>
                <div className={styles.operateTextContainer}>
                  <div className={styles.operateLabel}>Customize League</div>
                  <div className={styles.operateText}>
                    Customize your leagues with a diversity of available
                    options.
                  </div>
                </div>
              </div>

              <div className={styles.operateItem}>
                <div className={styles.operateNumber}>3</div>
                <div className={styles.operateTextContainer}>
                  <div className={styles.operateLabel}>Operate League</div>
                  <div className={styles.operateText}>
                    Be master with our professional management system.
                  </div>
                </div>
              </div>
            </div>

            {isLoggedIn ? null : (
              <div className={styles.bigButton1}>
                <Button
                  text="REGISTER NOW"
                  onClick={() => navigate('/signUp')}
                />
              </div>
            )}
          </div>
        </div>
      </div>

      <div
        className={`${styles.section} ${styles.background3}`}
        style={{ height: '640px', backgroundImage: `url(${background3})` }}
      >
        <div className={`${styles.overlay} ${styles.overlayColor}`}>
          <div className={styles.screen2Layout}>
            <div className={styles.titleParent2}>
              <div className={styles.title}>
                <span
                  style={{ color: '#ffdc11', fontWeight: 'bold', fontSize: 70 }}
                >
                  CLM
                </span>{' '}
                supports various competition formats
              </div>
            </div>

            <div className={styles.operateContainer2}>
              <div operateItem2>
                <img src={icon1} />
                <div className={styles.operateLabel2}>Knock Out</div>
              </div>

              <div operateItem2>
                <img src={icon2} />
                <div className={styles.operateLabel2}>Round Robin</div>
              </div>

              <div operateItem2>
                <img src={icon3} />
                <div className={styles.operateLabel2}>
                  Round Robin - Knock Out
                </div>
              </div>
            </div>

            <div className={styles.bigButton2}>
              <Button
                text="View more ➔"
                onClick={() => {
                  navigate('/test');
                }}
              />
            </div>
          </div>
        </div>
      </div>

      <div
        className={`${styles.section} ${styles.background4}`}
        style={{ height: '700px', backgroundImage: `url(${background4})` }}
      >
        <div className={`${styles.overlay} ${styles.overlayColor}`}>
          <div className={styles.screen2Layout}>
            <div className={styles.titleParent2}>
              <div className={styles.title}>
                <span
                  style={{ color: '#ffdc11', fontWeight: 'bold', fontSize: 70 }}
                >
                  CLM
                </span>{' '}
                's values
              </div>
            </div>

            <div className={styles.operateContainer3}>
              <div>
                <div className={styles.operateItem2}>
                  <div className={styles.operateLabel3}>Time Saving</div>
                  <div>
                    Save the time spent on phone calls, emails, meetings,
                    scheduling, updating results, rankings... compared to the
                    traditional way.
                  </div>
                </div>

                <div className={styles.operateItem2}>
                  <div className={styles.operateLabel3}>Storage Capacity</div>
                  <div>
                    All tournament information will be saved for souvenirs,
                    lookup, or reuse for the next tournament. Easy to interact,
                    comment, and share tournament data.
                  </div>
                </div>
              </div>

              <div className={styles.textRight}>
                <div className={styles.operateItem2}>
                  <div className={styles.operateLabel3}>
                    Paper Resource Saving
                  </div>
                  <div>
                    Organize a completely paperless tournament, do not waste
                    paper resources, and join hands to protect the environment.
                  </div>
                </div>

                <div className={styles.operateItem2}>
                  <div className={styles.operateLabel3}>Convenience</div>
                  <div>
                    Information is always available for access anytime, anywhere
                    via computer, smartphone, and tablet. Reporting and
                    statistics are fully automated.
                  </div>
                </div>
              </div>
            </div>

            {isLoggedIn ? null : (
              <div className={styles.bigButton3}>
                <Button text="JOIN US NOW" onClick={() => navigate('/login')} />
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default HOME;
