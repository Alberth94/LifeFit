import { Form } from 'react-bootstrap';
import './TravelMode.css';

const TravelMode = ({ setSelectedMode }) => {
  
  return (

        <Form.Select
          id="travel-mode-select"
          className="form-select"
          aria-label="Default select example"
          onChange={event => setSelectedMode(event.target.value)}
        >
          <option value="DRIVING">Driving</option>
          <option value="WALKING">Walking</option>
          <option value="TRANSIT">Transit</option>
        </Form.Select>
  );
};

export default TravelMode;