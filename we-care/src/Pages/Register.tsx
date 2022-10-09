import React from 'react'
import {Link} from 'react-router-dom';

const Register = () => {
  return (
   <>
   <section>
    <h1>Welcome to WeCare HealthCare Services</h1>
    <form action="">
        <div>
            <label htmlFor="username">Username</label>
            <input type="text" name="username" id="" />
        </div>
        <div>
            <label htmlFor="password">Password</label>
            <input type="password" name="password" id="" />
        </div>
        <div>
            <input type="submit" value="Sign Up" />
        </div>
    </form>
    <div>
        <h3> Already have an account? <Link to ='/login'> Login </Link></h3>
        </div>
   </section>
   </>
  )
}

export default Register