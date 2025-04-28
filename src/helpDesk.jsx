import React, { useState } from 'react';
import { FaTicketAlt, FaQuestionCircle, FaTimes, FaHeadset, FaCommentDots } from 'react-icons/fa';
import Footer from './footer';
import './helpDesk.css';

function HelpDesk({ navigateToLanding }) {
    // State for ticket form modal
    const [isTicketModalOpen, setIsTicketModalOpen] = useState(false);
    const [ticketForm, setTicketForm] = useState({
        subject: '',
        description: '',
        category: 'General',
        eventId: '',
    });

    // State for FAQ collapse
    const [openFaqIndex, setOpenFaqIndex] = useState(null);

    // Mock events (replace with API call to your backend)
    const events = [
        { id: '1', name: 'Concert A' },
        { id: '2', name: 'Festival B' },
    ];

    // FAQs
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

    // Handle ticket form submission
    const handleTicketSubmit = (e) => {
        e.preventDefault();
        console.log('Submitting ticket:', ticketForm);
        // Replace with backend API call
        alert('Ticket submitted! Our team will follow up soon.');
        setIsTicketModalOpen(false);
        setTicketForm({ subject: '', description: '', category: 'General', eventId: '' });
    };

    // Toggle FAQ collapse
    const toggleFaq = (index) => {
        setOpenFaqIndex(openFaqIndex === index ? null : index);
    };

    // Handle AI Live Chat button click (mock implementation)
    const handleLiveChat = () => {
        alert('Starting AI Live Chat...'); // Replace with actual chat integration
        // Example: Open a chat widget or redirect to a chat service
    };

    return (
        <div>
            <div className="helpdesk-page">
                {/* Header Section */}
                <header className="helpdesk-header">
                    <div className="header-icon">
                        <FaHeadset />
                    </div>
                    <h1>Helpdesk Support</h1>
                    <p>We're here to assist you with any questions or issues. Browse our FAQs, submit a ticket, or chat with our AI assistant.</p>
                    <div className="header-divider"></div>
                </header>

                {/* Support Options Section */}
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

                {/* FAQ Section */}
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

                {/* Ticket Creation Modal */}
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
                            <h2>Create a Support Ticket</h2>
                            <form onSubmit={handleTicketSubmit} className="ticket-form">
                                <div className="form-group">
                                    <label htmlFor="subject">Subject</label>
                                    <input
                                        type="text"
                                        id="subject"
                                        value={ticketForm.subject}
                                        onChange={(e) => setTicketForm({ ...ticketForm, subject: e.target.value })}
                                        required
                                        aria-required="true"
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
                                        rows="5"
                                    />
                                </div>
                                <button type="submit" className="submit-button">
                                    Submit Ticket
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
