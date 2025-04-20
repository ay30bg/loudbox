import React, { useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { QRCodeCanvas } from 'qrcode.react';
import './ticketDetailsPage.css';

// This is a picture of a fake QR code we show if something goes wrong
const placeholderQrCode = 'data:image/png;base64,...';

function TicketDetailsPage() {
  // Get the special code from the web page’s address (like “abcde” in “/ticket/abcde”)
  const { transactionReference } = useParams();
  // Get ticket info from the last page (like a note with the ticket’s name)
  const { state } = useLocation();
  // Keep track of the ticket info, whether from the note or the concert computer
  const [ticketData, setTicketData] = useState(state);
  // Check if we’re still looking for the ticket info
  const [loading, setLoading] = useState(!state);
  // Keep track if something goes wrong
  const [error, setError] = useState(null);

  // Tell us what’s happening so we can find problems
  console.log('Ticket page opened!');
  console.log('Special code:', transactionReference);
  console.log('Note from last page:', state);
  console.log('Ticket info:', ticketData);

  // If we don’t have the note, ask the concert computer for the ticket info
  useEffect(() => {
    if (!state && transactionReference) {
      const askForTicket = async () => {
        try {
          setLoading(true);
          // Ask the computer for the ticket
          const response = await fetch(`https://loudbox-backend.vercel.app/api/tickets/${transactionReference}`);
          if (!response.ok) {
            throw new Error('Oops! Couldn’t find the ticket.');
          }
          const data = await response.json();
          setTicketData(data); // Save the ticket info
        } catch (err) {
          console.error('Problem:', err);
          setError('Sorry, we couldn’t get your ticket. Try again or call for help.');
        } finally {
          setLoading(false);
        }
      };
      askForTicket();
    }
  }, [transactionReference, state]);

  // If we’re still looking, show a “wait a second” message
  if (loading) {
    return (
      <div className="ticket-details-container">
        <h2>Hold on...</h2>
        <p>Getting your ticket for {transactionReference || 'no code'}</p>
      </div>
    );
  }

  // If something went wrong or we have no ticket info, show a help message
  if (error || !ticketData) {
    return (
      <div className="ticket-details-container">
        <h2>{error ? 'Oops, Something’s Wrong!' : 'No Ticket Found'}</h2>
        <p>Special code: {transactionReference || 'no code'}</p>
        <p>Please call our helpers at support@loudbox.com.</p>
      </div>
    );
  }

  // Get the ticket details, with backups if something’s missing
  const {
    eventTitle = 'Concert',
    ticketQuantity = 1,
    firstName = 'Guest',
    lastName = '',
    email = 'N/A',
    isGift = false,
    recipientFirstName = '',
    recipientLastName = '',
    recipientEmail = '',
    ticketId = 'TICKET123', // Pretend ticket name if none found
  } = ticketData;

  // Make the web address for the QR code
  const qrCodeValue = `https://loudbox-backend.vercel.app/verify?ticketId=${encodeURIComponent(
    ticketId
  )}&code=${encodeURIComponent(transactionReference || 'N/A')}`;
  console.log('QR code message:', qrCodeValue);
  console.log('QR code message length:', qrCodeValue.length);

  // Check if the web address is good
  if (!qrCodeValue || qrCodeValue.length < 10 || !ticketId || ticketId === 'TICKET123') {
    console.warn('Bad QR code message:', qrCodeValue);
    return (
      <div className="ticket-details-container">
        <h2>No QR Code Yet</h2>
        <p>Special code: {transactionReference || 'no code'}</p>
        <p>We couldn’t make a good QR code. Please call our helpers at support@loudbox.com.</p>
        {ticketId === 'TICKET123' && (
          <p style={{ color: 'orange' }}>
            Uh-oh! We’re using a pretend ticket name. This won’t work at the door.
          </p>
        )}
        <div className="qr-code-container">
          <img src={placeholderQrCode} alt="Fake QR Code" className="qr-code" />
          <p>No real QR code available.</p>
        </div>
      </div>
    );
  }

  // Show the ticket with the QR code
  return (
    <div className="ticket-details-container">
      <h2>Your Ticket</h2>
      <div className="ticket-card">
        <h3>{eventTitle}</h3>
        <div className="detail-item">
          <span className="detail-label">Who’s going:</span>
          <span className="detail-value">
            {isGift ? `${recipientFirstName} ${recipientLastName}` : `${firstName} ${lastName}`}
          </span>
        </div>
        <div className="detail-item">
          <span className="detail-label">Email:</span>
          <span className="detail-value">{isGift ? recipientEmail : email}</span>
        </div>
        <div className="detail-item">
          <span className="detail-label">How many tickets:</span>
          <span className="detail-value">{ticketQuantity}</span>
        </div>
        <div className="detail-item">
          <span className="detail-label">Special code:</span>
          <span className="detail-value">{transactionReference || 'no code'}</span>
        </div>
        <div className="detail-item">
          <span className="detail-label">Ticket name:</span>
          <span className="detail-value">{ticketId}</span>
        </div>
        <div className="qr-code-container">
          <QRCodeCanvas
            value={qrCodeValue}
            size={200}
            level="M" // Makes the QR code strong
            includeMargin={true}
            onError={(e) => console.error('QR code problem:', e)}
          />
          <p>Show this QR code at the concert door to get in!</p>
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
            Save QR Code Picture
          </button>
        </div>
      </div>
    </div>
  );
}

export default TicketDetailsPage;
