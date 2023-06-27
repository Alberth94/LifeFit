import { Container, Nav, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";
import UserDropDownMenu from "../User/UserDropDownMenu";
import './NavBar.css';

const NavBar = ({ userOnOff, setUserOnOff, externalUserOnOff, setExternalUserOnOff }) => {

return (
  <div>
    <Navbar className="navbar">
      <Container >
        <Navbar.Brand style={{fontSize: '40px', marginRight: '13%', color: '#7EFF85 '}} className="nav-link" >Wellness</Navbar.Brand>
        <Nav  className="me-auto">
          <Nav.Link  className="nav-link" as={Link} to="/home">Home</Nav.Link>
          <Nav.Link className="nav-link" as={Link} to="/mealplan">Meal Plans</Nav.Link> 
          <Nav.Link className="nav-link" as={Link} to="/workouts" >Workouts</Nav.Link> 
          <Nav.Link className="nav-link" as={Link} tp="/articles" >Articles</Nav.Link> 
          <Nav.Link className="nav-link" as={Link} tp="/recommendationsandreviews" >Recommendations and Reviews</Nav.Link> 

        </Nav>
        {userOnOff || externalUserOnOff ?
          <UserDropDownMenu userOnOff={userOnOff} setUserOnOff={setUserOnOff} 
            externalUserOnOff={externalUserOnOff} setExternalUserOnOff={setExternalUserOnOff}
          />
          :
          <>
            <Nav.Link className="mr-3" as={Link} to="/signup"> Sign up </Nav.Link>
            <Nav.Link  as={Link} to="/login"> Login </Nav.Link>
          </>
        }
      </Container>
    </Navbar>
  </div>
  );
}

export default NavBar;