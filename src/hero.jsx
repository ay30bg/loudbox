import React, { useState, useCallback } from "react";
import { FaCalendar, FaShapes, FaLocationArrow } from "react-icons/fa6";
import './hero.css';
import debounce from 'lodash/debounce'; // Install lodash for debouncing

function Hero() {
  // Form input state
  const [formData, setFormData] = useState({
    event: '',
    category: '',
    location: ''
  });

  // UI states
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [searchResults, setSearchResults] = useState(null);

  // Handle input changes with debouncing
  const debouncedHandleChange = useCallback(
    debounce((name, value) => {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
      setError(''); // Clear error on input change
    }, 300),
    []
  );

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    debouncedHandleChange(name, value);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSearchResults(null);

    // Validation
    if (!formData.event.trim()) {
      setError('Please enter an event name');
      return;
    }
    if (!formData.location.trim()) {
      setError('Please enter a location');
      return;
    }

    setIsLoading(true);

    try {
      // Example API call (replace with your actual API endpoint)
      const response = await fetch('https://api.example.com/events/search', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // Add any required API keys or auth tokens
          // 'Authorization': `Bearer ${YOUR_API_KEY}`
        },
        body: JSON.stringify({
          query: formData.event,
          category: formData.category || undefined,
          location: formData.location
        })
      });

      if (!response.ok) {
        throw new Error('Failed to fetch events');
      }

      const data = await response.json();
      setSearchResults(data.events || []);

      // Save to localStorage (optional)
      const recentSearches = JSON.parse(localStorage.getItem('recentSearches') || '[]');
      recentSearches.unshift(formData);
      localStorage.setItem('recentSearches', JSON.stringify(recentSearches.slice(0, 5)));

      // Optionally redirect to results page
      // history.push('/results', { results: data.events });

    } catch (error) {
      console.error('Search error:', error);
      setError('Failed to fetch events. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="hero-container">
      <div className="hero-text">
        <h2>Buy tickets to events happening around you</h2>
      </div>
      <form onSubmit={handleSubmit} className="hero-form">
        <div className={`input-wrapper ${error && !formData.event ? 'error' : ''}`}>
          <FaCalendar className="input-icon" />
          <input
            type="text"
            placeholder="Event"
            className="event-field"
            name="event"
            value={formData.event}
            onChange={handleInputChange}
            disabled={isLoading}
          />
        </div>
        <div className="input-wrapper">
          <FaShapes className="input-icon" />
          <select
            className="category-dropdown"
            name="category"
            value={formData.category}
            onChange={handleInputChange}
            disabled={isLoading}
          >
            <option value="" disabled>
              Category
            </option>
            <option value="Concert">Concert</option>
            <option value="Hangouts">Hangouts</option>
            <option value="Movies">Movies</option>
            <option value="Film">Film</option>
          </select>
        </div>
        <div className={`input-wrapper ${error && !formData.location ? 'error' : ''}`}>
          <FaLocationArrow className="input-icon" />
          <input
            type="text"
            placeholder="Location"
            className="location-field"
            name="location"
            value={formData.location}
            onChange={handleInputChange}
            disabled={isLoading}
          />
        </div>
        <input
          type="submit"
          value={isLoading ? "Searching..." : "Search"}
          disabled={isLoading}
          className={isLoading ? 'loading' : ''}
        />
      </form>
      {error && <p className="error-message">{error}</p>}
      {searchResults && (
        <div className="search-results">
          <h3>Search Results</h3>
          {searchResults.length > 0 ? (
            <ul>
              {searchResults.map((event, index) => (
                <li key={index}>
                  {event.name} - {event.location} ({event.category})
                </li>
              ))}
            </ul>
          ) : (
            <p>No events found.</p>
          )}
        </div>
      )}
    </div>
  );
}

export default Hero;
