import React from 'react';
import Footer from './footer';
import logo from './logo.png';
import { FaMusic, FaTicketAlt, FaUsers, FaHeart } from 'react-icons/fa'; // Icons for values
import './aboutUs.css';

function AboutUs({ navigateToLanding, navigateToHelpdesk, navigateToAboutUs, onLogout, isLoggedIn }) {
  const handleExploreEvents = () => {
    console.log('Explore Events clicked');
    navigateToLanding();
  };

  return (
    <div className="about-us-container">
      
      {/* Hero Section */}
      <section className="about-hero animate-section">
        <img src={logo} alt="Loudbox logo" className="about-logo" />
        <h1>About Loudbox</h1>
        <p>Connecting you to unforgettable live experiences.</p>
      </section>

      {/* Our Story Section */}
      <section className="our-story animate-section">
        <h2>Our Story</h2>
        <p>
          Founded in 2023, Loudbox was born out of a passion for live events and a mission to make
          ticket purchasing simple, secure, and exciting. We saw a need for a platform that not only
          connects fans with their favorite concerts, festivals, and shows but also celebrates the
          energy and community of live experiences. From local gigs to global tours, Loudbox is here
          to amplify your moments.
        </p>
      </section>

      {/* Mission Section */}
      <section className="our-mission animate-section">
        <h2>Our Mission</h2>
        <p>
          At Loudbox, we believe that every event is a story waiting to be told. Our mission is to
          empower fans by providing a seamless, transparent, and fan-focused ticketing experience. We
          strive to make every click a step closer to the music, laughter, and memories you’ll cherish
          forever.
        </p>
      </section>

      {/* Values Section */}
      <section className="our-values animate-section">
        <h2>Our Values</h2>
        <div className="values-grid">
          <div className="value-card">
            <FaMusic className="value-icon" />
            <h3>Passion</h3>
            <p>We’re fans first, driven by a love for live events and the communities they create.</p>
          </div>
          <div className="value-card">
            <FaTicketAlt className="value-icon" />
            <h3>Transparency</h3>
            <p>No hidden fees, no surprises—just clear pricing and honest service.</p>
          </div>
          <div className="value-card">
            <FaUsers className="value-icon" />
            <h3>Accessibility</h3>
            <p>Events for everyone, with a platform that’s easy to use on any device.</p>
          </div>
          <div className="value-card">
            <FaHeart className="value-icon" />
            <h3>Community</h3>
            <p>Supporting artists, venues, and fans to keep the live event scene thriving.</p>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="cta-section animate-section">
        <h2>Join the Loudbox Experience</h2>
        <p>
          Ready to discover your next unforgettable event? Explore our lineup of concerts, festivals,
          and more!
        </p>
        <button className="cta-button" onClick={handleExploreEvents}>
          Explore Events
        </button>
      </section>

      <Footer />
    </div>
  );
}

export default AboutUs;
