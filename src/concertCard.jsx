import React from "react";
import './concertCard.css'


function ConcertCard({ image, title, description, date, event, navigateToEventDetails }) {

    const handleGetTickets = () => {
        navigateToEventDetails(event); // Use the navigation handler from App.jsx
      };
    

    return (
       <div className="card-container">
        <div className="card">
            <img src={image} alt={title} />
            <div className="card-content">
                <h3>{title}</h3>
                <p>{description}</p>
                <p className="date">{date}</p>
                <button
                onClick={handleGetTickets}
                >Get Tickets</button>
            </div>
        </div>
        </div>
    )
}

export default ConcertCard;