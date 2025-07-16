import React, { useContext, useState } from 'react'
import style from './Layout.module.css'
import { Outlet } from 'react-router-dom'
import Navbar from '../Navbar/Navbar'
import { FaCartShopping } from 'react-icons/fa6'
import Footer from '../Footer/Footer'
import { themeContext } from '../ThemeContextProvider/ThemeContextProvider'

export default function Layout() {
  let {setTheme , Theme}  =   useContext(themeContext)

    // const [counter, setcounter] = useState(null)
  return <>
  
 <div className={`${Theme=="dark"? "dark": ""} `} >
   <Navbar  />
 </div>
 <div className={`${Theme=="dark"? "dark": ""} dark:bg-black  `} >
  <div className= " dark:bg-black dark:text-white   container mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8 pt-[100px] pb-4">
  <Outlet />
 </div>
 </div>
<div className={`${Theme=="dark"? "dark": ""} `}>
   <Footer/>
</div>
 
 npm install gh-pages --save-dev
  
  </>
}
