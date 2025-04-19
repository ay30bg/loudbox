// ThankYouPage.js
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { FaCheckCircle } from 'react-icons/fa';
import './thankYouPage.css';

function ThankYouPage({ navigateToLanding, navigateToViewTicket }) {
  const navigate = useNavigate();
  const { id } = useParams();
  const { state } = useLocation();
  const [error, setError] = useState(null);

  // Protect the page: Redirect if payment wasn't successful
  useEffect(() => {
    const isPaymentSuccessful = localStorage.getItem('paymentSuccessful') === 'true';
    if (!isPaymentSuccessful) {
      navigate('/ticket-purchase/' + id);
    }
  }, [id, navigate]);

  // Destructure order details from state
  const {
    eventTitle = 'Event',
    ticketQuantity = 1,
    totalPrice = 0,
    firstName = 'Guest',
    lastName = '',
    email = 'N/A',
    isGift = false,
    recipientFirstName = '',
    recipientLastName = '',
    recipientEmail = '',
    transactionReference = 'N/A',
    ticketId = 'TICKET123', // Add for verification
  } = state || {};

  const handleReturnHome = () => {
    localStorage.removeItem('paymentSuccessful'); // Clear payment status
    navigateToLanding();
  };

  const handleViewTicket = () => {
    console.log('handleViewTicket called with transactionReference:', transactionReference);
    if (transactionReference && transactionReference !== 'N/A') {
      console.log('Navigating to ticket details:', transactionReference);
      navigateToViewTicket(transactionReference, state);
    } else {
      console.error('Invalid transaction reference');
      setError('Unable to view ticket: Invalid transaction reference');
    }
  };


  return (
    <div className="thank-you-container">
      <div className="thank-you-card">
        <div className="thank-you-header">
          <FaCheckCircle className="success-icon" />
          <h2>Thank You for Your Purchase!</h2>
        </div>
        <p className="confirmation-message">
          Your payment for <strong>{eventTitle}</strong> was successful. A confirmation email will be sent to{' '}
          <strong>{email}</strong> soon.
        </p>
        {error && <div className="error-message">{error}</div>}
        <hr className="summary-divider" />
        <div className="order-details">
          <h3>Order Summary</h3>
          <div className="detail-item">
            <span className="detail-label">Transaction Reference:</span>
            <span className="detail-value">{transactionReference}</span>
          </div>
          <div className="detail-item">
            <span className="detail-label">Ticket ID:</span>
            <span className="detail-value">{ticketId}</span>
          </div>
          <div className="detail-item">
             <span className='detail-label'>Customer Name</span>
            <span className="detail-value">
              {firstName} {lastName}
            </span>
          </div>
          <div className="detail-item">
          <span className='detail-label'>Customer Email</span>
            <span className="detail-value">{email}</span>
          </div>
          <div className="detail-item">
            <span className="detail-label">Event:</span>
            <span className="detail-value">{eventTitle}</span>
          </div>
          <div className="detail-item">
            <span className="detail-label">Tickets Purchased:</span>
            <span className="detail-value">{ticketQuantity}</span>
          </div>
          <div className="detail-item">
            <span className="detail-label">Total Paid:</span>
            <span className="detail-value">NGN {totalPrice.toLocaleString()}</span>
          </div>
          {isGift && (
            <div className="gift-details">
              <h4>Gift Details</h4>
              <div className="detail-item">
              <span className='detail-label'>Recipient Name</span>
                <span className="detail-value">
                  {recipientFirstName} {recipientLastName}
                </span>
              </div>
              <div className="detail-item">
              <span className='detail-label'>Recipient Email</span>
                <span className="detail-value">{recipientEmail}</span>
              </div>
            </div>
          )}
        </div>
        <hr className="summary-dot-divider" />
        <div className="action-buttons">
        <button
            onClick={handleViewTicket}
            className="view-ticket-button"
            aria-label="View your ticket"
          >
            View Ticket
          </button>
          <button
            onClick={handleReturnHome}
            className="return-home-button"
            aria-label="Return to home page"
          >
            Return to Home
          </button>
        </div>
      </div>
    </div>
  );
}

export default ThankYouPage;
