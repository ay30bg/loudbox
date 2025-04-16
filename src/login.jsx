import React, { useState } from 'react';
import Logo from './logo.png';
import './login.css'

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
            Replace with your actual API call
            const response = await fetch('https://loudbox-backend.vercel.app/api/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });

            

            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.message || 'Login failed');
            }

            console.log('Login successful:', data);
            onLogin(data); // Pass user data or token to parent component
        } catch (err) {
            setError(err.message || 'Something went wrong. Please try again.');
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
              style={{ background: 'none', border: 'none', fontSize:'15px', color: '#0056d2', cursor: 'pointer', textDecoration: 'underline' }}
            >
              Sign up
            </button>
            </p>
                </div>

            </div>
        </div>
    )
}

export default Login;
