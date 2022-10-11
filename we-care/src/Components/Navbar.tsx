import React, {useContext} from 'react'
import {Link} from 'react-router-dom';
import { auth } from '../Pages/Context';
import Axios from 'axios'

export const Navbar = () => {
  const cxt = useContext(auth)

  
  const loggout = () => {
    Axios.get('http://localhost:3030/logout', {
      withCredentials:true
    }).then(res => {
      if(res.status === 200) return window.location.href = '/'
    })
}
  return (
    <header>
      {/* if user exist, show homepage, profile, etc. If not show landing,about & contact page */}
      {cxt ? (
        <>
          <Link to='/clients'> Clients </Link>
          <Link to='/profile'> Profile </Link>
          <Link to='/welcome'> Welcome </Link>
          <Link onClick={loggout} to='/logout'> Logout </Link>
          {cxt.isAdmin ? <Link to='/admin'> Admin </Link> : null}
          </>
      ) : (
        <>
            <Link to='/register'>Sign Up</Link>
            <Link to='/about'> About Us </Link>
            <Link to='/contact'>Contact Us</Link>
            </>
      )
      }
      <Link to='/'>Home</Link>
    </header>
  )
}
