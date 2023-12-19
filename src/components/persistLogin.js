import { Outlet } from 'react-router-dom';
import { useState, useEffect } from 'react';

import useAuth from '~/hooks/useAuth';
import localStorage from '~/utils/localStorage';
import sessionStorage from '~/utils/sessionStorage';
import StorageKey from '~/constants/storageKeys';

const PersistLogin = () => {
  const [isLoading, setIsLoading] = useState(true);
  const {
    setAccessToken,
    setRefreshToken,
    setUserInfos,
    userInfos,
    accessToken,
    refreshToken,
  } = useAuth();

  useEffect(() => {
    const fetchAuthInfos = async () => {
      try {
        const rememberMe = await localStorage.getItem(StorageKey.REMEMBER_ME);
        console.log(rememberMe);

        if (rememberMe) {
          const tempAccessToken = await localStorage.getItem(
            StorageKey.ACCESS_TOKEN,
          );
          const tempRefreshToken = await localStorage.getItem(
            StorageKey.REFRESH_TOKEN,
          );
          const tempUserInfos = await localStorage.getItem(
            StorageKey.USER_INFOS,
          );

          console.log(tempAccessToken, tempRefreshToken, tempUserInfos);

          setAccessToken(tempAccessToken);
          setRefreshToken(tempRefreshToken);
          setUserInfos(tempUserInfos);
        } else {
          const tempAccessToken = await sessionStorage.getItem(
            StorageKey.ACCESS_TOKEN,
          );
          const tempRefreshToken = await sessionStorage.getItem(
            StorageKey.REFRESH_TOKEN,
          );
          const tempUserInfos = await sessionStorage.getItem(
            StorageKey.USER_INFOS,
          );

          console.log(tempAccessToken, tempRefreshToken, tempUserInfos);

          setAccessToken(tempAccessToken);
          setRefreshToken(tempRefreshToken);
          setUserInfos(tempUserInfos);
        }
      } catch (err) {
        console.log(err);
      } finally {
        setIsLoading(false);
      }
    };
    userInfos === null || accessToken === '' || refreshToken === ''
      ? fetchAuthInfos()
      : setIsLoading(false);
    console.log('Hello from persist login');
  }, [
    setAccessToken,
    setRefreshToken,
    setUserInfos,
    userInfos,
    accessToken,
    refreshToken,
  ]);

  return <>{isLoading ? <p>Loading.....</p> : <Outlet />}</>;
};

export default PersistLogin;
