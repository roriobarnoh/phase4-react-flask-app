import { Link } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';

export default function AppNavbar() {
  const { user, logout } = useAuth();

  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand as={Link} to="/">Fitness Tracker</Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse>
          <Nav className="me-auto">
            {user && (
              <>
                <Nav.Link as={Link} to="/workouts">Workouts</Nav.Link>
                <Nav.Link as={Link} to="/exercises">Exercises</Nav.Link>
                <Nav.Link as={Link} to="/logs">Logs</Nav.Link>
              </>
            )}
          </Nav>
          <Nav>
            {user ? (
              <Button variant="outline-light" onClick={logout}>Logout</Button>
            ) : (
              <>
                <Nav.Link as={Link} to="/login">Login</Nav.Link>
                <Nav.Link as={Link} to="/register">Register</Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

