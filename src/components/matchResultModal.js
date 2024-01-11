import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import styles from '../../src/styles/matchResultModal.module.css';
import cardStyle from '../../src/styles/leagueCard.module.css';

const MatchResultModal = ({
  teamName1,
  teamName2,
  score1,
  score2,
  property1,
  property2,
  onScoreChange,
}) => {
  const location = useLocation();
  const source = location.state && location.state.source;

  const [isEditMode, setIsEditMode] = useState(false);
  const [editedScore1, setEditedScore1] = useState(score1);
  const [editedScore2, setEditedScore2] = useState(score2);

  const handleEditClick = () => {
    setIsEditMode(!isEditMode);
  };

  const handleSaveClick = () => {
    onScoreChange(editedScore1, editedScore2);
    setIsEditMode(false);
  };

  return (
    <>
      <div className={styles.modalContainer}>
        <div className={styles.titleContainer}>
          <div></div>
          <h3 className={styles.title}>MATCH RESULT</h3>
          <div className={styles.buttonContainer}>
            {source === 'from myLeague' && (
              <div>
                {isEditMode ? (
                  <button className={styles.button} onClick={handleSaveClick}>
                    Save
                  </button>
                ) : (
                  <button className={styles.button} onClick={handleEditClick}>
                    Edit
                  </button>
                )}
              </div>
            )}
          </div>
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
              {isEditMode ? (
                <>
                  <input
                    className={styles.scoreEdit}
                    type="text"
                    value={editedScore1}
                    onChange={(e) => setEditedScore1(e.target.value)}
                  />
                  <h1 className={styles.devider}> - </h1>
                  <input
                    className={styles.scoreEdit}
                    type="text"
                    value={editedScore2}
                    onChange={(e) => setEditedScore2(e.target.value)}
                  />
                </>
              ) : (
                <>
                  <h1>{score1}</h1>
                  <h1 className={styles.devider}> - </h1>
                  <h1>{score2}</h1>
                </>
              )}
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
