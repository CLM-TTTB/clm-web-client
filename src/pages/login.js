import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import styles from '../styles/login.module.css';
import Layout from '~/components/layout';
import Input from '~/components/input';
import Button from '~/components/button';

import sessionStorage from '~/utils/sessionStorage';
import localStorage from '~/utils/localStorage';
import StorageKey from '~/constants/storageKeys';
import { login } from '~/apiServices/authService';
import useAuth from '~/hooks/useAuth';
import HttpStatus from '~/constants/httpStatusCode';

const Login = () => {
  useEffect(() => {
    localStorage.setItem(StorageKey.REMEMBER_ME, false);
  }, []);

  const { setUserInfos, setAccessToken, setRefreshToken } = useAuth();

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/'; //navigate user to the private page that they want to go after Login

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState(false);
  const [emailErrorInfo, setEmailErrorInfo] = useState('');
  const [passwordError, setPasswordError] = useState(false);
  const [passwordErrorInfo, setPasswordErrorInfo] = useState('');
  const [showPassword, setShowPassword] = useState(true);
  const [rememberMe, setRememberMe] = useState(false);

  // CALL AUTH APIs
  const loginVerify = async () => {
    try {
      const response = await login({ email, password });

      if (response.status === HttpStatus.OK) {
        console.log(response?.data);
        const { accessToken, refreshToken, ...userInfos } = response?.data;

        setRefreshToken(refreshToken);
        setAccessToken(accessToken);
        setUserInfos(userInfos);

        //Storing auth infos
        if (rememberMe) {
          localStorage.setItem(StorageKey.USER_INFOS, userInfos);
          localStorage.setItem(StorageKey.REFRESH_TOKEN, refreshToken);
          localStorage.setItem(StorageKey.ACCESS_TOKEN, accessToken);
        } else {
          sessionStorage.setItem(StorageKey.USER_INFOS, userInfos);
          sessionStorage.setItem(StorageKey.REFRESH_TOKEN, refreshToken);
          sessionStorage.setItem(StorageKey.ACCESS_TOKEN, accessToken);
        }

        //Clear state after login success
        setEmail('');
        setPassword('');
        // setEmailError(false);
        // setPasswordError(false);
        setRememberMe(false);

        console.log('Login success');
        navigate(from, { replace: true });
      } else if (response.status === HttpStatus.NOT_FOUND) {
        setEmailErrorInfo('');
        setPasswordErrorInfo('Username or password is incorrect');
        setEmailError(true);
        setPasswordError(true);
      } else if (response.status === HttpStatus.UNAUTHORIZED) {
        setEmailError(true);
        setPasswordError(true);
        setEmailErrorInfo('');
        setPasswordErrorInfo(
          'Account is unverified, please check your email for verification link',
        );
      } else {
        setEmailError(true);
        setPasswordError(true);
        setEmailErrorInfo('');
        setPasswordErrorInfo('Unexpected error, please try again later');
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

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleLogin = () => {
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

    if (!isValidEmail || !isValidPassword) {
      return;
    }

    //Inputs format check passed:
    loginVerify();
  };

  const handleRememberMeChange = (e) => {
    setRememberMe(e.target.checked);
    if (e.target.checked) localStorage.setItem(StorageKey.REMEMBER_ME, true);
    else localStorage.setItem(StorageKey.REMEMBER_ME, false);
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
