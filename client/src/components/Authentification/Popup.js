import React from 'react';
import './Popup.css'; // Create this CSS file for styling
import { Button } from '@chakra-ui/react';

const Popup = ({ onClose, onOpenPDF }) => {
  return (
    <div className="popup">
      <div className="popup-content" >
        <Button onClick={onOpenPDF} className='bttn' >PDF_Course</Button>
        <Button colorSchema='pink' variant='solid' >Quiz</Button>
        <Button colorSchema='pink' onClick={onClose}>
        Close
      </Button>
      </div>
      
    </div>
  );
};

export default Popup;
