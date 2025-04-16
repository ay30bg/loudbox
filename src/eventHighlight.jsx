import React from "react";
import './eventHighlight.css'

function EventHighlight() {
    console.log('EventHighlight is rendering');
    return (
        <div className="event-highlight">
            <h2>Highlight</h2>
            <div className="iframe-container">
                <iframe 
                 src="https://www.youtube.com/embed/-NqJHv7ewBo?si=GLDN9ogRnvUh7JpU?autoplay=0&mute=1" 
                 title="YouTube video player" 
                 allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
            </div>
        </div>
    );
}

export default EventHighlight;