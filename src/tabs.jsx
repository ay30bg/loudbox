import React, { useState } from 'react';
import { FaShoppingCart, FaAngleDown } from 'react-icons/fa'
import './eventDetails.css';

function Tabs({ event, navigateToTicketPurchase, isSmallViewport  }) {
  console.log('Tabs rendered, event:', event); // Log 11

  const [activeTab, setActiveTab] = useState('Details');

  const tabs = [
    { id: 'Details', label: 'Details' },
    { id: 'Cart', label: 'Cart' }, // Kept Cart tab; add content below
  ];

  const handleTabClick = (tabId) => {
    console.log('Tab clicked, new activeTab:', tabId); // Log 12
    setActiveTab(tabId);
  };

  const handleGetTicket = () => {
    navigateToTicketPurchase(event); // Simplified, relying on defaultProps in EventDetails
  };

  const getTabContent = () => ({
    Details: (
      <div className="get-ticket">
        <div className="date-container">
          <h4 className="event-month">{event.month || 'TBD'}</h4>
          <h3 className="event-date">{event.date || ''}</h3>
          <h5 className="event-year">{event.year || ''}</h5>
        </div>
        <div className='card-details-button-container'>
          <div className='details-container'>
            <h3 className="event-city-category">
              {(event.city || 'Unknown City') + ' . ' + (event.category || 'Event')}
            </h3>
            <h4 className="event-description">{event.description || event.description || 'No description'}</h4>
            <h6 className="event-venue-time">
              {(event.venue || 'TBD') + ' - ' + (event.time || 'TBD')}
            </h6>
          </div>
          <div className="event-card-btn">
            {!isSmallViewport && ( // Hide event-detail-btn in mobile view
              <button
                className="event-detail-btn"
                onClick={handleGetTicket}
                aria-label="Get ticket"
              >
                Get Ticket
              </button>
            )}
            <button
              className="event-cart-btn"
              onClick={handleGetTicket} // Same action as event-detail-btn
              aria-label="Buy tickets"
            >
              {isSmallViewport ? (
                <FaAngleDown className="arrow-icon" />
              ) : (
                <FaShoppingCart className="cart-icon" />
              )}
            </button>
          </div>
        </div>
      </div>
    ),
    Cart: (
      <div className="cart-tab">
        <p>Shopping cart coming soon!</p>
        {/* Add cart functionality here */}
      </div>
    ),
  });

  const tabContent = getTabContent();

  return (
    <div className="tabs-container">
      <div className="tab-buttons">
        {tabs.map((tab) => (
          <div
            key={tab.id}
            className={`tab ${activeTab === tab.id ? 'active' : ''}`}
            onClick={() => handleTabClick(tab.id)}
          >
            {tab.label}
          </div>
        ))}
      </div>
      {tabContent[activeTab]}
    </div>
  );
}

export default Tabs;