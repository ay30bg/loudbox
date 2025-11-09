// CardSlider.jsx
import React, { useRef } from 'react';
import './cardSlider.css';

const CardSlider = ({ onCardClick }) => {
    console.log('CardSlider rendered, onCardClick:', onCardClick); // Log 8

    const sliderRef = useRef(null);

    // Sample card data
    const cards = [
        {
            id: 1,
            artistName: 'DND',
            eventImage: 'https://i.postimg.cc/ZK2dmGrb/DND-FLIER.jpg',
            title: 'DND Block Party 2.0',
            city: 'Osogbo',
            month: 'DEC',
            time: '20:00',
            day: 'Thursday',
            date: '18',
            year: '2025',
            category: 'Hangout',
            description: 'A One in a Million Party',
            about: 'DND Block Party 2.0 is the second edition of the thrilling rave event set to light up Lennit Arena, Osogbo, on December 18, 2025 — Known for its vibrant crowd, top-tier DJs, and electrifying performances, this edition promises to take the experience to an even higher level, Expect an unforgettable night filled with nonstop music, dancing, and pure vibes, It is More than just a party, DND Block Party 2.0 is a full-blown celebration of music, culture, and community — where every beat connects people and every moment becomes a lasting memory.',
        },
        // {
        //     id: 2,
        //     artistName: 'Asake',
        //     eventImage: 'https://www.okayafrica.com/media-library/cover-artwork-for-lungu-boy-by-asake.png?id=53143626&width=1200&height=800&quality=85&coordinates=0%2C0%2C0%2C0',
        //     title: 'Lungu Boy Tour',
        //     city: 'Amsterdam',
        //     day: 'Sunday',
        //     month: 'DEC',
        //     time: '19:00',
        //     date: '10',
        //     year: '2025',
        //     category: 'Concert',
        //     description: 'Asake quick stop at Ziggo Dome',
        //     about: '',
        // },
        // {
        //     id: '3',
        //     artistName: 'Toyin Abraham',
        //     eventImage: 'https://whatkeptmeup.com/wp-content/uploads/2024/12/photo_5444956519515942501_y.jpg',
        //     title: 'Alakada Bad and Boujee',
        //     city: 'Lagos',
        //     day: 'Friday',
        //     month: 'JUL',
        //     time: '16:00',
        //     date: '29',
        //     year: '2025',
        //     category: 'Movie',
        //     description: 'Watch Alakada Bad & Boujee with Toyin Abraham',
        // },
        // {
        //     id: '4',
        //     artistName: 'Wizkid',
        //     eventImage: 'https://rotatemagazine.com/wp-content/uploads/2024/11/Wizkid-Photo-1536x1109.webp',
        //     title: 'Hellfest',
        //     city: 'Paris',
        //     day: 'Saturday',
        //     month: 'SEP',
        //     time: '20:00',
        //     date: '19',
        //     year: '2025',
        //     category: 'Concert',
        //     description: 'Wizkid Live in Paris',
        //     about: 'Grammy award winning singer/songwriter Ayodeji Ibrahim Balogun (aka Wizkid) began his career in music when he was just 11 years old in Lagos, Nigeria...',
        // },
        // {
        //     id: '5',
        //     artistName: 'Burna Boy',
        //     title: 'Burna & Friends Concert',
        //     eventImage: 'https://s1.ticketm.net/dam/a/11f/490b5e5d-4dc6-478f-a4b8-873d8351f11f_RETINA_PORTRAIT_3_2.jpg',
        //     city: 'London',
        //     day: 'Thursday',
        //     month: 'JAN',
        //     time: '17:00',
        //     date: '31',
        //     year: '2025',
        //     category: 'Concert',
        //     description: 'Burna Boy Birthday Concert',
        // },
    ];

    const scrollLeft = () => {
        sliderRef.current.scrollBy({ left: -300, behavior: 'smooth' });
    };

    const scrollRight = () => {
        sliderRef.current.scrollBy({ left: 300, behavior: 'smooth' });
    };

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
                ‹
            </button>

            <div className="cards-wrapper" ref={sliderRef}>
                {cards.map((card) => (
                    <div key={card.id} className="card">
                        <div className="card-image-container">
                            <img src={card.eventImage} alt={card.title} className="card-image" />
                            <div className="image-overlay"></div>
                            <span className={`category-badge ${card.category.toLowerCase()}`}>
                                {card.category}
                            </span>
                        </div>
                        <div className="card-content">
                            <h3>{card.title}</h3>
                            <div className="event-info">
                                <span id="event-date">
                                    {`${card.day}, ${card.month} ${card.date}, ${card.year} at ${card.time}`}
                                </span>
                                <span className="event-city">{card.city}</span>
                            </div>
                            <button
                                // className="cardslider-button"
                                id='cardslider-button'
                                onClick={(e) => {
                                    e.stopPropagation();
                                    handleCardClick(card);
                                }}
                            >
                                {card.category === 'Movie' ? 'Book Now' : 'Get Tickets'}
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            <button className="nav-button right" onClick={scrollRight}>
                ›
            </button>
        </div>
    );
};

export default CardSlider;


