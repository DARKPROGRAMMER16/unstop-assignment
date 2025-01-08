import React, { createContext, useState } from "react";

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
  // Initialize state from localStorage
  const storedUserData = JSON.parse(localStorage.getItem("userData") || "{}");
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
    localStorage.setItem("userData", JSON.stringify(newUserData));
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
    localStorage.removeItem("userData");
    localStorage.removeItem("token");
  };

 

  return (
    <AuthContext.Provider value={{ userData, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
