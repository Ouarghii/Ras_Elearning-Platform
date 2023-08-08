const express = require('express');
const router = express.Router();
const meetingController = require('../controllers/meetingController');

router.post('/create', meetingController.createMeeting);
router.post('/join', meetingController.joinMeeting);

module.exports = router;
