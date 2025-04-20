import React from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { QRCodeCanvas } from 'qrcode.react';
import './ticketDetailsPage.css';

// Placeholder QR code (base64-encoded PNG for demo)
const placeholderQrCode = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAYAAABw4pVUAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAADKSURBVHhe7dEBDQAgAMAw+/4vNqCLF3M3wAIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECL8B/wX3V2rKAAAAAElFTkSuQmCC';

function TicketDetailsPage() {
  const { transactionReference } = useParams();
  const { state } = useLocation();
  const [ticket, setTicket] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  // Debug logs
  console.log('TicketDetailsPage rendered');
  console.log('transactionReference:', transactionReference);
  console.log('state:', state);

   useEffect(() => {
    const fetchTicket = async () => {
      try {
        console.log('Fetching ticket from backend:', transactionReference);
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
        // Fallback to state data if available
        if (state) {
          setTicket({
            eventTitle: state.eventTitle || 'Event',
            ticketId: state.ticketId || 'TICKET123',
            transactionReference: state.transactionReference || transactionReference,
            ticketQuantity: state.ticketQuantity || 1,
            firstName: state.firstName || 'Guest',
            lastName: state.lastName || '',
            email: state.email || 'N/A',
            isGift: state.isGift || false,
            recipientFirstName: state.recipientFirstName || '',
            recipientLastName: state.recipientLastName || '',
            recipientEmail: state.recipientEmail || '',
          });
        }
      } finally {
        setLoading(false);
      }
    };

    fetchTicket();
  }, [transactionReference, state]);

  if (loading) {
    return <div>Loading ticket details...</div>;
  }

  if (error && !ticket) {
    return (
      <div className="ticket-details-container">
        <h2>Error Loading Ticket</h2>
        <p>{error}</p>
        <p>Transaction Reference: {transactionReference}</p>
        <p>Please contact support.</p>
      </div>
    );
  }

  // Use ticket data (from backend or state)
  const {
    eventTitle = 'Event',
    ticketId = 'TICKET123',
    ticketQuantity = 1,
    firstName = 'Guest',
    lastName = '',
    email = 'N/A',
    isGift = false,
    recipientFirstName = '',
    recipientLastName = '',
    recipientEmail = '',
    qrCode = JSON.stringify({ ticketId, transactionReference }), // QR code data
  } = ticket || {};

 

  
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
          {qrCode ? (
            <>
              <QRCodeCanvas
                value={qrCode} // Encode ticketId and transactionReference
                size={200}
                level="H"
                includeMargin={true}
              />
              <p>Present this QR code at the event entrance for verification.</p>
            </>
          ) : (
            <>
              <img src={placeholderQrCode} alt="Placeholder QR Code" className="qr-code" />
              <p>QR code unavailable. Please contact support.</p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default TicketDetailsPage;
