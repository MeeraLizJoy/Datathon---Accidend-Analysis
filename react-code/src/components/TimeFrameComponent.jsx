import React, { useState } from 'react';
import ReactSlider from 'react-slider';
import '../styles/TimeFrameComponent.css';


const TimeFrameComponent = () => {
  const [value, setValue] = useState(2); // Index for '3 PM' as default
  const marks = ['6 AM', '9 AM', '3 PM', '9 PM'];

  return (
    <div className="time-frame-density-slider">
      <ReactSlider
        className="horizontal-slider"
        thumbClassName="thumb"
        trackClassName="track"
        value={value}
        onChange={setValue}
        min={0}
        max={marks.length - 1}
        renderThumb={(props, state) => <div {...props}>{marks[state.valueIndex]}</div>}
        renderTrack={(props, state) => <div {...props} index={state.index} />}
        pearling
        minDistance={10}
      />
      <div className="marks">
        {marks.map((mark, index) => (
          <div key={index} className={`mark${value === index ? ' active' : ''}`}>{mark}</div>
        ))}
      </div>
    </div>
  );
};

export default TimeFrameComponent;
