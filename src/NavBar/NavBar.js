import { Container, Nav, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";
import UserDropDownMenu from "../User/UserProfile/UserDropDownMenu";
import './NavBar.css';

const NavBar = ({ userOnOff, setUserOnOff, externalUserOnOff, setExternalUserOnOff }) => {

  return (
    <div>
      <Navbar bg="light" variant="light">
        <Container>
          <Navbar.Brand href="#home">Navbar</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/home">Home</Nav.Link>
            <Nav.Link href="#features">Features</Nav.Link> 
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