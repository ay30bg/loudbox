import React from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import './App.css';
import Login from './login';
import LandingPage from './landingPage';
import Header from './header';
import SignUp from './signup';
import EventDetails from './eventDetails';
import TicketPurchase from './ticketPurchase';
import OrderSummary from './orderSummary';
import ThankYouPage from './thankYouPage';
import TicketDetailsPage from './ticketDetailsPage';
import ConcertCategory from './concertCategory';
import HelpDesk from './helpDesk';
import AboutUs from './aboutUs';
import ForOrganizers from './forOrganizers';

function App() {
  console.log('App rendered');

  function NavigationHandlers() {
    const navigate = useNavigate();

    const handleLogin = () => {
      console.log('Handling login');
      navigate('/');
    };

    const handleLogout = () => {
      console.log('Handling logout');
      navigate('/login');
    };

    const navigateToSignUp = () => {
      console.log('Navigating to signup');
      navigate('/signup');
    };

    const navigateToSignIn = () => {
      console.log('Navigating to login');
      navigate('/login');
    };

    const navigateToEventDetails = (event) => {
      console.log('Navigating to event details:', event);
      const eventId = event.id;
      navigate('/event-details/' + eventId);
    };

    const navigateToLanding = () => {
      console.log('Navigating to landing');
      navigate('/');
    };

    const navigateToTicketPurchase = (event) => {
      console.log('Navigating to ticket purchase:', event);
      const eventId = event.id;
      navigate('/ticket-purchase/' + eventId);
    };

    const navigateToOrderSummary = (data) => {
      console.log('Navigating to order summary:', data);
      const eventId = data.id;
      navigate('/order-summary/' + eventId, { state: data });
    };

    const navigateToThankYou = (eventId, options = {}) => {
      console.log('Navigating to thank you page for event:', eventId);
      navigate('/thank-you/' + eventId, options);
    };

    const navigateToViewTicket = (transactionReference, state) => {
      console.log('Navigating to ticket details:', transactionReference);
      navigate(`/ticket/${transactionReference}`, { state });
    };

    const navigateToCategory = (category) => {
      console.log('Navigating to category:', category);
      if (category === 'concerts') {
        navigate('/concerts');
      }
    };

    const navigateToHelpdesk = () => {
      console.log('Navigating to helpdesk');
      navigate('/helpdesk');
    };

    const navigateToAboutUs = () => {
      console.log('Navigating to about-us');
      navigate('/about-us');
    };

    const navigateToForOrganizers = () => {
      console.log('Navigating to organizers');
      navigate('/organizers');
    };

    const currentPath = window.location.pathname.split('/')[1] || 'landing';

    return (
      <div>
        {['event-details', 'ticket-purchase', 'order-summary', 'thank-you', 'ticket', 'concerts', 'helpdesk', 'about-us', 'organizers'].includes(currentPath) && (
          <Header
            onLogout={handleLogout}
            navigateToLanding={navigateToLanding}
            navigateToHelpdesk={navigateToHelpdesk}
            navigateToAboutUs={navigateToAboutUs}
            navigateToForOrganizers={navigateToForOrganizers}
          />
        )}
        <Routes>
          <Route
            path="/login"
            element={<Login onLogin={handleLogin} navigateToSignUp={navigateToSignUp} />}
          />
          <Route
            path="/signup"
            element={<SignUp navigateToSignIn={navigateToSignIn} />}
          />
          <Route
            path="/"
            element={
              <LandingPage
                onLogout={handleLogout}
                navigateToEventDetails={navigateToEventDetails}
                navigateToLanding={navigateToLanding}
                navigateToCategory={navigateToCategory}
                navigateToHelpdesk={navigateToHelpdesk}
                navigateToAboutUs={navigateToAboutUs}
                navigateToForOrganizers={navigateToForOrganizers}
              />
            }
          />
          <Route
            path="/event-details/:id"
            element={
              <EventDetails
                navigateToLanding={navigateToLanding}
                navigateToTicketPurchase={navigateToTicketPurchase}
              />
            }
          />
          <Route
            path="/ticket-purchase/:id"
            element={
              <TicketPurchase
                navigateBack={navigateToEventDetails}
                navigateToOrderSummary={navigateToOrderSummary}
              />
            }
          />
          <Route
            path="/order-summary/:id"
            element={
              <OrderSummary
                navigateBack={navigateToTicketPurchase}
                navigateToThankYou={navigateToThankYou}
              />
            }
          />
          <Route
            path="/thank-you/:id"
            element={
              <ThankYouPage
                navigateToLanding={navigateToLanding}
                navigateToViewTicket={navigateToViewTicket}
              />
            }
          />
          <Route
            path="/ticket/:transactionReference"
            element={<TicketDetailsPage />}
          />
          <Route
            path="/concerts"
            element={<ConcertCategory
              navigateToEventDetails={navigateToEventDetails}
            />}
          />
          <Route
            path="/helpdesk"
            element={<HelpDesk 
              navigateToLanding={navigateToLanding} />}
          />
          <Route
            path="/about-us"
            element={<AboutUs
              navigateToLanding={navigateToLanding} />
            }
          />
          <Route
            path="/organizers"
            element={<ForOrganizers
              navigateToLanding={navigateToLanding} />
            }
          />
          
          {/* Catch-all route for debugging */}
          <Route
            path="*"
            element={<div>404: No route matched. URL: {window.location.pathname}</div>}
          />
        </Routes>
      </div>
    );
  }

  return (
    <Router>
      <div className="App">
        <div className="content">
          <NavigationHandlers />
        </div>
      </div>
    </Router>
  );
}

export default App;
