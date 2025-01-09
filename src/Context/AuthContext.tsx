import React, { createContext, useState } from "react";
import CryptoJS from "crypto-js";

const secretKey = "your-secret-key";

interface AuthContextType {
  userData: {
    username: string | null;
    email: string | null;
    firstName: string | null;
    gender: string | null;
  };
  token: string | null;
  login: (
    newUserData: {
      username: string | null;
      email: string | null;
      firstName: string | null;
      gender: string | null;
    },
    newToken: string
  ) => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType>({
  userData: {
    username: null,
    email: null,
    firstName: null,
    gender: null,
  },
  token: null,
  login: () => {},
  logout: () => {},
});

const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const storedUserDataEncrypted = localStorage.getItem("userData");
  const storedUserData = storedUserDataEncrypted
    ? JSON.parse(
        CryptoJS.AES.decrypt(storedUserDataEncrypted, secretKey).toString(
          CryptoJS.enc.Utf8
        )
      )
    : {};

  const [userData, setUserData] = useState({
    username: storedUserData.username || null,
    email: storedUserData.email || null,
    firstName: storedUserData.firstName || null,
    gender: storedUserData.gender || null,
  });

  const [token, setToken] = useState<string | null>(
    localStorage.getItem("token")
  );

  const login = (newUserData: typeof userData, newToken: string) => {
    setUserData(newUserData);
    setToken(newToken);
    const encryptedUserData = CryptoJS.AES.encrypt(
      JSON.stringify(newUserData),
      secretKey
    ).toString();
    localStorage.setItem("userData", encryptedUserData);
    localStorage.setItem("token", newToken);
  };

  const logout = () => {
    setUserData({
      username: null,
      email: null,
      firstName: null,
      gender: null,
    });
    setToken(null);
    localStorage.clear();
  };

  return (
    <AuthContext.Provider value={{ userData, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
