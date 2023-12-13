import React, { useState, useEffect } from 'react';
import styles from '../styles/footer.module.css';

import logo from '../images/logo.png';
import icon1 from '../images/footer/icon_fb_tw.png';
import icon2 from '../images/footer/icon_phone.png';
import icon3 from '../images/footer/icon_email.png';
import icon4 from '../images/footer/icon_map.png';
import element from '../images/footer/element-1.png';

const Footer = () => {
  const [footerHeight, setFooterHeight] = useState(0);

  useEffect(() => {
    const updateFooterHeight = () => {
      const footer = document.getElementById('footer');
      if (footer) {
        setFooterHeight(footer.offsetHeight);
      }
    };

    updateFooterHeight(); // Initial update

    // Update the footer height when the window is resized
    window.addEventListener('resize', updateFooterHeight);

    return () => {
      // Cleanup the event listener when the component is unmounted
      window.removeEventListener('resize', updateFooterHeight);
    };
  }, []);

  return (
    <div id="footer" className={styles.footerWrapper}>
      <footer className={styles.footer}>
        <div className={styles.footerContent}>
          <div className={styles.itemGroupParent1}>
            <div className={styles.itemGroup1}>
              <img className={styles.clmLogo20411} alt="" src={logo} />
              <div>
                <div className={styles.title}>
                  CLM - Champion League Management
                </div>
                <div className={styles.textContainer}>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </div>
              </div>
            </div>

            <div className={styles.itemGroup2}>
              <div className={styles.addressGroup}>
                <img src={icon1} alt="Icon 1" />
              </div>

              <div className={styles.addressGroup}>
                <div>(+84) 123 456 789</div>
                <img src={icon2} alt="Icon 2" />
              </div>

              <div className={styles.addressGroup}>
                <div>youremail@gmail.com</div>
                <img src={icon3} alt="Icon 3" />
              </div>

              <div className={styles.addressGroup}>
                <div>Linh Trung, Thu Duc, Ho Chi Minh City</div>
                <img src={icon4} alt="Icon 4" />
              </div>
            </div>
          </div>
          <div className={styles.itemGroupParent2}>
            <img src={element} alt="" />
            <div className={styles.text1}>
              © 2023, All Right Reserved - by Group08-SE100.O13.PMCL
            </div>
            <div className={styles.text1}>
              Terms & Conditions | Privacy Policy
            </div>
            <img className={styles.flippedImage} src={element} alt="" />
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
