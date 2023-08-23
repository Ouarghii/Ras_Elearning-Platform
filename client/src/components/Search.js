import React, { useState } from 'react';
import ChatGptSearch from './ChatGptSearch';
import GoogleSearch from './GoogleSearch';
import YoutubeSearch from './YoutubeSearch';
import NetflixSearchScreen from './SotifySearch';
import './Search.css';

const Search = () => {
  const [fullScreen, setFullScreen] = useState(false);

  const toggleFullScreen = () => {
    setFullScreen(!fullScreen);
  };

  return (
    <div className='search-grid'>
      <div className='grid-item '>
        {/* <button className="full-screen-button" onClick={toggleFullScreen}>
         
        </button> */}
        <ChatGptSearch />
      </div>
      <div className={`grid-item ${fullScreen ? 'item-full-screen' : ''}`}>
        <button className="full-screen-button" onClick={toggleFullScreen}>
          {fullScreen ? (
            <i className="fas fa-compress"></i>
          ) : (
            <i className="fas fa-expand"></i>
          )}
        </button>
        <GoogleSearch />
      </div>
      <div className={`grid-item ${fullScreen ? 'item-full-screen' : ''}`}>
        <button className="full-screen-button" onClick={toggleFullScreen}>
          {fullScreen ? (
            <i className="fas fa-compress"></i>
          ) : (
            <i className="fas fa-expand"></i>
          )}
        </button>
        <YoutubeSearch />
      </div>
      <div className={`grid-item ${fullScreen ? 'item-full-screen' : ''}`}>
        <button className="full-screen-button" onClick={toggleFullScreen}>
          {fullScreen ? (
            <i className="fas fa-compress"></i>
          ) : (
            <i className="fas fa-expand"></i>
          )}
        </button>
        <NetflixSearchScreen />
      </div>
    </div>
  );
};

export default Search;
