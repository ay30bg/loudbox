import React from "react";
import { FaCalendar, FaShapes, FaLocationArrow } from "react-icons/fa6";
import './hero.css';

function Hero() {
  return (
    <div className="hero-container">
      <div className="hero-text">
        <h2>Buy tickets to events happening around you</h2>
      </div>
      <form action="" className="hero-form">
        <div className="input-wrapper">
          <FaCalendar className="input-icon" />
          <input type="text" placeholder="Event" className="event-field" />
        </div>
        <div className="input-wrapper">
          <FaShapes className="input-icon" />
          <select className="category-dropdown">
            <option value="" disabled selected>
              Category
            </option>
            <option value="Concert">Concert</option>
            <option value="Hangouts">Hangouts</option>
            <option value="Movies">Movies</option>
            <option value="Film">Film</option>
          </select>
        </div>
        <div className="input-wrapper">
          <FaLocationArrow className="input-icon" />
          <input type="text" placeholder="Location" className="location-field" />
        </div>
        <input type="button" value="Search" />
      </form>
    </div>
  );
}

export default Hero;
