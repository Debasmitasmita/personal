import React from "react";
import { createContext, useState } from "react";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [isAuth, setisAuth] = useState(false);
  const [Authdata, setAuthData] = useState();
  const [accessToken, setAccessToken] = useState();
  return (
    <AuthContext.Provider value={{ isAuth, setisAuth, Authdata, setAuthData,accessToken,setAccessToken }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
