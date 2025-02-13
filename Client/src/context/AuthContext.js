import React, { createContext, useEffect, useState, useContext } from "react";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(true);

  const register = async ({ username, useremail, userpassword }) => {
    try {
      const response = await axios.post('http://localhost:4000/register', { username, useremail, userpassword });
      setUser(response.data);
      console.log(response.data.message)
    } catch (error) {
      setMessage(error.response?.data?.message || 'Invalid signup. Check email or password.');
      console.log("Error")
    }
  };

  const login = async ({ email, password }) => {
    try {
      const response = await axios.post('http://localhost:4000/login', { email, password });
      setUser(response.data);
    } catch (error) {
      setMessage(error.response?.data?.message || 'Invalid login. Check email or password.');
    }
  };

  const logout = async () => {
    try {
      await axios.post('http://localhost:4000/logout');
      setUser(null);
    } catch (error) {
      setMessage('There was an issue logging out.');
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, message, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
