import React from 'react';
import './FeedbackForm.css';

const FeedbackCard = ({ name, feedback }) => {
    return (
      <div className="feedback-card">
        <div className="profile-picture">
          <img src="https://th.bing.com/th/id/OIP.gaJL9BfLPVc5M_E-Z6BMgAHaHa?pid=ImgDet&rs=1" alt="Unknown" />
        </div>
        <div className="card-content">
          <p className="card-name">Name: {name}</p>
          <p className="card-feedback">Feedback: {feedback}</p>
        </div>
      </div>
    );
  };

export default FeedbackCard;