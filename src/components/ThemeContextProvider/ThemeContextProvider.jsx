import React, { createContext, useState } from 'react'
import style from './ThemeContextProvider.module.css'

 
export let themeContext  =  createContext()

export default function ThemeContextProvider({children}) {
    const [Theme, setTheme] = useState(localStorage.getItem("theme")  || "light")
         
  const toggle= ()=>{
    if(Theme==="light"){
      setTheme("dark")
      localStorage.setItem("theme" , "dark")
    }
    else{
      setTheme("light")
      localStorage.setItem("theme" , "light")
    }
  }


  return <themeContext.Provider value={{toggle , Theme , setTheme}}>
    
    {children}
  
  </themeContext.Provider>
}
