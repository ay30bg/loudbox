import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { FaAngleDown, FaFilePdf, FaFileImage } from 'react-icons/fa';
import './ticketPurchase.css';

//Mock data (consistent with EventDetails and Tabs)
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
  };

  const toggleFileDetails = () => {
    setShowFileDetails((prev) => !prev);
  };

  const incrementTickets = () => {
    setTicketQuantity((prev) => prev + 1);
  };

  const decrementTickets = () => {
    setTicketQuantity((prev) => (prev > 1 ? prev - 1 : 1));
  };

  const handleCountryChange = (e) => {
    setSelectedCountryCode(e.target.value);
  };

  const handleGiftChange = (e) => {
    setIsGift(e.target.checked);
  };

  const totalPrice = eventData && typeof eventData.basePrice === 'number' && typeof ticketQuantity === 'number'
    ? eventData.basePrice * ticketQuantity
    : 0;
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!firstName || !email || !phoneNumber) {
      alert('Please fill in all required fields.');
      return;
    }

    const purchaseData = {
      id, // Include id for navigateToOrderSummary
      eventTitle: eventData.title,
      eventOwner: eventData.eventOwner,
      ticketQuantity,
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

  if (loading) {
    return <div>Loading event data...</div>;
  }

  if (!eventData) {
    return (
      <div>
        No event found for ID: {id}. Please check the event ID or go back.
        <button onClick={() => navigateBack(eventData)}>Back</button>
      </div>
    );
  }

  return (
    <div className="ticket-purchase-container">
      <div className="ticket-image-container">
        <img src={eventData.eventImage} alt={eventData.title} className="ticket-image" />
        <EventCountdown event={eventData} />
      </div>
      <div className="ticket-title-holder">
        <h3 className="event-title">{eventData.title}</h3>
      </div>
      <div className={isGift ? "buy-ticket-container gift-active" : "buy-ticket-container"}>
        <div className="ticket-header">
          <h2 className="buy-ticket-header">Buy {eventData.title} Tickets</h2>
          <p className="buy-ticket-paragraph">By {eventData.eventOwner}</p>
          <hr className="ticket-header-divider" />
        </div>
        {/* <div className="ticket-form-div"> */}
        <form onSubmit={handleSubmit} className='ticket-form'>
          <div className="checkbox-group">
            <input
              type="checkbox"
              name="myCheckbox"
              id="myCheckbox"
              checked={isGift}
              onChange={handleGiftChange}
            />
            <label htmlFor="myCheckbox">Is this a gift?</label>
          </div>
          <div className="name-input">
            <div className="input-group">
              <label htmlFor="firstName" className='name-label'>Your name</label>
              <div className="name-inputs">
                <input
                  type="text"
                  id="firstName"
                  placeholder="First name"
                  className="name-inputbox"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  required
                />
                <input
                  type="text"
                  id="lastName"
                  placeholder="Last name"
                  className="name-inputbox-2"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </div>
            </div>
            <div className="input-group">
              <label htmlFor="email">Your email address</label>
              <input
                type="email"
                id="email"
                placeholder="name@host.com"
                className="email-inputbox"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="input-group">
              <label htmlFor="phoneNumber">Your phone number</label>
              <div className="name-inputs">
                <select
                  id="countryCode"
                  value={selectedCountryCode}
                  onChange={handleCountryChange}
                  className="phone-code-select"
                >
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
                  className="phone-number-inputbox"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  required
                />
              </div>
            </div>
            {isGift && (
              <div className="name-input">
                <div className="input-group">
                  <label htmlFor="recipientName">Recipient Name</label>
                  <div className="name-inputs">
                    <input
                      type="text"
                      id="recipientFirstName"
                      placeholder="First name"
                      value={recipientFirstName}
                      onChange={(e) => setRecipientFirstName(e.target.value)}
                      className="name-inputbox"
                    />
                    <input
                      type="text"
                      id="recipientLastName"
                      value={recipientLastName}
                      onChange={(e) => setRecipientLastName(e.target.value)}
                      placeholder="Last name"
                      className="name-inputbox-2"
                    />
                  </div>
                </div>
                <div className="input-group">
                  <label htmlFor="recipientEmail">Recipient Email</label>
                  <input
                    type="email"
                    id="recipientEmail"
                    placeholder="recipient@host.com"
                    value={recipientEmail}
                    onChange={(e) => setRecipientEmail(e.target.value)}
                    className="recipient-email-inputbox"
                  />
                </div>
              </div>
            )}
          </div>
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
          <hr className="ticket-bottom-divider" />
          <div className="counter-price-container">
            <div className="ticket-counter-group">
              <div className="ticket-counter">
                <button
                  type="button"
                  className="counter-btn"
                  onClick={decrementTickets}
                  disabled={ticketQuantity <= 1}
                  aria-label="Decrease ticket quantity"
                >
                  <span className="counter-icon">-</span>
                </button>
                <span className="counter-value">{ticketQuantity}</span>
                <button
                  type="button"
                  className="counter-btn"
                  onClick={incrementTickets}
                  aria-label="Increase ticket quantity"
                >
                  <span className="counter-icon">+</span>
                </button>
              </div>
            </div>
            <div className="price-group">
        <span className="price-value">NGN {totalPrice.toLocaleString()}</span>
      </div>

          </div>
          <button
            type="submit"
            className="confirm-ticket-btn"
            aria-label={`Confirm ticket purchase for ${eventData.title}`}
          >
            Confirm Purchase
          </button>
          <button
            className="back-btn"
            onClick={() => navigateBack(eventData)}
            aria-label="Back to event details"
          >
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