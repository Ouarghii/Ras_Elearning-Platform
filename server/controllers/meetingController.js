const Chat = require('../models/chatModel'); // Assuming you've created a chat model
const { v4: uuidv4 } = require('uuid');

const generateMeetingID = () => {
  return uuidv4();
};

const createMeeting = async (req, res) => {
  const { hostID, meetingName } = req.body;

  // Generate a unique meeting ID
  const meetingID = generateMeetingID();

  // Save the meeting details in the database
  try {
    // Assuming you have a Chat model that stores meetings
    const newChat = await Chat.create({
      chatName: meetingName,
      users: [hostID], // Assuming the host is automatically added as a participant
      groupAdmin: hostID, // Assuming the host is the admin of the group
    });

    // Return the meeting ID as the response
    res.status(201).json({ meetingID });
  } catch (err) {
    // Handle error if something goes wrong with database insertion
    console.error(err);
    res.status(500).json({ error: 'Failed to create the meeting.' });
  }
};

const joinMeeting = async (req, res) => {
  const { meetingID, participantName } = req.body;

  // Retrieve the meeting details from the database based on the meeting ID
  try {
    // Assuming you have a Chat model that stores meetings
    const chat = await Chat.findById(meetingID).populate('users');

    // Perform any necessary validations
    if (!chat) {
      return res.status(404).json({ error: 'Meeting not found.' });
    }

    // Assuming you have a User model for users
    const { user } = req; // Assuming you've set this in an authentication middleware

    // Add the participant to the chat (if not already present)
    if (!chat.users.find(userId => userId.equals(user._id))) {
      chat.users.push(user._id);
      await chat.save();
    }

    // Get the list of all participants in the chat
    const participants = chat.users;

    // Notify all participants that a new participant joined the meeting
    participants.forEach(participant => {
      io.to(participant._id.toString()).emit('participantJoined', participantName);
    });

    io.emit('participantsList', participants);

    // Return the meeting details as the response
    res.json({ meetingID, participantName, participants });
  } catch (err) {
    // Handle error if something goes wrong with database retrieval
    console.error(err);
    res.status(500).json({ error: 'Failed to join the meeting.' });
  }
};

module.exports = {
  createMeeting,
  joinMeeting,
};
