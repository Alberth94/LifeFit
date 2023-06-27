import React from 'react';
import { Button} from 'react-bootstrap';
import './ClearRoute.css';

const CalculateRoute = (props) => {

    function clearRoute() {
        props.setDirectionsResponse(null);
        props.setDistance('');
        props.setDuration('');
        props.originRef.current.value = '';
        props.destiantionRef.current.value = '';
      }

    return (
        <Button type='button' className='clear-route-btn' onClick={clearRoute}>
            Clear Route
        </Button>
    );
}

export default CalculateRoute;