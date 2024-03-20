import React, { useState, useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from './AuthContext';
import './Login.css';
import { auth } from './firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [usernameInput, setUsernameInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [error, setError] = useState(null);
  const {setIsLoggedIn } = useContext(AuthContext);
  const navigate = useNavigate(); 

  const handleUsernameChange = (e) => {
    setUsernameInput(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPasswordInput(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, usernameInput, passwordInput);
      setIsLoggedIn(true); 
      navigate('/second-page'); 
    } catch (loginError) {
      try {
        await createUserWithEmailAndPassword(auth, usernameInput, passwordInput);
        setIsLoggedIn(true); 
        navigate('/second-page'); 
      } catch (signUpError) {
        setError(signUpError.message);
      }
    }
  };

  return (
    <div className="login-container">
      <h2>Login or Sign Up</h2>
      <form className="login-form" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">Email:</label>
          <input
            type="email"
            id="username"
            value={usernameInput}
            onChange={handleUsernameChange}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={passwordInput}
            onChange={handlePasswordChange}
            required
          />
        </div>
        <button type="submit">Login / Sign Up</button>
      </form>
      {error && <div className="alert">{error}</div>}
    </div>
  );
}

export default Login;
