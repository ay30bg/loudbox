// src/login.js
import React, { useState } from 'react';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import { useLocation } from 'react-router-dom';
import Logo from './logo.png';
import './login.css';

function Login({ onLogin, navigateToSignUp, navigateToForgotPassword }) {
  console.log('Login is rendering');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { state } = useLocation(); // Get location state

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const validatePassword = (password) => password.length >= 6;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    if (!validateEmail(email)) {
      setError('Please enter a valid email address.');
      setIsLoading(false);
      return;
    }

    if (!validatePassword(password)) {
      setError('Password must be at least 6 characters long.');
      setIsLoading(false);
      return;
    }

    try {
      console.log('API URL:', process.env.REACT_APP_API_URL);
      const response = await fetch(process.env.REACT_APP_API_URL + '/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      console.log('Login response:', data);
      onLogin({ ...data, state }); // Pass user data and location state
    } catch (error) {
      console.error('Login error:', error);
      setError(error.message || 'Failed to sign in. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSuccess = async (credentialResponse) => {
    setError('');
    setIsLoading(true);

    try {
      const idToken = credentialResponse.credential;
      console.log('Google ID Token:', idToken);

      const response = await fetch(process.env.REACT_APP_API_URL + '/api/google-login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ idToken }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      console.log('Google login response:', data);
      onLogin({ ...data, state }); // Pass user data and location state
    } catch (error) {
      console.error('Google login error:', error);
      setError(error.message || 'Failed to sign in with Google. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleFailure = () => {
    setError('Google Sign-In failed. Please try again.');
  };

  return (
    <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}>
      <div className="login-container">
        <div className="login-box">
          <div className="login-logo">
            <img src={Logo} alt="loudbox-logo" />
          </div>
          <div className="form-container">
            <h2>Sign in to your account</h2>
            {error && <p className="error-message" style={{ color: 'red' }}>{error}</p>}
            <GoogleLogin
              onSuccess={handleGoogleSuccess}
              onError={handleGoogleFailure}
              buttonText="Sign in with Google"
              theme="filled_blue"
              size="large"
              width="330"
              style={{ marginBottom: '20px' }}
            />
            <p style={{ textAlign: 'center', margin: '10px 0' }}>or</p>
            <h3 className="welcome-sign-in">Sign in with your email and password</h3>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@host.com"
                  required
                />
              </div>

              <div className="form-group password-group">
                <label htmlFor="password">Password</label>
                <div style={{ position: 'relative' }}>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    style={{
                      position: 'absolute',
                      right: '10px',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                    }}
                  >
                    {showPassword ? 'Hide' : 'Show'}
                  </button>
                </div>
                <button
                  type="button"
                  onClick={navigateToForgotPassword}
                  style={{
                    background: 'none',
                    border: 'none',
                    fontSize: '15px',
                    color: '#0056d2',
                    cursor: 'pointer',
                    textDecoration: 'underline',
                    textAlign: 'left',
                    padding: '5px 0',
                  }}
                >
                  Forgot your password
                </button>
              </div>

              <button type="submit" className="sign-in-button" disabled={isLoading}>
                {isLoading ? 'Signing in...' : 'Sign in'}
              </button>
            </form>
            <p className="sign-up">
              Need an account?
              <button
                onClick={navigateToSignUp}
                style={{
                  background: 'none',
                  border: 'none',
                  fontSize: '15px',
                  color: '#0056d2',
                  cursor: 'pointer',
                  textDecoration: 'underline',
                }}
              >
                Sign up
              </button>
            </p>
          </div>
        </div>
      </div>
    </GoogleOAuthProvider>
  );
}

export default Login;
