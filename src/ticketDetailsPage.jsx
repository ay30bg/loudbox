import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { QRCodeSVG } from 'qrcode.react';
import html2canvas from 'html2canvas';
import './ticketDetailsPage.css';

function TicketDetailsPage() {
  const { transactionReference } = useParams();
  const [ticketData, setTicketData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const ticketRef = useRef(null);

  useEffect(() => {
    console.log('TicketDetailsPage - Fetching ticket for:', transactionReference);
    const fetchTicket = async () => {
      try {
        const response = await fetch(
          `https://loudbox-backend.vercel.app/api/tickets/${transactionReference}`
        );
        console.log('TicketDetailsPage - Fetch response status:', response.status);
        if (!response.ok) {
          throw new Error(`Failed to fetch ticket: ${response.statusText}`);
        }
        const data = await response.json();
        console.log('TicketDetailsPage - Ticket data:', data);
        setTicketData(data);
        setLoading(false);
      } catch (err) {
        console.error('TicketDetailsPage - Error fetching ticket:', err);
        setError(err.message);
        setLoading(false);
      }
    };
    fetchTicket();
  }, [transactionReference]);

  const handleDownload = async () => {
    if (ticketRef.current) {
      try {
        console.log('TicketDetailsPage - Generating ticket image');
        const canvas = await html2canvas(ticketRef.current, {
          scale: 2,
          useCORS: true,
          backgroundColor: '#f9f9f9',
        });
        const link = document.createElement('a');
        link.href = canvas.toDataURL('image/png');
        link.download = `ticket-${ticketData?.ticketId || 'unknown'}.png`;
        link.click();
        console.log('TicketDetailsPage - Ticket image downloaded');
      } catch (error) {
        console.error('TicketDetailsPage - Error generating ticket image:', error);
        alert('Failed to download ticket. Please try again.');
      }
    } else {
      console.warn('TicketDetailsPage - ticketRef is not set');
    }
  };

  if (error) {
    return (
      <div className="ticket-details-container">
        <h2>Error</h2>
        <p>{error}</p>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="ticket-details-container">
        <h2>Loading...</h2>
      </div>
    );
  }

  if (!ticketData) {
    return (
      <div className="ticket-details-container">
        <h2>Ticket not found</h2>
      </div>
    );
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
  console.log('TicketDetailsPage - QRCode value:', qrCodeValue);

  return (
    <div className="ticket-details-container">
      <h2>Your Ticket</h2>
      <div className="ticket-card" ref={ticketRef}>
        <h3>{eventTitle || 'Unknown Event'}</h3>
        <div className="detail-item">
          <span className="detail-label">Event ID:</span>
          <span className="detail-value">{eventId || 'N/A'}</span>
        </div>
        <div className="detail-item">
          <span className="detail-label">Ticket ID:</span>
          <span className="detail-value">{ticketId || 'N/A'}</span>
        </div>
        <div className="detail-item">
          <span className="detail-label">Transaction Reference:</span>
          <span className="detail-value">{transRef || 'N/A'}</span>
        </div>
        <div className="detail-item">
          <span className="detail-label">Quantity:</span>
          <span className="detail-value">{ticketQuantity || 'N/A'}</span>
        </div>
        <div className="detail-item">
          <span className="detail-label">Total Price:</span>
          <span className="detail-value">
            {totalPrice ? `NGN ${totalPrice.toLocaleString()}` : 'N/A'}
          </span>
        </div>
        <div className="detail-item">
          <span className="detail-label">Holder:</span>
          <span className="detail-value">
            {ticketHolder?.firstName && ticketHolder?.lastName
              ? `${ticketHolder.firstName} ${ticketHolder.lastName}`
              : 'N/A'}
          </span>
        </div>
        <div className="detail-item">
          <span className="detail-label">Email:</span>
          <span className="detail-value">{ticketHolder?.email || 'N/A'}</span>
        </div>
        {isGift && (
          <>
            <div className="detail-item">
              <span className="detail-label">Gift Recipient:</span>
              <span className="detail-value">
                {recipient?.firstName && recipient?.lastName
                  ? `${recipient.firstName} ${recipient.lastName}`
                  : 'N/A'}
              </span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Recipient Email:</span>
              <span className="detail-value">{recipient?.email || 'N/A'}</span>
            </div>
          </>
        )}
        <div className="qr-code-container">
          <QRCodeSVG className="qr-code" value={qrCodeValue} size={200} />
        </div>
      </div>
      <button className="download-button" onClick={handleDownload}>
        Download Ticket
      </button>
    </div>
  );
}

export default TicketDetailsPage;
