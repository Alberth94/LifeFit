import React from "react";
import './Intro.css';
import Spa from './Spa.jpg';
import Fitness from './Fitness.jpg';
import Meditation from './Meditation.jpg';

const Intro = () => {
  return (
    <div className="user-map-text">
      <div className="right-images">
        <img className="maps-img" src={Spa} alt="Spa" />
        <span style={{width: '10px'}}></span>
        <img className="maps-img" src={Fitness} alt="Fitness" />
        <span style={{width: '10px'}}></span>
        <img className="maps-img" src={Meditation} alt="Meditation" />
      </div>
      <div className="text">
      <p style={{ fontSize: '20px' }}>
          Welcome to our dedicated section for wellness facility search! If you are looking for a <span className="highlight">spa center</span>, a <span className="highlight">fitness gym</span>, or a <span className="highlight">meditation center</span>, you are in the right place.
          To find your desired location, please enter the starting point and destination in the respective fields below. Then, click the 'Calculate Route' button to discover directions and distance to your chosen destination. You can also select your preferred mode of travel using the travel options.
          The map below will display the starting point, destination, and suggested route. You will also be able to see the estimated distance and duration of the journey.
          Please enjoy searching and exploring wellness facilities, and have a pleasant and relaxing experience!
        </p>
      </div>
    </div>
  );
}

export default Intro;