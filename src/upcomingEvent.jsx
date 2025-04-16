import React from "react";
import CardSlider from "./cardSlider";
import './upcomingEvent.css'

function UpcomingEvent({ navigateToEventDetails }) {
    console.log('UpcomingEvent rendered, navigateToEventDetails:', navigateToEventDetails); // Log 7
    return (
        <div>
            <h2 className="upcoming-event-text">Upcoming Events</h2>
            <CardSlider onCardClick={ navigateToEventDetails } />
        </div>
    )
}

export default UpcomingEvent;