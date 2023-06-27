import { Button } from 'react-bootstrap';
import Geocode from 'react-geocode';
import './CurrentPosition.css';

Geocode.setApiKey('AIzaSyDuWfahKYTAJyWs5YS89k-TgEYLYicnsJY');

const CurrentPosition = ({ setOriginRef }) => {

  const getMyLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;

          Geocode.fromLatLng(latitude, longitude)
            .then((response) => {
              const address = response.results[0].formatted_address;
              setOriginRef.current.value = address;
            })
            .catch((error) => {
              console.error(error);
            });
        },
        (error) => {
          console.error(error);
        },
        {
          enableHighAccuracy: true,
          timeout: 20000,
          maximumAge: 0,
        }
      );
    } else {
      console.error('Geolocation is not supported by this browser.');
    }
  };

  return (
    <div>
      <Button className="my-position-btn" variant="primary" onClick={getMyLocation}>
        Get my location
      </Button>
    </div>
  );
};

export default CurrentPosition;