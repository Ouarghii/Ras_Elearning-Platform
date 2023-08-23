//https://images.ctfassets.net/y2ske730sjqp/5QQ9SVIdc1tmkqrtFnG9U1/de758bba0f65dcc1c6bc1f31f161003d/BrandAssets_Logos_02-NSymbol.jpg?w=940

import React, { useState } from 'react';
import './NetflixSearchScreen.css'; // Import the CSS file for styling

const NetflixSearchScreen = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);
  
    const API_KEY = 'c2f64fddc7a4bae0e1f0fecc2dcc3f6b';
  
    const searchFunction = async (query) => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${query}`
        );
        const data = await response.json();
  
        return data.results;
      } catch (error) {
        console.error('Error occurred during search:', error);
        return [];
      }
    };
  
    const handleSearch = async () => {
      try {
        const results = await searchFunction(searchQuery);
  
        setSearchResults(results);
      } catch (error) {
        console.error('Error occurred during search:', error);
      }
    };
  
    return (
      <div className="netflix-search">
        <header className="header">
          <img
            src="https://images.ctfassets.net/y2ske730sjqp/5QQ9SVIdc1tmkqrtFnG9U1/de758bba0f65dcc1c6bc1f31f161003d/BrandAssets_Logos_02-NSymbol.jpg?w=940" // Replace with the path to your Netflix logo
            alt="Netflix Logo"
            className="logo"
          />
          {/* Additional header elements can be added here */}
        </header>
  
        <div className="search-bar">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Titles, people, genres"
            className="search-input"
          />
          <button onClick={handleSearch} className="search-button">
            Search
          </button>
        </div>
  
        <div className="search-results">
          {searchResults.length > 0 ? (
            <ul className="result-list">
              {searchResults.map((result, index) => (
                <li key={index} className="result-item">
                  <img
                    src={`https://image.tmdb.org/t/p/w200${result.poster_path}`}
                    alt="Poster"
                    className="result-poster"
                  />
                  <h3 className="result-title">{result.title}</h3>
                  <p className="result-overview">{result.overview}</p>
                </li>
              ))}
            </ul>
          ) : (
            <p className="no-results">No results found.</p>
          )}
        </div>
      </div>
    );
  };
  
  export default NetflixSearchScreen;