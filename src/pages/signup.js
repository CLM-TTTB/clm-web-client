// Signup.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../styles/login.module.css';
import Layout from '~/components/layout';
import Input from '~/components/input';
import Button from '~/components/button';

import { signUp } from '~/apiServices/authService';
import HttpStatus from '~/constants/httpStatusCode';
import localStorage from '~/utils/localStorage';
import StorageKey from '~/constants/storageKeys';

const Signup = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState(false);
  const [emailErrorInfo, setEmailErrorInfo] = useState('');
  const [passwordError, setPasswordError] = useState(false);
  const [passwordErrorInfo, setPasswordErrorInfo] = useState('');
  const [showPassword, setShowPassword] = useState(true);

  const [rePassword, setRePassword] = useState('');
  const [rePasswordError, setRePasswordError] = useState(false);
  const [rePasswordErrorInfo, setRePasswordErrorInfo] = useState('');

  // HANDLE SUCCESSFUL REGISTRATION
  const signupVerify = async () => {
    try {
      const response = await signUp({ email, password });
      console.log('Response status: ' + response.status);

      if (response.status === HttpStatus.CREATED) {
        setEmail('');
        setPassword('');
        setRePassword('');

        console.log(
          'Resend verify token: ' + response.data.resendVerificationLinkToken,
        );
        const resendVeriLinkToken = response.data.resendVerificationLinkToken;
        localStorage.setItem(
          StorageKey.RESEND_VERI_LINK_TOKEN,
          resendVeriLinkToken,
        );

        navigate('/verificationConfirm');
      } else if (response.status === HttpStatus.FORBIDDEN) {
        setEmailError(true);

        setEmailErrorInfo('This email is already used to create account');
      } else if (response.status === HttpStatus.NOT_FOUND) {
        setEmailError(true);
        setPasswordError(true);
        setRePasswordError(true);

        setRePasswordErrorInfo('Role not found');
      } else {
        setEmailError(true);
        setPasswordError(true);
        setRePasswordError(true);

        setRePasswordErrorInfo('Unexpected error, please try again later');
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleEmail = (e) => {
    const value = e.target.value;
    setEmail(value);

    setEmailError(false);
    setEmailErrorInfo('');
  };

  const handlePassword = (e) => {
    const value = e.target.value;
    setPassword(value);

    setPasswordError(false);
    setPasswordErrorInfo('');
  };

  const handleRePassword = (e) => {
    const value = e.target.value;
    setRePassword(value);

    setRePasswordError(false);
    setRePasswordErrorInfo('');
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSignup = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isValidEmail = emailRegex.test(email);
    const isValidPassword = password.length >= 8 && /[A-Z]/.test(password);

    if (isValidEmail) {
      setEmailError(false);
      setEmailErrorInfo('');
    } else {
      setEmailError(true);
      setEmailErrorInfo('The email format should be "yourname@gmail.com"');
    }

    if (isValidPassword) {
      setPasswordError(false);
      setPasswordErrorInfo('');
    } else {
      setPasswordError(true);
      setPasswordErrorInfo(
        'The password must be at least 8 characters long and at least 1 uppercase character',
      );
    }

    if (rePassword !== password) {
      setRePasswordError(true);
      setRePasswordErrorInfo('Password and Re-entered Password does not match');
    } else if (rePassword === '') {
      setRePasswordError(true);
    } else {
      setRePasswordError(false);
      setRePasswordErrorInfo('');
    }

    if (!isValidEmail || !isValidPassword || rePassword !== password) {
      return;
    }

    //Signup inputs satisfied
    signupVerify();
  };

  const handleLogin = () => {
    navigate('/login');
  };

  return (
    <>
      <Layout>
        <hr className="horizontal-line" />
        <div className={styles.loginForm}>
          <h1 className={styles.title}>Sign Up</h1>
          <Input
            label="Email Address"
            error={emailError}
            errorInfo={emailErrorInfo}
            onChange={handleEmail}
            value={email}
            type="text"
          />

          <Input
            label="Password"
            error={passwordError}
            errorInfo={passwordErrorInfo}
            onChange={handlePassword}
            value={password}
            toggleVisibility={togglePasswordVisibility}
            showPassword={showPassword}
            type="password"
          />

          <Input
            label="Re-enter Password"
            error={rePasswordError}
            errorInfo={rePasswordErrorInfo}
            onChange={handleRePassword}
            value={rePassword}
            toggleVisibility={togglePasswordVisibility}
            showPassword={showPassword}
            type="password"
          />

          <div className={styles.checkboxRow}>
            <label className={styles.terms}>
              By clicking Sign Up, you indicate that you have read, understood,
              and agreed to our{' '}
              <span style={{ color: '#ffdc11' }}>Terms of Use</span> and{' '}
              <span style={{ color: '#ffdc11' }}>Privacy Policy</span>.
            </label>
          </div>

          <Button text="Sign Up" onClick={handleSignup}></Button>

          <div className={styles.line2}></div>

          <div className={styles.login}>
            Already have an account? <a onClick={handleLogin}>Log in</a>
          </div>
        </div>

        <hr className="horizontal-line" />
      </Layout>
    </>
  );
};

export default Signup;
