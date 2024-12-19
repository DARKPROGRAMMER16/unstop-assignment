import React, { createContext, useState, } from 'react';

interface AuthContextType {
  username: string | null;
  token: string | null;
  email: string | null;
  firstName: string | null;
  gender: string | null;
  login: (username: string, token: string, email: string, firstName: string, gender: string) => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType>({
  username: null,
  token: null,
  email: null,
  firstName: null,
  gender: null,
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
  const [gender, setGender] = useState<string | null>(
    localStorage.getItem('gender')
  );


  const login = (username: string, token: string, email: string, firstName: string, gender: string) => {
    // Update state
    setUsername(username);
    setToken(token);
    setEmail(email);
    setFirstName(firstName);
    setGender(gender);
    // Save to localStorage
    localStorage.setItem('username', username);
    localStorage.setItem('token', token);
    localStorage.setItem('email', email || '');
    localStorage.setItem('firstName', firstName || '');
    localStorage.setItem('gender', gender || '');
  };

  const logout = () => {
    // Clear state
    setUsername(null);
    setToken(null);
    setEmail(null);
    setFirstName(null);
    setGender(null);
    // Remove from localStorage
    localStorage.removeItem('username');
    localStorage.removeItem('token');
    localStorage.removeItem('email');
    localStorage.removeItem('firstName');
    localStorage.removeItem('gender');
  };

  return (
    <AuthContext.Provider 
      value={{
        username,
        token,
        email,
        firstName,
        gender,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
