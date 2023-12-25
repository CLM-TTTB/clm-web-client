import styles from '~/styles/teamCard.module.css';
import people from '~/images/leagueCard/people.png';

const TeamCard = ({
  profileSrc,
  teamName,
  win,
  draw,
  lost,
  onDetailClick,
  numOfPlayers,
}) => {
  return (
    <div className={styles.leagueCardParent}>
      <div className={styles.profilePicParent}>
        <img
          className={styles.profilePic}
          alt="League Profile"
          src={profileSrc}
        />
        <div className={styles.leagueName}>{teamName}</div>
      </div>
      <div className={styles.frameParent}>
        <div className={styles.iconCalendarParent}>
          {/* <div
            className={styles.text}
          >{`${win} Wins - ${draw} Draws -  ${lost} Losses`}</div> */}
        </div>
      </div>

      <div className={styles.frameGroup}>
        <div
          className={`${styles.container1} ${styles.roundedCorners1} ${styles.topLeftBottomRight1}`}
        >
          <img className={styles.iconTeams} alt="" src={people} />
          <div className={styles.teamNumber}>{numOfPlayers} players</div>
        </div>
        <div
          className={`${styles.container2} ${styles.roundedCorners2} ${styles.topLeftBottomRight2}`}
        >
          <div className={styles.detail} onClick={() => onDetailClick()}>
            Details ➜
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeamCard;
