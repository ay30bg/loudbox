import React from "react";
import { FaTicketAlt } from "react-icons/fa"; // For ticket icon (install react-icons)
import { useNavigate } from "react-router-dom"; // For navigation
import Footer from "./footer"; // Reusing the same Footer component
import "./myTickets.css"; // External CSS file for styles

function MyTickets() {
    const navigate = useNavigate();

    return (
        <div className="my-tickets-container">
            <div className="construction-card">
                <FaTicketAlt className="ticket-icon" />
                <h1 className="card-title">My Tickets</h1>
                <p className="construction-text">
                    This page is still under construction. Check back soon for your ticket details!
                </p>
                <button
                    className="explore-button"
                    onClick={() => navigate("/events")}
                    aria-label="Explore available events"
                >
                    Explore Events
                </button>
            </div>
            <Footer />
        </div>
    );
}

export default MyTickets;
