import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./results.css";

function Results() {
  const location = useLocation();
  const navigate = useNavigate();
  const events = location.state?.events || [];

  return (
    <div className="results-container">
      <button onClick={() => navigate("/")} className="back-button">
        Back to Search
      </button>
      <h2>Search Results</h2>
      {events.length > 0 ? (
        <ul>
          {events.map((event, index) => (
            <li key={index}>
              {event.name} - {event.location} ({event.category})
            </li>
          ))}
        </ul>
      ) : (
        <p>No events found.</p>
      )}
    </div>
  );
}

export default Results;
