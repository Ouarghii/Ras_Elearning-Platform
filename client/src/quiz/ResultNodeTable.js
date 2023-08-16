import React, { useEffect, useState } from 'react';
import './ResultNodeTable.css'; // Update with your ResultNodeTable styles
import { getServerData } from '../helper/helper';
import axios from 'axios';
import Swal from 'sweetalert2';

const ResultNodeTable = ({ totalAttempts }) => {
  const [data, setData] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [email, setEmail] = useState('');

  useEffect(() => {
    getServerData('http://localhost:5000/api/nodequiz/resultNode', (res) => {
      setData(res);
    });
  }, []);

  const showAlert = (icon, text) => {
    Swal.fire({
      title: 'Mail Status',
      text: text,
      icon: icon,
      confirmButtonText: 'OK',
    });
  };

  const handleSendEmail = () => {
    if (email && selectedUser) {
      const htmlContent = `
        <p>Congratulations, ${selectedUser.username}!</p>
        <p>You have successfully passed the Node.js quiz and earned your certificate from Ras E-learning platform.</p>
        <table>
          <thead>
            <tr>
              <th>Attempts</th>
              <th>Earn Points</th>
              <th>Result</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>${selectedUser.attempts || 0}</td>
              <td>${selectedUser.points || 0}</td>
              <td style="color: ${selectedUser.achived === 'Passed' ? '#0dff92' : 'red'};">${selectedUser.achived}</td>
            </tr>
          </tbody>
        </table>
      `;

      axios
        .post('http://localhost:5000/api/sendEmail/send-certificate', {
          recipientEmail: email,
          username: selectedUser.username,
          htmlContent: htmlContent,
        })
        .then((response) => {
          showAlert('success', 'Certificate sent successfully!');
        })
        .catch((error) => {
          showAlert('error', 'Error sending certificate email.');
          console.error('Error sending certificate email:', error);
        });
    } else {
      showAlert('error', 'Please provide a valid email and select a user.');
    }
  };

  return (
    <div className='table-container'>
      <table className='result-table'>
        <thead className='table-header'>
          <tr className='table-row'>
            <th>Name</th>
            <th>Attempts</th>
            <th>Earn Points</th>
            <th>Result</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {data.length === 0 ? (
            <tr>
              <td colSpan='5'>No Data Found</td>
            </tr>
          ) : (
            // Group results by username and calculate total attempts and points
            Object.values(
              data.reduce((accumulator, currentValue) => {
                const username = currentValue.username;
                if (!accumulator[username]) {
                  accumulator[username] = {
                    ...currentValue,
                    totalAttempts: 0,
                    totalPoints: 0,
                  };
                }
                accumulator[username].totalAttempts += 1;
                accumulator[username].totalPoints += currentValue.points;
                return accumulator;
              }, {})
            ).map((v, i) => (
              <tr className='table-row' key={i}>
                <td>{v?.username || ''}</td>
                <td>{v.totalAttempts}</td>
                <td>{v.totalPoints}</td>
                <td style={{ color: v?.achived === 'Passed' ? '#0dff92' : 'red' }}>
                  {v?.achived}
                </td>
                <td>
                  {v?.achived === 'Passed' && (
                    <button
                      className='btn'
                      onClick={() => setSelectedUser(v)}
                    >
                      Get Certificate
                    </button>
                  )}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
      {/* Email Modal */}
      {selectedUser && (
        <div className='modal-overlay'>
          <div className='modal-content'>
            <h2>Get Your Certificate</h2>
            <p>
              Congratulations on passing the quiz, {selectedUser.username}! Please provide your
              email to receive your certificate.
            </p>
            <input
              type='email'
              placeholder='Your Email'
              value={email} // Bind the value of the input field to the email state
              onChange={(e) => setEmail(e.target.value)} // Update the email state on change
            />
            <button className='btn' onClick={handleSendEmail}>
              Send Email
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ResultNodeTable;
