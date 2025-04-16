// CardSlider.jsx
import React, { useRef, useState } from 'react';
import './cardSlider.css';

const CardSlider = ({ onCardClick }) => {
    console.log('CardSlider rendered, onCardClick:', onCardClick); // Log 8

    const sliderRef = useRef(null);
    const [expanded, setExpanded] = useState({});

    // Sample card data
    const cards = [
        {
            id: 1,
            artistName: 'Davido',
            eventImage: 'https://wallpapercat.com/w/middle-retina/4/0/2/2250759-2560x1631-desktop-hd-davido-background-image.jpg',
            title: 'Davido Live In Concert',
            content: 'Catch Davido live on stage this summer!',
            fullContent: 'Catch Davido live on stage this summer! Join us for an electrifying performance featuring hits like "Fall" and "If" at the Lagos Arena on July 15th. Tickets are selling fast—don’t miss out on this unforgettable night!',
            venue: 'State Farm Arena',
            city:'Atlanta', 
            month: 'APR',
            time: '17:00',
            day: 'Thursday', 
            date: '17',
            year: '2025',
            category: 'Concert',
            description: 'Davido 5ive Album Tour',
            about:'Streamed over 2 billon times and handpicked by FIFA to lead their 2022 World Cup Soundtrack collaboration “Hayya Hayya (Better Together)”, American born, Nigerian raised afrobeats icon Davido (born David Adedeji Adeleke) has cemented his position as a global force within the music scene. Following the release of his 2019 critically acclaimed album, A Good Time, which achieved over 1.2 billion streaming, Davido went on to achieve further success with his third studio album, A Better Time. A Better Time, described by Davido as his most personal work was released at the end of 2020 and debuted on Billboards 200 album chart garnering over 560 million streams and producing certified hits High featuring Adekunle Gold, Holy Ground Ft. Nicki Minaj and Shopping Spree ft. Chris Brown & Young Thug. Shopping Spree marked Davido’s 10th entry on Billboard’s World Digital Song Chart, it was highlighted by millions of video views and attracted the praise of Rolling Stone, HighSnobiety and Complex. In addition to both fan and critical acclaim, Davido’s visibility continues to soar across the globe, with thrilling national television appearances on The Tonight Show Starring Jimmy Fallon, The Daily Show with Trevor Noah and Jimmy Kimmel Live.',
        },
        {
            id: 2,
            artistName: 'Asake',
            eventImage: 'https://www.okayafrica.com/media-library/cover-artwork-for-lungu-boy-by-asake.png?id=53143626&width=1200&height=800&quality=85&coordinates=0%2C0%2C0%2C0',
            title: 'Lungu Boy Tour',
            content: 'Asake’s Lungu Boy Tour: A Global Sensation!',
            fullContent: 'Asake’s Lungu Boy Tour: A Global Sensation! The 2024 tour grossed $2.5 million across 5 reported shows, selling 29,753 tickets with hits like ‘MMS’ and ‘Active.’ From a sold-out Madison Square Garden debut to a star-studded O2 Arena show with Wizkid and Stormzy, Asake’s Afro-fusion energy left fans in awe—catch his next stop!',
            venue: 'Ziggo Dome',
            city: 'Amsterdam',
            day: 'Sunday',
            month: 'DEC',
            time: '19:00',
            date: '10',
            year: '2025',
            category: 'Concert',
            description: 'Asake quick stop at Ziggo Dome ',
            about:'',
        },
        {
            id: '3',
            artistName: 'Toyin Abraham',
            eventImage: 'https://whatkeptmeup.com/wp-content/uploads/2024/12/photo_5444956519515942501_y.jpg',
            title: ' Alakada Bad and Boujee',
            content: 'Laugh out loud with Alakada: Bad and Boujee!',
            fullContent: 'Laugh out loud with Alakada: Bad and Boujee! Toyin Abraham returns as Yetunde, a young woman faking a lavish lifestyle, in this hilarious Nollywood comedy-drama. Released on December 20, 2024, the film has grossed over ₦285.9 million in just two weeks, taking Nigerian cinemas by storm. Don’t miss the fun—watch it now!',
            venue: 'Genesis Cinema, Lagos',
            city: 'Lagos',
            day: 'Friday',
            month: 'JUL',
            time: '16:00',
            date: '29',
            year: '2025',
            category: 'Movie',
            description: 'Watch Alakada Bad & Boujee with Toyin Abraham',
        },
        {
            id: '4',
            artistName: 'Wizkid',
            eventImage: 'https://rotatemagazine.com/wp-content/uploads/2024/11/Wizkid-Photo-1536x1109.webp',
            title: 'Hellfest',
            content: '30BG Hangout: Celebrate with the gang!',
            fullContent: '30BG Hangout: Celebrate with the gang! The 30BG fanbase set a record in 2022 by hosting a massive concert for Davido, uniting 10,000 fans in one epic night. Don’t miss the next hangout—join the 30 Billion Gang for music, energy, and more!',
            venue: 'Stade de France',
            city: 'Paris',
            day: 'Saturday',
            month: 'SEP',
            time: '20:00',
            date: '19',
            year: '2025',
            category: 'Concert',
            description: 'Wizkid Live in Paris',
            about:'Grammy award winning singer/songwriter Ayodeji Ibrahim Balogun (aka Wizkid) began his career in music when he was just 11 years old in Lagos, Nigeria. His first record, Lil Prinz, was recorded in 2001 in collaboration with Glorious Five, a group consisting of Balogun and his friends from church. In 2006, he started pursuing music full-time, at first collaborating with various Nigerian pop acts including OJB Jezreel, Naeto C, and Banky W. By 2011, he was ready to record his debut studio album as a solo artist: Superstar was released via Empire Mates Entertainment to great critical and public acclaim across Africa, propelling him to stardom in his home country. After multiple delays and label disagreements, Balogun released his sophomore album titled Ayo in 2014. This second studio album had a multitude of guest appearances, including a spot from Femi Kuti. It also featured Baloguns global breakthrough track "Ojuelegba." Not only did the single cement his status as one of Nigerias biggest pop acts, it was also picked up and remixed by Drake and Skepta, thrusting Wizkid into the international spotlight. In return, Wizkid appeared on Drakes 2016 smash single "One Dance." ',
        },
        {
            id: '5',
            artistName: 'Burna Boy',
            title: 'Burna & Friends Concert',
            eventImage: 'https://s1.ticketm.net/dam/a/11f/490b5e5d-4dc6-478f-a4b8-873d8351f11f_RETINA_PORTRAIT_3_2.jpg',
            content: 'Burna Boy Live: 2025 Tour Heats Up',
            fullContent: 'Burna Boy Live: 2025 Tour Heats Up! The African Giant brings his electrifying energy to the Stade de France on April 18, with an 80,000-capacity crowd, followed by a UK exclusive at Manchester’s Co-op Live on April 21. After a fiery Nairobi show on March 1, fans can’t stop raving about his ‘spiritual’ vibes and ‘insane’ stage presence—get your tickets now!',
            venue: 'o2 Arena',
            city: 'London',
            day: 'Thursday',
            month: 'JAN',
            time: '17:00',
            date: '31',
            year: '2025',
            category: 'Concert',
            description: 'Burna Boy Birthday Concert',
        },
    ];
    
    const scrollLeft = () => {
        sliderRef.current.scrollBy({ left: -300, behavior: 'smooth' });
    };

    const scrollRight = () => {
        sliderRef.current.scrollBy({ left: 300, behavior: 'smooth' });
    };

    const toggleReadMore = (id) => {
        setExpanded((prev) => ({
            ...prev,
            [id]: !prev[id],
        }));
    }

    const handleCardClick = (event) => {
        console.log('CardSlider clicked, event:', event); // Log 9
        
        if (typeof onCardClick === 'function') {
            onCardClick(event);
        } else {
            console.error('onCardClick is not a function:', onCardClick);
        }
    };

    return (
        <div className="slider-container">
            <button className="nav-button left" onClick={scrollLeft}>
                &#8249;
            </button>

            <div className="cards-wrapper" ref={sliderRef}>
                {cards.map((card) => (
                    <div key={card.id} className="card" onClick={() => handleCardClick(card)}>
                        <img src={card.eventImage} alt="davido" className='card-image' />
                        <h3>{card.title}</h3>
                        <p>
                            {expanded[card.id] ? card.fullContent : card.content}
                            <span className="read-more" onClick={(e) => {
                                e.stopPropagation(); // Prevent card click when clicking "Read More"
                                toggleReadMore(card.id);
                            }}>
                                {expanded[card.id] ? ' Read Less' : ' Read More'}
                            </span>
                        </p>
                        <div
                            className="venue">{card.venue}
                        </div>
                    </div>
                ))}
            </div>

            <button className="nav-button right" onClick={scrollRight}>
                &#8250;
            </button>
        </div>
    );
};

export default CardSlider;