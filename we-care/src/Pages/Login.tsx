import React,{useState} from 'react'
import axios from 'axios';

const Login = () => {
const [username,setUsername] = useState<String>('');
const [password,setPassword] = useState<String>('');


const Login = () => {
  axios.post('http://localhost:3030/login',{
    username,
    password
  },{
    withCredentials: true
  }).then(res => {
    if(res.status === 200) return window.location.href = '/welcome'
  })
}

// const getUser = () => {
//   axios.get('http://localhost:3030/user',{
//     withCredentials: true
//   }).then(res => {
//     console.log(res)
    
//   })
// }
  return (
    <>
    <section>
        <h1>Welcome back user</h1>
                <div>
                    <label htmlFor='username'> Username </label>
                    <input type='text' placeholder='Username' onChange={e => setUsername(e.target.value)}/>
                    </div>
                    <div>
                    <label htmlFor='password'> Password </label>
                    <input type='password' placeholder='Password' onChange={e => setPassword(e.target.value)}/>
                    </div>
                    <div>
                    <button onClick={Login}> Login </button>
                    </div>

                    
        </section>
</>
  )
}

export default Login