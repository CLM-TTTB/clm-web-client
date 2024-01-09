import styles from '../styles/aboutUs.module.css';
import Layout from '~/components/layout';

const AboutUs = () => {
  return (
    <Layout>
      <hr class="horizontal-line" />
      <h1 className={styles.title}>About Us</h1>

      <div className={styles.section}> About Champion League Management</div>
      <div className={styles.contentContainer}>
        Welcome to Champion League Management, where passion meets precision in
        the world of sports management. Established with a vision to elevate the
        standards of sporting events and competitions, we take pride in our
        commitment to excellence, integrity, and innovation.
      </div>

      <div className={styles.section}>Our Mission</div>
      <div className={styles.contentContainer}>
        At Champion League Management, our mission is to create unforgettable
        sports experiences that captivate audiences, inspire athletes, and
        foster a sense of community. We strive to be a catalyst for positive
        change in the sports industry by promoting fair play, sportsmanship, and
        inclusivity.
      </div>

      <div className={styles.section}>Who We Are</div>
      <div className={styles.contentContainer}>
        Champion League Management is a dynamic team of seasoned professionals
        with a shared love for sports and a wealth of experience in event
        management. Our diverse backgrounds and expertise converge to form a
        powerhouse dedicated to bringing your sporting dreams to life. From
        conceptualization to execution, we are driven by a relentless pursuit of
        perfection.
      </div>

      <div className={styles.section}>What Sets Us Apart</div>
      <div className={styles.contentContainer}>
        <div>
          <span className={styles.contentHeader}>1. Innovation:</span> We
          embrace cutting-edge technologies and creative solutions to push the
          boundaries of what is possible in sports management.
        </div>
        <div>
          <span className={styles.contentHeader}>2. Integrity:</span> Trust is
          the cornerstone of our relationships. We operate with transparency,
          honesty, and a steadfast commitment to ethical practices.
        </div>
        <div>
          <span className={styles.contentHeader}>3. Passion:</span> Sports are
          our heartbeat. Our team's enthusiasm is contagious, and it fuels our
          drive to deliver unparalleled sporting experiences.
        </div>
        <div>
          <span className={styles.contentHeader}>4. Collaboration:</span> We
          believe in the power of teamwork. By collaborating with stakeholders,
          partners, and communities, we amplify the impact of every sporting
          event.
        </div>
      </div>

      <div className={styles.section}>Our Services</div>
      <div className={styles.contentContainer}>
        <div>
          <span className={styles.contentHeader}>
            • Event Planning and Execution:
          </span>{' '}
          From grassroots tournaments to high-profile championships, we have the
          expertise to organize and manage events of all scales.
        </div>
        <div>
          <span className={styles.contentHeader}>
            • Marketing and Branding:
          </span>{' '}
          Our team crafts compelling narratives and strategic marketing
          campaigns to elevate the profile of your event and build a lasting
          connection with your audience.
        </div>
        <div>
          <span className={styles.contentHeader}>
            • Technology Integration:
          </span>{' '}
          Leverage the latest advancements in sports technology to enhance the
          fan experience, streamline operations, and provide real-time insights.
        </div>
        <div>
          <span className={styles.contentHeader}>• Consulting Services:</span>{' '}
          Benefit from our industry knowledge and experience through consulting
          services tailored to meet your specific needs.
        </div>
      </div>

      <div className={styles.contentLast}>
        <text className={styles.text}>
          Join us on a journey where sporting dreams become reality, and every
          event is a celebration of excellence. Champion League Management -
          where champions are made and legacies are forged.
        </text>
      </div>

      <hr class="horizontal-line" />
    </Layout>
  );
};

export default AboutUs;
