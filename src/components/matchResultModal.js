import React from 'react';
import styles from '../../src/styles/matchResultModal.module.css';
import cardStyle from '../../src/styles/leagueCard.module.css';

const MatchResultModal = ({
  teamName1,
  teamName2,
  score1,
  score2,
  property1,
  property2,
}) => {
  return (
    <>
      <div className={styles.modalContainer}>
        <div className={styles.titleContainer}>
          <h3>MATCH RESULT</h3>
        </div>

        <div className={styles.contentContainer}>
          <div className={styles.scoreContainer}>
            <div className={styles.team1}>
              <div className={cardStyle.profilePicParent}>
                <img
                  className={cardStyle.profilePic}
                  alt=""
                  src={cardStyle.profileSrc}
                />
                <div className={cardStyle.leagueName}>{teamName1}</div>
              </div>
            </div>

            <div className={styles.score}>
              <h1>{score1}</h1>
              <h1 className={styles.devider}> - </h1>
              <h1>{score2}</h1>
            </div>

            <div className={styles.team2}>
              <div className={cardStyle.profilePicParent}>
                <img
                  className={cardStyle.profilePic}
                  alt=""
                  src={cardStyle.profileSrc}
                />
                <div className={cardStyle.leagueName}>{teamName2}</div>
              </div>
            </div>
          </div>

          <div className={styles.propertyContainer}>
            <div className={styles.property}>
              <div className={styles.num1}>
                <h4> aaa </h4>
              </div>
              <div className={styles.num2}>
                <h4> {property1} </h4>
              </div>
              <div className={styles.num3}>
                <h4> aaa </h4>
              </div>
            </div>
          </div>

          <div className={styles.propertyContainer}>
            <div className={styles.property}>
              <div className={styles.num1}>
                <h4> aaa </h4>
              </div>
              <div className={styles.num2}>
                <h4> {property2} </h4>
              </div>
              <div className={styles.num3}>
                <h4> aaa </h4>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MatchResultModal;
