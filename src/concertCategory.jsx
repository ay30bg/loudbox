import React from "react";
import SlideShow from "./slideShow";
import ConcertCard from "./concertCard";
import Footer from "./footer"
import './concertCategory.css';

function ConcertCategory({ navigateToEventDetails }) {

  const concerts = [
    {
      id: '6',
      image: 'https://dailypost.ng/wp-content/uploads/2024/11/tiwasavage-068.jpg',
      title: 'Afrobeats Festival',
      description: 'Top Afrobeats artists take the stage at Afrobeat festival .',
      date: 'May 15, 2025',
    },
    {
      id: '7',
      image: 'https://mmo.aiircdn.com/370/622f188e91a93.jpeg',
      title: 'Ravage Uprising',
      description: 'Rema will be Live at the o2 London for Ravage Uprising',
      date: 'June 10, 2025',
    },
    {
      id: '8',
      image: 'https://i0.wp.com/media.premiumtimesng.com/wp-content/files/2024/07/image5-8-e1721996216227.jpeg?resize=1140%2C570&ssl=1',
      title: 'Sabi Girl Concert',
      description: 'Ayra Starr Live in Auckland, NZ with some surprise Acts.',
      date: 'July 20, 2025',
    },
    {
      id: '9',
      image: 'https://unorthodoxreviews.com/wp-content/uploads/2023/09/WhatsApp-Image-2023-09-21-at-9.00.32-AM-1.jpeg',
      title: 'Local Rappers.',
      description: 'Celebrate Olamides 10 years on stage at Eko Energy City.',
      date: 'August 5, 2025',
    },
    {
      id: '1',
      image: 'https://wallpapercat.com/w/middle-retina/4/0/2/2250759-2560x1631-desktop-hd-davido-background-image.jpg',
      title: 'Davido Live in Concert.',
      description: 'Davido stops by at State Farm Arena for 5ive album Tour.',
      date: 'July 15, 2025',
    },
    {
      id: '2',
      image: 'https://www.okayafrica.com/media-library/cover-artwork-for-lungu-boy-by-asake.png?id=53143626&width=1200&height=800&quality=85&coordinates=0%2C0%2C0%2C0',
      title: 'Lungu Boy Tour',
      description: 'Asake quick stop at Ziggo Dome for his ongoing Lungu Boy Tour.',
      date: 'December 10, 2025',
    },
    {
      id: '4',
      image: 'https://rotatemagazine.com/wp-content/uploads/2024/11/Wizkid-Photo-1536x1109.webp',
      title: 'Hellfest',
      description: 'Wizkid Live in Paris at the Stade de France for Hellfest 2025.',
      date: 'September 19, 2025',
    },
    {
      id: '5',
      image: 'https://s1.ticketm.net/dam/a/11f/490b5e5d-4dc6-478f-a4b8-873d8351f11f_RETINA_PORTRAIT_3_2.jpg',
      title: 'Burna & Friends Concert',
      description: 'Celebrate Burna Boys birthday at the o2 with top Afrobeats artists.',
      date: 'November 31, 2025',
    },
  ];

  return (
    <div className="concert-category-container">
      <SlideShow />
      <section className="concerts-category">
        <h1>Concerts</h1>
        <div className="card-grid">
          {concerts.map((concert, index) => (
            <ConcertCard
              key={index}
              image={concert.image}
              title={concert.title}
              description={concert.description}
              date={concert.date}
              event={concert}
              navigateToEventDetails={navigateToEventDetails} 
            />
          ))}
        </div>
      </section>

<Footer />
    </div>
  )
}


export default ConcertCategory
