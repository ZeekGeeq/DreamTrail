import React from 'react';
import {Link} from 'react-router-dom';
import './Navbar.css';

const Navbar = ({ isAuthenticated }) => {
  return (

    <section className='wrapper'>
      <div class = 'sidebar'>
        <ul>
        {isAuthenticated ? (
            <li><Link to="/profile">Profile</Link></li>
          ) : (
            <li><Link to="/login">Login</Link></li>
          )}
            <li><Link to='/'>Trails</Link></li>
            <li><Link to='/stats'>Stats</Link></li>
        </ul>
      </div>
    </section>
)
}

export default Navbar