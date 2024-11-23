import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import './App.css';
import Signup from './components/signup.js';
import Login from './components/login.js';
import Profile from './components/profile.js';


function App() {
  const [isLogin, setIsLogin] = useState(false);  // Track whether the user is logged in
  const [user, setUser] = useState(null);  // Store user info after login/signup

  // Toggle between login and signup forms
  const toggleForm = () => setIsLogin(!isLogin);

  // Handle Signup - Store the user info when signing up
  const handleSignup = (userInfo) => {
    setUser(userInfo);  // Store the user data in state
    setIsLogin(true);  // Switch to login view after signup
  };

  // Handle Login - Store the user info when logging in
  const handleLogin = (userInfo) => {
    setUser(userInfo);  // Store the user data in state
    setIsLogin(true);  // Switch to profile after login
  };

  // Handle Logout
  const handleLogout = () => {
    setUser(null);  // Clear user info on logout
    setIsLogin(false);  // Switch to signup form on logout
  };





  return (
    <Router>
      <div className="App">
        <div className="form-container">
          <Routes>
            <Route
              path="/"
              element={
                isLogin ? (
                  <Login user={user} handleLogin={handleLogin} toggleForm={toggleForm} />
                ) : (
                  <Signup handleSignup={handleSignup} toggleForm={toggleForm} />
                )
              }
            />
            <Route
              path="/profile"
              element={user ? <Profile user={user} handleLogout={handleLogout} /> : <Navigate to="/" />}
            />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;