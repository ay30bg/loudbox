// import React, { useState, useEffect } from 'react';
// import { useParams } from 'react-router-dom';
// import { FaAngleDown, FaFilePdf, FaFileImage } from 'react-icons/fa';
// import './ticketPurchase.css';

// // Mock data
// const mockEvents = [
//   {
//     id: '1',
//     eventOwner: 'DND',
//     title: 'DND Block Party 2.0',
//     eventImage: 'https://i.postimg.cc/ZK2dmGrb/DND-FLIER.jpg',
//     description: 'A One in a Million Party',
//     subaccount_code: 'ACCT_567462xff65gop0',
//     venue: 'State Farm Arena',
//     city: 'Osogbo',
//     category: 'Hangout',
//     month: 'DEC',
//     date: '18',
//     year: '2025',
//     time: '20:00',
//     about: 'DND Block Party 2.0 is the second edition of the thrilling rave event...',
//     ticketFileName: 'DND Block Party Ticket',
//     ticketFileType: 'PNG',
//     ticketFileSize: '1.2 MB',
//     basePrice: 5000,
//   },
// ];

// // Country codes (truncated for brevity)
// const countryPhoneCodes = [
//   { name: 'Afghanistan', code: '+93' },
//   { name: 'Albania', code: '+355' },
//   { name: 'Algeria', code: '+213' },
//   { name: 'Andorra', code: '+376' },
//   { name: 'Angola', code: '+244' },
//   { name: 'Antigua and Barbuda', code: '+1-268' },
//   { name: 'Argentina', code: '+54' },
//   { name: 'Armenia', code: '+374' },
//   { name: 'Australia', code: '+61' },
//   { name: 'Austria', code: '+43' },
//   { name: 'Azerbaijan', code: '+994' },
//   { name: 'Bahamas', code: '+1-242' },
//   { name: 'Bahrain', code: '+973' },
//   { name: 'Bangladesh', code: '+880' },
//   { name: 'Barbados', code: '+1-246' },
//   { name: 'Belarus', code: '+375' },
//   { name: 'Belgium', code: '+32' },
//   { name: 'Belize', code: '+501' },
//   { name: 'Benin', code: '+229' },
//   { name: 'Bhutan', code: '+975' },
//   { name: 'Bolivia', code: '+591' },
//   { name: 'Bosnia and Herzegovina', code: '+387' },
//   { name: 'Botswana', code: '+267' },
//   { name: 'Brazil', code: '+55' },
//   { name: 'Brunei', code: '+673' },
//   { name: 'Bulgaria', code: '+359' },
//   { name: 'Burkina Faso', code: '+226' },
//   { name: 'Burundi', code: '+257' },
//   { name: 'Cambodia', code: '+855' },
//   { name: 'Cameroon', code: '+237' },
//   { name: 'Canada', code: '+1' },
//   { name: 'Cape Verde', code: '+238' },
//   { name: 'Central African Republic', code: '+236' },
//   { name: 'Chad', code: '+235' },
//   { name: 'Chile', code: '+56' },
//   { name: 'China', code: '+86' },
//   { name: 'Colombia', code: '+57' },
//   { name: 'Comoros', code: '+269' },
//   { name: 'Congo (DRC)', code: '+243' },
//   { name: 'Congo (Republic)', code: '+242' },
//   { name: 'Costa Rica', code: '+506' },
//   { name: 'Croatia', code: '+385' },
//   { name: 'Cuba', code: '+53' },
//   { name: 'Cyprus', code: '+357' },
//   { name: 'Czech Republic', code: '+420' },
//   { name: 'Denmark', code: '+45' },
//   { name: 'Djibouti', code: '+253' },
//   { name: 'Dominica', code: '+1-767' },
//   { name: 'Dominican Republic', code: '+1-809' }, // Also +1-829, +1-849
//   { name: 'Ecuador', code: '+593' },
//   { name: 'Egypt', code: '+20' },
//   { name: 'El Salvador', code: '+503' },
//   { name: 'Equatorial Guinea', code: '+240' },
//   { name: 'Eritrea', code: '+291' },
//   { name: 'Estonia', code: '+372' },
//   { name: 'Eswatini', code: '+268' },
//   { name: 'Ethiopia', code: '+251' },
//   { name: 'Fiji', code: '+679' },
//   { name: 'Finland', code: '+358' },
//   { name: 'France', code: '+33' },
//   { name: 'Gabon', code: '+241' },
//   { name: 'Gambia', code: '+220' },
//   { name: 'Georgia', code: '+995' },
//   { name: 'Germany', code: '+49' },
//   { name: 'Ghana', code: '+233' },
//   { name: 'Greece', code: '+30' },
//   { name: 'Grenada', code: '+1-473' },
//   { name: 'Guatemala', code: '+502' },
//   { name: 'Guinea', code: '+224' },
//   { name: 'Guinea-Bissau', code: '+245' },
//   { name: 'Guyana', code: '+592' },
//   { name: 'Haiti', code: '+509' },
//   { name: 'Honduras', code: '+504' },
//   { name: 'Hungary', code: '+36' },
//   { name: 'Iceland', code: '+354' },
//   { name: 'India', code: '+91' },
//   { name: 'Indonesia', code: '+62' },
//   { name: 'Iran', code: '+98' },
//   { name: 'Iraq', code: '+964' },
//   { name: 'Ireland', code: '+353' },
//   { name: 'Israel', code: '+972' },
//   { name: 'Italy', code: '+39' },
//   { name: 'Jamaica', code: '+1-876' },
//   { name: 'Japan', code: '+81' },
//   { name: 'Jordan', code: '+962' },
//   { name: 'Kazakhstan', code: '+7' },
//   { name: 'Kenya', code: '+254' },
//   { name: 'Kiribati', code: '+686' },
//   { name: 'Kuwait', code: '+965' },
//   { name: 'Kyrgyzstan', code: '+996' },
//   { name: 'Laos', code: '+856' },
//   { name: 'Latvia', code: '+371' },
//   { name: 'Lebanon', code: '+961' },
//   { name: 'Lesotho', code: '+266' },
//   { name: 'Liberia', code: '+231' },
//   { name: 'Libya', code: '+218' },
//   { name: 'Liechtenstein', code: '+423' },
//   { name: 'Lithuania', code: '+370' },
//   { name: 'Luxembourg', code: '+352' },
//   { name: 'Madagascar', code: '+261' },
//   { name: 'Malawi', code: '+265' },
//   { name: 'Malaysia', code: '+60' },
//   { name: 'Maldives', code: '+960' },
//   { name: 'Mali', code: '+223' },
//   { name: 'Malta', code: '+356' },
//   { name: 'Marshall Islands', code: '+692' },
//   { name: 'Mauritania', code: '+222' },
//   { name: 'Mauritius', code: '+230' },
//   { name: 'Mexico', code: '+52' },
//   { name: 'Micronesia', code: '+691' },
//   { name: 'Moldova', code: '+373' },
//   { name: 'Monaco', code: '+377' },
//   { name: 'Mongolia', code: '+976' },
//   { name: 'Montenegro', code: '+382' },
//   { name: 'Morocco', code: '+212' },
//   { name: 'Mozambique', code: '+258' },
//   { name: 'Myanmar', code: '+95' },
//   { name: 'Namibia', code: '+264' },
//   { name: 'Nauru', code: '+674' },
//   { name: 'Nepal', code: '+977' },
//   { name: 'Netherlands', code: '+31' },
//   { name: 'New Zealand', code: '+64' },
//   { name: 'Nicaragua', code: '+505' },
//   { name: 'Niger', code: '+227' },
//   { name: 'Nigeria', code: '+234' },
//   { name: 'North Korea', code: '+850' },
//   { name: 'North Macedonia', code: '+389' },
//   { name: 'Norway', code: '+47' },
//   { name: 'Oman', code: '+968' },
//   { name: 'Pakistan', code: '+92' },
//   { name: 'Palau', code: '+680' },
//   { name: 'Palestine', code: '+970' },
//   { name: 'Panama', code: '+507' },
//   { name: 'Papua New Guinea', code: '+675' },
//   { name: 'Paraguay', code: '+595' },
//   { name: 'Peru', code: '+51' },
//   { name: 'Philippines', code: '+63' },
//   { name: 'Poland', code: '+48' },
//   { name: 'Portugal', code: '+351' },
//   { name: 'Qatar', code: '+974' },
//   { name: 'Romania', code: '+40' },
//   { name: 'Russia', code: '+7' },
//   { name: 'Rwanda', code: '+250' },
//   { name: 'Saint Kitts and Nevis', code: '+1-869' },
//   { name: 'Saint Lucia', code: '+1-758' },
//   { name: 'Saint Vincent and the Grenadines', code: '+1-784' },
//   { name: 'Samoa', code: '+685' },
//   { name: 'San Marino', code: '+378' },
//   { name: 'Sao Tome and Principe', code: '+239' },
//   { name: 'Saudi Arabia', code: '+966' },
//   { name: 'Senegal', code: '+221' },
//   { name: 'Serbia', code: '+381' },
//   { name: 'Seychelles', code: '+248' },
//   { name: 'Sierra Leone', code: '+232' },
//   { name: 'Singapore', code: '+65' },
//   { name: 'Slovakia', code: '+421' },
//   { name: 'Slovenia', code: '+386' },
//   { name: 'Solomon Islands', code: '+677' },
//   { name: 'Somalia', code: '+252' },
//   { name: 'South Africa', code: '+27' },
//   { name: 'South Korea', code: '+82' },
//   { name: 'South Sudan', code: '+211' },
//   { name: 'Spain', code: '+34' },
//   { name: 'Sri Lanka', code: '+94' },
//   { name: 'Sudan', code: '+249' },
//   { name: 'Suriname', code: '+597' },
//   { name: 'Sweden', code: '+46' },
//   { name: 'Switzerland', code: '+41' },
//   { name: 'Syria', code: '+963' },
//   { name: 'Taiwan', code: '+886' },
//   { name: 'Tajikistan', code: '+992' },
//   { name: 'Tanzania', code: '+255' },
//   { name: 'Thailand', code: '+66' },
//   { name: 'Timor-Leste', code: '+670' },
//   { name: 'Togo', code: '+228' },
//   { name: 'Tonga', code: '+676' },
//   { name: 'Trinidad and Tobago', code: '+1-868' },
//   { name: 'Tunisia', code: '+216' },
//   { name: 'Turkey', code: '+90' },
//   { name: 'Turkmenistan', code: '+993' },
//   { name: 'Tuvalu', code: '+688' },
//   { name: 'Uganda', code: '+256' },
//   { name: 'Ukraine', code: '+380' },
//   { name: 'United Arab Emirates', code: '+971' },
//   { name: 'United Kingdom', code: '+44' },
//   { name: 'United States', code: '+1' },
//   { name: 'Uruguay', code: '+598' },
//   { name: 'Uzbekistan', code: '+998' },
//   { name: 'Vanuatu', code: '+678' },
//   { name: 'Vatican City', code: '+39' }, // Uses Italy's code
//   { name: 'Venezuela', code: '+58' },
//   { name: 'Vietnam', code: '+84' },
//   { name: 'Yemen', code: '+967' },
//   { name: 'Zambia', code: '+260' },
//   { name: 'Zimbabwe', code: '+263' }
// ];

// function TicketPurchase({ navigateBack, navigateToOrderSummary }) {
//   const { id } = useParams();
//   const [eventData, setEventData] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [showFileDetails, setShowFileDetails] = useState(false);
//   const [ticketQuantity, setTicketQuantity] = useState(1);
//   const [selectedCountryCode, setSelectedCountryCode] = useState('+234');
//   const [isGift, setIsGift] = useState(false);
//   const [recipientFirstName, setRecipientFirstName] = useState('');
//   const [recipientLastName, setRecipientLastName] = useState('');
//   const [recipientEmail, setRecipientEmail] = useState('');
//   const [firstName, setFirstName] = useState('');
//   const [lastName, setLastName] = useState('');
//   const [email, setEmail] = useState('');
//   const [phoneNumber, setPhoneNumber] = useState('');

//   useEffect(() => {
//     const foundEvent = mockEvents.find((e) => e.id === id);
//     setEventData(foundEvent);
//     setLoading(false);
//   }, [id]);

//   function EventCountdown({ event }) {
//     const [timeLeft, setTimeLeft] = useState('');
//     useEffect(() => {
//       const eventDateTime = new Date(`${event.month} ${event.date}, ${event.year} ${event.time}`);
//       const interval = setInterval(() => {
//         const now = new Date();
//         const diff = eventDateTime - now;
//         if (diff > 0) {
//           const days = Math.floor(diff / (1000 * 60 * 60 * 24));
//           const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
//           const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
//           setTimeLeft(`${days}d ${hours}h ${minutes}m`);
//         } else {
//           setTimeLeft('Event Started!');
//           clearInterval(interval);
//         }
//       }, 1000);
//       return () => clearInterval(interval);
//     }, [event]);
//     return <div className="countdown">{timeLeft || 'Calculating...'}</div>;
//   }

//   const toggleFileDetails = () => setShowFileDetails((prev) => !prev);
//   const incrementTickets = () => setTicketQuantity((prev) => prev + 1);
//   const decrementTickets = () => setTicketQuantity((prev) => (prev > 1 ? prev - 1 : 1));
//   const handleCountryChange = (e) => setSelectedCountryCode(e.target.value);
//   const handleGiftChange = (e) => setIsGift(e.target.checked);

//   if (loading) return <div>Loading event data...</div>;
//   if (!eventData)
//     return (
//       <div>
//         No event found for ID: {id}. Please check the event ID or go back.
//         <button onClick={() => navigateBack(eventData)}>Back</button>
//       </div>
//     );

//   // Calculate price and discount
//   const baseTotal = eventData.basePrice * ticketQuantity;
//   const discount = eventData.title === 'DND Block Party 2.0' && ticketQuantity === 5 ? 5000 : 0;
//   const totalPriceWithDiscount = baseTotal - discount;

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (!firstName || !email || !phoneNumber) {
//       alert('Please fill in all required fields.');
//       return;
//     }

//     const purchaseData = {
//       id,
//       eventTitle: eventData.title,
//       eventOwner: eventData.eventOwner,
//       ticketQuantity,
//       basePrice: eventData.basePrice,
//       discount,
//       totalPrice: totalPriceWithDiscount,
//       isGift,
//       recipientFirstName: isGift ? recipientFirstName : '',
//       recipientLastName: isGift ? recipientLastName : '',
//       recipientEmail: isGift ? recipientEmail : '',
//       firstName,
//       lastName,
//       email,
//       phoneNumber: `${selectedCountryCode}${phoneNumber}`,
//       ticketFileName: eventData.ticketFileName,
//       ticketFileType: eventData.ticketFileType,
//       ticketFileSize: eventData.ticketFileSize,
//     };

//     navigateToOrderSummary(purchaseData);
//   };

//   return (
//     <div className="ticket-purchase-container">
//       <div className="ticket-image-container">
//         <img src={eventData.eventImage} alt={eventData.title} className="ticket-image" />
//         <EventCountdown event={eventData} />
//       </div>

//       <div className="ticket-title-holder">
//         <h3 className="event-title">{eventData.title}</h3>
//       </div>

//       <div className={isGift ? 'buy-ticket-container gift-active' : 'buy-ticket-container'}>
//         <div className="ticket-header">
//           <h2 className="buy-ticket-header">Buy {eventData.title} Tickets</h2>
//           <p className="buy-ticket-paragraph">By {eventData.eventOwner}</p>
//           <hr className="ticket-header-divider" />
//         </div>

//         <form onSubmit={handleSubmit} className="ticket-form">
//           <div className="checkbox-group">
//             <input type="checkbox" checked={isGift} onChange={handleGiftChange} id="giftCheckbox" />
//             <label htmlFor="giftCheckbox">Is this a gift?</label>
//           </div>

//           {/* Buyer info */}
//           <div className="name-input">
//             <div className="input-group">
//               <label htmlFor="firstName">Your name</label>
//               <div className="name-inputs">
//                 <input
//                   type="text"
//                   id="firstName"
//                   placeholder="First name"
//                   value={firstName}
//                   onChange={(e) => setFirstName(e.target.value)}
//                   required
//                   className="name-inputbox"
//                 />
//                 <input
//                   type="text"
//                   id="lastName"
//                   placeholder="Last name"
//                   value={lastName}
//                   onChange={(e) => setLastName(e.target.value)}
//                   className="name-inputbox-2"
//                 />
//               </div>
//             </div>

//             <div className="input-group">
//               <label htmlFor="email">Your email address</label>
//               <input
//                 type="email"
//                 id="email"
//                 placeholder="name@host.com"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 required
//                 className="email-inputbox"
//               />
//             </div>

//             <div className="input-group">
//               <label htmlFor="phoneNumber">Your phone number</label>
//               <div className="name-inputs">
//                 <select value={selectedCountryCode} onChange={handleCountryChange} className="phone-code-select">
//                   {countryPhoneCodes.map((country) => (
//                     <option key={country.code} value={country.code}>
//                       {country.name} ({country.code})
//                     </option>
//                   ))}
//                 </select>
//                 <input
//                   type="tel"
//                   id="phoneNumber"
//                   placeholder="Phone number"
//                   value={phoneNumber}
//                   onChange={(e) => setPhoneNumber(e.target.value)}
//                   required
//                   className="phone-number-inputbox"
//                 />
//               </div>
//             </div>
//           </div>

//           {/* Gift recipient info */}
//           {isGift && (
//             <div className="name-input">
//               <div className="input-group">
//                 <label>Recipient Name</label>
//                 <div className="name-inputs">
//                   <input
//                     type="text"
//                     placeholder="First name"
//                     value={recipientFirstName}
//                     onChange={(e) => setRecipientFirstName(e.target.value)}
//                     className="name-inputbox"
//                   />
//                   <input
//                     type="text"
//                     placeholder="Last name"
//                     value={recipientLastName}
//                     onChange={(e) => setRecipientLastName(e.target.value)}
//                     className="name-inputbox-2"
//                   />
//                 </div>
//               </div>

//               <div className="input-group">
//                 <label>Recipient Email</label>
//                 <input
//                   type="email"
//                   placeholder="recipient@host.com"
//                   value={recipientEmail}
//                   onChange={(e) => setRecipientEmail(e.target.value)}
//                   className="recipient-email-inputbox"
//                 />
//               </div>
//             </div>
//           )}

//           {/* Ticket file details */}
//           <div className="file-display-group">
//             <div className="file-display-wrapper">
//               <span className="file-display-text">
//                 1 file attached{' '}
//                 <FaAngleDown className="angle-down" onClick={toggleFileDetails} />
//               </span>
//             </div>
//             {showFileDetails && (
//               <div className="file-details">
//                 <div className="file-details-content">
//                   {eventData.ticketFileType.toLowerCase() === 'pdf' ? (
//                     <FaFilePdf className="file-icon" />
//                   ) : (
//                     <FaFileImage className="file-icon" />
//                   )}
//                   <div className="file-info">
//                     <p className="file-name">{eventData.ticketFileName}</p>
//                     <p className="file-meta">
//                       Type: {eventData.ticketFileType.toUpperCase()} | Size: {eventData.ticketFileSize}
//                     </p>
//                   </div>
//                 </div>
//               </div>
//             )}
//           </div>

//           <hr className="ticket-bottom-divider" />

//           {/* Quantity and price */}
//           <div className="counter-price-container">
//             <div className="ticket-counter-group">
//               <div className="ticket-counter">
//                 <button type="button" onClick={decrementTickets} disabled={ticketQuantity <= 1} className="counter-btn">
//                   -
//                 </button>
//                 <span className="counter-value">{ticketQuantity}</span>
//                 <button type="button" onClick={incrementTickets} className="counter-btn">
//                   +
//                 </button>
//               </div>
//             </div>
            
//             {/* <div className="price-group">
//               <span className="price-value">
//                 NGN {totalPriceWithDiscount.toLocaleString()}{' '}
//                 {discount > 0 && `(₦${discount.toLocaleString()} discount applied)`}
//               </span>
//             </div>
//           </div> */}

//                   <div className="price-group">
//   <span className="price-value">
//     NGN {totalPriceWithDiscount.toLocaleString()}
//   </span>
// </div>
//           </div>

// {discount > 0 && (
//   <p className="discount-note">
//     ₦{discount.toLocaleString()} discount applied! 🎉
//   </p>
// )}


//           <button type="submit" className="confirm-ticket-btn">
//             Confirm Purchase
//           </button>
//           <button type="button" onClick={() => navigateBack(eventData)} className="back-btn">
//             Back
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// }

// TicketPurchase.defaultProps = {
//   navigateBack: () => console.log('navigateBack not provided'),
//   navigateToOrderSummary: () => console.log('navigateToOrderSummary not provided'),
// };

// export default TicketPurchase;




import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { FaAngleDown, FaFilePdf, FaFileImage } from 'react-icons/fa';
import './ticketPurchase.css';

// Mock data
const mockEvents = [
  {
    id: '1',
    eventOwner: 'DND',
    title: 'DND Block Party 2.0',
    eventImage: 'https://i.postimg.cc/ZK2dmGrb/DND-FLIER.jpg',
    description: 'A One in a Million Party',
    subaccount_code: 'ACCT_567462xff65gop0',
    venue: 'State Farm Arena',
    city: 'Osogbo',
    category: 'Hangout',
    month: 'DEC',
    date: '18',
    year: '2025',
    time: '20:00',
    about: 'DND Block Party 2.0 is the second edition of the thrilling rave event...',
    ticketFileName: 'DND Block Party Ticket',
    ticketFileType: 'PNG',
    ticketFileSize: '1.2 MB',
    basePrice: 5000,
  },
];

// Country codes (truncated for brevity)
const countryPhoneCodes = [
  { name: 'Afghanistan', code: '+93' },
  { name: 'Albania', code: '+355' },
  { name: 'Algeria', code: '+213' },
  { name: 'Andorra', code: '+376' },
  { name: 'Angola', code: '+244' },
  { name: 'Antigua and Barbuda', code: '+1-268' },
  { name: 'Argentina', code: '+54' },
  { name: 'Armenia', code: '+374' },
  { name: 'Australia', code: '+61' },
  { name: 'Austria', code: '+43' },
  { name: 'Azerbaijan', code: '+994' },
  { name: 'Bahamas', code: '+1-242' },
  { name: 'Bahrain', code: '+973' },
  { name: 'Bangladesh', code: '+880' },
  { name: 'Barbados', code: '+1-246' },
  { name: 'Belarus', code: '+375' },
  { name: 'Belgium', code: '+32' },
  { name: 'Belize', code: '+501' },
  { name: 'Benin', code: '+229' },
  { name: 'Bhutan', code: '+975' },
  { name: 'Bolivia', code: '+591' },
  { name: 'Bosnia and Herzegovina', code: '+387' },
  { name: 'Botswana', code: '+267' },
  { name: 'Brazil', code: '+55' },
  { name: 'Brunei', code: '+673' },
  { name: 'Bulgaria', code: '+359' },
  { name: 'Burkina Faso', code: '+226' },
  { name: 'Burundi', code: '+257' },
  { name: 'Cambodia', code: '+855' },
  { name: 'Cameroon', code: '+237' },
  { name: 'Canada', code: '+1' },
  { name: 'Cape Verde', code: '+238' },
  { name: 'Central African Republic', code: '+236' },
  { name: 'Chad', code: '+235' },
  { name: 'Chile', code: '+56' },
  { name: 'China', code: '+86' },
  { name: 'Colombia', code: '+57' },
  { name: 'Comoros', code: '+269' },
  { name: 'Congo (DRC)', code: '+243' },
  { name: 'Congo (Republic)', code: '+242' },
  { name: 'Costa Rica', code: '+506' },
  { name: 'Croatia', code: '+385' },
  { name: 'Cuba', code: '+53' },
  { name: 'Cyprus', code: '+357' },
  { name: 'Czech Republic', code: '+420' },
  { name: 'Denmark', code: '+45' },
  { name: 'Djibouti', code: '+253' },
  { name: 'Dominica', code: '+1-767' },
  { name: 'Dominican Republic', code: '+1-809' }, // Also +1-829, +1-849
  { name: 'Ecuador', code: '+593' },
  { name: 'Egypt', code: '+20' },
  { name: 'El Salvador', code: '+503' },
  { name: 'Equatorial Guinea', code: '+240' },
  { name: 'Eritrea', code: '+291' },
  { name: 'Estonia', code: '+372' },
  { name: 'Eswatini', code: '+268' },
  { name: 'Ethiopia', code: '+251' },
  { name: 'Fiji', code: '+679' },
  { name: 'Finland', code: '+358' },
  { name: 'France', code: '+33' },
  { name: 'Gabon', code: '+241' },
  { name: 'Gambia', code: '+220' },
  { name: 'Georgia', code: '+995' },
  { name: 'Germany', code: '+49' },
  { name: 'Ghana', code: '+233' },
  { name: 'Greece', code: '+30' },
  { name: 'Grenada', code: '+1-473' },
  { name: 'Guatemala', code: '+502' },
  { name: 'Guinea', code: '+224' },
  { name: 'Guinea-Bissau', code: '+245' },
  { name: 'Guyana', code: '+592' },
  { name: 'Haiti', code: '+509' },
  { name: 'Honduras', code: '+504' },
  { name: 'Hungary', code: '+36' },
  { name: 'Iceland', code: '+354' },
  { name: 'India', code: '+91' },
  { name: 'Indonesia', code: '+62' },
  { name: 'Iran', code: '+98' },
  { name: 'Iraq', code: '+964' },
  { name: 'Ireland', code: '+353' },
  { name: 'Israel', code: '+972' },
  { name: 'Italy', code: '+39' },
  { name: 'Jamaica', code: '+1-876' },
  { name: 'Japan', code: '+81' },
  { name: 'Jordan', code: '+962' },
  { name: 'Kazakhstan', code: '+7' },
  { name: 'Kenya', code: '+254' },
  { name: 'Kiribati', code: '+686' },
  { name: 'Kuwait', code: '+965' },
  { name: 'Kyrgyzstan', code: '+996' },
  { name: 'Laos', code: '+856' },
  { name: 'Latvia', code: '+371' },
  { name: 'Lebanon', code: '+961' },
  { name: 'Lesotho', code: '+266' },
  { name: 'Liberia', code: '+231' },
  { name: 'Libya', code: '+218' },
  { name: 'Liechtenstein', code: '+423' },
  { name: 'Lithuania', code: '+370' },
  { name: 'Luxembourg', code: '+352' },
  { name: 'Madagascar', code: '+261' },
  { name: 'Malawi', code: '+265' },
  { name: 'Malaysia', code: '+60' },
  { name: 'Maldives', code: '+960' },
  { name: 'Mali', code: '+223' },
  { name: 'Malta', code: '+356' },
  { name: 'Marshall Islands', code: '+692' },
  { name: 'Mauritania', code: '+222' },
  { name: 'Mauritius', code: '+230' },
  { name: 'Mexico', code: '+52' },
  { name: 'Micronesia', code: '+691' },
  { name: 'Moldova', code: '+373' },
  { name: 'Monaco', code: '+377' },
  { name: 'Mongolia', code: '+976' },
  { name: 'Montenegro', code: '+382' },
  { name: 'Morocco', code: '+212' },
  { name: 'Mozambique', code: '+258' },
  { name: 'Myanmar', code: '+95' },
  { name: 'Namibia', code: '+264' },
  { name: 'Nauru', code: '+674' },
  { name: 'Nepal', code: '+977' },
  { name: 'Netherlands', code: '+31' },
  { name: 'New Zealand', code: '+64' },
  { name: 'Nicaragua', code: '+505' },
  { name: 'Niger', code: '+227' },
  { name: 'Nigeria', code: '+234' },
  { name: 'North Korea', code: '+850' },
  { name: 'North Macedonia', code: '+389' },
  { name: 'Norway', code: '+47' },
  { name: 'Oman', code: '+968' },
  { name: 'Pakistan', code: '+92' },
  { name: 'Palau', code: '+680' },
  { name: 'Palestine', code: '+970' },
  { name: 'Panama', code: '+507' },
  { name: 'Papua New Guinea', code: '+675' },
  { name: 'Paraguay', code: '+595' },
  { name: 'Peru', code: '+51' },
  { name: 'Philippines', code: '+63' },
  { name: 'Poland', code: '+48' },
  { name: 'Portugal', code: '+351' },
  { name: 'Qatar', code: '+974' },
  { name: 'Romania', code: '+40' },
  { name: 'Russia', code: '+7' },
  { name: 'Rwanda', code: '+250' },
  { name: 'Saint Kitts and Nevis', code: '+1-869' },
  { name: 'Saint Lucia', code: '+1-758' },
  { name: 'Saint Vincent and the Grenadines', code: '+1-784' },
  { name: 'Samoa', code: '+685' },
  { name: 'San Marino', code: '+378' },
  { name: 'Sao Tome and Principe', code: '+239' },
  { name: 'Saudi Arabia', code: '+966' },
  { name: 'Senegal', code: '+221' },
  { name: 'Serbia', code: '+381' },
  { name: 'Seychelles', code: '+248' },
  { name: 'Sierra Leone', code: '+232' },
  { name: 'Singapore', code: '+65' },
  { name: 'Slovakia', code: '+421' },
  { name: 'Slovenia', code: '+386' },
  { name: 'Solomon Islands', code: '+677' },
  { name: 'Somalia', code: '+252' },
  { name: 'South Africa', code: '+27' },
  { name: 'South Korea', code: '+82' },
  { name: 'South Sudan', code: '+211' },
  { name: 'Spain', code: '+34' },
  { name: 'Sri Lanka', code: '+94' },
  { name: 'Sudan', code: '+249' },
  { name: 'Suriname', code: '+597' },
  { name: 'Sweden', code: '+46' },
  { name: 'Switzerland', code: '+41' },
  { name: 'Syria', code: '+963' },
  { name: 'Taiwan', code: '+886' },
  { name: 'Tajikistan', code: '+992' },
  { name: 'Tanzania', code: '+255' },
  { name: 'Thailand', code: '+66' },
  { name: 'Timor-Leste', code: '+670' },
  { name: 'Togo', code: '+228' },
  { name: 'Tonga', code: '+676' },
  { name: 'Trinidad and Tobago', code: '+1-868' },
  { name: 'Tunisia', code: '+216' },
  { name: 'Turkey', code: '+90' },
  { name: 'Turkmenistan', code: '+993' },
  { name: 'Tuvalu', code: '+688' },
  { name: 'Uganda', code: '+256' },
  { name: 'Ukraine', code: '+380' },
  { name: 'United Arab Emirates', code: '+971' },
  { name: 'United Kingdom', code: '+44' },
  { name: 'United States', code: '+1' },
  { name: 'Uruguay', code: '+598' },
  { name: 'Uzbekistan', code: '+998' },
  { name: 'Vanuatu', code: '+678' },
  { name: 'Vatican City', code: '+39' }, // Uses Italy's code
  { name: 'Venezuela', code: '+58' },
  { name: 'Vietnam', code: '+84' },
  { name: 'Yemen', code: '+967' },
  { name: 'Zambia', code: '+260' },
  { name: 'Zimbabwe', code: '+263' }
];
function TicketPurchase({ navigateBack, navigateToOrderSummary }) {
  const { id } = useParams();
  const [eventData, setEventData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showFileDetails, setShowFileDetails] = useState(false);
  const [ticketQuantity, setTicketQuantity] = useState(1);
  const [selectedCountryCode, setSelectedCountryCode] = useState('+234');
  const [isGift, setIsGift] = useState(false);
  const [recipientFirstName, setRecipientFirstName] = useState('');
  const [recipientLastName, setRecipientLastName] = useState('');
  const [recipientEmail, setRecipientEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  useEffect(() => {
    const foundEvent = mockEvents.find((e) => e.id === id);
    setEventData(foundEvent);
    setLoading(false);
  }, [id]);

  function EventCountdown({ event }) {
    const [timeLeft, setTimeLeft] = useState('');
    useEffect(() => {
      const eventDateTime = new Date(`${event.month} ${event.date}, ${event.year} ${event.time}`);
      const interval = setInterval(() => {
        const now = new Date();
        const diff = eventDateTime - now;
        if (diff > 0) {
          const days = Math.floor(diff / (1000 * 60 * 60 * 24));
          const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
          const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
          setTimeLeft(`${days}d ${hours}h ${minutes}m`);
        } else {
          setTimeLeft('Event Started!');
          clearInterval(interval);
        }
      }, 1000);
      return () => clearInterval(interval);
    }, [event]);
    return <div className="countdown">{timeLeft || 'Calculating...'}</div>;
  }

  const toggleFileDetails = () => setShowFileDetails((prev) => !prev);
  const incrementTickets = () => setTicketQuantity((prev) => prev + 1);
  const decrementTickets = () => setTicketQuantity((prev) => (prev > 1 ? prev - 1 : 1));
  const handleCountryChange = (e) => setSelectedCountryCode(e.target.value);
  const handleGiftChange = (e) => setIsGift(e.target.checked);

  if (loading) return <div>Loading event data...</div>;
  if (!eventData)
    return (
      <div>
        No event found for ID: {id}. Please check the event ID or go back.
        <button onClick={() => navigateBack(eventData)}>Back</button>
      </div>
    );

  // ✅ Calculate total price (no discount)
  const totalPrice = eventData.basePrice * ticketQuantity;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!firstName || !email || !phoneNumber) {
      alert('Please fill in all required fields.');
      return;
    }

    const purchaseData = {
      id,
      eventTitle: eventData.title,
      eventOwner: eventData.eventOwner,
      ticketQuantity,
      basePrice: eventData.basePrice,
      totalPrice,
      isGift,
      recipientFirstName: isGift ? recipientFirstName : '',
      recipientLastName: isGift ? recipientLastName : '',
      recipientEmail: isGift ? recipientEmail : '',
      firstName,
      lastName,
      email,
      phoneNumber: `${selectedCountryCode}${phoneNumber}`,
      ticketFileName: eventData.ticketFileName,
      ticketFileType: eventData.ticketFileType,
      ticketFileSize: eventData.ticketFileSize,
    };

    navigateToOrderSummary(purchaseData);
  };

  return (
    <div className="ticket-purchase-container">
      <div className="ticket-image-container">
        <img src={eventData.eventImage} alt={eventData.title} className="ticket-image" />
        <EventCountdown event={eventData} />
      </div>

      <div className="ticket-title-holder">
        <h3 className="event-title">{eventData.title}</h3>
      </div>

      <div className={isGift ? 'buy-ticket-container gift-active' : 'buy-ticket-container'}>
        <div className="ticket-header">
          <h2 className="buy-ticket-header">Buy {eventData.title} Tickets</h2>
          <p className="buy-ticket-paragraph">By {eventData.eventOwner}</p>
          <hr className="ticket-header-divider" />
        </div>

        <form onSubmit={handleSubmit} className="ticket-form">
          <div className="checkbox-group">
            <input type="checkbox" checked={isGift} onChange={handleGiftChange} id="giftCheckbox" />
            <label htmlFor="giftCheckbox">Is this a gift?</label>
          </div>

          {/* Buyer info */}
          <div className="name-input">
            <div className="input-group">
              <label htmlFor="firstName">Your name</label>
              <div className="name-inputs">
                <input
                  type="text"
                  id="firstName"
                  placeholder="First name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  required
                  className="name-inputbox"
                />
                <input
                  type="text"
                  id="lastName"
                  placeholder="Last name"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className="name-inputbox-2"
                />
              </div>
            </div>

            <div className="input-group">
              <label htmlFor="email">Your email address</label>
              <input
                type="email"
                id="email"
                placeholder="name@host.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="email-inputbox"
              />
            </div>

            <div className="input-group">
              <label htmlFor="phoneNumber">Your phone number</label>
              <div className="name-inputs">
                <select value={selectedCountryCode} onChange={handleCountryChange} className="phone-code-select">
                  {countryPhoneCodes.map((country) => (
                    <option key={country.code} value={country.code}>
                      {country.name} ({country.code})
                    </option>
                  ))}
                </select>
                <input
                  type="tel"
                  id="phoneNumber"
                  placeholder="Phone number"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  required
                  className="phone-number-inputbox"
                />
              </div>
            </div>
          </div>

          {/* Gift recipient info */}
          {isGift && (
            <div className="name-input">
              <div className="input-group">
                <label>Recipient Name</label>
                <div className="name-inputs">
                  <input
                    type="text"
                    placeholder="First name"
                    value={recipientFirstName}
                    onChange={(e) => setRecipientFirstName(e.target.value)}
                    className="name-inputbox"
                  />
                  <input
                    type="text"
                    placeholder="Last name"
                    value={recipientLastName}
                    onChange={(e) => setRecipientLastName(e.target.value)}
                    className="name-inputbox-2"
                  />
                </div>
              </div>

              <div className="input-group">
                <label>Recipient Email</label>
                <input
                  type="email"
                  placeholder="recipient@host.com"
                  value={recipientEmail}
                  onChange={(e) => setRecipientEmail(e.target.value)}
                  className="recipient-email-inputbox"
                />
              </div>
            </div>
          )}

          {/* Ticket file details */}
          <div className="file-display-group">
            <div className="file-display-wrapper">
              <span className="file-display-text">
                1 file attached <FaAngleDown className="angle-down" onClick={toggleFileDetails} />
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

          <hr className="ticket-bottom-divider" />

          {/* Quantity and price */}
          <div className="counter-price-container">
            <div className="ticket-counter-group">
              <div className="ticket-counter">
                <button type="button" onClick={decrementTickets} disabled={ticketQuantity <= 1} className="counter-btn">
                  -
                </button>
                <span className="counter-value">{ticketQuantity}</span>
                <button type="button" onClick={incrementTickets} className="counter-btn">
                  +
                </button>
              </div>
            </div>

            <div className="price-group">
              <span className="price-value">NGN {totalPrice.toLocaleString()}</span>
            </div>
          </div>

          <button type="submit" className="confirm-ticket-btn">
            Confirm Purchase
          </button>
          <button type="button" onClick={() => navigateBack(eventData)} className="back-btn">
            Back
          </button>
        </form>
      </div>
    </div>
  );
}

TicketPurchase.defaultProps = {
  navigateBack: () => console.log('navigateBack not provided'),
  navigateToOrderSummary: () => console.log('navigateToOrderSummary not provided'),
};

export default TicketPurchase;
