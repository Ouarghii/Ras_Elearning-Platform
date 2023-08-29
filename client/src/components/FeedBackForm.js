import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Form, Button } from 'react-bootstrap';
import { useSpring, animated } from 'react-spring';
import './FeedbackForm.css';
import FeedbackCard from './FeedbackCard';

const FeedbackForm = () => {
  const [feedback, setFeedback] = useState('');
  const [name, setName] = useState('');

  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [feedbackList, setFeedbackList] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/feedback')
      .then(response => {
        setFeedbackList(response.data);
      })
      .catch(error => {
        // Handle error
      });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/feedback', { name, feedback });
      setShowSuccessMessage(true);
      setFeedback('');
    } catch (error) {
      // Handle error
    }
  };

  const formAnimation = useSpring({
    opacity: showSuccessMessage ? 0 : 1, // Hide the form on success
    transform: `translateY(${showSuccessMessage ? 20 : 0}px)`,
  });

  const successMessageAnimation = useSpring({
    opacity: showSuccessMessage ? 1 : 0,
    transform: `translateY(${showSuccessMessage ? 0 : 20}px)`,
  });

  return (
    <div className="feedback-page">
       <div className="feedback-container">
        <h2>Give Feedback</h2>
        <div className="feedback-form-container">
          <animated.div className="feedback-form" style={formAnimation}>
            <Form onSubmit={handleSubmit}>
              <Form.Group>
                <Form.Control
                  as="input"
                  className="inpuut"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your name..."
                />
              </Form.Group>
              <Form.Group>
                <Form.Control
                  as="textarea"
                  className="textt"
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                  placeholder="Enter your feedback..."
                />
              </Form.Group>
              <Button type="submit" className="submit-button">
                Submit Feedback
              </Button>
            </Form>
          </animated.div>
        </div>
      </div>
      <div className="feedback-list">
        {feedbackList.map((feedbackItem, index) => (
          <FeedbackCard key={index} name={feedbackItem.name} feedback={feedbackItem.feedback} />
        ))}
      </div>
    </div>
  );
};

export default FeedbackForm;
