import React from "react";
import { Button} from 'react-bootstrap';
import './CalculateRoute.css';

const CalculateRoute = (props) => {

    async function calculateRoute() {
        if (props.originRef.current.value === '' || props.destiantionRef.current.value === '') {
          return;
        }
    
        const directionsService = new window.google.maps.DirectionsService();
        const results = await directionsService.route({
          origin: props.originRef.current.value,
          destination: props.destiantionRef.current.value,
          travelMode: window.google.maps.TravelMode[props.selectedMode],
        });
    
        props.setDirectionsResponse(results);
        props.setDistance(results.routes[0].legs[0].distance.text);
        props.setDuration(results.routes[0].legs[0].duration.text);
      }

    return (
        <Button
        className='route-button small-button'
        variant='success'
        type='submit'
        onClick={calculateRoute}
      >
        Calculate Route
      </Button>
    );
}

export default CalculateRoute;