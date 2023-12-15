import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../styles/login.module.css';
import Layout from '~/components/layout';
import Input from '~/components/input';
import Button from '~/components/button';

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState(false);
  const [emailErrorInfo, setEmailErrorInfo] = useState('');
  const [passwordError, setPasswordError] = useState(false);
  const [passwordErrorInfo, setPasswordErrorInfo] = useState('');
  const [showPassword, setShowPassword] = useState(true);
  const [rememberMe, setRememberMe] = useState(false);

  // HANDLE SUCCESSFUL LOGIN
  const loginSucceeded = () => {
    navigate('/');
  };

  // CALL AUTH CHECK
  const formatCheckPassed = () => {
    if (email !== 'abc@gm.com' || password !== '12345678') {
      setEmailError(true);
      setPasswordError(true);
      setPasswordErrorInfo('Invalid Email or Password. Please try again');
    } else {
      loginSucceeded();
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

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleLogin = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isValidEmail = emailRegex.test(email);

    if (isValidEmail) {
      setEmailError(false);
      setEmailErrorInfo('');
    } else {
      setEmailError(true);
      setEmailErrorInfo('The email format should be "yourname@gmail.com"');
    }

    if (password.length < 8) {
      setPasswordError(true);
      setPasswordErrorInfo('The password must contain at least 8 characters');
    } else {
      setPasswordError(false);
    }

    if (!isValidEmail || password.length < 8) {
      return;
    }

    formatCheckPassed();
  };

  const handleRememberMeChange = (e) => {
    setRememberMe(e.target.checked);
  };

  const handleCreateAccount = () => {
    navigate('/signup');
  };

  return (
    <>
      <Layout>
        <hr className="horizontal-line" />
        <div className={styles.loginForm}>
          <h1 className={styles.title}>Login</h1>
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

          <div className={styles.checkboxRow}>
            <label className={styles.rememberMe}>
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={handleRememberMeChange}
              />
              Remember Me
            </label>

            <a href="/forgot-password" className={styles.forgotPassword}>
              Forgot Password?
            </a>
          </div>

          <Button text="Log in" onClick={handleLogin}></Button>

          <div className={styles.line}></div>

          <div className={styles.createAccount}>
            Don't have an account?{' '}
            <a onClick={handleCreateAccount}>Create one!</a>
          </div>
        </div>

        <hr className="horizontal-line" />
      </Layout>
    </>
  );
};

export default Login;
