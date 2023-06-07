import React, { useState, useRef } from "react";
import { SkeletonText } from '@chakra-ui/react';
import { Button, Form, ButtonGroup, Card } from 'react-bootstrap';
import { useJsApiLoader, GoogleMap, Marker, Autocomplete, DirectionsRenderer } from '@react-google-maps/api';
import UserPosition from './UserPosition';
import TravelMode from './TravelMode';
import Intro from './Intro';
import './GoogleMaps.css';

const center = { lat: 48.8584, lng: 2.2945 };
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

  async function calculateRoute() {
    if (originRef.current.value === '' || destiantionRef.current.value === '') {
      return;
    }

    const directionsService = new window.google.maps.DirectionsService();
    const results = await directionsService.route({
      origin: originRef.current.value,
      destination: destiantionRef.current.value,
      travelMode: window.google.maps.TravelMode[selectedMode],
    });

    setDirectionsResponse(results);
    setDistance(results.routes[0].legs[0].distance.text);
    setDuration(results.routes[0].legs[0].duration.text);
  }

  function clearRoute() {
    setDirectionsResponse(null);
    setDistance('');
    setDuration('');
    originRef.current.value = '';
    destiantionRef.current.value = '';
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
          {/* Google Map Box */}
          <GoogleMap
            center={center}
            zoom={15}
            mapContainerStyle={{
              width: '90%',
              height: '90%',
              marginLeft: '10%',
              marginTop: '100%',
              border: '4px solid rgb(0, 0, 0)',
              borderRadius: '10px',
            }}
            options={{
              zoomControl: true,
              streetViewControl: true,
              mapTypeControl: true,
              fullscreenControl: true,
            }}
          >
            <Marker position={center} />
            {directionsResponse && (
              <DirectionsRenderer directions={directionsResponse} />
            )}
          </GoogleMap>
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
              <Button
                className='route-button small-button'
                variant='success'
                type='submit'
                onClick={calculateRoute}
              >
                Calculate Route
              </Button>
              <span style={{ marginLeft: '10px' }}></span>
              <Button type='button' className='clear-route-btn' onClick={clearRoute}>
                Clear Route
              </Button>
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
