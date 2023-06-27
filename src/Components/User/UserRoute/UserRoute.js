import React, { useState, useRef } from "react";
import { SkeletonText } from '@chakra-ui/react';
import { Card } from 'react-bootstrap';
import { useJsApiLoader} from '@react-google-maps/api';
import Intro from './Intro';
import './UserRoute.css';
import Map from './Map';
import Search  from './Search';
import DisplayRoute from "./DisplayRoute";

const libraries =['places'];

function UserRoute() {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: 'AIzaSyDuWfahKYTAJyWs5YS89k-TgEYLYicnsJY',
    libraries,
  });

  const [directionsResponse, setDirectionsResponse] = useState(null);
 
  const originRef = useRef();
  const destiantionRef = useRef();

  if (!isLoaded) {
    return <SkeletonText />;
  }

  return (
    <div className='user-map'>
      <Intro />
      <div className='flex'>
        <Map directionsResponse={directionsResponse}></Map>
        <Card className='card-options'>
          <div className='autocomplete-container'>
            <Search originRef={originRef} destiantionRef={destiantionRef}/>
            <DisplayRoute setDirectionsResponse={setDirectionsResponse}  originRef={originRef} destiantionRef={destiantionRef} />

            </div>
        </Card>
      </div>
    </div>
  );
}

export default UserRoute;