import React from 'react';
import './HowItWorksSection.css';

const HowItWorksSection = () => {
  return (
    <div className="mazi-container" style={{marginTop:'-150px'}}>
      <div className="mazi-wrapper">
        <div className="sec-md-35">
          <div className="cards">
            <div className="card_one left-t">
              <h2>Deposit</h2>
              <p>Deposit asset into the available prize pools and get lottery tickets</p>
            </div>
            <div className="card_two left-b">
              <h2>Earn</h2>
              <p>The yield earned from the prize pool is distributed to lottery winners. Lottery winners are picked using chainlink VRF to ensure fair lottery and randomness.</p>
            </div>
          </div>
        </div>
        <div className="sec-md-30">
          <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" width="408.598" height="513.23" viewBox="0 0 408.598 513.23">
            <defs>
              <clipPath id="clip-path">
                <rect id="Rectangle_30" data-name="Rectangle 30" width="108" height="108" transform="translate(73 523)" fill="#8247e5" />
              </clipPath>
            </defs>
            {/* SVG Path and other elements */}
          </svg>
        </div>
        <div className="sec-md-35">
          <div className="cards">
            <div className="card_three right-t">
              <h2>Pool</h2>
              <p>The deposits are now pooled into the Money Market protocols which generate the yield on the assets.</p>
            </div>
            <div className="card_four right-b">
              <h2>Deposit</h2>
              <p>Remove your deposit at any time. As long as you stay in the pools, you continue to be eligible to win.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HowItWorksSection;
