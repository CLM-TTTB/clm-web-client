// components/Layout.js

import React from 'react';
import Header from '~/components/header';
import Footer from '~/components/footer';
import styles from '~/styles/layout.module.css';

const Layout = ({ children }) => (
  <>
    <Header />
    <div className={styles.pageContainer}>
      <div style={{ paddingTop: '150px' }}>{children}</div>
    </div>
    <Footer />
  </>
);

export default Layout;
