import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Layout from '~/components/layout';

const Verification = () => {
  const [isAllowGetNewVerifyLink, setIsAllowGetNewVerifyLink] = useState(true);

  useEffect(() => {
    if (!isAllowGetNewVerifyLink) {
      setTimeout(() => {
        setIsAllowGetNewVerifyLink(true);
      }, 15000);
    }
  }, [isAllowGetNewVerifyLink]);

  const containerStyle = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
  };

  const handleResentVerifyLink = () => {
    if (isAllowGetNewVerifyLink) {
      console.log('Resent verification link');
      setIsAllowGetNewVerifyLink(false);
    }
  };

  return (
    <>
      <Layout>
        <div style={containerStyle}>
          <h2>
            We have sent you a verification link, please check your email to
            verify your account!!
          </h2>
          <div style={{ marginTop: 20 }}>
            <p>
              If you have clicked the verification link received through your
              registered email, click{' '}
              <Link
                to="/login"
                style={{ textDecoration: 'underline', color: '#ffdc11' }}
              >
                here
              </Link>{' '}
              to go back to Login page
            </p>
            <p>
              If you have not received verification link through your registered
              email or the verify link may already expired, click{' '}
              <span
                onClick={handleResentVerifyLink}
                style={{
                  textDecoration: 'underline',
                  color: isAllowGetNewVerifyLink
                    ? '#ffdc11'
                    : 'rgba(255, 220, 17, 0.5)',
                  cursor: isAllowGetNewVerifyLink ? 'pointer' : 'default',
                }}
              >
                here
              </span>{' '}
              to receive another verify link
            </p>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default Verification;
