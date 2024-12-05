import React from 'react';
import {Link} from 'react-router-dom';
import './Navbar.css';

const Title = () => {
  return (

        <header className =  'Title'><Link to='/'><h1 className = 'titleText'>DreamTrail</h1></Link></header>
)
}

export default Title