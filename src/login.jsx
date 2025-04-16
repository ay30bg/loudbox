import React, { useState } from 'react';
import Logo from './logo.png';
import './login.css';

function Login({ onLogin, navigateToSignUp }) {
    console.log('Login is rendering');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

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
        console.log('API URL:', process.env.REACT_APP_API_URL); // Debug: Log the API URL
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
        console.log('Login response:', data); // Debug: Log response data
        onLogin(data); // Call onLogin with the response data
    } catch (error) {
        console.error('Login error:', error);
        setError(error.message || 'Failed to sign in. Please try again.');
    } finally {
        setIsLoading(false);
    }
};

    return (
        <div className="login-container">
            <div className="login-box">
                <div className="login-logo">
                    <img src={Logo} alt="loudbox-logo" />
                </div>
                <div className="form-container">
                    <h2>Sign in with your email and password</h2>
                    {error && <p className="error-message" style={{ color: 'red' }}>{error}</p>}
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
                            <a className='' href="https://x.com/i/grok?conversation=1909339764446446086">Forgot your password</a>
                        </div>

                        <button
                            type="submit"
                            className="sign-in-button"
                            disabled={isLoading}
                        >
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
    );
}

export default Login;
