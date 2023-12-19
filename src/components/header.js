// Header.js

import React, { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../styles/header.module.css';
import logo from '../images/logo.png';
import logo1 from '../images/headerLogo-1.png';

import localStorage from '~/utils/localStorage';
import sessionStorage from '~/utils/sessionStorage';
import StorageKey from '../constants/storageKeys';
import useAuth from '~/hooks/useAuth';

const Header = () => {
  const { userInfos } = useAuth();

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

  const onLOGINTextClick = useCallback(() => {
    navigate('/login');
  }, []);

  const onSIGNUPTextClick = useCallback(() => {
    navigate('/signUp');
  }, []);

  const openSubItemsLanguages = useCallback(() => {
    setSubItemsLanguagesOpen(!isSubItemsLanguagesOpen);
  }, [isSubItemsLanguagesOpen]);

  const openSubItemsProfile = () => {};

  return (
    <div className={styles.headerBgParent}>
      <div className={styles.headerBg} />

      <div className={styles.navigation}>
        <div className={styles.navigationRow}>
          <div className={styles.clmLogo2041Parent}>
            <img className={styles.clmLogo20411} alt="" src={logo} />
            <b className={styles.championLeagueManagementContainer}>
              <p className={styles.manageLeagues}>{`Champion `}</p>
              <p className={styles.manageLeagues}>League</p>
              <p className={styles.manageLeagues}>Management</p>
            </b>
          </div>

          <div className={styles.navContainer}>
            <div onClick={() => navigate('/')} className={styles.navItem}>
              HOME
            </div>
            <div className={styles.navItem}>
              <div onClick={openSubItemsLeagues}>LEAGUES ⮟</div>
              {isSubItemsLeaguesOpen && (
                <div className={styles.subList}>
                  <div onClick={() => navigate('/createLeague')}>
                    Create League
                  </div>
                  <div onClick={() => navigate('/searchLeague')}>
                    Search Leagues
                  </div>
                </div>
              )}
            </div>

            <div onClick={() => navigate('/test')} className={styles.navItem}>
              GUIDE
            </div>
            <div onClick={() => navigate('/test')} className={styles.navItem}>
              ABOUT US
            </div>

            <div className={styles.devider}>
              <div>|</div>
            </div>

            <div className={styles.loginParent}>
              {userInfos ? (
                <div
                  className={styles.userProfile}
                  onClick={openSubItemsProfile}
                >
                  <div className={styles.profilePic} />
                  <div>{userInfos?.name}</div>
                </div>
              ) : (
                <div class={styles.auth}>
                  <div className={styles.login} onClick={onLOGINTextClick}>
                    LOGIN
                  </div>
                  <div className={styles.signup} onClick={onSIGNUPTextClick}>
                    SIGN UP
                  </div>
                </div>
              )}
              <img
                className={styles.earthIcon}
                alt=""
                src={logo1}
                onClick={openSubItemsLanguages}
              />
              {isSubItemsLanguagesOpen && (
                <div className={styles.subList2}>
                  <div>Language 1</div>
                  <div>Language 2</div>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className={styles.line}></div>
      </div>
    </div>
  );
};

export default Header;
