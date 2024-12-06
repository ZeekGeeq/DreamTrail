import React from 'react';
import {Link} from 'react-router-dom';
import './Navbar.css';

const Title = ({ isAuthenticated }) => {
  return (

    <header className = 'Title'>
      {isAuthenticated ? (
        <Link to='/profile'><h1 className = 'titleText'>DreamTrail</h1></Link>
      ) : (
        <Link to='/'><h1 className = 'titleText'>DreamTrail</h1></Link>
      )}
    </header>
)
}

export default Title