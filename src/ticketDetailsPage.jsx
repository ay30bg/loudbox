import React, { useEffect, useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import './ticketDetailsPage.css';

function TicketDetailsPage() {
  const { transactionReference } = useParams();
  const { state } = useLocation();
  const [ticketData, setTicketData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  console.log('TicketDetailsPage rendered');
  console.log('transactionReference:', transactionReference);
  console.log('state:', state);

  useEffect(() => {
    const fetchTicketDetails = async () => {
      try {
        const apiUrl = `loudbox-backend.vercel.app/api/tickets/${transactionReference}`;
        console.log('Fetching from:', apiUrl);
        const response = await fetch(apiUrl);
        console.log('Response status:', response.status);

        if (!response.ok) {
          const text = await response.text();
          console.log('Response text:', text.slice(0, 100));
          if (response.status === 404) {
            console.log('Ticket not found, falling back to state data');
            setTicketData(null); // Use state data
          } else {
            throw new Error(`HTTP error! status: ${response.status}, response: ${text.slice(0, 100)}`);
          }
        } else {
          const data = await response.json();
          console.log('Backend data:', data);
          setTicketData(data);
        }
        setLoading(false);
      } catch (err) {
        console.error('Fetch error:', err.message);
        setError(err.message);
        setLoading(false);
      }
    };
    fetchTicketDetails();
  }, [transactionReference]);

  const {
    eventTitle = 'Event',
    ticketQuantity = 1,
    firstName = 'Guest',
    lastName = '',
    email = 'N/A',
    isGift = false,
    recipientFirstName = '',
    recipientLastName = '',
    recipientEmail = '',
    ticketId = 'TICKET123',
  } = state || {};

  if (loading) {
    return <div className="ticket-details-container">Loading ticket details...</div>;
  }

  if (error) {
    return (
      <div className="ticket-details-container">
        <h2>Error Loading Ticket</h2>
        <p>{error}</p>
        <p>Transaction Reference: {transactionReference}</p>
        <p>Please contact support.</p>
      </div>
    );
  }

  if (!state && !ticketData) {
    return (
      <div className="ticket-details-container">
        <h2>No Ticket Data Available</h2>
        <p>Transaction Reference: {transactionReference}</p>
        <p>Please contact support.</p>
      </div>
    );
  }

  const displayData = ticketData || state;

  return (
    <div className="ticket-details-container">
      <h2>Your Ticket</h2>
      <div className="ticket-card">
        <h3>{displayData.eventTitle}</h3>
        <div className="detail-item">
          <span className="detail-label">Ticket Holder:</span>
          <span className="detail-value">
            {isGift ? `${recipientFirstName} ${recipientLastName}` : `${firstName} ${lastName}`}
          </span>
        </div>
        <div className="detail-item">
          <span className="detail-label">Email:</span>
          <span className="detail-value">{isGift ? recipientEmail : email}</span>
        </div>
        <div className="detail-item">
          <span className="detail-label">Quantity:</span>
          <span className="detail-value">{ticketQuantity}</span>
        </div>
        <div className="detail-item">
          <span className="detail-label">Transaction Reference:</span>
          <span className="detail-value">{transactionReference}</span>
        </div>
        {displayData.ticketId && (
          <div className="detail-item">
            <span className="detail-label">Ticket ID:</span>
            <span className="detail-value">{displayData.ticketId}</span>
          </div>
        )}
        {displayData.qrCode ? (
          <div className="qr-code-container">
            <img src={displayData.qrCode} alt="Ticket QR Code" className="qr-code" />
            <p>Present this QR code at the event entrance for verification.</p>
          </div>
        ) : (
          <p>No QR code available. Using temporary ticket data.</p>
        )}
      </div>
    </div>
  );
}

export default TicketDetailsPage;
