import React, { createContext, useState, useContext , useEffect} from "react";
import axios from "axios";

axios.defaults.withCredentials = true;

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get("http://localhost:4000/checksession", {withCredentials: true})
      .then((res) => setUser(res.data.userid))
      .catch(() => console.log("No active session"));
  }, []);
  

  const register = async ({ username, useremail, userpassword }) => {
    try {
      const response = await axios.post('http://localhost:4000/register', { username, useremail, userpassword }, {withCredentials: true});
      setUser(response.data.userid);
    } catch (error) {
      setMessage(error.response?.data?.message || 'Invalid signup. Check email or password.');
      console.log("Error")
    }
  };

  const login = async ({ useremail, userpassword }) => {
    try {
      const response = await axios.post('http://localhost:4000/login', { useremail, userpassword } , {withCredentials: true});
      setUser(response.data.userid)
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
