import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from './logo.png';
import { FaBars, FaTimes, FaBell } from 'react-icons/fa';
import './header.css';
import { AuthContext } from './AuthContext';

function Header({
  navigateToLanding,
  navigateToHelpdesk,
  navigateToAboutUs,
  navigateToForOrganizers,
  navigateToMyTickets
}) {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoginLoading, setIsLoginLoading] = useState(false);
  const [isLogoutLoading, setIsLogoutLoading] = useState(false);

   const handleNotificationsClick = () => {
        console.log('Notifications icon clicked');
        navigate('/notifications'); // Navigate to notifications page
    };

  const handleMenuClick = () => {
    console.log('Menu icon clicked, isSidebarOpen:', !isSidebarOpen);
    setIsSidebarOpen((prev) => !prev);
  };

  const handleOverlayClick = () => {
    console.log('Overlay clicked, closing sidebar');
    setIsSidebarOpen(false);
  };

  const handleNavLinkClick = (link) => {
        console.log(`${link} link clicked`);
        setIsSidebarOpen(false);

        if (link === 'Helpdesk' && navigateToHelpdesk) {
            console.log('Calling navigateToHelpdesk');
            navigateToHelpdesk();
        } else if (link === 'About Us' && navigateToAboutUs) {
            console.log('Calling navigateToAboutUs');
            navigateToAboutUs();
        } else if (link === 'My Tickets' && navigateToMyTickets) {
            console.log('Calling navigateToMyTickets');
            navigateToMyTickets();
        } else if (link === 'Organizers' && navigateToForOrganizers) {
            console.log('Calling navigateToForOrganizers');
            navigateToForOrganizers();
        } else {
            console.error(`Navigation function for ${link} is undefined`);
        }
    };

  const handleLogoClick = () => {
    console.log('Logo clicked');
    navigateToLanding();
  };

  const handleLoginClick = async () => {
    console.log('Login clicked');
    setIsLoginLoading(true);
    try {
      setIsSidebarOpen(false);
      navigate('/login');
    } catch (error) {
      console.error('Login navigation failed:', error);
    } finally {
      setIsLoginLoading(false);
    }
  };

  const handleLogoutClick = async () => {
    console.log('Log Out clicked');
    setIsLogoutLoading(true);
    try {
      setIsSidebarOpen(false);
      await logout();
      navigate('/login');
    } catch (error) {
      console.error('Logout failed:', error);
    } finally {
      setIsLogoutLoading(false);
    }
  };

  const checkSubscriptionStatus = async (email) => {
    try {
      const response = await fetch(`https://connect.mailerlite.com/api/subscribers/${encodeURIComponent(email)}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.REACT_APP_MAILERLITE_API_KEY}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        return data.data.status === 'active';
      } else if (response.status === 404) {
        return false;
      } else {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to check subscription status');
      }
    } catch (err) {
      console.error('Error checking subscription:', err);
      return false;
    }
  };

  const handleSubscribe = async (e) => {
    e.preventDefault();
    if (!email) {
      alert('Please enter an email address.');
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert('Please enter a valid email address.');
      return;
    }

    setIsSubmitting(true);
    try {
      const isSubscribed = await checkSubscriptionStatus(email);
      if (isSubscribed) {
        alert('This email is already subscribed to the newsletter.');
        setEmail('');
        return;
      }

      const response = await fetch('https://connect.mailerlite.com/api/subscribers', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.REACT_APP_MAILERLITE_API_KEY}`,
        },
        body: JSON.stringify({
          email,
          groups: ['151642661005035375'],
          status: 'active',
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        if (response.status === 422 && errorData.message.includes('already been subscribed')) {
          alert('This email is already subscribed to the newsletter.');
          setEmail('');
          return;
        }
        throw new Error(errorData.message || 'Subscription failed');
      }

      alert('Subscribed successfully!');
      setEmail('');
    } catch (err) {
      alert('Failed to subscribe: ' + err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="header-container">
      <img src={logo} alt="Loudbox logo" className="logo-img" onClick={handleLogoClick} />
      <div className="icons-container">
        <FaBell className="icons" onClick={handleNotificationsClick} aria-label="View cart" />
        <FaBars className="icons" onClick={handleMenuClick} aria-label="Open menu" />
      </div>
      <div className="nav-links-container">
        <button className="nav-link" onClick={() => handleNavLinkClick('About Us')}>
          About Us
        </button>
        <button className="nav-link" onClick={() => handleNavLinkClick('Helpdesk')}>
          Helpdesk
        </button>
        <button className="nav-link" onClick={() => handleNavLinkClick('My Tickets')}>
          My Tickets
        </button>
        <button className="nav-link" onClick={() => handleNavLinkClick('Organizers')}>
            For Organizers
        </button>
        {user ? (
          <button
            className="logout-btn"
            onClick={handleLogoutClick}
            disabled={isLogoutLoading}
            aria-busy={isLogoutLoading}
            aria-label={isLogoutLoading ? 'Logging out' : 'Log out'}
          >
            {isLogoutLoading ? (
              <span className="loading-spinner">Loading...</span>
            ) : (
              'Log Out'
            )}
          </button>
        ) : (
          <button
            className="login-btn"
            onClick={handleLoginClick}
            disabled={isLoginLoading}
            aria-busy={isLoginLoading}
            aria-label={isLoginLoading ? 'Navigating to login' : 'Log in'}
          >
            {isLoginLoading ? (
              <span className="loading-spinner">Loading...</span>
            ) : (
              'Log In'
            )}
          </button>
        )}
      </div>

      {/* Sidebar */}
      <div className={`sidebar ${isSidebarOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <img src={logo} alt="Loudbox logo" className="sidebar-logo" />
          <button
            className="sidebar-close"
            onClick={() => setIsSidebarOpen(false)}
            aria-label="Close menu"
          >
            <FaTimes />
          </button>
        </div>

        <nav className="sidebar-nav">
          <button className="sidebar-link" onClick={() => handleNavLinkClick('About Us')}>
            About Us
          </button>
          <button className="sidebar-link" onClick={() => handleNavLinkClick('Helpdesk')}>
            Helpdesk
          </button>
          <button className="sidebar-link" onClick={() => handleNavLinkClick('My Tickets')}>
            My Tickets
          </button>
          <button className="sidebar-link" onClick={() => handleNavLinkClick('Organizers')}>
            For Organizers
          </button>
          {user ? (
            <button
              className="sidebar-link logout-btn"
              onClick={handleLogoutClick}
              disabled={isLogoutLoading}
              aria-busy={isLogoutLoading}
              aria-label={isLogoutLoading ? 'Logging out' : 'Log out'}
            >
              {isLogoutLoading ? (
                <span className="loading-spinner">Loading...</span>
              ) : (
                'Log Out'
              )}
            </button>
          ) : (
            <button
              className="sidebar-link login-btn"
              onClick={handleLoginClick}
              disabled={isLoginLoading}
              aria-busy={isLoginLoading}
              aria-label={isLoginLoading ? 'Navigating to login' : 'Log in'}
            >
              {isLoginLoading ? (
                <span className="loading-spinner">Loading...</span>
              ) : (
                'Log In'
              )}
            </button>
          )}
        </nav>

        <div className="sidebar-newsletter">
          <hr className="sidebar-divider" />
          <h4>Subscribe to our newsletter</h4>
          <form className="newsletter-form" onSubmit={handleSubscribe}>
            <input
              type="email"
              placeholder="Enter your email"
              className="newsletter-input"
              aria-label="Email for newsletter"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isSubmitting}
            />
            <button
              type="submit"
              className="newsletter-btn"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Subscribing...' : 'Subscribe'}
            </button>
          </form>
        </div>
      </div>

      {/* Overlay */}
      {isSidebarOpen && (
        <div
          className="sidebar-overlay active"
          onClick={handleOverlayClick}
          role="button"
          aria-label="Close sidebar"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              handleOverlayClick();
            }
          }}
        />
      )}
    </div>
  );
}

export default Header;
