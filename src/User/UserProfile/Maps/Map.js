import React from 'react';
import { GoogleMap, Marker, DirectionsRenderer } from '@react-google-maps/api';
import './Map.css';

const center = { lat: 46.19672470664373, lng: 24.720774861113764 };//Romania

const Map = ({directionsResponse}) => {
    
    return (
        <div className='myMap' >
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
    );
}

export default Map;
