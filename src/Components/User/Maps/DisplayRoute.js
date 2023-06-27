import React from "react";
import { useState } from "react";
import { ButtonGroup } from "react-bootstrap";
import CalculateRoute from "./CalculateRoute";
import ClearRoute from './ClearRoute'
import TravelMode from "./TravelMode";
import './DisplayRoute.css';

const DisplayRoute = (props) => {

    const [distance, setDistance] = useState('');
    const [duration, setDuration] = useState('');
    const [selectedMode, setSelectedMode] = useState('DRIVING');

    return (<div>
        <div className="button-group-container">
            <ButtonGroup>
                <TravelMode setSelectedMode={setSelectedMode} />
                <span style={{ marginLeft: '10px' }}></span>
                <CalculateRoute setDirectionsResponse={props.setDirectionsResponse} selectedMode={selectedMode} originRef={props.originRef} destiantionRef={props.destiantionRef} setDuration={setDuration} setDistance={setDistance}  ></CalculateRoute>
                <span style={{ marginLeft: '10px' }}></span>
                <ClearRoute  setDirectionsResponse={props.setDirectionsResponse} originRef={props.originRef} destiantionRef={props.destiantionRef} setDuration={setDuration} setDistance={setDistance}></ClearRoute>
            </ButtonGroup>
            </div>
          <div className='distance-duration-text'>
              <p style={{ fontSize: '20px' }}>Distance: {distance}</p>
              <p style={{ fontSize: '20px', marginLeft: '30%' }}>Duration: {duration}</p>
            </div>
    </div>
        
    );
}

export default DisplayRoute;