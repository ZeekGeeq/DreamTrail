import {Link} from 'react-router-dom'

const Navbar = ({ isAuthenticated }) => {

return (
    <nav>
        <header><Link to='/'><h1>DreamTrail</h1></Link></header>
        <ul>
        {isAuthenticated ? (
            <li><Link to="/profile">Profile</Link></li>
          ) : (
            <li><Link to="/login">Login</Link></li>
          )}
            <li><Link to='/'>Trails</Link></li>
            <li><Link to='/stats'>Stats</Link></li>
            <li><Link to='/goals'>Goals</Link></li>
        </ul>
    </nav>
)
}

export default Navbar