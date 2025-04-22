import React, { useState, useEffect } from 'react';
import './slideShow.css';

const slides = [
    {
      image: 'https://wallpapercat.com/w/middle-retina/4/0/2/2250759-2560x1631-desktop-hd-davido-background-image.jpg',
      title: 'Davido Live In Concert',
      description: '5ive Album Tour.',
    },
    {
      image: 'https://www.okayafrica.com/media-library/cover-artwork-for-lungu-boy-by-asake.png?id=53143626&width=1200&height=800&quality=85&coordinates=0%2C0%2C0%2C0',
      title: 'Lungu Boy Tour',
      description: 'Asake quick stop at Ziggo Dome.',
    },
    {
      image: 'https://rotatemagazine.com/wp-content/uploads/2024/11/Wizkid-Photo-1536x1109.webp',
      title: 'Hellfest',
      description: 'Wizkid Live in Paris!',
    },
    {
        image: 'https://s1.ticketm.net/dam/a/11f/490b5e5d-4dc6-478f-a4b8-873d8351f11f_RETINA_PORTRAIT_3_2.jpg',
        title: 'Burna & Friends Concert',
        description: 'Burna Boy Birthday Concert.',
      },
  ];

function SlideShow () {

    const [currentSlide, setCurrentSlide] = useState(0);

    const nextSlide = () => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    };
  
    const prevSlide = () => {
      setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    };
  
    // Auto-slide every 5 seconds
    useEffect(() => {
      const interval = setInterval(nextSlide, 5000);
      return () => clearInterval(interval);
    }, []);

    return(
        <div className="slideshow-container">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`slide ${index === currentSlide ? 'active' : ''}`}
          >
            <img src={slide.image} alt={slide.title} />
            <div className="slide-content">
              <h2>{slide.title}</h2>
              <p>{slide.description}</p>
              <button>More Info & Tickets</button>
            </div>
          </div>
        ))}
        <div className="prev" onClick={prevSlide}>
          ❮
        </div>
        <div className="next" onClick={nextSlide}>
          ❯
        </div>
      </div>
    )
}

export default SlideShow;