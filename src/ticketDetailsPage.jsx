// import React, { useState, useEffect, useRef } from 'react';
// import { useParams } from 'react-router-dom';
// import { QRCodeCanvas } from 'qrcode.react';
// import html2canvas from 'html2canvas';
// import './ticketDetailsPage.css';

// function TicketDetailsPage() {
//   const { transactionReference } = useParams();
//   const [ticketData, setTicketData] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [message, setMessage] = useState('');
//   const ticketRef = useRef(null);

//   useEffect(() => {
//     const fetchTicket = async () => {
//       try {
//         const response = await fetch(
//           `https://loudbox-backend.vercel.app/api/tickets/${transactionReference}`
//         );
//         if (!response.ok) {
//           throw new Error(`Failed to fetch ticket: ${response.statusText}`);
//         }
//         const data = await response.json();
//         setTicketData(data);
//         setLoading(false);

//         // Send ticket via email
//         const emailResponse = await fetch(
//           'https://loudbox-backend.vercel.app/api/email/send-ticket-email',
//           {
//             method: 'POST',
//             headers: { 'Content-Type': 'application/json' },
//             body: JSON.stringify({
//               ticketData: data,
//               email: data.ticketHolder.email,
//             }),
//           }
//         );
//         if (emailResponse.ok) {
//           setMessage(`Ticket sent to ${data.ticketHolder.email}, Check your inbox!`);
//         } else {
//           setMessage('Failed to send ticket email, Please download manually.');
//         }
//       } catch (err) {
//         console.error('TicketDetailsPage - Error fetching ticket:', err);
//         setError(err.message);
//         setLoading(false);
//       }
//     };
//     fetchTicket();
//   }, [transactionReference]);

//   const handleDownload = async () => {
//     if (ticketRef.current) {
//       try {
//         const canvas = await html2canvas(ticketRef.current, {
//           scale: 2,
//           useCORS: true,
//           backgroundColor: '#f9f9f9',
//         });
//         const link = document.createElement('a');
//         link.href = canvas.toDataURL('image/png');
//         link.download = `ticket-${ticketData?.ticketId || 'unknown'}.png`;
//         link.click();
//         setMessage('Ticket downloaded successfully.');
//       } catch (error) {
//         console.error('TicketDetailsPage - Error generating ticket image:', error);
//         setMessage('Failed to download ticket, Please try again.');
//       }
//     }
//   };

//   if (error) {
//     return (
//       <div className="ticket-details-container">
//         <h2>Error</h2>
//         <p>{error}</p>
//       </div>
//     );
//   }

//   if (loading) {
//     return (
//       <div className="ticket-details-container">
//         <h2>Loading...</h2>
//       </div>
//     );
//   }

//   if (!ticketData) {
//     return (
//       <div className="ticket-details-container">
//         <h2>Ticket not found</h2>
//       </div>
//     );
//   }

//   const {
//     ticketId,
//     transactionReference: transRef,
//     eventTitle,
//     eventId,
//     ticketQuantity,
//     totalPrice,
//     ticketHolder,
//     isGift,
//     recipient,
//   } = ticketData;

//   const qrCodeValue = `https://loudbox-backend.vercel.app/api/verify?ticketId=${encodeURIComponent(
//     ticketId
//   )}&code=${encodeURIComponent(transRef || 'N/A')}`;

//   return (
//     <div className="ticket-details-container">
//       <h2>Your Ticket</h2>
//       <div className="ticket-card" ref={ticketRef}>
//         <h3>{eventTitle || 'Unknown Event'}</h3>
//         <div className="detail-item">
//           <span className="detail-label">Event ID:</span>
//           <span className="detail-value">{eventId || 'N/A'}</span>
//         </div>
//         <div className="detail-item">
//           <span className="detail-label">Ticket ID:</span>
//           <span className="detail-value">{ticketId || 'N/A'}</span>
//         </div>
//         <div className="detail-item">
//           <span className="detail-label">Transaction Reference:</span>
//           <span className="detail-value">{transRef || 'N/A'}</span>
//         </div>
//         <div className="detail-item">
//           <span className="detail-label">Quantity:</span>
//           <span className="detail-value">{ticketQuantity || 'N/A'}</span>
//         </div>
//         <div className="detail-item">
//           <span className="detail-label">Total Price:</span>
//           <span className="detail-value">
//             {totalPrice ? `NGN ${totalPrice.toLocaleString()}` : 'N/A'}
//           </span>
//         </div>
//         <div className="detail-item">
//           <span className="detail-label">Holder:</span>
//           <span className="detail-value">
//             {ticketHolder?.firstName && ticketHolder?.lastName
//               ? `${ticketHolder.firstName} ${ticketHolder.lastName}`
//               : 'N/A'}
//           </span>
//         </div>
//         <div className="detail-item">
//           <span className="detail-label">Email:</span>
//           <span className="detail-value">{ticketHolder?.email || 'N/A'}</span>
//         </div>
//         {isGift && (
//           <>
//             <div className="detail-item">
//               <span className="detail-label">Gift Recipient:</span>
//               <span className="detail-value">
//                 {recipient?.firstName && recipient?.lastName
//                   ? `${recipient.firstName} ${recipient.lastName}`
//                   : 'N/A'}
//               </span>
//             </div>
//             <div className="detail-item">
//               <span className="detail-label">Recipient Email:</span>
//               <span className="detail-value">{recipient?.email || 'N/A'}</span>
//             </div>
//           </>
//         )}
//         <div className="qr-code-container">
//           <QRCodeCanvas className="qr-code" value={qrCodeValue} size={200} />
//         </div>
//       </div>
//       {message && (
//         <p className={`message ${message.includes('Failed') ? 'error' : ''}`}>
//           {message}
//         </p>
//       )}
//       <button className="download-button" onClick={handleDownload}>
//         Download Ticket
//       </button>
//       <p className="instruction">
//         Tip: Take a screenshot of this ticket for quick access at the event!
//       </p>
//     </div>
//   );
// }

// export default TicketDetailsPage;


import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { QRCodeCanvas } from 'qrcode.react';
import html2canvas from 'html2canvas';
import './ticketDetailsPage.css';

function TicketDetailsPage() {
  const { transactionReference } = useParams();
  const [ticketData, setTicketData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState('');
  const ticketRef = useRef(null);

  useEffect(() => {
    const fetchTicket = async () => {
      try {
        const response = await fetch(
          `https://loudbox-backend.vercel.app/api/tickets/${transactionReference}`
        );
        if (!response.ok) {
          throw new Error(`Failed to fetch ticket: ${response.statusText}`);
        }
        const data = await response.json();
        setTicketData(data);
        setLoading(false);

        // Check ticket status
        if (data.status !== 'unused') {
          setMessage(`This ticket is ${data.status} and cannot be used.`);
        } else {
          // Send ticket via email
          const emailResponse = await fetch(
            'https://loudbox-backend.vercel.app/api/email/send-ticket-email',
            {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                ticketData: data,
                email: data.ticketHolder.email,
              }),
            }
          );
          if (emailResponse.ok) {
            setMessage(`Ticket sent to ${data.ticketHolder.email}, Check your inbox!`);
          } else {
            setMessage('Failed to send ticket email, Please download manually.');
          }
        }
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
        const canvas = await html2canvas(ticketRef.current, {
          scale: 2,
          useCORS: true,
          backgroundColor: '#f9f9f9',
        });
        const link = document.createElement('a');
        link.href = canvas.toDataURL('image/png');
        link.download = `ticket-${ticketData?.ticketId || 'unknown'}.png`;
        link.click();
        setMessage('Ticket downloaded successfully.');
      } catch (error) {
        console.error('TicketDetailsPage - Error generating ticket image:', error);
        setMessage('Failed to download ticket, Please try again.');
      }
    }
  };

  if (error) {
    return (
      <div className="ticket-details-container">
        <h2>Error</h2>
        <p>{error}. Contact <a href="mailto:support@loudbox.com">support@loudbox.com</a>.</p>
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
    eventDate,
    status,
  } = ticketData;

  const qrCodeValue = `https://loudbox-backend.vercel.app/api/verify?ticketId=${encodeURIComponent(
    ticketId
  )}&code=${encodeURIComponent(transRef)}&eventTitle=${encodeURIComponent(
    eventTitle
  )}&firstName=${encodeURIComponent(ticketHolder.firstName)}&eventDate=${encodeURIComponent(
    eventDate ? new Date(eventDate).toISOString() : 'N/A'
  )}`;

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
          <span className="detail-label">Event Date:</span>
          <span className="detail-value">{eventDate ? new Date(eventDate).toLocaleString() : 'N/A'}</span>
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
        <div className="detail-item">
          <span className="detail-label">Status:</span>
          <span className="detail-value">{status || 'N/A'}</span>
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
          <QRCodeCanvas className="qr-code" value={qrCodeValue}...................................................................................... size={200} />
        </div>
      </div>
      {message && (
        <p className={`message ${message.includes('Failed') || message.includes('used') || message.includes('expired') ? 'error' : ''}`}>
          {message}
        </p>
      )}
      <button className="download-button" onClick={handleDownload} disabled={status !== 'unused'}>
        Download Ticket
      </button>
      <p className="instruction">
        Tip: Take a screenshot of this ticket for quick access at the event!
      </p>
    </div>
  );
}

export default TicketDetailsPage;
