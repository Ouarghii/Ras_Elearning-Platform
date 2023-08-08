import React, { useEffect, useRef, useState } from 'react';
import { Button, Container, Row, Col, Modal } from 'react-bootstrap';

import io from 'socket.io-client';
import { v4 as uuidv4 } from 'uuid';
import { Widget } from 'react-chat-widget';
import 'react-chat-widget/lib/styles.css';
import './MeetingRoom.css'; // Import your CSS file

const socket = io('http://localhost:5000'); // Replace with your backend server URL

const MeetingRoom = () => {
  const videoRef = useRef(null);
  const [isJoined, setIsJoined] = useState(false);
  const [meetingCode, setMeetingCode] = useState(null);
  const [participantName, setParticipantName] = useState('');
  const [localStream, setLocalStream] = useState(null);
  const [isSharingScreen, setIsSharingScreen] = useState(false);
  const [participants, setParticipants] = useState([]); // New state for participants
  const [showParticipantsModal, setShowParticipantsModal] = useState(false);

  const peers = useRef({});

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
        // Update the participants state to reflect the new participant
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

  const inviteOthers = () => {
    // Display the chat widget when inviting others
    setParticipantName('Raslen'); // Set your own name or username
  
    // Emit an invitation event to the server with your participantName and meetingCode
    socket.emit('inviteParticipant', { participantName, meetingCode });
  
    // Listen for the invitationResponse event from the server
    socket.on('invitationResponse', ({ accepted, invitedParticipant }) => {
      if (accepted) {
        console.log(`${invitedParticipant} accepted the invitation`);
        // You can simulate that a new participant has joined the meeting here
        console.log('New participant joined the meeting');
      } else {
        console.log(`${invitedParticipant} declined the invitation`);
      }
    });
  };

  // Rest of the component

  return (
    <Container fluid className="meeting-container">
    <Row className="header-row">
      <Col>
        <h1 className="meeting-title">Video Meeting Room</h1>
      </Col>
    </Row>
    <Row className="video-grid-row">
      <Col xs={12} md={12} lg={6} className="local-video-col">
        <video ref={videoRef} autoPlay playsInline className="local-video"></video>
      </Col>
      <Col xs={12} md={12} lg={6} className="participants-grid-col">
        <Row className="participants-grid">
          <Col xs={12} className="participant-col main-camera">
            <div className="participant-container">
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
          </Col>
          {participants.map((participant) => (
            <Col key={participant.name} xs={6} className="participant-col">
              <div className="participant-container">
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
            </Col>
          ))}
        </Row>
      </Col>
    </Row>
      <Row className="button-row">
        <Col>
          {isJoined ? (
            <Button variant="danger" onClick={leaveMeeting} className="action-button leave-button">Leave Meeting</Button>
          ) : (
            <Button variant="success" onClick={joinMeeting} className="action-button join-button">Join Meeting</Button>
          )}
          <Button variant="secondary" onClick={toggleScreenSharing} className={`action-button ${isSharingScreen ? 'sharing-button-active' : 'sharing-button'}`}>
            {isSharingScreen ? 'Stop Sharing' : 'Share Screen'}
          </Button>
          {meetingCode && (
            <div>
              <p className="meeting-code">Meeting Code: {meetingCode}</p>
              <Button variant="primary" onClick={inviteOthers} className="action-button invite-button">Invite Others</Button>
            </div>
          )}
        </Col>
      </Row>
      <Row>
        {participants.map((participant) => (
          <Col key={participant.name}>
            <video
              autoPlay
              playsInline
              className="video-stream"
              ref={(ref) => {
                if (ref) {
                  ref.srcObject = participant.stream;
                }
              }}
            ></video>
          </Col>
        ))}
      </Row>
      <Widget
        handleNewUserMessage={(newMessage) => {
          console.log('New message:', newMessage);
        }}
        title="Meeting Chat"
        subtitle={`Chatting as ${participantName}`}
      />
    </Container>
  );
};

export default MeetingRoom;