// EventsCategories.jsx
import React from 'react';
import './eventCategories.css';

const EventsCategories = ({ navigateToCategory }) => {
  const categories = [
    { name: 'Concerts', 
      image: 'https://media.gettyimages.com/id/1486616253/photo/turku-finland-blind-channel-performs-at-ruisrock-festival-2022-at-ruissalo-island-on-july-8.jpg?s=612x612&w=0&k=20&c=KvbGGIuV4uI8hVTq4V5UuXli2QwEzuNA2O7X9IE6xzw=',
    },
    { name: 'Hangouts', 
      image: 'https://images.unsplash.com/photo-1532635236-d50c8592eb08?q=80&w=2011&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', 
    },
    { name: 'Movies', 
      image: 'https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8bW92aWUlMjB0aGVhdGVyfGVufDB8fDB8fHww',
    },
    { name: 'Festivals', 
      image: 'https://media.gettyimages.com/id/2161675074/photo/glastonbury-england-people-gather-in-front-of-the-main-pyramid-stage-during-day-five-of.jpg?s=612x612&w=0&k=20&c=Uq_MxTLgxFKUmQDSaO2M1oThmDJpw971lDQbvr-1OGs=' 
    },
    { name: 'Sports', 
      image: 'https://images.unsplash.com/photo-1574602904324-a9ac0fe65331?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fHNwb3J0JTIwZXZlbnR8ZW58MHx8MHx8fDA%3D',
    },
    { name: 'Workshops', 
      image: 'https://media.gettyimages.com/id/842705870/photo/attendee-uses-their-smartphones-ahead-of-the-keynote-address-at-the-huawei-connect-2017.jpg?s=612x612&w=0&k=20&c=G7YEfXSg3s7AQm3j_e8S2ZBysLl1aY_flWtZquXp_YQ=',
    },
   
  ];

  return (
    <div className="events-categories">
      <h2>Categories</h2>
      <div className="categories-grid">
        {categories.map((category, index) => (
          <div 
           key={index} 
           className="category-item" 
           onClick={() => {
            if (category.name === 'Concerts' && navigateToCategory) {
              navigateToCategory('concerts');
            }
          }}
          style={{ cursor: category.name === 'Concerts' ? 'pointer' : 'default' }}
          >
           
            {category.image ? (
              <>
                <img src={category.image} alt={category.name} className="category-image" />
                <div className="category-label">{category.name}</div>
              </>
            ) : (
              <div className="empty-slot"></div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default EventsCategories;
