import React, { useState } from "react";
import logo from './logo.png';
import { FaBars, FaTimes, FaShoppingCart } from "react-icons/fa";
import './header.css';

function Header({ onLogout, 
                 navigateToLanding, 
                 navigateToHelpdesk, 
                 navigateToAboutUs,
                 navigateToForOrganizers
                }) {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [email, setEmail] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleCartClick = () => {
        console.log('Cart icon clicked');
    };

    const handleMenuClick = () => {
        console.log('Menu icon clicked');
        setIsSidebarOpen((prev) => !prev);
    };
    
    const handleNavLinkClick = (link) => {
        console.log(`${link} link clicked`);
        setIsSidebarOpen(false);

        if (link === 'Helpdesk') {
            if (navigateToHelpdesk) {
                console.log('Calling navigateToHelpdesk');
                navigateToHelpdesk();
            } else {
                console.error('navigateToHelpdesk is undefined');
            }
        } else if (link === 'About Us') {
            if (navigateToAboutUs) {
                console.log('Calling navigateToAboutUs');
                navigateToAboutUs();
            } else {
                console.error('navigateToAboutUs is undefined');
            }
        } else if (link === 'Organizers') {
            if (navigateToForOrganizers){
            console.log('Calling navigateToForOrganizers');
            navigateToForOrganizers();
        } else {
            console.error('navigateToForOrganizers is undefined');
        }
        }
         };


    const handleLogoClick = () => {
        console.log('Logo clicked');
        navigateToLanding();
    };

    // const handleLogoutClick = () => {
    //     console.log('Log Out clicked');
    //     setIsSidebarOpen(false);
    //     onLogout();
    // };

    // const handleSubscribe = async (e) => {
    //     e.preventDefault();
    //     if (!email) {
    //         alert("Please enter an email address.");
    //         return;
    //     }
    //     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    //     if (!emailRegex.test(email)) {
    //         alert("Please enter a valid email address.");
    //         return;
    //     }

    //     setIsSubmitting(true);
    //     try {
    //         const response = await fetch('https://connect.mailerlite.com/api/subscribers', {
    //             method: 'POST',
    //             headers: {
    //                 'Content-Type': 'application/json',
    //                 'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiI0IiwianRpIjoiMTZhMWZlZjVkMzkwNzQ0ZGExZmM5ODY5ODk5OGE4Yzc5NDY4MTkyYTM3NjMzOTc2NWM3NTE0NzE3NmI5YjI5NmMzYWI5NDRlZTcwZDBmZGUiLCJpYXQiOjE3NDQ2MTc1OTcuNzgzNTMyLCJuYmYiOjE3NDQ2MTc1OTcuNzgzNTM1LCJleHAiOjQ5MDAyOTExOTcuNzc4MjY2LCJzdWIiOiIxNDY0MjMzIiwic2NvcGVzIjpbXX0.IE1c6HFYxbnANmn1xpyrdOye6kg-CI4H3fV0_v9yb3lpr9HqVVl82bYWKRVDE9WbKZesc4zQRy-hDUUrXRsvjdeCq9UfzyygL1wP1VGIyDfFIQgKcmrc-ClHYUgv7TvAIBlQK5Y2_OOpP3FO-A2Jgg_ExbA_i7BXSKCrPmQovFYsro1IgjIPU5vCzNE8W4B4DFFKj3qMVS6Lk6o_BTefr5fSy6KxeTH8I_1WflTsq7vV4kQVVKaGdYWq2GfBA4ZrL_ess32Jf49O2NoynOzSS5G1aVCynEm287qc9WuV4qxrj6qtmWAK8_axFU8bviRGTBbFGX5OraBYQHBgdrhicOtMTQFaFz07aphGbd11aTKfW5gMXI9WWTDcygLP29f3eSkeDgrxmH-ph5UyQWIQ0KLxXU7HWE9X2DuCYx6x4HZKNNiTdbYA6QegjRr7EfSfxewDWbekQpK0H8Qyr2cajFKmS1smQx12ET9i8ekBFhrJnk3wFj07uuBb7BK1aHGkREoXT8Vgf1qL_yYbz-CZVc8SlpCvfcTTwaZ-YGHlo3VhtkyNhxJ6IfVS34FmVLqTJNFJoIWbiV96krxiTrwe8FeHO8Z0RTKAPSFVRUOP9soXH8PQH0yolhKa94HoAZZVd5GEsz0cl27R6DRRivpEjTP0sYYn6v6GsnPbXmWx-Yk', // Replace with your API key
    //             },
    //             body: JSON.stringify({
    //                 email,
    //                 groups: ['151642661005035375'], // Replace with your group ID
    //                 status: 'active',
    //             }),
    //         });

    //         if (!response.ok) {
    //             const errorData = await response.json();
    //             console.error('MailerLite error:', response.status, errorData);
    //             throw new Error(errorData.message || 'Subscription failed');
    //         }

    //         alert("Subscribed successfully!");
    //         setEmail("");
    //     } catch (err) {
    //         alert("Failed to subscribe: " + err.message);
    //     } finally {
    //         setIsSubmitting(false);
    //     }
    // };

// Helper function to check if an email is already subscribed
    const checkSubscriptionStatus = async (email) => {
        try {
            const response = await fetch(`https://connect.mailerlite.com/api/subscribers/${encodeURIComponent(email)}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${process.env.REACT_APP_MAILERLITE_API_KEY}`, // Use environment variable
                },
            });

            if (response.ok) {
                const data = await response.json();
                return data.data.status === 'active'; // Returns true if email is subscribed and active
            } else if (response.status === 404) {
                return false; // Email not found, not subscribed
            } else {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Failed to check subscription status');
            }
        } catch (err) {
            console.error('Error checking subscription:', err);
            return false; // Assume not subscribed on error to proceed with subscription
        }
    };

    const handleSubscribe = async (e) => {
        e.preventDefault();
        if (!email) {
            alert("Please enter an email address.");
            return;
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert("Please enter a valid email address.");
            return;
        }

        setIsSubmitting(true);
        try {
            // Check if the email is already subscribed
            const isSubscribed = await checkSubscriptionStatus(email);
            if (isSubscribed) {
                alert("This email is already subscribed to the newsletter.");
                setEmail("");
                return;
            }

            // Proceed with subscription
            const response = await fetch('https://connect.mailerlite.com/api/subscribers', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${process.env.REACT_APP_MAILERLITE_API_KEY}`, // Use environment variable
                },
                body: JSON.stringify({
                    email,
                    groups: ['151642661005035375'], // Your group ID
                    status: 'active',
                }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                if (response.status === 422 && errorData.message.includes("already been subscribed")) {
                    alert("This email is already subscribed to the newsletter.");
                    setEmail("");
                    return;
                }
                throw new Error(errorData.message || 'Subscription failed');
            }

            alert("Subscribed successfully!");
            setEmail("");
        } catch (err) {
            alert("Failed to subscribe: " + err.message);
        } finally {
            setIsSubmitting(false);
        }
    }
  
    return (
        <div className="header-container">
            <img src={logo} alt="Loudbox logo" className="logo-img" onClick={handleLogoClick} />
            <div className="icons-container">
                <FaShoppingCart className="icons" onClick={handleCartClick} aria-label="View cart" />
                <FaBars className="icons" onClick={handleMenuClick} aria-label="Open menu" />
            </div>
            <div className="nav-links-container">
                <button
                    className="nav-link"
                    onClick={() => handleNavLinkClick('Events')}
                >
                    Events
                </button>
                <button
                    className="nav-link"
                    onClick={() => handleNavLinkClick('About Us')}
                >
                    About Us
                </button>
                <button
                    className="nav-link"
                    onClick={() => handleNavLinkClick('Helpdesk')}
                >
                    Helpdesk
                </button>
                {onLogout && (
                    <button
                        className="logout-btn"
                        onClick={onLogout}
                    >
                        Log Out
                    </button>
                )}
            </div>

            {/* Revamped Sidebar */}
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
                    <button
                        className="sidebar-link"
                        onClick={() => handleNavLinkClick('Events')}
                    >
                        Events
                    </button>
                    <button
                        className="sidebar-link"
                        onClick={() => handleNavLinkClick('About Us')}
                    >
                        About Us
                    </button>
                    <button
                        className="sidebar-link"
                        onClick={() => handleNavLinkClick('Organizers')}
                    >
                        For Organizers
                    </button>
                    <button
                        className="sidebar-link"
                        onClick={() => handleNavLinkClick('Helpdesk')}
                    >
                        Helpdesk
                    </button>
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
                            {isSubmitting ? "Subscribing..." : "Subscribe"}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Header;
