import styles from '~/styles/templateCard.module.css';

const TemplateCard = ({
  profileSrc,
  teamName,
  win,
  draw,
  lost,
  onDetailClick,
  numOfPlayers,
}) => {
  return (
    <div className={styles.teamCardParent}>
      <div className={styles.profilePicParent}>
        <div className={styles.teamName}>Template: {teamName}</div>
      </div>

      <div className={styles.frameGroup}>
        <div className={`${styles.container2} ${styles.roundedCorners2}`}>
          <div className={styles.detail} onClick={() => onDetailClick()}>
            Details ➜
          </div>
        </div>
      </div>
    </div>
  );
};

export default TemplateCard;
