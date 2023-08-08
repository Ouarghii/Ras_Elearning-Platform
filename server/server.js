const express = require("express");
const { chats } = require("./data/data");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const colors = require("colors");
const cors = require("cors");
const userRoutes = require('./Routes/userRoutes');
const meetingRoutes = require('./Routes/meetingRoutes');
const { notFound, errorHandler } = require('./middleware/errorMiddleware');

const app = express();
const server = require('http').createServer(app);

// Enable CORS for all routes, including Socket.IO requests
app.use(cors());

dotenv.config();
connectDB();
app.use(express.json());

app.get('/', (req, res) => {
    res.send("API IS Running successfully");
});

app.use('/api/user', userRoutes);
app.use('/api/meeting', meetingRoutes); // Use meeting routes

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

// Initialize Socket.IO and attach it to the HTTP server
const io = require('socket.io')(server, {
    cors: {
      origin: 'http://localhost:3000',
      methods: ['GET', 'POST'],
      credentials: true,
    },
  });
  
// Add your Socket.IO logic here

// Handle Socket.IO connections and events
io.on('connection', (socket) => {
    console.log('New client connected');

    // Handle the joinMeeting event when a participant joins a meeting
    socket.on('joinMeeting', ({ meetingCode, participantName }) => {
        // Logic to join the meeting, emit participantJoined event, etc.
        // ...
        
        // Emit participantJoined event to other participants in the meeting
        socket.broadcast.emit('participantJoined', participantName);
    });

    // Handle the leaveMeeting event when a participant leaves a meeting
    socket.on('leaveMeeting', ({ meetingCode, participantName }) => {
        // Logic to leave the meeting, emit participantLeft event, etc.
        // ...

        // Emit participantLeft event to other participants in the meeting
        socket.broadcast.emit('participantLeft', participantName);
    });

    // Handle the inviteParticipant event to send invitations
    socket.on('inviteParticipant', ({ participantName, meetingCode }) => {
        // Logic to handle invitations and emit invitationResponse event
        // ...

        // Example of emitting an invitationResponse event to the inviter and invited participant
        socket.emit('invitationResponse', { accepted: true, invitedParticipant: 'Invited User' });
    });

    // Handle the invitationResponse event when a participant responds to an invitation
    socket.on('invitationResponse', ({ accepted, invitedParticipant }) => {
        // Logic to handle invitation responses, establish connections, etc.
        // ...
      
        if (accepted) {
          // Emit the accepted invitation to the inviting participant
          socket.emit('invitationResponse', {
            accepted: true,
            invitedParticipant: invitedParticipant,
          });
      
          // Emit the participantJoined event to other participants
          socket.broadcast.emit('participantJoined', invitedParticipant);
        } else {
          // Emit the declined invitation to the inviting participant
          socket.emit('invitationResponse', {
            accepted: false,
            invitedParticipant: invitedParticipant,
          });
        }
      });

    // Handle other events and custom logic as needed

    socket.on('disconnect', () => {
        console.log('Client disconnected');
    });
});
server.listen(PORT, console.log(`Server Started on PORT ${PORT}`.yellow.bold));
