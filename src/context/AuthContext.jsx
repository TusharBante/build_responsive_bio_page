import React, { createContext, useState, useContext } from 'react';

// 1. Create AuthContext
export const AuthContext = createContext();

// 2. AuthProvider Component managing authentication state, roles & localStorage persistence
export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem('token') || null);
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem('user');
    try {
      return storedUser ? JSON.parse(storedUser) : null;
    } catch {
      return null;
    }
  });

  // Save token and user info on successful login
  const login = (jwtToken, userData) => {
    localStorage.setItem('token', jwtToken);
    localStorage.setItem('user', JSON.stringify(userData));
    setToken(jwtToken);
    setUser(userData);
  };

  // Clear token and user info on logout
  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setToken(null);
    setUser(null);
  };

  const isAuthenticated = Boolean(token);
  // Role-Based Access Control helper
  const isAdmin = user?.role === 'admin';

  const value = {
    token,
    user,
    isAuthenticated,
    isAdmin,
    role: user?.role || 'guest',
    login,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

// Custom hook to consume AuthContext cleanly
export const useAuth = () => useContext(AuthContext);

export default AuthContext;
