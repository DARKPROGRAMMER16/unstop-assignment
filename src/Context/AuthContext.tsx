import React, { createContext, useState, } from 'react';

interface AuthContextType {
  username: string | null;
  token: string | null;
  email: string | null;
  firstName: string | null;
  login: (username: string, token: string, email: string, firstName: string) => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType>({
  username: null,
  token: null,
  email: null,
  firstName: null,
  login: () => {},
  logout: () => {},
});

const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Initialize state from localStorage
  const [username, setUsername] = useState<string | null>(
    localStorage.getItem('username')
  );
  const [token, setToken] = useState<string | null>(
    localStorage.getItem('token')
  );
  const [email, setEmail] = useState<string | null>(
    localStorage.getItem('email')
  );
  const [firstName, setFirstName] = useState<string | null>(
    localStorage.getItem('firstName')
  );


  const login = (username: string, token: string, email: string, firstName: string) => {
    // Update state
    setUsername(username);
    setToken(token);
    setEmail(email);
    setFirstName(firstName);
    // Save to localStorage
    localStorage.setItem('username', username);
    localStorage.setItem('token', token);
    localStorage.setItem('email', email || '');
    localStorage.setItem('firstName', firstName || '');
  };

  const logout = () => {
    // Clear state
    setUsername(null);
    setToken(null);
    setEmail(null);
    setFirstName(null);
    // Remove from localStorage
    localStorage.removeItem('username');
    localStorage.removeItem('token');
    localStorage.removeItem('email');
    localStorage.removeItem('firstName');
  };

  return (
    <AuthContext.Provider 
      value={{
        username,
        token,
        email,
        firstName,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
