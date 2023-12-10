import React, { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../styles/homePage.module.css';
import logo from '../images/logo.png';
import logo1 from '../images/headerLogo-1.png';
import { login } from '~/apiServices/authService';

const Header = () => {
  const [isSubItemsLeaguesOpen, setSubItemsLeaguesOpen] = useState(false);
  const [isSubItemsTeamsOpen, setSubItemsTeamsOpen] = useState(false);
  const [isSubItemsLanguagesOpen, setSubItemsLanguagesOpen] = useState(false);

  const navigate = useNavigate();

  const openSubItemsLeagues = useCallback(() => {
    setSubItemsLeaguesOpen(!isSubItemsLeaguesOpen);
    setSubItemsTeamsOpen(false);
  }, [isSubItemsLeaguesOpen]);

  const openSubItemsTeams = useCallback(() => {
    setSubItemsTeamsOpen(!isSubItemsTeamsOpen);
    setSubItemsLeaguesOpen(false);
  }, [isSubItemsTeamsOpen]);

  const onLOGINTextClick = useCallback(async () => {
    const data = await login({
      email: 'admin@gmail.com',
      password: 'Admin123',
    });
    // Please sync "LOGIN" to the project
  }, []);

  const onSIGNUPTextClick = useCallback(() => {
    // Please sync "SIGN UP" to the project
  }, []);

  const openSubItemsLanguages = useCallback(() => {
    setSubItemsLanguagesOpen(!isSubItemsLanguagesOpen);
  }, [isSubItemsLanguagesOpen]);

  return (
    <div className={styles.headerContainer}>
      <div className={styles.headerBgParent}>
        <div className={styles.headerBg} />
        <div className={styles.clmLogo2041Parent}>
          <img className={styles.clmLogo20411} alt="" src={logo} />
          <b className={styles.championLeagueManagementContainer}>
            <p className={styles.manageLeagues}>{`Champion `}</p>
            <p className={styles.manageLeagues}>League</p>
            <p className={styles.manageLeagues}>Management</p>
          </b>
          <div className={styles.navigation}>
            <div className={styles.homeParent}>
              <div className={styles.home1} onClick={() => navigate('/')}>
                HOME
              </div>
              <div className={styles.frameWrapper}>
                <div className={styles.leaguesParent}>
                  <div onClick={openSubItemsLeagues}>LEAGUES ⮟</div>
                  {isSubItemsLeaguesOpen && (
                    <div className={styles.subList}>
                      <div onClick={() => navigate('/test')}>Create League</div>
                      <div onClick={() => navigate('/test')}>
                        Search Leagues
                      </div>
                    </div>
                  )}
                </div>
              </div>
              <div className={styles.frameContainer}>
                <div className={styles.teamsParent}>
                  <div className={styles.teams} onClick={openSubItemsTeams}>
                    TEAMS ⮟
                  </div>
                  {isSubItemsTeamsOpen && (
                    <div className={styles.subList}>
                      <div onClick={() => navigate('/test')}>Create Team</div>
                      <div onClick={() => navigate('/test')}>Search Teams</div>
                    </div>
                  )}
                </div>
              </div>
              <div className={styles.guide} onClick={() => navigate('/test')}>
                GUIDE
              </div>
              <div className={styles.aboutUs} onClick={() => navigate('/test')}>
                ABOUT US
              </div>
            </div>
            <div className={styles.navigationChild} />
            <div className={styles.loginParent}>
              <div className={styles.login} onClick={onLOGINTextClick}>
                LOGIN
              </div>
              <div className={styles.login} onClick={onSIGNUPTextClick}>
                SIGN UP
              </div>
              <img
                className={styles.earthIcon}
                alt=""
                src={logo1}
                onClick={openSubItemsLanguages}
              />
              {isSubItemsLanguagesOpen && (
                <div className={styles.subList}>
                  <div>Language 1</div>
                  <div>Language 2</div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
