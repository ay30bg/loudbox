import React, { useState } from 'react';
import Logo from './logo.png';
import './signup.css';

function SignUp({ navigateToSignIn }) {
    console.log('SignUp is rendering');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    const validateUsername = (username) => username.length >= 3;
    const validatePassword = (password) => password.length >= 6;

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        if (!validateUsername(username)) {
            setError('Username must be at least 3 characters long.');
            setIsLoading(false);
            return;
        }
    };

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

        if (password !== confirmPassword) {
            setError('Passwords do not match.');
            setIsLoading(false);
            return;
        }

 try {
        console.log('API URL:', process.env.REACT_APP_API_URL); // Debug: Log the API URL
        const response = await fetch(process.env.REACT_APP_API_URL + '/api/signup', {
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
        <div className="signup-container">
            <div className="signup-box">
                <div className="signup-logo">
                    <img src={Logo} alt="loudbox-logo" />
                </div>
                <div className="form-container">
                    <h2>Create your account</h2>
                    {error && <p className="error-message" style={{ color: 'red' }}>{error}</p>}
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="username">Username</label>
                            <input
                                type="text"
                                id="username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                placeholder="Enter your username"
                                required
                            />
                        </div>
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
                        </div>
                        <div className="form-group confirm-password-group">
                            <label htmlFor="confirm-password">Confirm Password</label>
                            <input
                                type={showPassword ? 'text' : 'password'}
                                id="confirm-password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                placeholder="Confirm Password"
                                required
                            />
                        </div>
                        <button
                            type="submit"
                            className="sign-up-button"
                            disabled={isLoading}
                        >
                            {isLoading ? 'Signing up...' : 'Sign Up'}
                        </button>
                    </form>
                    <p className="sign-in">
                        Already have an account?{' '}
                        <button
                            onClick={navigateToSignIn}
                            style={{
                                background: 'none',
                                border: 'none',
                                color: '#0056d2',
                                cursor: 'pointer',
                                fontSize: '15px',
                                textDecoration: 'underline',
                            }}
                        >
                            Sign in
                        </button>
                    </p>
                </div>
            </div>
        </div>
    );
}
export default SignUp;
