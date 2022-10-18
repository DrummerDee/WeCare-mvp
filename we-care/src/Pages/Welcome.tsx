import React, { useContext } from 'react'
import { auth } from './Context'


const Welcome = () => {
const cxt = useContext(auth);
console.log(cxt)
  return (
   <>
   <h1> Hi {cxt.username}, look at what's new </h1>
   <div className='avatar'></div>
   <div className='schedule'></div>
   </>
  )
}

export default Welcome