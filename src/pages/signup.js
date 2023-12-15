// Signup.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../styles/login.module.css';
import Layout from '~/components/layout';
import Input from '~/components/input';
import Button from '~/components/button';

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

  // HANDLE SUCCESSFUL REGISTERATION
  const signupSucceeded = () => {
    navigate('/login');
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

    if (isValidEmail) {
      setEmailError(false);
      setEmailErrorInfo('');
    } else {
      setEmailError(true);
      setEmailErrorInfo('The email format should be "yourname@gmail.com"');
    }

    if (password.length < 7) {
      setPasswordError(true);
      setPasswordErrorInfo('The password must contain at least 8 characters');
    } else {
      setPasswordError(false);
    }

    if (rePassword !== password) {
      setRePasswordError(true);
      setRePasswordErrorInfo('Password and Re-entered Password do not match');
    } else {
      setRePasswordError(false);
      setRePasswordErrorInfo('');
    }

    if (!isValidEmail || password.length < 7 || rePassword !== password) {
      return;
    }

    signupSucceeded();
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
