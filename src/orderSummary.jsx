import React, { useState, useEffect } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaEnvelope, FaPhone, FaFilePdf, FaFileImage, FaAngleDown, FaUser } from 'react-icons/fa';
import './orderSummary.css';

// Mock events (unchanged)
const mockEvents = [
  {
    id: '1',
    eventOwner: 'Davido',
    title: 'Davido Live In Concert',
    eventImage: 'https://wallpapercat.com/w/middle-retina/4/0/2/2250759-2560x1631-desktop-hd-davido-background-image.jpg',
    description: 'Davido 5ive Album Tour',
    subaccount_code: 'ACCT_567462xff65gop0',
    venue: 'State Farm Arena',
    city: 'Atlanta',
    category: 'Concert',
    month: 'APR',
    date: '17',
    year: '2025',
    time: '17:00',
    about: 'Streamed over 2 billon times...',
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
    basePrice: 2500,
  },
  {
        id: '6',
        title: 'Afrobeats Festival',
        eventImage: 'https://dailypost.ng/wp-content/uploads/2024/11/tiwasavage-068.jpg',
        description: 'Afrobeats Festival London',
        venue: 'o2 Arena',
        city: 'London',
        category: 'Concert',
        month: 'MAY',
        date: '15',
        year: '2025',
        time: '17:00',
        about: '',
        ticketFileName: 'Afrobeats Festival Ticket',
        ticketFileType: 'PNG',
        ticketFileSize: '100.9 KB',
        basePrice: 3000,
    },
    {
        id: '7',
        title: 'Ravage Uprising',
        eventImage: 'https://mmo.aiircdn.com/370/622f188e91a93.jpeg',
        description: 'Live at the o2',
        venue: 'o2 Arena',
        city: 'London',
        category: 'Concert',
        month: 'JUN',
        date: '10',
        year: '2025',
        time: '21:00',
        about: '',
        ticketFileName: 'Ravage Uprising',
        ticketFileType: 'PNG',
        ticketFileSize: '130.9 KB',
        basePrice: 3500,
    },
    {
        id: '8',
        title: 'Sabi Girl Concert',
        eventImage: 'https://i0.wp.com/media.premiumtimesng.com/wp-content/files/2024/07/image5-8-e1721996216227.jpeg?resize=1140%2C570&ssl=1',
        description: 'Ayra Starr Live in Auckland',
        venue: 'Spark Arena',
        city: 'Auckland',
        category: 'Concert',
        month: 'JUL',
        date: '20',
        year: '2025',
        time: '17:00',
        about: '',
        ticketFileName: 'Sabi Girl Concert Ticket',
        ticketFileType: 'PNG',
        ticketFileSize: '90.9 KB',
        basePrice: 2500,
    },
    {
        id: '9',
        title: 'Local Rappers',
        eventImage: 'https://unorthodoxreviews.com/wp-content/uploads/2023/09/WhatsApp-Image-2023-09-21-at-9.00.32-AM-1.jpeg',
        description: '',
        venue: 'Eko Energy City',
        city: 'Lagos',
        category: 'Concert',
        month: 'AUG',
        date: '5',
        year: '2025',
        time: '20:00',
        about: '',
        ticketFileName: 'Local Raappers Concert Ticket',
        ticketFileType: 'PNG',
        ticketFileSize: '60.4 KB',
        basePrice: 1000,
    },
];

const OrderSummary = ({ id, eventData, totalPrice }) => {
  const [email, setEmail] = useState('');
  const [paymentError, setPaymentError] = useState(null);
  const [isPaying, setIsPaying] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://js.paystack.co/v1/inline.js';
    script.async = true;
    script.onload = () => console.log('Paystack script loaded');
    script.onerror = () => {
      console.error('Failed to load Paystack script');
      setPaymentError('Failed to load payment system. Please try again later.');
    };
    document.body.appendChild(script);
    return () => {
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, []);

  const createTicket = async (paystackResponse) => {
    try {
      const response = await axios.post(
        'https://loudbox-backend.vercel.app/api/tickets',
        {
          eventId: id,
          userId: null,
          reference: paystackResponse.reference,
          amount: totalPrice,
        },
        { timeout: 10000 }
      );
      console.log('Ticket created:', response.data);
      navigate('/thank-you');
    } catch (err) {
      console.error('Ticket creation error:', err);
      setPaymentError('Failed to create ticket. Please contact support.');
      setIsPaying(false);
    }
  };

  const handlePayment = async () => {
    if (!window.PaystackPop) {
      setPaymentError('Payment system not ready. Please try again.');
      return;
    }

    setPaymentError(null);
    setIsPaying(true);

    try {
      // Ensure requestData is a valid JSON object
      const requestData = {
        email: email || 'guest@example.com',
        amount: totalPrice,
        subaccountCode: eventData?.subaccount_code,
        eventId: id,
      };
      console.log('Prepared requestData:', requestData);

      // Validate all required fields
      if (!requestData.email || !requestData.amount || !requestData.subaccountCode || !requestData.eventId) {
        throw new Error('Missing required fields: email, amount, subaccountCode, or eventId');
      }
      if (isNaN(requestData.amount) || requestData.amount <= 0) {
        throw new Error('Amount must be a positive number');
      }
      if (!/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(requestData.email)) {
        throw new Error('Invalid email format');
      }

      // Log JSON string for debugging
      const jsonData = JSON.stringify(requestData);
      console.log('JSON DATA:', jsonData);

      const response = await axios.post(
        'https://loudbox-backend.vercel.app/api/paystack/initialize',
        requestData,
        {
          headers: { 'Content-Type': 'application/json' },
          timeout: 10000,
        }
      );

      console.log('Initialize response:', response.data);
      if (!response.data.success) {
        throw new Error(response.data.error || 'Failed to initialize payment');
      }

      const { authorization_url, reference } = response.data.data;

      const handler = window.PaystackPop.setup({
        key: 'pk_test_f5af6c1a30d2bcfed0192f0e8006566fe27441df',
        email: requestData.email,
        amount: requestData.amount * 100,
        currency: 'NGN',
        ref: reference,
        callback: async (paystackResponse) => {
          console.log('Paystack response:', paystackResponse);
          if (paystackResponse.status === 'success') {
            try {
              const verifyResponse = await axios.get(
                `https://loudbox-backend.vercel.app/api/paystack/verify/${paystackResponse.reference}`,
                { timeout: 10000 }
              );
              console.log('Verify response:', verifyResponse.data);
              if (verifyResponse.data.success && verifyResponse.data.data.status === 'success') {
                await createTicket(paystackResponse);
              } else {
                setPaymentError('Payment verification failed.');
                setIsPaying(false);
              }
            } catch (err) {
              console.error('Verification error:', err);
              setPaymentError(`Payment verification failed: ${err.message}`);
              setIsPaying(false);
            }
          } else {
            setPaymentError('Payment failed. Please try again.');
            setIsPaying(false);
          }
        },
        onClose: () => {
          setPaymentError('Payment cancelled.');
          setIsPaying(false);
        },
      });

      handler.openIframe();
    } catch (err) {
      console.error('Payment setup error:', err);
      setPaymentError(err.response?.data?.error || `Error initiating payment: ${err.message}. Please try again.`);
      setIsPaying(false);
    }
  };

  return (
    <div>
      <h2>Order Summary</h2>
      <p>Event: {eventData?.title}</p>
      <p>Total: NGN {totalPrice}</p>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter your email"
      />
      <button onClick={handlePayment} disabled={isPaying}>
        {isPaying ? 'Processing...' : `Pay NGN ${totalPrice}`}
      </button>
      {paymentError && <p style={{ color: 'red' }}>{paymentError}</p>}
    </div>
  );
};

export default OrderSummary;
