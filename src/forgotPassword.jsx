import React, { useState } from 'react';
import Logo from './logo.png';
import './login.css';

function ForgotPassword({ navigateToLogin }) {
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');
        setIsLoading(true);

        if (!validateEmail(email)) {
            setError('Please enter a valid email address.');
            setIsLoading(false);
            return;
        }

        try {
            const response = await fetch(process.env.REACT_APP_API_URL + '/api/forgot-password', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || `HTTP error! Status: ${response.status}`);
            }

            // Removed unused 'data' variable
            await response.json(); // Still parse the response to ensure it's valid JSON
            setSuccess('A password reset link has been sent to your email.');
            setEmail(''); // Clear the input
        } catch (error) {
            console.error('Forgot password error:', error);
            setError(error.message || 'Failed to send reset link. Please try again.');
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
                    <h2>Reset Your Password</h2>
                    {error && <p className="error-message" style={{ color: 'red' }}>{error}</p>}
                    {success && <p className="success-message" style={{ color: 'green' }}>{success}</p>}
                    <p style={{ textAlign: 'center', margin: '10px 0' }}>
                        Enter your email address to receive a password reset link.
                    </p>
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
                        <button
                            type="submit"
                            className="sign-in-button"
                            disabled={isLoading}
                        >
                            {isLoading ? 'Sending...' : 'Send Reset Link'}
                        </button>
                    </form>
                    <p className="sign-up">
                        Back to
                        <button
                            onClick={navigateToLogin}
                            style={{
                                background: 'none',
                                border: 'none',
                                fontSize: '15px',
                                color: '#0056d2',
                                cursor: 'pointer',
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

export default ForgotPassword;
