import React, { useState } from 'react';
import './ChatGptSearch.css';

const ChatGptSearch = ({ onSearch }) => {
  const [query, setQuery] = useState('');
  const [chatResponse, setChatResponse] = useState('');

  const handleSearch = async () => {
    try {
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer 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`, // Replace with your actual API key
        },
        body: JSON.stringify({
          model: 'gpt-3.5-turbo', // Specify the GPT-3 model version
          messages: [
            { role: 'user', content: query }
          ],
          max_tokens: 50,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        if (data.choices && data.choices.length > 0 && data.choices[0].message && data.choices[0].message.content) {
            const chatResponse = data.choices[0].message.content;
            setChatResponse(chatResponse);
            onSearch(chatResponse);
          } else {
            console.error('Unexpected response structure:', data);
          }
        } else {
          console.error('Error fetching GPT-3 response:', data);
        }
      } catch (error) {
        console.error('Error fetching GPT-3 response:', error);
      }
    };
  
    return (
      <div className="chatgpt-search">
        <div className="chat-container">
          <div className="chat">
            {chatResponse && (
              <div className="chat-message">
                <div className="chat-bubble chat-response">
                  <p>{chatResponse}</p>
                </div>
              </div>
            )}
          </div>
          <div className="input-container">
            <input
              className="chat-input"
              type="text"
              placeholder="Type your message..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <button className="chat-button" onClick={handleSearch}>
              Send
            </button>
          </div>
        </div>
      </div>
    );
  };
  
  export default ChatGptSearch;
