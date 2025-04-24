import React, { useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { FaEnvelope, FaPhone, FaFilePdf, FaFileImage, FaAngleDown, FaUser } from 'react-icons/fa';
import './orderSummary.css';

// Mock events (with subaccount_code)
const mockEvents = [
  {
    id: '1',
    eventOwner: 'Davido',
    title: 'Davido Live In Concert',
    eventImage: 'https://wallpapercat.com/w/middle-retina/4/0/2/2250759-2560x1631-desktop-hd-davido-background-image.jpg',
    description: 'Davido 5ive Album Tour',
    subaccount_code: 'ACCT_567462xff65gop0',
    venue: 'State Farm Arena',
    city: 'Atlanta',
    category: 'Concert',
    month: 'APR',
    date: '17',
    year: '2025',
    time: '17:00',
    about: 'Streamed over 2 billon times...',
    ticketFileName: 'Davido Live In Concert Ticket',
    ticketFileType: 'PNG',
    ticketFileSize: '1.2 MB',
    basePrice: 3000,
  },
  {
    id: '2',
    eventOwner: 'Asake',
    title: 'Lungu Boy Tour',
    eventImage: 'https://www.okayafrica.com/media-library/cover-artwork-for-lungu-boy-by-asake.png?id=53143626&width=1200&height=800&quality=85&coordinates=0%2C0%2C0%2C0',
    description: 'Asake quick stop at Ziggo Dome ',
    subaccount_code: 'ACCT_xxxxxxxxxx', // Replace with actual subaccount code
    venue: 'Ziggo Dome',
    city: 'Amsterdam',
    category: 'Concert',
    month: 'DEC',
    date: '10',
    year: '2025',
    time: '19:00',
    about: '',
    ticketFileName: 'Asake Lungu Boy Tour Ticket',
    ticketFileType: 'PNG',
    ticketFileSize: '100.7 KB',
    basePrice: 2000,
  },
  // ...other events with subaccount_code
];

function OrderSummary({ navigateBack, navigateToThankYou }) {
  const { id } = useParams();
  const { state } = useLocation();
  const [eventData, setEventData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showFileDetails, setShowFileDetails] = useState(false);
  const [paymentError, setPaymentError] = useState(null);
  const [isPaystackLoaded, setIsPaystackLoaded] = useState(false);
  const [isPaying, setIsPaying] = useState(false);

  useEffect(() => {
    const foundEvent = mockEvents.find((e) => e.id === id);
    if (!foundEvent) {
      console.error(`No event found for ID: ${id}`);
    }
    setEventData(foundEvent);
    setLoading(false);
  }, [id]);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://js.paystack.co/v1/inline.js';
    script.async = true;
    script.onload = () => {
      console.log('Paystack script loaded');
      setIsPaystackLoaded(true);
    };
    script.onerror = () => {
      console.error('Failed to load Paystack script');
      setPaymentError('Failed to load payment system. Please try again later.');
    };
    document.body.appendChild(script);

    return () => {
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, []);

  const toggleFileDetails = () => {
    setShowFileDetails((prev) => !prev);
  };

  const {
    firstName = 'Guest',
    lastName = '',
    email = 'No email provided',
    phoneNumber = 'No phone provided',
    ticketQuantity = 1,
    totalPrice = 0,
    isGift = false,
    recipientFirstName = '',
    recipientLastName = '',
    recipientEmail = '',
  } = state || {};

  const createTicket = async (response) => {
    try {
      const ticketData = {
        ticketId: `TICKET-${Date.now()}`,
        transactionReference: response.reference,
        eventId: id,
        eventTitle: eventData?.title || 'Unknown Event',
        firstName,
        lastName,
        email,
        phoneNumber,
        isGift,
        recipientFirstName: isGift ? recipientFirstName : undefined,
        recipientLastName: isGift ? recipientLastName : undefined,
        recipientEmail: isGift ? recipientEmail : undefined,
        ticketQuantity,
        totalPrice,
        subaccountCode: eventData?.subaccount_code || null,
      };

      console.log('Sending ticket data to /api/tickets:', ticketData);
      const ticketResponse = await fetch('https://loudbox-backend.vercel.app/api/tickets', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(ticketData),
      });

      if (!ticketResponse.ok) {
        const errorText = await ticketResponse.text();
        throw new Error(`Failed to create ticket: ${ticketResponse.status} - ${errorText}`);
      }

      const ticketResult = await ticketResponse.json();
      console.log('Ticket created:', ticketResult);

      localStorage.setItem('paymentSuccessful', 'true');
      navigateToThankYou(id, {
        state: {
          ...ticketData,
          transactionReference: ticketResult.transactionReference,
          ticketId: ticketResult.ticketId,
        },
      });
    } catch (err) {
      console.error('Error creating ticket:', err);
      setPaymentError(`Payment successful, but failed to create ticket: ${err.message}. Please contact support.`);
    } finally {
      setIsPaying(false);
    }
  };

  const handlePayment = () => {
    if (!isPaystackLoaded || !window.PaystackPop) {
      setPaymentError('Payment system not ready. Please try again.');
      console.error('PaystackPop not available');
      return;
    }

    setPaymentError(null);
    setIsPaying(true);

    try {
      const handler = window.PaystackPop.setup({
        key: process.env.REACT_APP_PAYSTACK_PUBLIC_KEY || 'pk_test_f5af6c1a30d2bcfed0192f0e8006566fe27441df',
        email: email || 'guest@example.com',
        amount: totalPrice * 100,
        currency: 'NGN',
        ref: `TICKET-${Math.floor(Math.random() * 1000000)}-${Date.now()}`,
        subaccount: eventData?.subaccount_code || undefined,
        bearer: eventData?.subaccount_code ? 'subaccount' : 'account',
        metadata: {
          custom_fields: [
            {
              display_name: 'Event ID',
              variable_name: 'event_id',
              value: id,
            },
            {
              display_name: 'Event Title',
              variable_name: 'event_title',
              value: eventData?.title || 'Unknown Event',
            },
            {
              display_name: 'Ticket Quantity',
              variable_name: 'ticket_quantity',
              value: ticketQuantity,
            },
            {
              display_name: 'Customer Name',
              variable_name: 'customer_name',
              value: `${firstName} ${lastName}`,
            },
            {
              display_name: 'Is Gift',
              variable_name: 'is_gift',
              value: isGift ? 'Yes' : 'No',
            },
            ...(isGift
              ? [
                  {
                    display_name: 'Recipient Name',
                    variable_name: 'recipient_name',
                    value: `${recipientFirstName} ${recipientLastName}`,
                  },
                  {
                    display_name: 'Recipient Email',
                    variable_name: 'recipient_email',
                    value: recipientEmail,
                  },
                ]
              : []),
            {
              display_name: 'Subaccount Code',
              variable_name: 'subaccount_code',
              value: eventData?.subaccount_code || 'None',
            },
          ],
        },
        callback: async (response) => {
          console.log('Paystack response:', response);
          if (response.status === 'success') {
            try {
              const verifyResponse = await fetch('https://loudbox-backend.vercel.app/api/verify-payment', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ reference: response.reference, eventId: id }),
              });

              if (!verifyResponse.ok) {
                throw new Error('Payment verification failed.');
              }

              const verifyResult = await verifyResponse.json();
              if (verifyResult.status === 'success') {
                await createTicket(response);
              } else {
                setPaymentError('Payment verification failed. Please contact support.');
                setIsPaying(false);
              }
            } catch (err) {
              console.error('Verification error:', err);
              setPaymentError(`Payment successful, but verification failed: ${err.message}. Please contact support.`);
              setIsPaying(false);
            }
          } else {
            setPaymentError('Payment failed. Please try again.');
            console.error('Payment failed:', response);
            setIsPaying(false);
          }
        },
        onClose: () => {
          setPaymentError('Payment cancelled.');
          console.log('Paystack popup closed');
          setIsPaying(false);
        },
      });

      handler.openIframe();
    } catch (err) {
      console.error('Payment setup error:', err);
      setPaymentError(`Error initiating payment: ${err.message}. Please try again.`);
      setIsPaying(false);
    }
  };

  if (loading) {
    return <div>Loading event data...</div>;
  }

  if (!eventData) {
    return (
      <div>
        No event found for ID: {id}. Please check the event ID or go back.
        <button onClick={() => navigateBack({ id })} aria-label="Back to ticket purchase">
          Back
        </button>
      </div>
    );
  }

  return (
    <div className={`order-summary-container ${isPaying ? 'blurred' : ''}`}>
      <div className="order-summary-card">
        <div className="order-header-container">
          <h2>Buy {eventData.title} Ticket</h2>
        </div>
        <hr className="summary-divider" />
        <div className="customer-contact">
          <FaUser className="contact-icon" />
          <h4 className="customer-name">
            {firstName || 'N/A'} {lastName || 'N/A'}
          </h4>
        </div>
        <div className="customer-contact">
          <FaEnvelope className="contact-icon" />
          <p className="customer-email">{email || 'No email provided'}</p>
        </div>
        <div className="customer-contact">
          <FaPhone className="contact-icon" />
          <p className="customer-phone">{phoneNumber || 'No phone provided'}</p>
        </div>
        {isGift && (
          <div className="gift-details">
            <h4>Gift Details</h4>
            <p>
              <strong>Recipient Name:</strong> {recipientFirstName || 'Not provided'}{' '}
              {recipientLastName || 'Not provided'}
            </p>
            <p>
              <strong>Recipient Email:</strong> {recipientEmail || 'Not provided'}
            </p>
          </div>
        )}
        <br />
        <div className="file-display-group">
          <div className="file-display-wrapper">
            <span className="file-display-text">
              1 file attached{' '}
              <FaAngleDown
                className="angle-down"
                onClick={toggleFileDetails}
                aria-label="Toggle ticket file details"
              />
            </span>
          </div>
          {showFileDetails && (
            <div className="file-details">
              <div className="file-details-content">
                {eventData.ticketFileType.toLowerCase() === 'pdf' ? (
                  <FaFilePdf className="file-icon" />
                ) : (
                  <FaFileImage className="file-icon" />
                )}
                <div className="file-info">
                  <p className="file-name">{eventData.ticketFileName}</p>
                  <p className="file-meta">
                    Type: {eventData.ticketFileType.toUpperCase()} | Size: {eventData.ticketFileSize}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
        <hr className="summary-dot-divider" />
        <div className="checkout-container">
          <div className="checkout">
            <div className="ticket-quantity-group">
              <h5 className="ticket-event-name">{eventData.title} Ticket</h5>
              <h5>x{ticketQuantity}</h5>
            </div>
            <h5>NGN {(totalPrice / ticketQuantity).toLocaleString()}</h5>
          </div>
          <div className="checkout-total">
            <h5>Total</h5>
            <h5>NGN {totalPrice.toLocaleString()}</h5>
          </div>
        </div>
        <hr className="summary-dot-divider" />
        {paymentError && <p className="error-message">{paymentError}</p>}
        <div className="action-buttons">
          <button
            onClick={handlePayment}
            aria-label={`Pay NGN ${totalPrice.toLocaleString()} for ${eventData.title}`}
            className="payment-button"
            disabled={isPaying || !isPaystackLoaded} // Fixed: Removed invalid '彩色' token
          >
            {isPaying ? 'Processing...' : `Pay NGN ${totalPrice.toLocaleString()}`}
          </button>
          <button
            onClick={() => navigateBack(eventData)}
            aria-label="Back to ticket purchase"
            className="back-ticket-purchase-btn"
            disabled={isPaying}
          >
            Back
          </button>
        </div>
      </div>
    </div>
  );
}

OrderSummary.defaultProps = {
  navigateBack: () => console.log('navigateBack not provided'),
};

export default OrderSummary;
