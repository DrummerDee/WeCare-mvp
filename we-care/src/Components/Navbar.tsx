import React from 'react'
import {Link} from 'react-router-dom';

export const Navbar = () => {
  return (
    <nav>
        <ul>
            <li><Link to='/'>Home</Link></li>
            <li><Link to='/register'>Sign Up</Link></li>
            <li><Link to='/about'> About Us </Link></li>
            <li><Link to='/contact'>Contact Us</Link></li>
        </ul>
    </nav>
  )
}
