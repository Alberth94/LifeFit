import { Form, Row, Col } from 'react-bootstrap';
import './TravelMode.css';

const TravelMode = ({ setSelectedMode }) => {
  return (
    <Row className="align-items-center">
      <Col md={2}>
        <b style={{ color: 'green', whiteSpace: 'nowrap' }}>Mode of Travel:</b>
      </Col>
      <Col md={4}>
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
      </Col>
    </Row>
  );
};

export default TravelMode;