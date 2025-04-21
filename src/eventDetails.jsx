import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { FaFacebook, FaWhatsapp } from 'react-icons/fa';
import { BsTwitterX, BsCopy } from 'react-icons/bs';
import Footer from './footer';
import './eventDetails.css';
import Tabs from './tabs';

// Mock data (consistent across all files)
const mockEvents = [
    {
        id: '1',
        title: 'Davido Live In Concert',
        eventImage: 'https://wallpapercat.com/w/middle-retina/4/0/2/2250759-2560x1631-desktop-hd-davido-background-image.jpg',
        description: '5ive Album Tour',
        subaccount_code: 'ACCT_567462xff65gop0',
        venue: 'State Farm Arena',
        city: 'Atlanta',
        category: 'Concert',
        month: 'APR',
        date: '17',
        year: '2025',
        time: '17:00',
        about: 'Streamed over 2 billon times and handpicked by FIFA to lead their 2022 World Cup Soundtrack collaboration “Hayya Hayya (Better Together)”, American born, Nigerian raised afrobeats icon Davido (born David Adedeji Adeleke) has cemented his position as a global force within the music scene. Following the release of his 2019 critically acclaimed album, A Good Time, which achieved over 1.2 billion streaming, Davido went on to achieve further success with his third studio album, A Better Time. A Better Time, described by Davido as his most personal work was released at the end of 2020 and debuted on Billboards 200 album chart garnering over 560 million streams and producing certified hits High featuring Adekunle Gold, Holy Ground Ft. Nicki Minaj and Shopping Spree ft. Chris Brown & Young Thug. Shopping Spree marked Davido’s 10th entry on Billboard’s World Digital Song Chart, it was highlighted by millions of video views and attracted the praise of Rolling Stone, HighSnobiety and Complex. In addition to both fan and critical acclaim, Davido’s visibility continues to soar across the globe, with thrilling national television appearances on The Tonight Show Starring Jimmy Fallon, The Daily Show with Trevor Noah and Jimmy Kimmel Live.',
    },
    {
        id: '2',
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
    },
    {
        id: '3',
        title: ' Alakada Bad and Boujee',
        eventImage: 'https://whatkeptmeup.com/wp-content/uploads/2024/12/photo_5444956519515942501_y.jpg',
        description: 'Toyin Cinema Tour',
        venue: 'Genesis Cinema,',
        city: 'Lagos',
        category: 'Movie',
        month: 'JUL',
        date: '29',
        year: '2025',
        time: '16:00',
        about: 'Laugh out loud with Alakada: Bad and Boujee! Toyin Abraham returns as Yetunde, a young woman faking a lavish lifestyle, in this hilarious Nollywood comedy-drama. Released on December 20, 2024, the film has grossed over ₦285.9 million in just two weeks, taking Nigerian cinemas by storm. Don’t miss the fun—watch it now!',
    },
    {
        id: '4',
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
    },
    {
        id: '5',
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
    },
];

function EventDetails({ navigateToTicketPurchase }) {
    const { id } = useParams();
    const [eventData, setEventData] = useState(null);
    const [isExpanded, setIsExpanded] = useState(false);
    const [isSmallViewport, setIsSmallViewport] = useState(window.innerWidth < 768);
    const maxLength = 200;

    useEffect(() => {
        const foundEvent = mockEvents.find((e) => e.id === id);
        setEventData(foundEvent);
    }, [id]);

    useEffect(() => {
        const handleResize = () => {
            setIsSmallViewport(window.innerWidth < 768);
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    console.log('EventDetails rendered, event:', eventData);

    if (!eventData) {
        return <div>No event selected.</div>;
    }

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
            return () => clearInterval(interval); // Cleanup
        }, [event]);

        return <div className="countdown">{timeLeft || 'Calculating...'}</div>;
    }


    const toggleReadMore = () => {
        setIsExpanded(!isExpanded);
    };

    const shareOnFacebook = () => {
        const url = encodeURIComponent(window.location.href);
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`, '_blank', 'width=600,height=400');
      };

      const shareOnX = () => {
        const url = encodeURIComponent(window.location.href);
        const text = encodeURIComponent('Check out this event!'); // Optional: customizable text
        window.open(`https://twitter.com/intent/tweet?url=${url}&text=${text}`, '_blank', 'width=600,height=400');
      };

      const shareOnWhatsApp = () => {
        const url = encodeURIComponent(window.location.href);
        const text = encodeURIComponent('Check out this event: ');
        window.open(`https://api.whatsapp.com/send?text=${text}${url}`, '_blank');
      };

      const copyLink = () => {
        navigator.clipboard.writeText(window.location.href)
          .then(() => alert('Link copied to clipboard!'))
          .catch((err) => alert('Failed to copy link: ' + err));
      };
    
    

    const aboutText =
        eventData.about && eventData.about.trim() !== ''
            ? isSmallViewport && !isExpanded && eventData.about.length > maxLength
                ? `${eventData.about.substring(0, maxLength)}...`
                : eventData.about
            : 'No description available';

    const GOOGLE_MAPS_API_KEY = 'AIzaSyCOMQkM6SVXsI1bCntxRH684mqapDFbXRw';
    const mapQuery = eventData.venue ? `${eventData.venue}, ${eventData.city}` : eventData.city;
    const mapSrc = `https://www.google.com/maps/embed/v1/place?key=${GOOGLE_MAPS_API_KEY}&q=${encodeURIComponent(mapQuery)}`;

    return (
        <div className="event-details-container">
            <div className="event-image-container">
                <img src={eventData.eventImage} alt={eventData.title} className="event-image" />
                <EventCountdown event={eventData} />
            </div>
            <div className="title-holder">
                <h3 className="even-title">{eventData.title}</h3>
            </div>

            <div className="event-detail-card">
                <h3 className="detail-card-title">Events</h3>
                <Tabs event={eventData}
                    navigateToTicketPurchase={navigateToTicketPurchase}
                    isSmallViewport={isSmallViewport}
                />
            </div>
            {eventData.about && eventData.about.trim() !== '' && (
                <div className="about-event-container">
                    <p className="about-text">{aboutText}</p>
                    {isSmallViewport && eventData.about.length > maxLength && (
                        <button className="read-more-btn" onClick={toggleReadMore}>
                            {isExpanded ? 'Read Less' : 'Read More'}
                        </button>
                    )}
                </div>
            )}
            <div
                style={{
                    margin: '20px auto',
                    width: '90%',
                    height: '400px',
                    borderRadius: '3px',
                    overflow: 'hidden',
                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                }}

            >
                <iframe
                    src={mapSrc}
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen=""
                    loading="lazy"
                    title="Event Location"
                />
            </div>

            <div className='share-section'>
                <h4>Share</h4>
                <div className='social-media-icons'>
                    <span className='icon-container'><FaFacebook className='facebook-icon' onClick={shareOnFacebook}/></span>
                    <span className='icon-container'><BsTwitterX className='x-icon' onClick={shareOnX} /></span>
                    <span className='icon-container'><FaWhatsapp className='whatsapp-icon' onClick={shareOnWhatsApp} /></span>
                    <span className='icon-container'><BsCopy className='copy-icon' onClick={copyLink}/></span>
                </div>
            </div>

            <div className='category-section'>
                <h5>Category: <a href="https://">{eventData.category}</a></h5>
            </div>
            <Footer />
        </div>
    );
}

EventDetails.defaultProps = {
    navigateToLanding: () => console.log('navigateToLanding not provided'),
    navigateToTicketPurchase: () => console.log('navigateToTicketPurchase not provided'),
};

export default EventDetails;
