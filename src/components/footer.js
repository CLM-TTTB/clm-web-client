import { useState, useCallback } from 'react';

import styles from '../styles/homePage.module.css';

import logo from '../images/logo.png';
import element from '../images/element-1.png';

const Footer = () => {
  return (
    <>
      <div className={styles.groupParent}>
        <div className={styles.rectangleParent}>
          <div className={styles.groupItem} />
          <img className={styles.clmLogo2041} alt="" src={logo} />
          <b className={styles.clmChampion}>CLM - Champion League Management</b>
          <img className={styles.groupInner} alt="" src={element} />
          <img className={styles.groupInnerFlipped} alt="" src={element} />
          <div className={styles.allRightReserved}>
            © 2023, All Right Reserved - by Group08-SE100.O13.PMCL
          </div>
          <div className={styles.termsConditions}>{`Terms & Conditions`}</div>
          <div className={styles.privacyPolicy}>Privacy Policy</div>
          <div
            className={styles.loremIpsumIs}
          >{`Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. `}</div>
          <div className={styles.div}>|</div>
        </div>
        <div className={styles.iconTwitterParent}>
          <img
            className={styles.iconTwitter}
            alt=""
            src={`🦆 icon "twitter"_6`}
          />
          <img
            className={styles.iconFacebook}
            alt=""
            src={`🦆 icon "facebook"_7`}
          />
        </div>
        <div className={styles.youremailgmailcomParent}>
          <div className={styles.youremailgmailcom}>youremail@gmail.com</div>
          <img
            className={styles.iconEmailOutline}
            alt=""
            src={`🦆 icon "email outline"_8`}
          />
        </div>
        <div className={styles.linhTrungThuDucHoChiMiParent}>
          <div className={styles.youremailgmailcom}>
            Linh Trung, Thu Duc, Ho Chi Minh City
          </div>
          <img
            className={styles.iconPinOutline}
            alt=""
            src={`🦆 icon "pin outline"_9`}
          />
        </div>
        <div className={styles.parent}>
          <div className={styles.div1}>(+84) 123 456 789</div>
          <img className={styles.iconPhone} alt="" src={`🦆 icon "phone"_10`} />
        </div>
      </div>
    </>
  );
};
export default Footer;
