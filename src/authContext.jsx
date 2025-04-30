import React, { createContext, useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

// Create the AuthContext
export const AuthContext = createContext();

// AuthProvider component to wrap the app
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Track user authentication state
  const [loading, setLoading] = useState(true); // Track initial loading state
  const history = useHistory(); // For navigation

  // Check for persisted user on mount
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  // Login function
  const login = (userData) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData)); // Persist user data
    history.push('/'); // Redirect to home page
  };

  // Logout function
  const logout = () => {
    setUser(null);
    localStorage.removeItem('user'); // Clear persisted user data
    history.push('/'); // Redirect to home page
  };

  // Provide the context value
  const value = {
    user,
    login,
    logout,
    isAuthenticated: !!user, // Boolean to check if user is logged in
  };

  // Render children only after loading is complete
  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
