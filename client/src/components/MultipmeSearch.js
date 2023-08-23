import React, { useState, useEffect } from 'react';
import './Multi.css';

const API_KEY = 'YOUR_API_KEY'; // Replace with your actual API key
const YOUTUBE_API_URL = 'https://www.googleapis.com/youtube/v3/search';

const Screen = ({ bgColor, content }) => (
  <div className="screen" style={{ backgroundColor: bgColor }}>
    {content}
  </div>
);

function Search() {
  const [searchTerm, setSearchTerm] = useState('');
  const [googleResults, setGoogleResults] = useState([]);
  const [gptResults, setGptResults] = useState([]);
  const [youtubeResults, setYoutubeResults] = useState([]);
  const [apiResults, setApiResults] = useState([]);

  const fetchGoogleResults = async () => {
    // Use your preferred method to fetch Google search results
    const response = await fetch(`https://www.googleapis.com/customsearch/v1?key=${API_KEY}&q=${searchTerm}`);
    const data = await response.json();
    setGoogleResults(data.items || []);
  };

  const fetchGptResults = async () => {
    // Use your preferred method to fetch results from ChatGPT
    // For example: const response = await fetch('API_ENDPOINT');
    // const data = await response.json();
    // setGptResults(data.results || []);
  };

  const fetchYoutubeResults = async () => {
    // Use your preferred method to fetch YouTube search results
    const response = await fetch(`https://www.googleapis.com/youtube/v3/search?key=${API_KEY}&q=${searchTerm}`);
    const data = await response.json();
    setYoutubeResults(data.items || []);
  };

  const fetchApiResults = async () => {
    // Use your preferred method to fetch results from another API
    // For example: const response = await fetch('API_ENDPOINT');
    // const data = await response.json();
    // setApiResults(data.results || []);
  };

  useEffect(() => {
    fetchGoogleResults();
    fetchGptResults();
    fetchYoutubeResults();
    fetchApiResults();
  }, [searchTerm]);

  return (
    <div className="App11">
      <div className="search-bar">
        <input
          type="text"
          placeholder="Enter search term"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <div className="screens-container">
        <Screen bgColor="#FF5733" content={googleResults.map((result, index) => (
          <div key={index}>{result.title}</div>
        ))} />
        <Screen bgColor="#33FF57" content={gptResults.map((result, index) => (
          <div key={index}>{result.text}</div>
        ))} />
        <Screen bgColor="#5733FF" content={youtubeResults.map((result, index) => (
          <div key={index}>{result.snippet.title}</div>
        ))} />
        <Screen bgColor="#FF33A1" content={apiResults.map((result, index) => (
          <div key={index}>{result.name}</div>
        ))} />
      </div>
    </div>
  );
}

export default Search;
