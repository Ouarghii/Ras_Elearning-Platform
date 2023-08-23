import React, { useEffect, useRef, useState } from 'react';
import { Button, Container, Row, Col, Modal } from 'react-bootstrap';
import io from 'socket.io-client';
import { v4 as uuidv4 } from 'uuid';
import { Widget } from 'react-chat-widget';
import 'react-chat-widget/lib/styles.css';
import './MeetingRoom.css';

const socket = io('http://localhost:5000'); // Replace with your backend server URL

const initialParticipants = [
  { name: 'anas Hizem',picture:"https://scontent.ftun8-1.fna.fbcdn.net/v/t39.30808-6/316162532_3467046516917435_7712489056280795033_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=yIc88g3yDsMAX9mpXis&_nc_ht=scontent.ftun8-1.fna&oh=00_AfARScl7TNGaE03paIwq_1MTrYJ0OENF2fdPTt4OTjjWRA&oe=64E2B2D8", stream: null },
  { name: 'fedi kouki', picture:"https://scontent.ftun8-1.fna.fbcdn.net/v/t39.30808-6/316162532_3467046516917435_7712489056280795033_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=yIc88g3yDsMAX9mpXis&_nc_ht=scontent.ftun8-1.fna&oh=00_AfARScl7TNGaE03paIwq_1MTrYJ0OENF2fdPTt4OTjjWRA&oe=64E2B2D8",stream: null },
  { name: 'mohamed anis oueslati',picture:"https://scontent.ftun8-1.fna.fbcdn.net/v/t39.30808-6/316162532_3467046516917435_7712489056280795033_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=yIc88g3yDsMAX9mpXis&_nc_ht=scontent.ftun8-1.fna&oh=00_AfARScl7TNGaE03paIwq_1MTrYJ0OENF2fdPTt4OTjjWRA&oe=64E2B2D8", stream: null },
  { name: 'bassem beji',picture:"https://scontent.ftun8-1.fna.fbcdn.net/v/t39.30808-6/316162532_3467046516917435_7712489056280795033_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=yIc88g3yDsMAX9mpXis&_nc_ht=scontent.ftun8-1.fna&oh=00_AfARScl7TNGaE03paIwq_1MTrYJ0OENF2fdPTt4OTjjWRA&oe=64E2B2D8", stream: null },
  { name: 'mohamed mezzi',picture:"https://scontent.ftun8-1.fna.fbcdn.net/v/t39.30808-6/316162532_3467046516917435_7712489056280795033_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=yIc88g3yDsMAX9mpXis&_nc_ht=scontent.ftun8-1.fna&oh=00_AfARScl7TNGaE03paIwq_1MTrYJ0OENF2fdPTt4OTjjWRA&oe=64E2B2D8" ,stream: null },
  { name: 'oussama mainsi',picture:"https://scontent.ftun8-1.fna.fbcdn.net/v/t39.30808-6/316162532_3467046516917435_7712489056280795033_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=yIc88g3yDsMAX9mpXis&_nc_ht=scontent.ftun8-1.fna&oh=00_AfARScl7TNGaE03paIwq_1MTrYJ0OENF2fdPTt4OTjjWRA&oe=64E2B2D8", stream: null },
  { name: 'waddie ramma',picture:"https://scontent.ftun8-1.fna.fbcdn.net/v/t39.30808-6/316162532_3467046516917435_7712489056280795033_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=yIc88g3yDsMAX9mpXis&_nc_ht=scontent.ftun8-1.fna&oh=00_AfARScl7TNGaE03paIwq_1MTrYJ0OENF2fdPTt4OTjjWRA&oe=64E2B2D8" ,stream: null },
  { name: 'yasser mahjoub',picture:"https://scontent.ftun8-1.fna.fbcdn.net/v/t39.30808-6/316162532_3467046516917435_7712489056280795033_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=yIc88g3yDsMAX9mpXis&_nc_ht=scontent.ftun8-1.fna&oh=00_AfARScl7TNGaE03paIwq_1MTrYJ0OENF2fdPTt4OTjjWRA&oe=64E2B2D8", stream: null },
];

const MeetingRoom = () => {
  const videoRef = useRef(null);
  const [isJoined, setIsJoined] = useState(false);
  const [meetingCode, setMeetingCode] = useState(null);
  const [participantName, setParticipantName] = useState('');
  const [localStream, setLocalStream] = useState(null);
  const [isSharingScreen, setIsSharingScreen] = useState(false);
  const [participants, setParticipants] = useState([]);
  const [showParticipants, setShowParticipants] = useState(false);
  const [availableParticipants, setAvailableParticipants] = useState(initialParticipants);
  const [selectedParticipant, setSelectedParticipant] = useState(null);
  const [allowedParticipants, setAllowedParticipants] = useState([]);
  const [showSelectedParticipantPopup, setShowSelectedParticipantPopup] = useState(false);

  useEffect(() => {
    socket.on('connect', () => {
      console.log('Connected to the server');
    });

    socket.on('participantJoined', (name) => {
      console.log(`${name} joined the meeting`);
    });

    socket.on('participantLeft', (name) => {
      console.log(`${name} left the meeting`);
    });

    socket.on('invitationResponse', ({ accepted, invitedParticipant }) => {
      if (accepted) {
        console.log(`${invitedParticipant} accepted the invitation`);
        setParticipants((prevParticipants) => [
          ...prevParticipants,
          { name: invitedParticipant, stream: null },
        ]);
      } else {
        console.log(`${invitedParticipant} declined the invitation`);
      }
    });

    setMeetingCode(generateMeetingCode());

    return () => {
      socket.disconnect();
    };
  }, []);

  useEffect(() => {
    if (localStream) {
      videoRef.current.srcObject = localStream;
    }
  }, [localStream]);

  const generateMeetingCode = () => {
    return uuidv4().substr(0, 6).toUpperCase();
  };

  const toggleScreenSharing = async () => {
    try {
      if (isSharingScreen) {
        const cameraStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
        setLocalStream(cameraStream);
      } else {
        const screenStream = await navigator.mediaDevices.getDisplayMedia();
        setLocalStream(screenStream);
      }
      setIsSharingScreen(!isSharingScreen);
    } catch (error) {
      console.error('Error accessing media devices:', error);
    }
  };

  const joinMeeting = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      setLocalStream(stream);
      socket.emit('joinMeeting', { participantName, isSharingScreen });
      setIsJoined(true);
    } catch (error) {
      console.error('Error accessing media devices:', error);
    }
  };

  const leaveMeeting = () => {
    setIsJoined(false);
    videoRef.current.srcObject.getTracks().forEach(track => track.stop());
    socket.emit('leaveMeeting', participantName);
  };

  const handleInviteClick = (participant) => {
    setSelectedParticipant(participant);
    setShowSelectedParticipantPopup(true);
  };

  const handleClosePopup = () => {
    setSelectedParticipant(null);
  };
  const toggleAllowedParticipant = (participant) => {
    if (allowedParticipants.includes(participant)) {
      setAllowedParticipants((prev) => prev.filter(p => p !== participant));
    } else {
      setAllowedParticipants((prev) => [...prev, participant]);
    }
  };

  return (
    <Container fluid className="meeting-container">
      <Row className="header-row">
        <Col>
          <h1 className="meeting-title">Video Meeting Room</h1>
        </Col>
      </Row>
      <Row className="video-grid-row">
        <Col xs={12} md={12} lg={6} className="local-video-col">
          {/* Local Video */}
          <div className="local-video-wrapper">
            <video ref={videoRef} autoPlay playsInline className="local-video"></video>
          </div>
        </Col>
        <Col xs={12} md={12} lg={6} className="participants-grid-col">
          {/* Participants */}
          <div className="participants-grid">
            <div className="participant main-camera">
              <div className="participant-video-container">
                <video
                  autoPlay
                  playsInline
                  className="participant-video"
                  ref={(ref) => {
                    if (ref) {
                      ref.srcObject = localStream;
                    }
                  }}
                ></video>
                <p className="participant-name">{participantName}</p>
              </div>
            </div>
            {participants.map((participant) => (
              <div key={participant.name} className="participant">
                <div className="participant-video-container">
                  <video
                    autoPlay
                    playsInline
                    className="participant-video"
                    ref={(ref) => {
                      if (ref) {
                        ref.srcObject = participant.stream;
                      }
                    }}
                  ></video>
                  <p className="participant-name">{participant.name}</p>
                </div>
              </div>
            ))}
          </div>
        </Col>
      </Row>
      {/* Action Buttons */}
      <Row className="button-row">
        <Col>
          {isJoined ? (
            <Button variant="danger" onClick={leaveMeeting} className="action-button leave-button">
              Leave Meeting
            </Button>
          ) : (
            <Button variant="success" onClick={joinMeeting} className="action-button join-button">
              Join Meeting
            </Button>
          )}
          <Button
            variant="secondary"
            onClick={toggleScreenSharing}
            className={`action-button ${isSharingScreen ? 'sharing-button-active' : 'sharing-button'}`}
          >
            {isSharingScreen ? 'Stop Sharing' : 'Share Screen'}
          </Button>
          {meetingCode && (
            <div>
              <p className="meeting-code">Meeting Code: {meetingCode}</p>
              <Button variant="primary" onClick={() => setShowParticipants(true)} className="action-button invite-button">
                Invite Others
              </Button>
            </div>
          )}
        </Col>
      </Row>
      {/* Invite Others Popup */}
      <Modal centered style={{ width: '50%' }}  show={showParticipants} onHide={() => setShowParticipants(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Select Participants to Invite</Modal.Title>
        </Modal.Header>
        <Modal.Body>
  <div className="invite-popup-content">
    <Row className="participants-row">
      {availableParticipants.map((participant) => (
        <Col key={participant.name} xs={6} md={4} lg={3} className="participant-col">
          <div className="participant-container">
            <img
              src={participant.picture} width={'50%'}  // Use the picture property from initialParticipants
              alt="Participant"
              className="participant-image"
            />
            <p className="participant-name">{participant.name}</p>
            <Button
              variant="primary"
              onClick={() => handleInviteClick(participant)}
              className="action-button invite-participant-button"
            >
              Invite
            </Button>
          </div>
        </Col>
      ))}
    </Row>
  </div>
</Modal.Body>

      </Modal>
      {/* Selected Participant Popup */}
      {showSelectedParticipantPopup && (
  <div className="invite-popup">
    <div className="invite-content">
      <img
        src={selectedParticipant.picture}
        alt="Selected Participant"
        className="selected-participant-image"
      />
      <p className="selected-participant-name">{selectedParticipant.name}</p>
      <Button
        variant="primary"
        onClick={() => {
          toggleAllowedParticipant(selectedParticipant.name);
          setShowSelectedParticipantPopup(false); // Close the pop-up
        }}
        className={`action-button close-popup-button ${
          allowedParticipants.includes(selectedParticipant.name)
            ? 'chat-allowed'
            : 'chat-disallowed'
        }`}
      >
        {allowedParticipants.includes(selectedParticipant.name) ? 'Disallow Chat' : 'Allow Chat'}
      </Button>
      <Button
        variant="secondary"
        onClick={() => setShowSelectedParticipantPopup(false)} // Close the pop-up
        className="action-button close-popup-button"
      >
        Close
      </Button>
    </div>
  </div>
)}
      <Widget
        handleNewUserMessage={(newMessage) => {
          // Allow messages only from allowed participants
          if (allowedParticipants.includes(participantName)) {
            console.log('New message:', newMessage);
          }
        }}
        title="Meeting Chat"
        subtitle={`Chatting as ${participantName}`}
      />
    </Container>
  );
};

export default MeetingRoom;
