// YoutubeSearch.js

import React, { useState, useEffect } from 'react';
import './YoutubeSearch.css'
const API_KEY = 'AIzaSyDM9vVFXqQAs9-iItWIW5ZzQt4Dl76osDA'; // Replace with your actual API key
const YOUTUBE_API_URL = 'https://www.googleapis.com/youtube/v3/search';

const YoutubeSearch = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [youtubeResults, setYoutubeResults] = useState([]);
  
    useEffect(() => {
      const fetchYoutubeResults = async () => {
        try {
          if (searchTerm) {
            const response = await fetch(`${YOUTUBE_API_URL}?key=${API_KEY}&q=${searchTerm}&part=snippet&type=video`);
            const data = await response.json();
            setYoutubeResults(data.items || []);
          } else {
            setYoutubeResults([]);
          }
        } catch (error) {
          console.error('Error fetching YouTube results:', error);
        }
      };
  
      fetchYoutubeResults();
    }, [searchTerm]);
  
    return (
      <div className="youtube-search">
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search on YouTube"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button onClick={() => setSearchTerm(searchTerm)}>Search</button>
        </div>
        <div className="search-results">
          {youtubeResults.length > 0 ? (
            youtubeResults.map((result, index) => (
              <div className="video" key={index}>
                <a
                  href={`https://www.youtube.com/watch?v=${result.id.videoId}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    src={result.snippet.thumbnails.medium.url}
                    alt={result.snippet.title}
                  />
                  <div className="video-details">
                    <p className="video-title">{result.snippet.title}</p>
                    <p className="video-channel">{result.snippet.channelTitle}</p>
                  </div>
                </a>
              </div>
            ))
          ) : (
            <p className="no-results">No search results.</p>
          )}
        </div>
      </div>
    );
  };
  
  export default YoutubeSearch;






