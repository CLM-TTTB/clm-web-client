import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Layout from '~/components/layout';
import { resendVerificationLink } from '~/apiServices/authService';
import HttpStatus from '~/constants/httpStatusCode';
import localStorage from '~/utils/localStorage';
import StorageKey from '~/constants/storageKeys';

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
    backgroundColor: '#27282a',
  };

  const textStyle = {
    color: '#FFFFFF',
  };

  const handleResendVerifyLink = async () => {
    if (isAllowGetNewVerifyLink) {
      try {
        setIsAllowGetNewVerifyLink(false);
        const response = await resendVerificationLink();
        if (response.status === HttpStatus.OK) {
          const newResendVeriLinkToken =
            response.data.resendVerificationLinkToken;
          localStorage.setItem(
            StorageKey.RESEND_VERI_LINK_TOKEN,
            newResendVeriLinkToken,
          );
          console.log('Verification link sent successful!!');
        } else {
          console.log('Verification link sent failed!!');
        }
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <>
      <div style={containerStyle}>
        <h2 style={textStyle}>
          We have sent you a verification link, please check your email to
          verify your account!!
        </h2>
        <div style={{ marginTop: 20 }}>
          <p style={textStyle}>
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
          <p style={textStyle}>
            If you have not received verification link through your registered
            email or the verify link may already expired, click{' '}
            <span
              onClick={handleResendVerifyLink}
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
    </>
  );
};

export default Verification;
