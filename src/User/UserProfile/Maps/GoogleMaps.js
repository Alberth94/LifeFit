import React, { useState, useRef } from "react";
import { SkeletonText } from '@chakra-ui/react';
import {Form, ButtonGroup, Card } from 'react-bootstrap';
import { useJsApiLoader, Autocomplete } from '@react-google-maps/api';
import UserPosition from './UserPosition';
import TravelMode from './TravelMode';
import Intro from './Intro';
import './GoogleMaps.css';
import CalculateRoute from "./CalculateRoute";
import ClearRoute from './ClearRoute';
import Map from './Map';

const libraries =['places'];

function GoogleMaps() {
  const [selectedMode, setSelectedMode] = useState('DRIVING');
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: 'AIzaSyDuWfahKYTAJyWs5YS89k-TgEYLYicnsJY',
    libraries,
  });

  const [directionsResponse, setDirectionsResponse] = useState(null);
  const [distance, setDistance] = useState('');
  const [duration, setDuration] = useState('');

  const originRef = useRef();
  const destiantionRef = useRef();

  if (!isLoaded) {
    return <SkeletonText />;
  }

  return (
    <div className='user-map'>
      <Intro />
      <div className='flex'>
        <div
          style={{
            marginTop: '-40%',
            position: 'absolute',
            left: 0,
            top: 0,
            height: '90%',
            width: '90%',
          }}
        >
          <Map directionsResponse={directionsResponse}></Map>
        </div>

        <Card className='card-options'>
          <div className='autocomplete-container'>
            <div className='start-point-container'>
              <Autocomplete>
                <Form.Control
                  className='origin-text'
                  type='text'
                  placeholder='Origin'
                  ref={originRef}
                />
              </Autocomplete>
              <UserPosition setOriginRef={originRef} />
            </div>
            <Autocomplete>
              <Form.Control
                className='destination-text'
                type='text'
                placeholder='Destination'
                ref={destiantionRef}
              />
            </Autocomplete>
            <span style={{ marginLeft: '25px' }}></span>

            <ButtonGroup>
              <CalculateRoute setDirectionsResponse={setDirectionsResponse} selectedMode={selectedMode} originRef={originRef} destiantionRef={destiantionRef} setDuration={setDuration} setDistance={setDistance} ></CalculateRoute>
              <span style={{ marginLeft: '10px' }}></span>
              <ClearRoute  setDirectionsResponse={setDirectionsResponse} originRef={originRef} destiantionRef={destiantionRef} setDuration={setDuration} setDistance={setDistance}></ClearRoute>
            </ButtonGroup>
          </div>
          <div className='travel-mode'>
            <TravelMode setSelectedMode={setSelectedMode} />
            <div className='distance-duration-text'>
              <p style={{ fontSize: '20px' }}>Distance: {distance}</p>
              <p style={{ fontSize: '20px', marginLeft: '30%' }}>Duration: {duration}</p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}

export default GoogleMaps;