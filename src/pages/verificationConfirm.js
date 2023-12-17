import React, { useState } from 'react';
import Layout from '~/components/layout';

const Verification = () => {
  const containerStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
  };

  return (
    <>
      <Layout>
        <div style={containerStyle}>
          <p>
            We have sent you a verify link, please check your email to verify
            your accont!!
          </p>
        </div>
      </Layout>
    </>
  );
};

export default Verification;
