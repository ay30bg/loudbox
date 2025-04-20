import React from 'react';
import { useParams, useLocation } from 'react-router-dom';
import './ticketDetailsPage.css';

// Placeholder QR code (base64-encoded PNG for demo)
const placeholderQrCode = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAYAAABw4pVUAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAADKSURBVHhe7dEBDQAgAMAw+/4vNqCLF3M3wAIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECL8B/wX3V2rKAAAAAElFTkSuQmCC';

function TicketDetailsPage() {
  const { transactionReference } = useParams();
  const { state } = useLocation();

  // Debug logs
  console.log('TicketDetailsPage rendered');
  console.log('transactionReference:', transactionReference);
  console.log('state:', state);

  // Fallback to state data
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
    ticketId = 'TICKET123', // Mock ticketId for verification
  } = state || {};

  // If no state data, show fallback UI
  if (!state) {
    return (
      <div className="ticket-details-container">
        <h2>No Ticket Data Available</h2>
        <p>Transaction Reference: {transactionReference}</p>
        <p>Please contact support.</p>
      </div>
    );
  }

  return (
    <div className="ticket-details-container">
      <h2>Your Ticket</h2>
      <div className="ticket-card">
        <h3>{eventTitle}</h3>
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
        <div className="detail-item">
          <span className="detail-label">Ticket ID:</span>
          <span className="detail-value">{ticketId}</span>
        </div>
        <div className="qr-code-container">
          <img src={placeholderQrCode} alt="Ticket QR Code" className="qr-code" />
         
          <p>Present this QR code at the event entrance for verification (placeholder).</p>
        </div>
      </div>
    </div>
  );
}

export default TicketDetailsPage;
