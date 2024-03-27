// Home.js
import React from 'react';
import DoughnutComponent from './DoughnutComponent';
import MapComponent from './MapComponent';
import TimeFrameComponent from './TimeFrameComponent';
import LegendComponent from './LegendComponent'; 
import WidgetContainer from './WidgetContainer';
import '../styles/Home.css'; 

const Home = () => {
  return (
    <div className="home-container">
      <WidgetContainer className='doughnut-widget'>
        <DoughnutComponent value={89} />
      </WidgetContainer>

      <WidgetContainer className='map-widget'>
        <MapComponent />
      </WidgetContainer>
      
      <WidgetContainer className='timeframe-widget'>
        <TimeFrameComponent />
      </WidgetContainer>

      <WidgetContainer className='legend-widget'>
        <LegendComponent />
      </WidgetContainer>
      
      {/* Add more widgets as needed */}
    </div>
  );
};

export default Home;
