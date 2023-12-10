import { useState, useCallback } from 'react';

import styles from '../styles/homePage.module.css';
import Header from '~/components/header';
import Footer from '~/components/footer';
import Button from '~/components/button';

import background1 from '../images/homeBackground-1.png';
import background2 from '../images/homeBackground-2.png';
import background3 from '../images/homeBackground-3.png';
import background4 from '../images/homeBackground-4.png';
import logoGK from '../images/homeLogo-1.png';

const HOME = () => {
  const [isSubItemsLeaguesOpen, setSubItemsLeaguesOpen] = useState(false);
  const [isSubItemsTeamsOpen, setSubItemsTeamsOpen] = useState(false);
  const [isSubItemsLanguagesOpen, setSubItemsLanguagesOpen] = useState(false);

  const onLOGINTextClick = useCallback(async () => {
    // Please sync "LOGIN" to the project
  }, []);

  const onSIGNUPTextClick = useCallback(() => {
    // Please sync "SIGN UP" to the project
  }, []);

  return (
    <>
      <Footer />
      <div className={styles.home}>
        <div className={styles.travisJonesBjpWwrmf1iUnsplParent}>
          <img
            className={styles.travisJonesBjpWwrmf1iUnsplIcon}
            alt=""
            src={background1}
          />
          <div className={styles.groupChild} />
          <img className={styles.goalie011Icon} alt="" src={logoGK} />
        </div>

        <div className={styles.manageLeaguesMoreEasierWitParent}>
          <div className={styles.manageLeaguesMoreContainer}>
            <p className={styles.manageLeagues}>Manage leagues</p>
            <p className={styles.manageLeagues}>
              easier with{' '}
              <span style={{ color: '#ffdc11', fontWeight: 'bold' }}>CLM</span>
            </p>
          </div>
        </div>

        <div className={styles.buttonleague}>
          <Button text="Create League" />
        </div>
        <div className={styles.buttonleague1}>
          <Button text="Search Leagues" />
        </div>
        <div className={styles.buttonteam}>
          <Button text="Create Team" />
        </div>
        <div className={styles.buttonteam1}>
          <Button text="Create Teams" />
        </div>

        <div className={styles.countings}>
          <div className={styles.group}>
            <div className={styles.div2}>59.222</div>
            <div className={styles.leaguesWrapper}>
              <div className={styles.leagues}>Leagues</div>
            </div>
          </div>
        </div>
        <div className={styles.homeInner}>
          <div className={styles.group}>
            <div className={styles.div2}>1.812</div>
            <div className={styles.leaguesWrapper}>
              <div className={styles.leagues}>Teams</div>
            </div>
          </div>
        </div>
        <div className={styles.countings1}>
          <div className={styles.group}>
            <div className={styles.div2}>76.236</div>
            <div className={styles.leaguesWrapper}>
              <div className={styles.leagues}>Players</div>
            </div>
          </div>
        </div>
        <div className={styles.homeChild}>
          <div className={styles.group}>
            <div className={styles.div2}>1.312.003</div>
            <div className={styles.leaguesWrapper}>
              <div className={styles.leagues}>Matches</div>
            </div>
          </div>
        </div>
        <img
          className={styles.footballInBloomingtonIndiaIcon}
          alt="HomeBackground2"
          src={background2}
        />
        <div className={styles.homeItem} />
        <div className={styles.createYourOwn}>
          Create your own leagues with some basic information.
        </div>
        <div className={styles.customizeYourLeagues}>
          Customize your leagues with a diversity of available options.
        </div>
        <div className={styles.beMasterWith}>
          Be master with our professional management system.
        </div>
        <div className={styles.operateLeaguesWithParent}>
          <div
            className={styles.operateLeaguesWith}
          >{`Operate leagues with `}</div>
          <b className={styles.clm1}>CLM</b>
        </div>
        <div className={styles.groupDiv}>
          <b className={styles.b}>1</b>
          <div className={styles.createLeague2}>Create League</div>
        </div>
        <div className={styles.homeInner1}>
          <div className={styles.parent2}>
            <b className={styles.b}>2</b>
            <div className={styles.customizeLeague}>Customize League</div>
          </div>
        </div>
        <div className={styles.homeInner2}>
          <div className={styles.parent3}>
            <b className={styles.b}>3</b>
            <div className={styles.operateLeague}>Operate League</div>
          </div>
        </div>
        <div className={styles.buttonbig}>
          <button className={styles.registerNow}>REGISTER NOW</button>
        </div>
        <img
          className={styles.dominikHofbauer1ylt0422fyqUIcon}
          alt=""
          src={background3}
        />
        <div className={styles.rectangleDiv} />
        <div className={styles.supportsVariousCompetitionFParent}>
          <div className={styles.supportsVariousCompetitionContainer}>
            <p className={styles.manageLeagues}> supports various</p>
            <p className={styles.manageLeagues}>competition formats</p>
          </div>
          <b className={styles.clm2}>CLM</b>
        </div>
        <img
          className={styles.arrowUpCircle}
          alt=""
          src="/arrow--up-circle@2x.png"
        />
        <img
          className={styles.fauzanSaariCjyqbskdsiiUnsplIcon}
          alt=""
          src={background4}
        />
        <div className={styles.homeChild1} />
        <div className={styles.sValuesParent}>
          <div className={styles.supportsVariousCompetitionContainer}>
            {' '}
            ’s values
          </div>
          <b className={styles.clm2}>CLM</b>
        </div>
        <div className={styles.groupContainer}>
          <div className={styles.knockOutWrapper}>
            <div className={styles.knockOut}>Knock Out</div>
          </div>
          <img
            className={styles.imageRemovebgPreview1Icon}
            alt=""
            src="/imageremovebgpreview-1@2x.png"
          />
          <div className={styles.roundRobinParent}>
            <div className={styles.roundRobin}>Round Robin</div>
            <img
              className={styles.imageRemovebgPreview11}
              alt=""
              src="/imageremovebgpreview-1-1@2x.png"
            />
          </div>
          <div className={styles.roundRobinKnockOutParent}>
            <div className={styles.roundRobinContainer}>
              <p className={styles.manageLeagues}>{`Round Robin - `}</p>
              <p className={styles.manageLeagues}>Knock Out</p>
            </div>
            <img
              className={styles.imageRemovebgPreview31}
              alt=""
              src="/imageremovebgpreview-3-1@2x.png"
            />
          </div>
        </div>
        <div className={styles.groupParent1}>
          <div className={styles.timeSavingParent}>
            <div className={styles.knockOut}>Time Saving</div>
            <div className={styles.saveTheTime}>
              Save the time spent on phone calls, emails, meetings, scheduling,
              updating results, rankings... compared to the traditional way.
            </div>
          </div>
          <div className={styles.paperResourceSavingParent}>
            <div className={styles.paperResourceSaving}>
              Paper Resource Saving
            </div>
            <div className={styles.saveTheTime}>
              <p
                className={styles.manageLeagues}
              >{`Organize a completely paperless tournament, `}</p>
              <p
                className={styles.manageLeagues}
              >{`do not waste paper resources, `}</p>
              <p className={styles.manageLeagues}>
                and join hands to protect the environment.
              </p>
            </div>
          </div>
          <div className={styles.storageCapacityParent}>
            <div className={styles.knockOut}>Storage Capacity</div>
            <div className={styles.saveTheTime}>
              All tournament information will be saved for souvenirs, lookup, or
              reuse for the next tournament. Easy to interact, comment, and
              share tournament data.
            </div>
          </div>
          <div className={styles.convenienceParent}>
            <div className={styles.convenience}>Convenience</div>
            <div className={styles.informationIsAlways}>
              Information is always available for access anytime, anywhere via
              computer, smartphone, and tablet. Reporting and statistics are
              fully automated.
            </div>
          </div>
        </div>
        <div className={styles.buttonleague2}>
          <Button text="View more ➔"></Button>
        </div>
        <div className={styles.component2}>
          <b className={styles.registerNow}>JOIN US NOW</b>
        </div>
      </div>

      <Header />
    </>
  );
};

export default HOME;
