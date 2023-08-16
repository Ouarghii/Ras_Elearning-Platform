import React from 'react';
import { Link } from 'react-router-dom'; // Import the Link component

import './card.css';

const CardSection = () => {
  const handleCardHover = (event) => {
    const card = event.currentTarget;
    const description = card.querySelector('.card__description');

    description.style.animation = 'slide-up 3s forwards';
  };

  const handleCardLeave = (event) => {
    const card = event.currentTarget;
    const description = card.querySelector('.card__description');

    description.style.animation = 'slide-down 0.3s forwards';
  };

  return (
    <div>
      <h2 style={{ color: 'white', fontSize: '45px', fontWeight: 'bold', fontFamily: 'inheri', alignItems: 'center', textAlign: 'center', marginBottom: '-150px',marginTop:'20px', textDecoration: 'align' }}>Our Services:</h2>
      <section id="container_card" className="container_card">
        
        <figure className="card" onMouseEnter={handleCardHover} onMouseLeave={handleCardLeave}>
        <Link to='/MeetingRoom'>
          <img src="https://img.freepik.com/free-photo/friends-family-making-videocall-catching-up_23-2149019124.jpg?w=1060&t=st=1688914400~exp=1688915000~hmac=cfe62a94f2290d10772e96bc0f226c858914f0ac6fab5749cba65e8bebe85eee" width="500" height="700" alt="card" />
          <figcaption className="card__description">
            <p>Online meeting course</p>
          </figcaption>
          </Link>
        </figure>
        
        <figure className="card" onMouseEnter={handleCardHover} onMouseLeave={handleCardLeave}>
          <Link to='/Course'>
          <img src="https://img.freepik.com/free-photo/faqs-customer-service-icon-concept_53876-132149.jpg?w=1060&t=st=1688914483~exp=1688915083~hmac=ad3541449d41e763595237eaa600b85907dbfe639cad4184fe29c4431b38609b" width="500" height="700" alt="card" />
          <figcaption className="card__description">
            <p>Messaging help contact us</p>
          </figcaption>
          </Link>
        </figure>
        <figure className="card" onMouseEnter={handleCardHover} onMouseLeave={handleCardLeave}>
          <img src="https://img.freepik.com/free-photo/digital-filing-storage_1048-12068.jpg?w=996&t=st=1688914601~exp=1688915201~hmac=b0350893215a44b4af2e4ab25cea6dd597606524d041d3acfeffc0f1413b7bf7" width="400" height="700" alt="card" />
          <figcaption className="card__description">
            <p>Documentation</p>
          </figcaption>
        </figure>
      </section>
    </div>
  );
};

export default CardSection;
