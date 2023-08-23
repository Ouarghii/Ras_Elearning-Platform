import React, { useState, useEffect } from 'react';
import './GoogleSearch.css';

const API_KEY = 'AIzaSyCVGz0q_eGUTWohh7FVFj7yr6x3aSrUxMI'; // Replace with your actual API key
const CX = '3471a917def0d4763'; // Replace with your actual Custom Search Engine ID
const GOOGLE_API_URL = 'https://www.googleapis.com/customsearch/v1';

const GoogleSearch = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [googleResults, setGoogleResults] = useState([]);

  useEffect(() => {
    const fetchGoogleResults = async () => {
      try {
        if (searchTerm) {
          const response = await fetch(`${GOOGLE_API_URL}?key=${API_KEY}&cx=${CX}&q=${searchTerm}`);
          const data = await response.json();
          setGoogleResults(data.items || []);
        } else {
          setGoogleResults([]);
        }
      } catch (error) {
        console.error('Error fetching Google results:', error);
      }
    };

    fetchGoogleResults();
  }, [searchTerm]);

  return (
    <div className="google-search">
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search on Google"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button onClick={() => setSearchTerm(searchTerm)}>Search</button>
      </div>
      <div className="search-results">
        {googleResults.length > 0 ? (
          googleResults.map((result, index) => (
            <div className="search-result" key={index}>
              <a href={result.link} target="_blank" rel="noopener noreferrer">
                <p className="result-title">{result.title}</p>
                <p className="result-snippet">{result.snippet}</p>
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

export default GoogleSearch;
