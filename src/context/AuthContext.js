import { createContext, useState } from 'react';

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [userInfos, setUserInfos] = useState({});
  const [accessToken, setAccessToken] = useState('');
  const [refreshToken, setRefreshToken] = useState('');

  return (
    <AuthContext.Provider
      value={{
        userInfos,
        setUserInfos,
        accessToken,
        setAccessToken,
        refreshToken,
        setRefreshToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
