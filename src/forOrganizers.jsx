import React, { useState } from 'react';
import Footer from './footer';
import logo from './logo.png';
import { FaRocket, FaUsers, FaDollarSign, FaChartLine, FaHeadset, FaClipboardList } from 'react-icons/fa';
import './forOrganizers.css';

function ForOrganizers({ navigateToLanding, navigateToHelpdesk }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    organization: '',
    eventType: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.email || !formData.name) {
      alert('Please fill in all required fields.');
      return;
    }
    setIsSubmitting(true);
    try {
      // Placeholder for API call (e.g., to MailerLite or backend)
      console.log('Organizer form submitted:', formData);
      alert('Thank you for your interest! We’ll get back to you within 24 hours.');
      setFormData({ name: '', email: '', organization: '', eventType: '', message: '' });
    } catch (err) {
      alert('Failed to submit: ' + err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="organizers-container">

      {/* Hero Section */}
      <section className="organizers-hero animate-section">
        <img src={logo} alt="Loudbox logo" className="organizers-logo" />
        <h1>Grow Your Events with Loudbox</h1>
        <p>Reach millions of fans with our seamless ticketing platform.</p>
        <button className="my-hero-cta" onClick={() => document.getElementById('signup-form').scrollIntoView()}>
          Get Started
        </button>
      </section>

      {/* Why Loudbox Section */}
      <section className="why-loudbox animate-section">
        <h2>Why Choose Loudbox?</h2>
        <p>
          Loudbox empowers event organizers with the tools and support to create unforgettable experiences.
          From local gigs to global festivals, we make ticketing simple, secure, and scalable.
        </p>
        <div className="benefits-grid">
          <div className="benefit-card">
            <FaRocket className="benefit-icon" />
            <h3>Easy Event Setup</h3>
            <p>Create and manage events with our intuitive dashboard.</p>
          </div>
          <div className="benefit-card">
            <FaUsers className="benefit-icon" />
            <h3>Global Reach</h3>
            <p>Connect with millions of fans through our platform and marketing tools.</p>
          </div>
          <div className="benefit-card">
            <FaDollarSign className="benefit-icon" />
            <h3>Secure Payments</h3>
            <p>Fast, reliable payouts with transparent pricing.</p>
          </div>
          <div className="benefit-card">
            <FaChartLine className="benefit-icon" />
            <h3>Real-Time Analytics</h3>
            <p>Track ticket sales and attendee data with powerful insights.</p>
          </div>
          <div className="benefit-card">
            <FaHeadset className="benefit-icon" />
            <h3>Dedicated Support</h3>
            <p>24/7 assistance from our organizer success team.</p>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="how-it-works animate-section">
        <h2>How It Works</h2>
        <div className="steps-grid">
          <div className="step-card">
            <span className="step-number">1</span>
            <h3>Sign Up</h3>
            <p>Create an organizer account in minutes.</p>
          </div>
          <div className="step-card">
            <span className="step-number">2</span>
            <h3>Create Your Event</h3>
            <p>Use our dashboard to set up event details and ticketing options.</p>
          </div>
          <div className="step-card">
            <span className="step-number">3</span>
            <h3>Promote</h3>
            <p>Leverage Loudbox’s marketing tools to reach your audience.</p>
          </div>
          <div className="step-card">
            <span className="step-number">4</span>
            <h3>Sell Tickets</h3>
            <p>Track sales in real-time and manage attendees.</p>
          </div>
          <div className="step-card">
            <span className="step-number">5</span>
            <h3>Get Paid</h3>
            <p>Receive secure payouts after your event.</p>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      {/* <section className="testimonials animate-section">
        <h2>What Organizers Say</h2>
        <div className="testimonials-grid">
          <div className="testimonial-card">
            <p>“Loudbox made our festival a sold-out success! The dashboard is a game-changer.”</p>
            <h4>Jane Doe, Festival Organizer</h4>
          </div>
          <div className="testimonial-card">
            <p>“The support team was with us every step of the way. Highly recommend!”</p>
            <h4>John Smith, Concert Promoter</h4>
          </div>
          <div className="testimonial-card">
            <p>“Transparent fees and fast payouts made our event stress-free.”</p>
            <h4>Emily Chen, Theater Director</h4>
          </div>
        </div>
      </section> */}

      {/* Sign-Up Form Section */}
      <section className="signup-section animate-section" id="signup-form">
        <h2>Get Started Today</h2>
        <p>
          Ready to list your events on Loudbox? Fill out the form below, and our team will guide you
          through the process.
        </p>
        <form className="organizers-form" onSubmit={handleSubmit}>
          <label htmlFor="organizer-name" className="sr-only">Full Name</label>
          <input
            id="organizer-name"
            type="text"
            placeholder="Full Name *"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
            disabled={isSubmitting}
          />
          <label htmlFor="organizer-email" className="sr-only">Email Address</label>
          <input
            id="organizer-email"
            type="email"
            placeholder="Email Address *"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            required
            disabled={isSubmitting}
          />
          <label htmlFor="organizer-org" className="sr-only">Organization Name</label>
          <input
            id="organizer-org"
            type="text"
            placeholder="Organization Name"
            value={formData.organization}
            onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
            disabled={isSubmitting}
          />
          <label htmlFor="organizer-event" className="sr-only">Event Type</label>
          <input
            id="organizer-event"
            type="text"
            placeholder="Event Type (e.g., Concert, Festival)"
            value={formData.eventType}
            onChange={(e) => setFormData({ ...formData, eventType: e.target.value })}
            disabled={isSubmitting}
          />
          <label htmlFor="organizer-message" className="sr-only">Message</label>
          <textarea
            id="organizer-message"
            placeholder="Tell us about your event or needs"
            value={formData.message}
            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            disabled={isSubmitting}
          />
          <button type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Submitting...' : 'Submit Inquiry'}
          </button>
        </form>
      </section>

      {/* Resources Section */}
      <section className="resources animate-section">
        <h2>Resources for Organizers</h2>
        <div className="resources-grid">
          <div className="resource-card">
            <FaClipboardList className="resource-icon" />
            <h3>Event Setup Guide</h3>
            <p>Learn how to create and manage your events with our step-by-step guide.</p>
            <a href="/guides/event-setup" onClick={(e) => e.preventDefault()}>Read More</a>
          </div>
          <div className="resource-card">
            <FaClipboardList className="resource-icon" />
            <h3>Promotion Tips</h3>
            <p>Maximize ticket sales with our marketing strategies.</p>
            <a href="/guides/promotion" onClick={(e) => e.preventDefault()}>Read More</a>
          </div>
          <div className="resource-card">
            <FaClipboardList className="resource-icon" />
            <h3>Organizer FAQs</h3>
            <p>Answers to common questions about fees, payouts, and more.</p>
            <a href="/helpdesk" onClick={navigateToHelpdesk}>Visit Helpdesk</a>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="cta-sections animate-section">
        <h2>Ready to Amplify Your Events?</h2>
        <p>Join Loudbox today or contact our team for personalized support.</p>
        <div className="cta-buttonss">
          <button className='organizers-cta-button' onClick={() => document.getElementById('signup-form').scrollIntoView()}>
            Get Started
          </button>
          <button className='organizers-cta-button' onClick={navigateToHelpdesk}>Visit Helpdesk</button>
          <button className='organizers-cta-button' onClick={navigateToLanding}>Explore Events</button>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default ForOrganizers;
