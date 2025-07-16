import React, { createContext, useState } from 'react'

 export let authContext = createContext()
export default function AuthContextProvider({children}) {
    console.log(children);
    
    const [token, setToken] = useState(localStorage.getItem("token"))
    const [idUser, setIdUser] = useState(localStorage.getItem("id"))
   
    
  return < authContext.Provider  value={{token , setToken , setIdUser , idUser}} >
  {children}
  </authContext.Provider>
}
