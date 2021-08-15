import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from "react-router-dom";
import './Header.css';
import LogoutButton from './components/Logout.Button';
import LoginButton from './components/LoginButton';
import { withAuth0 } from '@auth0/auth0-react';

class Header extends React.Component {
  render() {
    return (
      <div >
        <Navbar className="header" collapseOnSelect expand="lg" bg="dark" variant="dark">
          <Navbar.Brand>My Favorite Books</Navbar.Brand>
          
            <Link to="/">Home</Link>
            <Link to="/profile">Profile</Link>
          
          {/* TODO: if the user is logged in, render the `LogoutButton` - if the user is logged out, render the `LoginButton` */}
          <div>
            {
              this.props.auth0.isAuthenticated ? <LogoutButton /> : <LoginButton />
            }
          </div>
        </Navbar>
      </div>
    );
  }
}

export default withAuth0(Header);
