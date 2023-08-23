import React, { useState } from 'react';
import './Hello.css';
import CardSection from './Card';
import HowItWorksSection from './HowItWorksSection';

const Hello = () => {
  const [showForm, setShowForm] = useState(false);

  const handleMoreButtonClick = () => {
    setShowForm(true);
  };

  const handleFormClose = () => {
    setShowForm(false);
  };

  return (
    <div className="scroll-container1" style={{ background: 'linear-gradient(253deg, #0cc898, #1797d2, #864fe1)' }}>
      <div className="full-screen1">
        <div>
          <div>
            <h1 className='h1'>Ras E-Learning Platform</h1>
            <br />
            <a className="button-line" href="#!" onClick={handleMoreButtonClick}>
              More
            </a>
          </div>
        </div>
      </div>

      <div className="content" style={{ marginTop: '-20px' }}>
        <CardSection />
        <HowItWorksSection />
      </div>
      {showForm && (
        <div className="form-popup">
          <div className="flip-card" onClick={handleFormClose}>
            Reset
          </div>
          <div className={`contact-wrapper ${showForm ? 'active' : ''}`}>
            <div className="envelope">
              <div className="back paper"></div>
              <div className="content">
                <div className="form-wrapper">
                  <form>
                    <div className="top-wrapper">
                      <div className="input">
                        <label>Name</label>
                        <input type="text" name="name" className="input" />
                      </div>
                      <div className="input">
                        <label>Email</label>
                        <input type="text" name="email" className="input" />
                      </div>
                      <div className="input">
                        <label>Phone Number</label>
                        <input type="text" name="phone" className="input" />
                      </div>
                    </div>
                    <div className="bottom-wrapper">
                      <div className="input">
                        <label>Subject</label>
                        <input type="text" name="subject" className="input" />
                      </div>
                      <div className="input">
                        <label>Message</label>
                        <textarea rows="5" name="message" className="input"></textarea>
                      </div>
                      <div className="submit">
                        <div className="submit-card" onClick={handleFormClose}>
                          Send Message
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
              <div className="front paper"></div>
            </div>
          </div>
        </div>
      )}

      
    </div>
  );
};

export default Hello;
