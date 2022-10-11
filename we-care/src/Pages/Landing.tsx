import React, { useContext } from 'react'
import { auth } from './Context'

const Landing = () => {
const cxt = useContext(auth)
console.log(cxt)
  return (
    <>
      <main>
        <h1> Welcome to WeCare Healthcare Services </h1>
      </main>
    </>
  );
};

export default Landing;
