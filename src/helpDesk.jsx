import React, { useState, useEffect } from 'react';
import { FaTicketAlt, FaQuestionCircle, FaTimes, FaHeadset, FaCommentDots } from 'react-icons/fa';
import axios from 'axios';
import Footer from './footer';
import './helpDesk.css';

function HelpDesk({ navigateToLanding }) {
    const [isTicketModalOpen, setIsTicketModalOpen] = useState(false);
    const [ticketForm, setTicketForm] = useState({
        subject: '',
        description: '',
        category: 'General',
        eventId: '',
        email: '',
    });
    const [openFaqIndex, setOpenFaqIndex] = useState(null);
    const [submissionStatus, setSubmissionStatus] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [events, setEvents] = useState([]);

    const faqs = [
        {
            question: 'How do I purchase tickets?',
            answer: 'Visit the Events page, select an event, and follow the ticket purchase steps.',
        },
        {
            question: 'Can I get a refund for my ticket?',
            answer: 'Refunds are available within 24 hours of purchase. Contact support for assistance.',
        },
        {
            question: 'How do I check my ticket status?',
            answer: 'Visit the Ticket Details page with your transaction reference.',
        },
    ];

    // Fetch events
    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/support-tickets/events`);
                setEvents(response.data);
            } catch (error) {
                console.error('Error fetching events:', error);
                setSubmissionStatus({ type: 'error', message: 'Failed to load events.' });
            }
        };
        fetchEvents();
    }, []);

    const handleTicketSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSubmissionStatus(null);

        // Client-side validation
        if (ticketForm.subject.length < 5) {
            setSubmissionStatus({ type: 'error', message: 'Subject must be at least 5 characters.' });
            setIsSubmitting(false);
            return;
        }
        if (ticketForm.description.length < 10) {
            setSubmissionStatus({ type: 'error', message: 'Description must be at least 10 characters.' });
            setIsSubmitting(false);
            return;
        }
        if (!ticketForm.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(ticketForm.email)) {
            setSubmissionStatus({ type: 'error', message: 'Please enter a valid email address.' });
            setIsSubmitting(false);
            return;
        }

        try {
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/support-tickets`, {
                ...ticketForm,
                userId: 'guest', // Replace with authenticated user ID
            });
            setSubmissionStatus({ type: 'success', message: 'Ticket submitted successfully!' });
            setIsTicketModalOpen(false);
            setTicketForm({ subject: '', description: '', category: 'General', eventId: '', email: '' });
        } catch (error) {
            console.error('Error submitting ticket:', error);
            setSubmissionStatus({
                type: 'error',
                message: error.response?.data?.message || 'Failed to submit ticket. Please try again.',
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    const toggleFaq = (index) => {
        setOpenFaqIndex(openFaqIndex === index ? null : index);
    };

    const handleLiveChat = () => {
        if (window.Tawk_API && window.Tawk_API.maximize) {
            window.Tawk_API.maximize();
        } else {
            setTimeout(() => {
                if (window.Tawk_API && window.Tawk_API.maximize) {
                    window.Tawk_API.maximize();
                } else {
                    alert('Chat service failed to load. Please refresh the page.');
                }
            }, 1000);
        }
    };

    useEffect(() => {
        const showWidget = () => {
            if (window.Tawk_API && window.Tawk_API.showWidget) {
                window.Tawk_API.showWidget();
            }
        };
        if (window.Tawk_API && window.Tawk_API.loaded) {
            showWidget();
        } else {
            window.Tawk_API = window.Tawk_API || {};
            window.Tawk_API.onLoad = showWidget;
        }
        return () => {
            if (window.Tawk_API && window.Tawk_API.hideWidget) {
                window.Tawk_API.hideWidget();
            }
        };
    }, []);

    return (
        <div>
            <div className="helpdesk-page">
                <header className="helpdesk-header">
                    <div className="header-icon">
                        <FaHeadset />
                    </div>
                    <h1>Helpdesk Support</h1>
                    <p>We're here to assist you with any questions or issues. Browse our FAQs, submit a ticket, or chat with our AI assistant.</p>
                    <div className="header-divider"></div>
                </header>

                <section className="support-options">
                    <div className="support-card">
                        <FaCommentDots className="card-icon" />
                        <h2>AI Live Chat</h2>
                        <p>Chat with our AI assistant for instant help with your questions or issues.</p>
                        <button
                            onClick={handleLiveChat}
                            className="card-button chat-button"
                            aria-label="Start AI live chat"
                        >
                            Start Chat
                        </button>
                    </div>
                    <div className="support-card">
                        <FaTicketAlt className="card-icon" />
                        <h2>Create a Ticket</h2>
                        <p>Submit a detailed support request, and our team will follow up via email.</p>
                        <button
                            onClick={() => setIsTicketModalOpen(true)}
                            className="card-button ticket-button"
                            aria-label="Open ticket form"
                        >
                            Create Ticket
                        </button>
                    </div>
                </section>

                <section className="faq-section">
                    <h2>Frequently Asked Questions</h2>
                    {faqs.map((faq, index) => (
                        <div key={index} className="faq-item">
                            <button
                                className="faq-question"
                                onClick={() => toggleFaq(index)}
                                aria-expanded={openFaqIndex === index}
                                aria-controls={`faq-answer-${index}`}
                            >
                                <FaQuestionCircle className="faq-icon" />
                                {faq.question}
                            </button>
                            <div
                                id={`faq-answer-${index}`}
                                className={`faq-answer ${openFaqIndex === index ? 'open' : ''}`}
                            >
                                <p>{faq.answer}</p>
                            </div>
                        </div>
                    ))}
                </section>

                {isTicketModalOpen && (
                    <div className="modal-overlay">
                        <div className="modal-content">
                            <button
                                className="modal-close"
                                onClick={() => setIsTicketModalOpen(false)}
                                aria-label="Close ticket form"
                            >
                                <FaTimes />
                            </button>
                            <h2 id="ticket-form-title">Create a Support Ticket</h2>
                            {submissionStatus && (
                                <div
                                    id="submission-status"
                                    className={`status-message ${submissionStatus.type}`}
                                    role="alert"
                                >
                                    {submissionStatus.message}
                                </div>
                            )}
                            <form onSubmit={handleTicketSubmit} className="ticket-form" aria-labelledby="ticket-form-title">
                                <div className="form-group">
                                    <label htmlFor="email">Email</label>
                                    <input
                                        type="email"
                                        id="email"
                                        value={ticketForm.email}
                                        onChange={(e) => setTicketForm({ ...ticketForm, email: e.target.value })}
                                        required
                                        aria-required="true"
                                        aria-describedby={submissionStatus ? 'submission-status' : undefined}
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="subject">Subject</label>
                                    <input
                                        type="text"
                                        id="subject"
                                        value={ticketForm.subject}
                                        onChange={(e) => setTicketForm({ ...ticketForm, subject: e.target.value })}
                                        required
                                        aria-required="true"
                                        aria-describedby={submissionStatus ? 'submission-status' : undefined}
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="category">Category</label>
                                    <select
                                        id="category"
                                        value={ticketForm.category}
                                        onChange={(e) => setTicketForm({ ...ticketForm, category: e.target.value })}
                                    >
                                        <option value="General">General Inquiry</option>
                                        <option value="Ticketing">Ticketing Issue</option>
                                        <option value="Payment">Payment Issue</option>
                                        <option value="Event">Event Inquiry</option>
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="eventId">Related Event (Optional)</label>
                                    <select
                                        id="eventId"
                                        value={ticketForm.eventId}
                                        onChange={(e) => setTicketForm({ ...ticketForm, eventId: e.target.value })}
                                    >
                                        <option value="">Select an Event</option>
                                        {events.map((event) => (
                                            <option key={event.id} value={event.id}>
                                                {event.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="description">Description</label>
                                    <textarea
                                        id="description"
                                        value={ticketForm.description}
                                        onChange={(e) => setTicketForm({ ...ticketForm, description: e.target.value })}
                                        required
                                        aria-required="true"
                                        aria-describedby={submissionStatus ? 'submission-status' : undefined}
                                        rows="5"
                                    />
                                </div>
                                <button
                                    type="submit"
                                    className="submit-button"
                                    disabled={isSubmitting}
                                    aria-busy={isSubmitting ? 'true' : 'false'}
                                >
                                    {isSubmitting ? 'Submitting...' : 'Submit Ticket'}
                                </button>
                            </form>
                        </div>
                    </div>
                )}
            </div>
            <Footer />
        </div>
    );
}

export default HelpDesk;
