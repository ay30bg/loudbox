// src/TicketDetailsPage.jsx
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { QRCodeCanvas } from 'qrcode.react';
import './ticketDetailsPage.css';

// Placeholder QR code (base64-encoded PNG for demo)
const placeholderQrCode = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAYAAABw4pVUAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAADKSURBVHhe7dEBDQAgAMAw+/4vNqCLF3M3wAIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECL8B/wX3V2rKAAAAAElFTkSuQmCC';

function TicketDetailsPage() {
  const { transactionReference } = useParams();
  const [ticket, setTicket] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  console.log('TicketDetailsPage rendered');
  console.log('transactionReference:', transactionReference);

  useEffect(() => {
    const fetchTicket = async () => {
      try {
        console.log('Attempting to fetch ticket:', transactionReference);
        const response = await fetch(`https://loudbox-backend.vercel.app/api/tickets/${transactionReference}`, {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
        });

        console.log('Response status:', response.status);
        console.log('Response headers:', Object.fromEntries(response.headers.entries()));
        console.log('Response ok:', response.ok);

        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(`HTTP error! Status: ${response.status}, Message: ${errorText}`);
        }

        const data = await response.json();
        console.log('Ticket data:', data);
        setTicket(data);
      } catch (err) {
        console.error('Fetch error:', err);
        setError(`Unable to load ticket details: ${err.message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchTicket();
  }, [transactionReference]);

  console.log('loading:', loading);
  console.log('error:', error);
  console.log('ticket:', ticket);

  if (loading) {
    return (
      <div className="ticket-details-container" style={{ border: '2px solid blue', padding: '20px' }}>
        <h2>Loading...</h2>
        <p>Loading ticket details for {transactionReference}</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="ticket-details-container" style={{ border: '2px solid red', padding: '20px' }}>
        <h2>Error Loading Ticket</h2>
        <p>{error}</p>
        <p>Transaction Reference: {transactionReference}</p>
        <p>Please contact support.</p>
        <button onClick={() => window.location.reload()}>Retry</button>
      </div>
    );
  }

  if (!ticket) {
    return (
      <div className="ticket-details-container" style={{ border: '2px solid orange', padding: '20px' }}>
        <h2>No Ticket Found</h2>
        <p>Transaction Reference: {transactionReference}</p>
        <p>No ticket details found. Please contact support.</p>
        <div className="qr-code-container">
          <img src={placeholderQrCode} alt="Placeholder QR Code" className="qr-code" />
          <p>QR code unavailable.</p>
        </div>
      </div>
    );
  }

  const qrCodeValue = ticket.qrCode || ticket.ticketId.slice(0, 8); // Fallback to ticketId
  console.log('QRCode value:', qrCodeValue);
  console.log('QRCode value length:', qrCodeValue.length);

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
          {/* <img src={placeholderQrCode} alt="Ticket QR Code" className="qr-code" /> */}
         <QRCodeCanvas
          value={qrCodeValue}
          size={250}
          includeMargin={true}
          onError={(e) => console.error('QRCodeCanvas error:', e)}
        />
         {/* <QRCode value={ticket.qrCode} size={200} /> */}
          <p>Present this QR code at the event entrance for verification (placeholder).</p>
        </div>
      </div>
    </div>
  );
}

export default TicketDetailsPage;
