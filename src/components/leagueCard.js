import styles from '~/styles/leagueCard.module.css';
import pin from '~/images/leagueCard/pin.png';
import people from '~/images/leagueCard/people.png';
import format from '~/images/leagueCard/format.png';
import { useNavigate } from 'react-router-dom';

const LeagueCard = ({
  profileSrc,
  leagueName,
  competitionFormat,
  location,
  status,
  league,
  onDetailClick,
  numOfTeams,
}) => {
  const navigate = useNavigate();

  const getStatusStyle = () => {
    const lowercasedStatus = status && status.toLowerCase();
    console.log('lowercasedStatus:', lowercasedStatus);
    return lowercasedStatus === 'false'
      ? styles.closedStatus
      : styles.openingStatus;
  };

  const getStatusText = () => {
    const lowercasedStatus = status && status.toLowerCase();
    console.log('lowercasedStatus:', lowercasedStatus);
    return lowercasedStatus === 'false' ? 'Closed' : 'Opening';
  };

  return (
    <div className={styles.leagueCardParent}>
      <div className={styles.profilePicParent}>
        <img
          className={styles.profilePic}
          alt="League Profile"
          src={profileSrc}
        />
        <div className={styles.leagueName}>{leagueName}</div>
      </div>
      <div className={styles.frameParent}>
        <div className={styles.iconCalendarParent}>
          <img className={styles.iconCalendar} alt="" src={format} />
          <div className={styles.text}>{competitionFormat}</div>
        </div>
        <div className={styles.iconPinOutlineParent}>
          <img className={styles.iconCalendar} alt="" src={pin} />
          <div className={styles.text}>{location}</div>
        </div>
      </div>

      <div className={styles.statusContainer}>
        <div className={`${styles.statusIndicator} ${getStatusStyle()}`} />
        <div className={styles.statusText}>{getStatusText()}</div>
      </div>

      <div className={styles.frameGroup}>
        <div
          className={`${styles.container1} ${styles.roundedCorners1} ${styles.topLeftBottomRight1}`}
        >
          <img className={styles.iconTeams} alt="" src={people} />
          <div className={styles.teamNumber}>{numOfTeams} teams</div>
        </div>
        <div
          className={`${styles.container2} ${styles.roundedCorners2} ${styles.topLeftBottomRight2}`}
        >
          <div className={styles.detail} onClick={() => onDetailClick(league)}>
            Details ➜
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeagueCard;
