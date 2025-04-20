// src/TicketDetailsPage.jsx
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { QRCodeCanvas } from 'qrcode.react'; // Correct import
import './ticketDetailsPage.css';

function TicketDetailsPage() {
  const { transactionReference } = useParams();
  const [ticket, setTicket] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

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
      <h2>{ticket.eventTitle}</h2>
      <p>Ticket ID: {ticket.ticketId}</p>
      <p>Status: {ticket.status}</p>
      <p>Quantity: {ticket.ticketQuantity}</p>
      <p>Total Price: NGN {ticket.totalPrice.toLocaleString()}</p>
      <div className="qr-code">
       <QRCodeCanvas
          value={qrCodeValue}
          size={250}
          level="L"
          includeMargin={true}
          onError={(e) => console.error('QRCodeCanvas error:', e)}
        />
      </div>
    </div>
  );
}

export default TicketDetailsPage;
