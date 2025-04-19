import React, { useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { FaEnvelope, FaPhone, FaFilePdf, FaFileImage, FaAngleDown, FaUser } from 'react-icons/fa';
import './orderSummary.css';

const mockEvents = [
    {
        id: '1',
        eventOwner: 'Davido',
        title: 'Davido Live In Concert',
        eventImage: 'https://wallpapercat.com/w/middle-retina/4/0/2/2250759-2560x1631-desktop-hd-davido-background-image.jpg',
        description: 'Davido 5ive Album Tour',
        venue: 'State Farm Arena',
        city: 'Atlanta',
        category: 'Concert',
        month: 'APR',
        date: '17',
        year: '2025',
        time: '17:00',
        about: 'Streamed over 2 billon times and handpicked by FIFA to lead their 2022 World Cup Soundtrack collaboration “Hayya Hayya (Better Together)”, American born, Nigerian raised afrobeats icon Davido (born David Adedeji Adeleke) has cemented his position as a global force within the music scene. Following the release of his 2019 critically acclaimed album, A Good Time, which achieved over 1.2 billion streaming, Davido went on to achieve further success with his third studio album, A Better Time. A Better Time, described by Davido as his most personal work was released at the end of 2020 and debuted on Billboards 200 album chart garnering over 560 million streams and producing certified hits High featuring Adekunle Gold, Holy Ground Ft. Nicki Minaj and Shopping Spree ft. Chris Brown & Young Thug. Shopping Spree marked Davido’s 10th entry on Billboard’s World Digital Song Chart, it was highlighted by millions of video views and attracted the praise of Rolling Stone, HighSnobiety and Complex. In addition to both fan and critical acclaim, Davido’s visibility continues to soar across the globe, with thrilling national television appearances on The Tonight Show Starring Jimmy Fallon, The Daily Show with Trevor Noah and Jimmy Kimmel Live.',
        ticketFileName: 'Davido Live In Concert Ticket',
        ticketFileType: 'PNG',
        ticketFileSize: '1.2 MB',
        basePrice: 3000,
    },
    {
        id: '2',
        eventOwner: 'Asake',
        title: 'Lungu Boy Tour',
        eventImage: 'https://www.okayafrica.com/media-library/cover-artwork-for-lungu-boy-by-asake.png?id=53143626&width=1200&height=800&quality=85&coordinates=0%2C0%2C0%2C0',
        description: 'Asake quick stop at Ziggo Dome ',
        venue: 'Ziggo Dome',
        city: 'Amsterdam',
        category: 'Concert',
        month: 'DEC',
        date: '10',
        year: '2025',
        time: '19:00',
        about: '',
        ticketFileName: 'Asake Lungu Boy Tour Ticket',
        ticketFileType: 'PNG',
        ticketFileSize: '100.7 KB',
        basePrice: 2000,
    },
    {
        id: '3',
        eventOwner: 'Toyin Abraham',
        title: ' Alakada Bad and Boujee',
        eventImage: 'https://whatkeptmeup.com/wp-content/uploads/2024/12/photo_5444956519515942501_y.jpg',
        description: 'Watch Alakada Bad & Boujee with Toyin Abraham',
        venue: 'Genesis Cinema, Lagos',
        city: 'Lagos',
        category: 'Movie',
        month: 'JUL',
        date: '29',
        year: '2025',
        time: '16:00',
        about: 'Laugh out loud with Alakada: Bad and Boujee! Toyin Abraham returns as Yetunde, a young woman faking a lavish lifestyle, in this hilarious Nollywood comedy-drama. Released on December 20, 2024, the film has grossed over ₦285.9 million in just two weeks, taking Nigerian cinemas by storm. Don’t miss the fun—watch it now!',
        ticketFileName: 'Alakada Bad & Boujee Ticket',
        ticketFileType: 'PNG',
        ticketFileSize: '1.5 MB',
        basePrice: 1500,
    },
    {
        id: '4',
        eventOwner: 'Wizkid',
        title: 'Hellfest',
        eventImage: 'https://rotatemagazine.com/wp-content/uploads/2024/11/Wizkid-Photo-1536x1109.webp',
        description: 'Wizkid Live in Paris',
        venue: 'Stade de France',
        city: 'Paris',
        category: 'Concert',
        month: 'SEP',
        date: '19',
        year: '2025',
        time: '20:00',
        about: 'Grammy award winning singer/songwriter Ayodeji Ibrahim Balogun (aka Wizkid) began his career in music when he was just 11 years old in Lagos, Nigeria. His first record, Lil Prinz, was recorded in 2001 in collaboration with Glorious Five, a group consisting of Balogun and his friends from church. In 2006, he started pursuing music full-time, at first collaborating with various Nigerian pop acts including OJB Jezreel, Naeto C, and Banky W. By 2011, he was ready to record his debut studio album as a solo artist: Superstar was released via Empire Mates Entertainment to great critical and public acclaim across Africa, propelling him to stardom in his home country. After multiple delays and label disagreements, Balogun released his sophomore album titled Ayo in 2014. This second studio album had a multitude of guest appearances, including a spot from Femi Kuti. It also featured Baloguns global breakthrough track "Ojuelegba." Not only did the single cement his status as one of Nigerias biggest pop acts, it was also picked up and remixed by Drake and Skepta, thrusting Wizkid into the international spotlight. In return, Wizkid appeared on Drakes 2016 smash single "One Dance." ',
        ticketFileName: 'Hellfest Ticket',
        ticketFileType: 'PNG',
        ticketFileSize: '1.9 MB',
        basePrice: 3000,
    },
    {
        id: '5',
        eventOwner: 'Burna Boy',
        title: 'Burna & Friends Concert',
        eventImage: 'https://s1.ticketm.net/dam/a/11f/490b5e5d-4dc6-478f-a4b8-873d8351f11f_RETINA_PORTRAIT_3_2.jpg',
        description: 'Burna Boy Birthday Concert',
        venue: 'o2 Arena',
        city: 'London',
        category: 'Concert',
        month: 'JAN',
        date: '31',
        year: '2025',
        time: '17:00',
        about: 'Burna Boy Live: 2025 Tour Heats Up! The African Giant brings his electrifying energy to the Stade de France on April 18, with an 80,000-capacity crowd, followed by a UK exclusive at Manchester’s Co-op Live on April 21. After a fiery Nairobi show on March 1, fans can’t stop raving about his ‘spiritual’ vibes and ‘insane’ stage presence—get your tickets now!',
        ticketFileName: 'Burna & Friends Concert Ticket',
        ticketFileType: 'PNG',
        ticketFileSize: '120.9 KB',
        basePrice: 2500
    },
];

function OrderSummary({ navigateBack, navigateToThankYou }) {
  const { id } = useParams();
  const { state } = useLocation();
  const [eventData, setEventData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showFileDetails, setShowFileDetails] = useState(false);

  useEffect(() => {
    const foundEvent = mockEvents.find((e) => e.id === id);
    setEventData(foundEvent);
    setLoading(false);
  }, [id]);

  const toggleFileDetails = () => {
    setShowFileDetails((prev) => !prev);
  };

  const {
    firstName = 'Guest',
    lastName = '',
    email = 'No email provided',
    phoneNumber = 'No phone provided',
    ticketQuantity = 1,
    totalPrice = 0,
    isGift = false,
    recipientFirstName = '',
    recipientLastName = '',
    recipientEmail = '',
  } = state || {};

  // Function to handle ticket email sending
  const sendTicketEmail = async (reference) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/paystack/send-ticket-email`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          reference,
          customerEmail: email,
          recipientEmail: isGift ? recipientEmail : null,
          eventTitle: eventData.title,
          ticketQuantity,
          totalPrice,
          firstName,
          lastName,
          isGift,
        }),
      });

      const result = await response.json();
      if (response.ok) {
        console.log('Ticket email sent:', result.message);
        localStorage.setItem('paymentSuccessful', 'true');
        navigateToThankYou(id, {
          state: {
            eventTitle: eventData.title,
            ticketQuantity,
            totalPrice,
            firstName,
            lastName,
            email,
            isGift,
            recipientFirstName,
            recipientLastName,
            recipientEmail,
            transactionReference: reference,
          },
        });
      } else {
        console.error('Backend error:', result.error);
        alert(`Failed to send ticket: ${result.error}`);
      }
    } catch (error) {
      console.error('Error sending ticket email:', error);
      alert('Error processing payment. Please contact support.');
    }
  };

  // Paystack payment handler
  const handlePayment = () => {
    console.log('Pay button clicked', { email, totalPrice, eventData });
    if (!window.PaystackPop) {
      alert('Paystack script not loaded. Please try again.');
      return;
    }

    const handler = window.PaystackPop.setup({
      key: process.env.REACT_APP_PAYSTACK_PUBLIC_KEY || 'pk_test_f5af6c1a30d2bcfed0192f0e8006566fe27441df',
      email: email || 'guest@example.com',
      amount: totalPrice * 100, // Convert to kobo
      currency: 'NGN',
      ref: `TICKET-${Math.floor(Math.random() * 1000000)}-${Date.now()}`,
      metadata: {
        custom_fields: [
          { display_name: 'Event Title', variable_name: 'event_title', value: eventData.title },
          { display_name: 'Ticket Quantity', variable_name: 'ticket_quantity', value: ticketQuantity },
          { display_name: 'Customer Name', variable_name: 'customer_name', value: `${firstName} ${lastName}` },
          { display_name: 'Recipient Email', variable_name: 'recipient_email', value: isGift ? recipientEmail : email },
        ],
      },
      callback: (response) => {
        console.log('Paystack callback:', response);
        if (response.status === 'success') {
          sendTicketEmail(response.reference);
        } else {
          alert('Payment failed. Please try again.');
        }
      },
      onClose: () => {
        console.log('Paystack popup closed');
        alert('Payment cancelled.');
      },
    });

    handler.openIframe();
  };

  // Load Paystack script
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://js.paystack.co/v1/inline.js';
    script.async = true;
    script.onload = () => console.log('Paystack script loaded');
    script.onerror = () => alert('Failed to load Paystack script. Please try again.');
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  if (loading) {
    return <div>Loading event data...</div>;
  }

  if (!eventData) {
    return (
      <div>
        No event found for ID: {id}. Please check the event ID or go back.
        <button onClick={() => navigateBack({ id })} aria-label="Back to ticket purchase">
          Back
        </button>
      </div>
    );
  }

  return (
    <div className="order-summary-container">
      <div className="order-summary-card">
        <div className="order-header-container">
          <h2>Buy {eventData.title} Ticket</h2>
        </div>
        <hr className="summary-divider" />
        <div className='customer-contact'>
          <FaUser className='contact-icon' />
          <h4 className="customer-name">
            {firstName || 'N/A'} {lastName || 'N/A'}
          </h4>
        </div>
        <div className="customer-contact">
          <FaEnvelope className='contact-icon' />
          <p className="customer-email">{email || 'No email provided'}</p>
        </div>
        <div className="customer-contact">
          <FaPhone className='contact-icon' />
          <p className="customer-phone">{phoneNumber || 'No phone provided'}</p>
        </div>
        {isGift && (
          <div className="gift-details">
            <h4>Gift Details</h4>
            <p><strong>Recipient Name:</strong> {recipientFirstName || 'Not provided'} {recipientLastName || 'Not provided'}</p>
            <p><strong>Recipient Email:</strong> {recipientEmail || 'Not provided'}</p>
          </div>
        )}
        <br />
        <div className="file-display-group">
          <div className="file-display-wrapper">
            <span className="file-display-text">
              1 file attached{' '}
              <FaAngleDown
                className="angle-down"
                onClick={toggleFileDetails}
                aria-label="Toggle ticket file details"
              />
            </span>
          </div>
          {showFileDetails && (
            <div className="file-details">
              <div className="file-details-content">
                {eventData.ticketFileType.toLowerCase() === 'pdf' ? (
                  <FaFilePdf className="file-icon" />
                ) : (
                  <FaFileImage className="file-icon" />
                )}
                <div className="file-info">
                  <p className="file-name">{eventData.ticketFileName}</p>
                  <p className="file-meta">
                    Type: {eventData.ticketFileType.toUpperCase()} | Size: {eventData.ticketFileSize}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
        <hr className='summary-dot-divider' />
        <div className="checkout-container">
          <div className="checkout">
            <div className='ticket-quantity-group'>
              <h5 className='ticket-event-name'>{eventData.title} Ticket</h5>
              <h5>x{ticketQuantity}</h5>
            </div>
            <h5>NGN {(totalPrice / ticketQuantity).toLocaleString()}</h5>
          </div>
          <div className="checkout-total">
            <h5>Total</h5>
            <h5>NGN {totalPrice.toLocaleString()}</h5>
          </div>
        </div>
        <hr className='summary-dot-divider' />
        <div className="action-buttons">
          <button
            onClick={handlePayment}
            aria-label={`Pay NGN ${totalPrice.toLocaleString()} for ${eventData.title}`}
            className='payment-button'
          >
            Pay NGN {totalPrice.toLocaleString()}
          </button>
          <button
            onClick={() => navigateBack(eventData)}
            aria-label="Back to ticket purchase"
            className='back-ticket-purchase-btn'
          >
            Back
          </button>
        </div>
      </div>
    </div>
  );
}

OrderSummary.defaultProps = {
  navigateBack: () => console.log('navigateBack not provided'),
};

export default OrderSummary;
