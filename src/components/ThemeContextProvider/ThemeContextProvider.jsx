import React, { createContext, useState } from 'react'
import style from './ThemeContextProvider.module.css'

 
export let themeContext  =  createContext()

export default function ThemeContextProvider({children}) {
    const [Theme, setTheme] = useState("light")

  const toggle= ()=>{
    if(Theme==="light"){
      setTheme("dark")
    }
    else{
      setTheme("light")
    }
  }


  return <themeContext.Provider value={{toggle , Theme , setTheme}}>
    
    {children}
  
  </themeContext.Provider>
}
