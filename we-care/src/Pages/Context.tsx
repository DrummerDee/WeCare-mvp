import React, { createContext, PropsWithChildren, useEffect, useState } from 'react'
import Axios from 'axios'
export const auth = createContext<any>({})
const Context = (props: PropsWithChildren<any>) => {

const [user,setUser] = useState<any>()

  useEffect(() => {
    Axios.get('http://localhost:3030/user', {withCredentials:true}).then(res => {
    setUser(res.data)
    })
  }, [])
  return (
    <auth.Provider value={user}>{props.children}</auth.Provider>
  )
}

export default Context