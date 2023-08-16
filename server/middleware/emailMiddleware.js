const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: 'raslenouarghi2018@gmail.com', // Your email address
    pass: 'warghui110', // Your email password (consider using environment variables)
  },
});

const sendCertificateEmail = (recipientEmail, username) => {
  const mailOptions = {
    from: 'raslenouarghi2018@gmail.com',
    to: recipientEmail,
    subject: 'Congratulations on Getting Your ReactJS Certificate!',
    html: `<p>Congratulations, ${username}! You have successfully passed the ReactJS quiz and earned your certificate.</p>`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error sending email:', error);
    } else {
      console.log('Email sent:', info.response);
    }
  });
};

module.exports = sendCertificateEmail;