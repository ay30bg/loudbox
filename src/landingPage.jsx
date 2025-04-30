import React from "react";
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import UpcomingEvent from './upcomingEvent';
import EventsCategories from './eventCategories';
import EventHighlight from './eventHighlight';
import Header from './header';
import Hero from './hero';
import './landingPage.css'
import Footer from "./footer";

function LandingPage({
    onLogin,
    navigateToEventDetails,
    navigateToLanding,
    navigateToCategory,
    navigateToHelpdesk,
    navigateToAboutUs,
    navigateToForOrganizers
}) {
const navigate = useNavigate();
    
  const navigateToSignIn = () => {
  console.log('Navigating to login');
  navigate('/login');
};
    console.log('LandingPage rendered, navigateToEventDetails:', navigateToEventDetails); // Log 6

    return (
        <div className="landing-page-container">
            <Header onLogin={navigateToSignIn} 
            navigateToLanding={navigateToLanding} 
            navigateToHelpdesk={navigateToHelpdesk} 
            navigateToAboutUs={navigateToAboutUs}
            navigateToForOrganizers={navigateToForOrganizers}
            />
            <Hero />
            <UpcomingEvent 
            navigateToEventDetails={navigateToEventDetails}
            />
            <EventsCategories 
            navigateToCategory={navigateToCategory}
            />
            <EventHighlight />
            <Footer />
        </div>
    );
}

export default LandingPage;
