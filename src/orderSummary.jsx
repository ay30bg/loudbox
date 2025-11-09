// import React, { useState, useEffect, useContext } from 'react';
// import { useParams, useLocation } from 'react-router-dom';
// import { FaEnvelope, FaPhone, FaFilePdf, FaFileImage, FaAngleDown, FaUser } from 'react-icons/fa';
// import axios from 'axios';
// import { AuthContext } from './AuthContext';
// import './orderSummary.css';

// const mockEvents = [
//   {
//     id: '1',
//     eventOwner: 'Davido',
//     title: 'Davido Live In Concert',
//     eventImage: 'https://wallpapercat.com/w/middle-retina/4/0/2/2250759-2560x1631-desktop-hd-davido-background-image.jpg',
//     description: 'Davido 5ive Album Tour',
//     subaccount_code: 'ACCT_rmjeq5j8it8mva9',
//     venue: 'State Farm Arena',
//     city: 'Atlanta',
//     category: 'Concert',
//     month: 'APR',
//     date: '17',
//     year: '2025',
//     time: '17:00',
//     about: 'Streamed over 2 billon times...',
//     ticketFileName: ' Davido Live In Concert Ticket',
//     ticketFileType: 'PNG',
//     ticketFileSize: '1.2 MB',
//     basePrice: 3000,
//   },
//   {
//     id: '2',
//     eventOwner: 'Asake',
//     title: 'Lungu Boy Tour',
//     eventImage: 'https://www.okayafrica.com/media-library/cover-artwork-for-lungu-boy-by-asake.png?id=53143626&width=1200&height=800&quality=85&coordinates=0%2C0%2C0%2C0',
//     description: 'Asake quick stop at Ziggo Dome ',
//     subaccount_code: 'ACCT_fgczgunwcj3ru5i', // Subaccount for Asake’s team
//     venue: 'Ziggo Dome',
//     city: 'Amsterdam',
//     category: 'Concert',
//     month: 'DEC',
//     date: '10',
//     year: '2025',
//     time: '19:00',
//     about: '',
//     ticketFileName: 'Asake Lungu Boy Tour Ticket',
//     ticketFileType: 'PNG',
//     ticketFileSize: '100.7 KB',
//     basePrice: 2000,
//   },
//   {
//     id: '3',
//     eventOwner: 'Toyin Abraham',
//     title: ' Alakada Bad and Boujee',
//     eventImage: 'https://whatkeptmeup.com/wp-content/uploads/2024/12/photo_544495651951594250 uncomfortable_y.jpg',
//     description: 'Watch Alakada Bad & Boujee with Toyin Abraham',
//     subaccount_code: 'null', // Subaccount for Toyin’s team
//     venue: 'Genesis Cinema, Lagos',
//     city: 'Lagos',
//     category: 'Movie',
//     month: 'JUL',
//     date: '29',
//     year: '2025',
//     time: '16:00',
//     about: 'Laugh out loud with Alakada: Bad and Boujee! Toyin Abraham returns as Yetunde, a young woman faking a lavish lifestyle, in this hilarious Nollywood comedy-drama. Released on December 20, 2024, the film has grossed over ₦285.9 million in just two weeks, taking Nigerian cinemas by storm. Don’t miss the fun—watch it now!',
//     ticketFileName: 'Alakada Bad & Boujee Ticket',
//     ticketFileType: 'PNG',
//     ticketFileSize: '1.5 MB',
//     basePrice: 1500,
//   },
//   {
//     id: '4',
//     eventOwner: 'Wizkid',
//     title: 'Hellfest',
//     eventImage: 'https://rotatemagazine.com/wp-content/uploads/2024/11/Wizkid-Photo-1536x1109.webp',
//     description: 'Wizkid Live in Paris',
//     subaccount_code: 'null', // Subaccount for Wizkid’s team
//     venue: 'Stade de France',
//     city: 'Paris',
//     category: 'Concert',
//     month: 'SEP',
//     date: '19',
//     year: '2025',
//     time: '20:00',
//     about: 'Grammy award winning singer/songwriter Ayodeji Ibrahim Balogun (aka Wizkid) began his career in music when he was just 11 years old in Lagos, Nigeria. His first record, Lil Prinz, was recorded in 2001 in collaboration with Glorious Five, a group consisting of Balogun and his friends from church. In 2006, he started pursuing music full-time, at first collaborating with various Nigerian pop acts including OJB Jezreel, Naeto C, and Banky W. By 2011, he was ready to record his debut studio album as a solo artist: Superstar was released via Empire Mates Entertainment to great critical and public acclaim across Africa, propelling him to stardom in his home country. After multiple delays and label disagreements, Balogun released his sophomore album titled Ayo in 2014. This second studio album had a multitude of guest appearances, including a spot from Femi Kuti. It also featured Baloguns global breakthrough track "Ojuelegba." Not only did the single cement his status as one of Nigerias biggest pop acts, it was also picked up and remixed by Drake and Skepta, thrusting Wizkid into the international spotlight. In return, Wizkid appeared on Drakes 2016 smash single "One Dance." ',
//     ticketFileName: 'Hellfest Ticket',
//     ticketFileType: 'PNG',
//     ticketFileSize: '1.9 MB',
//     basePrice: 3000,
//   },
//   {
//     id: '5',
//     eventOwner: 'Burna Boy',
//     title: 'Burna & Friends Concert',
//     eventImage: 'https://s1.ticketm.net/dam/a/11f/490b5e5d-4dc6-478f-a4b8-873d8351f11f_RETINA_PORTRAIT_3_2.jpg',
//     description: 'Burna Boy Birthday Concert',
//     subaccount_code: 'null', // Subaccount for Burna’s team
//     venue: 'o2 Arena',
//     city: 'London',
//     category: 'Concert',
//     month: 'JAN',
//     date: '31',
//     year: '2025',
//     time: '17:00',
//     about: 'Burna Boy Live: 2025 Tour Heats Up! The African Giant brings his electrifying energy to the Stade de France on April 18, with an 80,000-capacity crowd, followed by a UK exclusive at Manchester’s Co-op Live on April 21. After a fiery Nairobi show on March 1, fans can’t stop raving about his ‘spiritual’ vibes and ‘insane’ stage presence—get your tickets now!',
//     ticketFileName: 'Burna & Friends Concert Ticket',
//     ticketFileType: 'PNG',
//     ticketFileSize: '120.9 KB',
//     basePrice: 2500,
//   },
//   {
//     id: '6',
//     title: 'Afrobeats Festival',
//     eventImage: 'https://dailypost.ng/wp-content/uploads/2024/11/tiwasavage-068.jpg',
//     description: 'Afrobeats Festival London',
//     subaccount_code: 'null', // Subaccount for Tiwa’s team
//     venue: 'o2 Arena',
//     city: 'London',
//     category: 'Concert',
//     month: 'MAY',
//     date: '15',
//     year: '2025',
//     time: '17:00',
//     about: '',
//     ticketFileName: 'Afrobeats Festival Ticket',
//     ticketFileType: 'PNG',
//     ticketFileSize: '100.9 KB',
//     basePrice: 3000,
//   },
//   {
//     id: '7',
//     title: 'Ravage Uprising',
//     eventImage: 'https://mmo.aiircdn.com/370/622f188e91a93.jpeg',
//     subaccount_code: 'null', // Subaccount for Rema’s team
//     description: 'Live at the o2',
//     venue: 'o2 Arena',
//     city: 'London',
//     category: 'Concert',
//     month: 'JUN',
//     date: '10',
//     year: '2025',
//     time: '21:00',
//     about: '',
//     ticketFileName: 'Ravage Uprising',
//     ticketFileType: 'PNG',
//     ticketFileSize: '130.9 KB',
//     basePrice: 3500,
//   },
//   {
//     id: '8',
//     title: 'Sabi Girl Concert',
//     eventImage: 'https://i0.wp.com/media.premiumtimesng.com/wp-content/files/2024/07/image5-8-e1721996216227.jpeg?resize=1140%2C570&ssl=1',
//     description: 'Ayra Starr Live in Auckland',
//     subaccount_code: 'null', // Subaccount for Ayra’s team
//     venue: 'Spark Arena',
//     city: 'Auckland',
//     category: 'Concert',
//     month: 'JUL',
//     date: '20',
//     year: '2025',
//     time: '17:00',
//     about: '',
//     ticketFileName: 'Sabi Girl Concert Ticket',
//     ticketFileType: 'PNG',
//     ticketFileSize: '90.9 KB',
//     basePrice: 2500,
//   },
//   {
//     id: '9',
//     title: 'Local Rappers',
//     eventImage: 'https://unorthodoxreviews.com/wp-content/uploads/2023/09/WhatsApp-Image-2023-09-21-at-9.00.32-AM-1.jpeg',
//     description: '',
//     subaccount_code: 'null', // Subaccount for Olamide’s team
//     venue: 'Eko Energy City',
//     city: 'Lagos',
//     category: 'Concert',
//     month: 'AUG',
//     date: '5',
//     year: '2025',
//     time: '20:00',
//     about: '',
//     ticketFileName: 'Local Raappers Concert Ticket',
//     ticketFileType: 'PNG',
//     ticketFileSize: '60.4 KB',
//     basePrice: 1000,
//   },
// ];

// function OrderSummary({ navigateBack, navigateToThankYou }) {
//   const { id } = useParams();
//   const { state } = useLocation();
//   const { user } = useContext(AuthContext);
//   const [eventData, setEventData] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [showFileDetails, setShowFileDetails] = useState(false);
//   const [paymentError, setPaymentError] = useState(null);
//   const [isPaystackLoaded, setIsPaystackLoaded] = useState(false);
//   const [isPaying, setIsPaying] = useState(false);

//   useEffect(() => {
//     const foundEvent = mockEvents.find((e) => e.id === id);
//     if (!foundEvent) {
//       console.error(`No event found for ID: ${id}`);
//     }
//     setEventData(foundEvent);
//     setLoading(false);
//   }, [id]);

//   useEffect(() => {
//     const script = document.createElement('script');
//     script.src = 'https://js.paystack.co/v1/inline.js';
//     script.async = true;
//     script.onload = () => {
//       console.log('Paystack script loaded');
//       setIsPaystackLoaded(true);
//     };
//     script.onerror = () => {
//       console.error('Failed to load Paystack script');
//       setPaymentError('Failed to load payment system. Please try again later.');
//     };
//     document.body.appendChild(script);

//     return () => {
//       if (document.body.contains(script)) {
//         document.body.removeChild(script);
//       }
//     };
//   }, []);

//   const toggleFileDetails = () => {
//     setShowFileDetails((prev) => !prev);
//   };

//   const {
//     firstName = 'Guest',
//     lastName = '',
//     email = 'No email provided',
//     phoneNumber = 'No phone provided',
//     ticketQuantity = 1,
//     totalPrice = 0,
//     isGift = false,
//     recipientFirstName = '',
//     recipientLastName = '',
//     recipientEmail = '',
//   } = state || {};

//   const createTicket = async (response) => {
//     try {
//       // Validate and construct eventDate
//       const monthIndex = [
//         'JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN',
//         'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'
//       ].indexOf(eventData.month.toUpperCase());
//       if (monthIndex === -1) {
//         throw new Error(`Invalid month: ${eventData.month}`);
//       }

//       const eventDateStr = `${eventData.year}-${monthIndex + 1}-${eventData.date} ${eventData.time}`;
//       const eventDate = new Date(eventDateStr);
//       if (isNaN(eventDate.getTime())) {
//         throw new Error(`Invalid eventDate: ${eventDateStr}`);
//       }

//       const ticketData = {
//         ticketId: `TICKET-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
//         transactionReference: response.reference,
//         eventId: id,
//         eventTitle: eventData?.title || 'Unknown Event',
//         eventDate: eventDate.toISOString(),
//         ticketHolder: {
//           firstName,
//           lastName,
//           email,
//         },
//         isGift,
//         recipient: isGift
//           ? {
//               firstName: recipientFirstName || undefined,
//               lastName: recipientLastName || undefined,
//               email: recipientEmail || undefined,
//             }
//           : undefined,
//         ticketQuantity,
//         totalPrice,
//         status: 'unused',
//       };

//       console.log('Sending ticket data to /api/tickets:', ticketData);
//       const ticketResponse = await fetch('https://loudbox-backend.vercel.app/api/tickets', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(ticketData),
//       });

//       if (!ticketResponse.ok) {
//         const errorText = await ticketResponse.text();
//         throw new Error(`Failed to create ticket: ${ticketResponse.status} - ${errorText}`);
//       }

//       const ticketResult = await ticketResponse.json();
//       console.log('Ticket created:', ticketResult);

//       localStorage.setItem('paymentSuccessful', 'true');
//       navigateToThankYou(id, {
//         state: {
//           ...ticketData,
//           transactionReference: ticketResult.transactionReference,
//           ticketId: ticketResult.ticketId,
//           eventDate: ticketResult.eventDate,
//         },
//       });
//     } catch (err) {
//       console.error('Error creating ticket:', err);
//       setPaymentError(
//         `Payment successful, but failed to create ticket: ${err.message}. Please contact support at support@loudbox.com.`
//       );
//     } finally {
//       setIsPaying(false);
//     }
//   };

//   const handlePayment = async () => {
//     if (!user) {
//       setPaymentError('Please sign in to complete your payment.');
//       navigateBack({ id });
//       return;
//     }

//     if (!isPaystackLoaded || !window.PaystackPop) {
//       setPaymentError('Paystack script not loaded. Please try again.');
//       return;
//     }

//     setIsPaying(true);
//     try {
//       // Compute eventDate for initialize-transaction
//       const monthIndex = [
//         'JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN',
//         'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'
//       ].indexOf(eventData.month.toUpperCase());
//       if (monthIndex === -1) {
//         throw new Error(`Invalid month: ${eventData.month}`);
//       }

//       const eventDateStr = `${eventData.year}-${monthIndex + 1}-${eventData.date} ${eventData.time}`;
//       const eventDate = new Date(eventDateStr);
//       if (isNaN(eventDate.getTime())) {
//         throw new Error(`Invalid eventDate: ${eventDateStr}`);
//       }

//       const backendUrl = process.env.REACT_APP_BACKEND_URL || 'https://loudbox-backend.vercel.app';
//       const requestData = {
//         email: email || 'guest@example.com',
//         amount: totalPrice,
//         subaccount_code: eventData.subaccount_code,
//         firstName,
//         lastName,
//         phoneNumber,
//         eventTitle: eventData.title,
//         eventDate: eventDate.toISOString(), // Define eventDate here
//         status: 'unused',
//         ticketQuantity,
//       };
//       console.log('Sending to /api/initialize-transaction:', requestData);
//       const response = await axios.post(`${backendUrl}/api/initialize-transaction`, requestData);
//       console.log('Response from /api/initialize-transaction:', response.data);

//       const { authorization_url, reference } = response.data.data;

//       const handlePaymentResponse = async (response) => {
//         if (response.status === 'success') {
//           console.log(`Payment successful! Transaction reference: ${response.reference}`);
//           try {
//             const verifyResponse = await axios.get(`${backendUrl}/api/verify-transaction/${response.reference}`);
//             console.log('Verification response:', verifyResponse.data);
//             if (verifyResponse.data.data.status === 'success') {
//               await createTicket(response);
//             } else {
//               setPaymentError('Payment verification failed. Please contact support.');
//               setIsPaying(false);
//             }
//           } catch (error) {
//             console.error('Verification error:', error);
//             setPaymentError('Payment verification failed. Please contact support.');
//             setIsPaying(false);
//           }
//         } else {
//           setPaymentError('Payment failed. Please try again.');
//           setIsPaying(false);
//         }
//       };

//       const handler = window.PaystackPop.setup({
//         key: process.env.REACT_APP_PAYSTACK_PUBLIC_KEY || 'pk_live_a8e81a28a5055c73966d7046d9f4469837d9fee7',
//         email: email || 'guest@example.com',
//         amount: totalPrice * 100,
//         currency: 'NGN',
//         ref: reference,
//         metadata: {
//           custom_fields: [
//             {
//               display_name: 'Event Title',
//               variable_name: 'event_title',
//               value: eventData.title,
//             },
//             {
//               display_name: 'Ticket Quantity',
//               variable_name: 'ticket_quantity',
//               value: ticketQuantity,
//             },
//             {
//               display_name: 'Customer Name',
//               variable_name: 'customer_name',
//               value: `${firstName} ${lastName}`,
//             },
//           ],
//         },
//         callback: (response) => {
//           handlePaymentResponse(response);
//         },
//         onClose: () => {
//           setPaymentError('Payment cancelled.');
//           setIsPaying(false);
//         },
//       });

//       handler.openIframe();
//     } catch (error) {
//       console.error('Payment initialization error:', error.response?.data || error.message);
//       setPaymentError(error.response?.data?.message || 'Failed to initialize payment. Please try again.');
//       setIsPaying(false);
//     }
//   };

//   if (loading) {
//     return <div>Loading event data...</div>;
//   }

//   if (!eventData) {
//     return (
//       <div>
//         No event found for ID: {id}. Please check the event ID or go back.
//         <button onClick={() => navigateBack({ id })} aria-label="Back to ticket purchase">
//           Back
//         </button>
//       </div>
//     );
//   }

//   return (
//     <div className={`order-summary-container ${isPaying ? 'blurred' : ''}`}>
//       <div className="order-summary-card">
//         <div className="order-header-container">
//           <h2>Buy {eventData.title} Ticket</h2>
//         </div>
//         <hr className="summary-divider" />
//         <div className="customer-contact">
//           <FaUser className="contact-icon" />
//           <h4 className="customer-name">
//             {firstName || 'N/A'} {lastName || 'N/A'}
//           </h4>
//         </div>
//         <div className="customer-contact">
//           <FaEnvelope className="contact-icon" />
//           <p className="customer-email">{email || 'No email provided'}</p>
//         </div>
//         <div className="customer-contact">
//           <FaPhone className="contact-icon" />
//           <p className="customer-phone">{phoneNumber || 'No phone provided'}</p>
//         </div>
//         {isGift && (
//           <div className="gift-details">
//             <h4>Gift Details</h4>
//             <p>
//               <strong>Recipient Name:</strong> {recipientFirstName || 'Not provided'}{' '}
//               {recipientLastName || 'Not provided'}
//             </p>
//             <p>
//               <strong>Recipient Email:</strong> {recipientEmail || 'Not provided'}
//             </p>
//           </div>
//         )}
//         <br />
//         <div className="file-display-group">
//           <div className="file-display-wrapper">
//             <span className="file-display-text">
//               1 file attached{' '}
//               <FaAngleDown
//                 className="angle-down"
//                 onClick={toggleFileDetails}
//                 aria-label="Toggle ticket file details"
//               />
//             </span>
//           </div>
//           {showFileDetails && (
//             <div className="file-details">
//               <div className="file-details-content">
//                 {eventData.ticketFileType.toLowerCase() === 'pdf' ? (
//                   <FaFilePdf className="file-icon" />
//                 ) : (
//                   <FaFileImage className="file-icon" />
//                 )}
//                 <div className="file-info">
//                   <p className="file-name">{eventData.ticketFileName}</p>
//                   <p className="file-meta">
//                     Type: {eventData.ticketFileType.toUpperCase()} | Size: {eventData.ticketFileSize}
//                   </p>
//                 </div>
//               </div>
//             </div>
//           )}
//         </div>
//         <hr className="summary-dot-divider" />
//         <div className="checkout-container">
//           <div className="checkout">
//             <div className="ticket-quantity-group">
//               <h5 className="ticket-event-name">{eventData.title} Ticket</h5>
//               <h5>x{ticketQuantity}</h5>
//             </div>
//             <h5>NGN {(totalPrice / ticketQuantity).toLocaleString()}</h5>
//           </div>
//           <div className="checkout-total">
//             <h5>Total</h5>
//             <h5>NGN {totalPrice.toLocaleString()}</h5>
//           </div>
//         </div>
//         <hr className="summary-dot-divider" />
//         {paymentError && <p className="error-message">{paymentError}</p>}
//         <div className="action-buttons">
//           <button
//             onClick={handlePayment}
//             aria-label={`Pay NGN ${totalPrice.toLocaleString()} for ${eventData.title}`}
//             className="payment-button"
//             disabled={isPaying || !isPaystackLoaded}
//           >
//             {isPaying ? 'Processing...' : `Pay NGN ${totalPrice.toLocaleString()}`}
//           </button>
//           <button
//             onClick={() => navigateBack({ id })}
//             aria-label="Back to ticket purchase"
//             className="back-ticket-purchase-btn"
//             disabled={isPaying}
//           >
//             Back
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

// OrderSummary.defaultProps = {
//   navigateBack: () => console.log('navigateBack not provided'),
//   navigateToThankYou: () => console.log('navigateToThankYou not provided'),
// };

// export default OrderSummary;



import React, { useState, useEffect, useContext } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import {
  FaEnvelope,
  FaPhone,
  FaFilePdf,
  FaFileImage,
  FaAngleDown,
  FaUser,
} from 'react-icons/fa';
import axios from 'axios';
import { AuthContext } from './AuthContext';
import './orderSummary.css';

// ---------------- Mock Events ---------------- //
const mockEvents = [
  {
    id: '1',
    eventOwner: 'Davido',
    title: 'Davido Live In Concert',
    eventImage:
      'https://wallpapercat.com/w/middle-retina/4/0/2/2250759-2560x1631-desktop-hd-davido-background-image.jpg',
    description: 'Davido 5ive Album Tour',
    subaccount_code: 'ACCT_rmjeq5j8it8mva9',
    venue: 'State Farm Arena',
    city: 'Atlanta',
    category: 'Concert',
    month: 'APR',
    date: '17',
    year: '2025',
    time: '17:00',
    about: 'Streamed over 2 billion times...',
    ticketFileName: 'Davido Live In Concert Ticket',
    ticketFileType: 'PNG',
    ticketFileSize: '1.2 MB',
    basePrice: 3000,
  },
  // ... other events (unchanged)
];

// ---------------- Component ---------------- //
function OrderSummary({ navigateBack, navigateToThankYou }) {
  const { id } = useParams();
  const { state = {} } = useLocation(); // ✅ Safe destructure
  const { user } = useContext(AuthContext);

  const [eventData, setEventData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showFileDetails, setShowFileDetails] = useState(false);
  const [paymentError, setPaymentError] = useState(null);
  const [isPaystackLoaded, setIsPaystackLoaded] = useState(false);
  const [isPaying, setIsPaying] = useState(false);

  // ✅ Find event safely
  useEffect(() => {
    const foundEvent = mockEvents.find((e) => e.id.toString() === id?.toString());
    if (!foundEvent) {
      console.error(`No event found for ID: ${id}`);
    }
    setEventData(foundEvent);
    setLoading(false);
  }, [id]);

  // ✅ Load Paystack script safely
  useEffect(() => {
    if (window.PaystackPop) {
      setIsPaystackLoaded(true);
      return;
    }

    const script = document.createElement('script');
    script.src = 'https://js.paystack.co/v1/inline.js';
    script.async = true;
    script.onload = () => setIsPaystackLoaded(true);
    script.onerror = () =>
      setPaymentError('Failed to load payment system. Please try again later.');

    document.body.appendChild(script);
    return () => {
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, []);

  const toggleFileDetails = () => setShowFileDetails((prev) => !prev);

  // ✅ Destructure state with fallbacks
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
  } = state;

  // ✅ Helper: Convert month abbreviation to date object
  const buildEventDate = () => {
    const months = [
      'JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN',
      'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC',
    ];
    const monthIndex = months.indexOf(eventData.month.toUpperCase());
    if (monthIndex === -1) throw new Error(`Invalid month: ${eventData.month}`);

    const formattedDate = `${eventData.year}-${String(monthIndex + 1).padStart(2, '0')}-${String(
      eventData.date
    ).padStart(2, '0')}T${eventData.time}:00`;
    const date = new Date(formattedDate);
    if (isNaN(date.getTime())) throw new Error(`Invalid eventDate: ${formattedDate}`);
    return date;
  };

  // ✅ Create Ticket in backend
  const createTicket = async (response) => {
    try {
      const eventDate = buildEventDate();
      const ticketData = {
        ticketId: `TICKET-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        transactionReference: response.reference,
        eventId: id,
        eventTitle: eventData?.title || 'Unknown Event',
        eventDate: eventDate.toISOString(),
        ticketHolder: { firstName, lastName, email },
        isGift,
        recipient: isGift
          ? { firstName: recipientFirstName, lastName: recipientLastName, email: recipientEmail }
          : undefined,
        ticketQuantity,
        totalPrice,
        status: 'unused',
      };

      console.log('Sending ticket to /api/tickets:', ticketData);
      const res = await fetch('https://loudbox-backend.vercel.app/api/tickets', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(ticketData),
      });

      if (!res.ok) {
        const text = await res.text();
        throw new Error(`Failed to create ticket: ${res.status} - ${text}`);
      }

      const result = await res.json();
      console.log('Ticket created:', result);

      localStorage.setItem('paymentSuccessful', 'true');
      navigateToThankYou(id, {
        state: {
          ...ticketData,
          transactionReference: result.transactionReference,
          ticketId: result.ticketId,
          eventDate: result.eventDate,
        },
      });
    } catch (err) {
      console.error('Error creating ticket:', err);
      setPaymentError(
        `Payment successful, but ticket creation failed: ${err.message}. Please contact support@loudbox.com`
      );
    } finally {
      setIsPaying(false);
    }
  };

  // ✅ Handle payment
  const handlePayment = async () => {
    if (!user) {
      setPaymentError('Please sign in to complete your payment.');
      navigateBack({ id });
      return;
    }
    if (!isPaystackLoaded || !window.PaystackPop) {
      setPaymentError('Paystack script not loaded. Please try again.');
      return;
    }

    setIsPaying(true);
    try {
      const eventDate = buildEventDate();

      const backendUrl =
        process.env.REACT_APP_BACKEND_URL || 'https://loudbox-backend.vercel.app';

      const requestData = {
        email: email || 'guest@example.com',
        amount: totalPrice * 100, // ✅ Ensure correct unit (kobo)
        subaccount_code: eventData.subaccount_code,
        firstName,
        lastName,
        phoneNumber,
        eventTitle: eventData.title,
        eventDate: eventDate.toISOString(),
        status: 'unused',
        ticketQuantity,
      };

      console.log('Sending to /api/initialize-transaction:', requestData);
      const response = await axios.post(`${backendUrl}/api/initialize-transaction`, requestData);
      console.log('Response from /api/initialize-transaction:', response.data);

      const { reference } = response.data.data;

      const handlePaymentResponse = async (res) => {
        if (res.status === 'success') {
          console.log(`Payment successful! Reference: ${res.reference}`);
          try {
            const verifyRes = await axios.get(
              `${backendUrl}/api/verify-transaction/${res.reference}`
            );
            console.log('Verification response:', verifyRes.data);

            if (verifyRes.data.data.status === 'success') {
              await createTicket(res);
            } else {
              // retry once after 3s
              await new Promise((r) => setTimeout(r, 3000));
              const retry = await axios.get(
                `${backendUrl}/api/verify-transaction/${res.reference}`
              );
              if (retry.data.data.status === 'success') await createTicket(res);
              else setPaymentError('Payment verification failed. Please contact support.');
              setIsPaying(false);
            }
          } catch (error) {
            console.error('Verification error:', error);
            setPaymentError('Payment verification failed. Please contact support.');
            setIsPaying(false);
          }
        } else {
          setPaymentError('Payment failed. Please try again.');
          setIsPaying(false);
        }
      };

      const handler = window.PaystackPop.setup({
        key: process.env.REACT_APP_PAYSTACK_PUBLIC_KEY, // ✅ no hardcoded live key
        email: email || 'guest@example.com',
        amount: totalPrice * 100,
        currency: 'NGN',
        ref: reference,
        metadata: {
          custom_fields: [
            { display_name: 'Event Title', variable_name: 'event_title', value: eventData.title },
            { display_name: 'Ticket Quantity', variable_name: 'ticket_quantity', value: ticketQuantity },
            { display_name: 'Customer Name', variable_name: 'customer_name', value: `${firstName} ${lastName}` },
          ],
        },
        callback: handlePaymentResponse,
        onClose: () => {
          setPaymentError('Payment cancelled.');
          setIsPaying(false);
        },
      });

      handler.openIframe();
    } catch (error) {
      console.error('Payment init error:', error.response?.data || error.message);
      setPaymentError(error.response?.data?.message || 'Failed to initialize payment.');
      setIsPaying(false);
    }
  };

  // ---------------- UI ---------------- //
  if (loading) return <div>Loading event data...</div>;

  if (!eventData)
    return (
      <div>
        No event found for ID: {id}.
        <button onClick={() => navigateBack({ id })}>Back</button>
      </div>
    );

  return (
    <div className={`order-summary-container ${isPaying ? 'blurred' : ''}`}>
      <div className="order-summary-card">
        <div className="order-header-container">
          <h2>Buy {eventData.title} Ticket</h2>
        </div>

        <hr className="summary-divider" />

        {/* Customer Info */}
        <div className="customer-contact">
          <FaUser className="contact-icon" />
          <h4 className="customer-name">
            {firstName || lastName ? `${firstName} ${lastName}` : 'Guest'}
          </h4>
        </div>
        <div className="customer-contact">
          <FaEnvelope className="contact-icon" />
          <p>{email}</p>
        </div>
        <div className="customer-contact">
          <FaPhone className="contact-icon" />
          <p>{phoneNumber}</p>
        </div>

        {isGift && (
          <div className="gift-details">
            <h4>Gift Details</h4>
            <p>
              <strong>Recipient:</strong> {recipientFirstName} {recipientLastName}
            </p>
            <p>
              <strong>Email:</strong> {recipientEmail}
            </p>
          </div>
        )}

        <br />

        {/* File Section */}
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
                    Type: {eventData.ticketFileType.toUpperCase()} | Size:{' '}
                    {eventData.ticketFileSize}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        <hr className="summary-dot-divider" />

        {/* Checkout Section */}
        <div className="checkout-container">
          <div className="checkout">
            <div className="ticket-quantity-group">
              <h5 className="ticket-event-name">{eventData.title} Ticket</h5>
              <h5>x{ticketQuantity}</h5>
            </div>
            <h5>NGN {(totalPrice / ticketQuantity).toLocaleString()}</h5>
          </div>
          <div className="checkout-total">
            <h5>Total</h5>
            <h5>NGN {totalPrice.toLocaleString()}</h5>
          </div>
        </div>

        <hr className="summary-dot-divider" />

        {paymentError && <p className="error-message">{paymentError}</p>}

        <div className="action-buttons">
          <button
            onClick={handlePayment}
            disabled={isPaying || !isPaystackLoaded}
            className="payment-button"
            aria-label={`Pay NGN ${totalPrice.toLocaleString()} for ${eventData.title}`}
          >
            {isPaying ? 'Processing...' : `Pay NGN ${totalPrice.toLocaleString()}`}
          </button>
          <button
            onClick={() => navigateBack({ id })}
            disabled={isPaying}
            className="back-ticket-purchase-btn"
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
  navigateToThankYou: () => console.log('navigateToThankYou not provided'),
};

export default OrderSummary;
