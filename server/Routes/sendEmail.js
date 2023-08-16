const express = require('express');
const router = express.Router();
const emailController = require('../controllers/emailController');

router.post('/send-certificate', (req, res) => {
    const { recipientEmail, username, htmlContent } = req.body; // Extract htmlContent from the request body

    emailController.sendCertificateEmail(recipientEmail, username, htmlContent); // Pass htmlContent to the function

  res.json({ message: 'Certificate email sent successfully' });
});

module.exports = router;
