import React from "react";
import UpcomingEvent from './upcomingEvent';
import EventsCategories from './eventCategories';
import EventHighlight from './eventHighlight';
import Header from './header';
import Hero from './hero';
import './landingPage.css'
import Footer from "./footer";

function LandingPage({
    onLogout,
    navigateToEventDetails,
    navigateToLanding,
    navigateToCategory,
    navigateToHelpdesk,
    navigateToAboutUs,
    navigateToForOrganizers
}) {
    console.log('LandingPage rendered, navigateToEventDetails:', navigateToEventDetails); // Log 6

    return (
        <div className="landing-page-container">
            <Header onLogout={onLogout} 
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
