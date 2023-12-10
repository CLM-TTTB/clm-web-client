// Login.js
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

  const handleEmail = (e) => {
    const value = e.target.value;
    setEmail(value);
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isValidEmail = emailRegex.test(value);

    if (isValidEmail) {
      setEmailError(false);
      setEmailErrorInfo('');
    } else {
      setEmailError(true);
      setEmailErrorInfo('The email format should be "yourname@gmail.com"');
    }
  };

  const handlePassword = (e) => {
    const value = e.target.value;
    setPassword(value);

    if (password.length < 7) {
      setPasswordError(true);
      setPasswordErrorInfo('The password must contain at least 8 characters');
    } else {
      setPasswordError(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleLogin = () => {
    if (password.length < 7) {
      setPasswordError(true);
      setPasswordErrorInfo('The password must contain at least 8 characters');
    } else if (password != '12345678') {
      setPasswordError(true);
      setPasswordErrorInfo('Invalid Email or Password. Please try again');
    } else if (passwordError == false && emailError == false) loginSucceeded();
  };

  const handleCreateAccount = () => {
    console.log('Create account clicked!');
  };

  return (
    <>
      <Layout>
        <hr class="horizontal-line" />
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
                onChange={() => setRememberMe(!rememberMe)}
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
            <a href="#" onClick={handleCreateAccount}>
              Create one!
            </a>
          </div>
        </div>

        <hr class="horizontal-line" />
      </Layout>
    </>
  );
};

export default Login;
