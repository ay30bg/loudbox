import React, { useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { QRCodeCanvas } from 'qrcode.react';
import './ticketDetailsPage.css';

// Placeholder QR code (base64-encoded PNG for demo)
const placeholderQrCode = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAYAAABw4pVUAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAADKSURBVHhe7dEBDQAgAMAw+/4vNqCLF3M3wAIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECL8B/wX3V2rKAAAAAElFTkSuQmCC';

function TicketDetailsPage() {
  const { transactionReference } = useParams();
  const { state } = useLocation();
  const [ticketData, setTicketData] = useState(state);
  const [loading, setLoading] = useState(!state);
  const [error, setError] = useState(null);

  // Debug logs
  console.log('TicketDetailsPage rendered');
  console.log('transactionReference:', transactionReference);
  console.log('state:', state);
  console.log('ticketData:', ticketData);

  // Fetch ticket data if state is missing
  useEffect(() => {
    if (!state && transactionReference) {
      const fetchTicket = async () => {
        try {
          setLoading(true);
          const response = await fetch(`https://loudbox-backend.vercel.app/api/tickets/${transactionReference}`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
          });
          if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`HTTP error! Status: ${response.status}, Message: ${errorText}`);
          }
          const data = await response.json();
          setTicketData(data);
        } catch (err) {
          console.error('Fetch error:', err);
          setError('Unable to load ticket details. Please try again or contact support.');
        } finally {
          setLoading(false);
        }
      };
      fetchTicket();
    }
  }, [transactionReference, state]);

  if (loading) {
    return (
      <div className="ticket-details-container">
        <h2>Loading...</h2>
        <p>Loading ticket details for {transactionReference || 'N/A'}</p>
      </div>
    );
  }

  if (error || !ticketData) {
    return (
      <div className="ticket-details-container">
        <h2>{error ? 'Error Loading Ticket' : 'No Ticket Data Available'}</h2>
        <p>Transaction Reference: {transactionReference || 'N/A'}</p>
        <p>Please contact support at support@loudbox.com.</p>
      </div>
    );
  }

  // Fallback to ticket data
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
  } = ticketData;

  // Construct QR code value (fixed to use /api/tickets/verify)
  const qrCodeValue = `https://loudbox-backend.vercel.app/api/tickets/verify?ticketId=${encodeURIComponent(
    ticketId
  )}&code=${encodeURIComponent(transactionReference || 'N/A')}`;
  console.log('QRCode value:', qrCodeValue);
  console.log('QRCode value length:', qrCodeValue.length);

  // Validate QR code value
  if (
    !qrCodeValue ||
    qrCodeValue.length < 10 ||
    !ticketId ||
    ticketId === 'TICKET123' ||
    !transactionReference
  ) {
    console.warn('Invalid QR code value:', qrCodeValue);
    return (
      <div className="ticket-details-container">
        <h2>QR Code Unavailable</h2>
        <p>Transaction Reference: {transactionReference || 'N/A'}</p>
        <p>Unable to generate a valid QR code. Please contact support at support@loudbox.com.</p>
        {ticketId === 'TICKET123' && (
          <p style={{ color: 'orange' }}>
            Warning: Using mock ticket ID. This may not work for verification.
          </p>
        )}
        {!transactionReference && (
          <p style={{ color: 'orange' }}>
            Warning: No transaction reference found. This may not work for verification.
          </p>
        )}
        <div className="qr-code-container">
          <img src={placeholderQrCode} alt="Placeholder QR Code" className="qr-code" />
          <p>QR code unavailable.</p>
        </div>
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
          <span className="detail-value">{transactionReference || 'N/A'}</span>
        </div>
        <div className="detail-item">
          <span className="detail-label">Ticket ID:</span>
          <span className="detail-value">{ticketId}</span>
        </div>
        <div className="qr-code-container">
          <QRCodeCanvas
            value={qrCodeValue}
            size={200}
            level="M" // Medium error correction for better reliability
            includeMargin={true}
            onError={(e) => console.error('QRCodeCanvas error:', e)}
          />
          <p>Present this QR code at the event entrance for verification.</p>
          <button
            onClick={() => {
              const canvas = document.querySelector('canvas');
              if (canvas) {
                const link = document.createElement('a');
                link.href = canvas.toDataURL('image/png');
                link.download = `ticket-${ticketId}.png`;
                link.click();
              }
            }}
          >
            Download QR Code
          </button>
        </div>
      </div>
    </div>
  );
}

export default TicketDetailsPage;
