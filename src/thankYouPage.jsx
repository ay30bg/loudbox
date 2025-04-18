// ThankYouPage.js
import React, { useEffect } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { FaCheckCircle } from 'react-icons/fa';
import './thankYouPage.css';

function ThankYouPage({ navigateToLanding }) {
  const navigate = useNavigate();
  const { id } = useParams();
  const { state } = useLocation();

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
  } = state || {};

  const handleReturnHome = () => {
    localStorage.removeItem('paymentSuccessful'); // Clear payment status
    navigateToLanding();
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
        <hr className="summary-divider" />
        <div className="order-details">
          <h3>Order Summary</h3>
          <div className="detail-item">
            <span className="detail-label">Transaction Reference:</span>
            <span className="detail-value">{transactionReference}</span>
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