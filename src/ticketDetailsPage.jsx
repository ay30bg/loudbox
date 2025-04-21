import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { QRCodeSVG } from 'qrcode.react';
import html2canvas from 'html2canvas';
import './ticketDetailsPage.css';

function TicketDetailsPage() {
  const { transactionReference } = useParams();
  const [ticketData, setTicketData] = useState(null);
  const [loading, setLoading] = useState(true);
  const ticketRef = useRef(null);

  useEffect(() => {
    const fetchTicket = async () => {
      try {
        const response = await fetch(
          `https://loudbox-backend.vercel.app/api/tickets/${transactionReference}`
        );
        if (!response.ok) {
          throw new Error('Ticket not found');
        }
        const data = await response.json();
        setTicketData(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching ticket:', error);
        setLoading(false);
      }
    };
    fetchTicket();
  }, [transactionReference]);

  const handleDownload = async () => {
    if (ticketRef.current) {
      try {
        const canvas = await html2canvas(ticketRef.current, {
          scale: 2, // High resolution
          useCORS: true,
          backgroundColor: '#ffffff', // White background
        });
        const link = document.createElement('a');
        link.href = canvas.toDataURL('image/png');
        link.download = `ticket-${ticketData.ticketId}.png`;
        link.click();
      } catch (error) {
        console.error('Error generating ticket image:', error);
        alert('Failed to download ticket. Please try again.');
      }
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!ticketData) {
    return <div>Ticket not found</div>;
  }

  const {
    ticketId,
    transactionReference: transRef,
    eventTitle,
    eventId,
    ticketQuantity,
    totalPrice,
    ticketHolder,
    isGift,
    recipient,
  } = ticketData;

  const qrCodeValue = `https://loudbox-backend.vercel.app/api/verify?ticketId=${encodeURIComponent(
    ticketId
  )}&code=${encodeURIComponent(transRef || 'N/A')}`;

  return (
    <div className="ticket-details-container">
      <h2>Your Ticket</h2>
      <div className="ticket-card" ref={ticketRef}>
        <div className="ticket-header">
          <h3>{eventTitle}</h3>
          <p>Event ID: {eventId}</p>
        </div>
        <div className="ticket-body">
          <div className="ticket-info">
            <p><strong>Ticket ID:</strong> {ticketId}</p>
            <p><strong>Transaction Reference:</strong> {transRef}</p>
            <p><strong>Quantity:</strong> {ticketQuantity}</p>
            <p><strong>Total Price:</strong> NGN {totalPrice.toLocaleString()}</p>
            <p>
              <strong>Holder:</strong> {ticketHolder.firstName} {ticketHolder.lastName}
            </p>
            <p><strong>Email:</strong> {ticketHolder.email}</p>
            {isGift && (
              <div className="gift-info">
                <p>
                  <strong>Gift Recipient:</strong> {recipient.firstName} {recipient.lastName}
                </p>
                <p><strong>Recipient Email:</strong> {recipient.email}</p>
              </div>
            )}
          </div>
          <div className="ticket-qr">
            <QRCodeSVG value={qrCodeValue} size={150} />
          </div>
        </div>
        <div className="ticket-footer">
          <p>LoudBox - Your Ticket to Great Events</p>
        </div>
      </div>
      <button className="download-button" onClick={handleDownload}>
        Download Ticket
      </button>
    </div>
  );
}

export default TicketDetailsPage;
