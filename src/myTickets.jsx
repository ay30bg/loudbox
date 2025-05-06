import React from "react";
import { FaTicketAlt } from "react-icons/fa"; // For icons (install react-icons)
import "./myTickets.css"; // External CSS file for styles

function MyTickets() {
    return (
        <div className="my-tickets-container">
            <div className="construction-message">
                <FaTicketAlt className="ticket-icon" />
                <h1>My Tickets</h1>
                <p>This page is still under construction. Stay tuned for updates!</p>
                <button
                    className="explore-button"
                    onClick={() => window.location.href = "/events"}
                    aria-label="Explore available events"
                >
                    Explore Events
                </button>
            </div>
        </div>
    );
}

export default MyTickets;
