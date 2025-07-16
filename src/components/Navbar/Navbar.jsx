import React, { useContext, useState } from 'react'
import style from './Navbar.module.css'
import logo from '../../assets/cart-logo.svg'
import { Link, Navigate, NavLink, useNavigate } from 'react-router-dom'
import { authContext } from '../AuthContextProvider/AuthContextProvider'
import { CiHeart, CiLogin, CiLogout, CiMenuBurger } from 'react-icons/ci'
import { FaHeart, FaUser } from 'react-icons/fa'
import { FaCartShopping } from "react-icons/fa6";
import { CartContext } from '../CartContextProvider/CartContextProvider'
import { IoMoon } from "react-icons/io5";
import { themeContext } from '../ThemeContextProvider/ThemeContextProvider'

export default function Navbar() {
   let{totalItems , isloading} = useContext(CartContext)
   console.log(totalItems);
   
  let{token , setToken}=useContext(authContext)
    let navigate = useNavigate()

   let {toggle} =  useContext(themeContext)


    const Logout=()=>{
        setToken(null)
      localStorage.removeItem("token")
      navigate("/login")
      
    }
    const [isOpen, setisOpen] = useState(false)
    const toggleNav=()=>{
      setisOpen(!isOpen)

    }
  return <>
  
   

<nav className=" fixed top-0 left-0 right-0 z-[999] md:py-2 bg-slate-100 border-gray-200 dark:bg-gray-900 dark:text-white">
  <div className='flex items-center '>
  <div className=" container mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8  flex flex-wrap items-center justify-between  py-4">
    <div className='flex items-center gap-5'>
     
        <Link to="" className="flex items-center space-x-3 rtl:space-x-reverse">
          <img src={logo} className="h-8" alt="Flowbite Logo" />
          <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">FreshCart</span>
        </Link>
  

           {token?<ul  className=' hidden md:flex gap-4' >
        <li>
          <NavLink to='' >Home</NavLink>
        </li>
        <li>
          <NavLink to='cart'>Cart</NavLink>
          
        </li>
        <li>
          <NavLink to='products' >Products</NavLink>
        </li>
        <li>
          <NavLink to='categories' >Categories</NavLink>
        </li>
        <li>
          <NavLink to='Brand' >Brands</NavLink>
        </li>
        <li className='relative'>
             <Link to={"/cart"}>
              <span className=' relative text-2xl -translate-y-1/2'><FaCartShopping /></span>
              <span className='bg-green-400 text-white rounded-full absolute -top-[22px] left-2 size-6 flex items-center justify-center '>{ isloading? <i className="fa-solid fa-spinner fa-spin"></i>: totalItems }</span>
             </Link>
       </li>
        <li>
          <NavLink to='wishlist' className={`relative`} >Whish list <span className=' text-2xl  absolute -top-5 left-1/2 -translate-x-1/2'> <CiHeart /> </span></NavLink>
        </li>
       
      </ul>:null}


    </div>
   
   
       
    <div className="hidden w-full md:flex md:w-auto" id="navbar-default">
     
      <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg md:flex-row md:gap-3 rtl:space-x-reverse md:mt-0 md:border-0  dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
        
        <li>
          <NavLink to='' className="block py-2 px-3  rounded-sm md:bg-transparent md:text-700 md:p-0 dark:text-white md:dark:text-500" aria-current="page"> <i className='fa-brands fa-facebook'></i></NavLink>
        </li>
        <li>
          <NavLink to='' className="block py-2 px-3 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-700 md:p-0 dark:text-white md:dark:hover:text-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"><i className='fa-brands fa-linkedin'></i></NavLink>
        </li>
        <li>
          <NavLink to='' className="block py-2 px-3 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-700 md:p-0 dark:text-white md:dark:hover:text-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"><i className='fa-brands fa-x'></i></NavLink>
        </li>
        <li>
          <NavLink to='' className="block py-2 px-3 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-700 md:p-0 dark:text-white md:dark:hover:text-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"><i className='fa-brands fa-youtube'></i></NavLink>
        </li>
        <li>
          <NavLink to='' className="block py-2 px-3 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-700 md:p-0 dark:text-white md:dark:hover:text-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"><i className='fa-brands fa-github'></i></NavLink>
        </li>
        <li>
          <NavLink to='' className="block py-2 px-3 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-700 md:p-0 dark:text-white md:dark:hover:text-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"><i className='fa-brands fa-tiktok'></i></NavLink>
        </li>
        {token?<li>
          <span onClick={Logout} className='cursor-pointer text-gray-500 block py-2 px-3 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-700 md:p-0 dark:text-white md:dark:hover:text-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent'>Logout</span>
        </li>:<>
             <li>
          <NavLink to='register' className="text-gray-500 block py-2 px-3 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-700 md:p-0 dark:text-white md:dark:hover:text-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Register</NavLink>
        </li>
        <li>
          <NavLink to='login' className="text-gray-500 block py-2 px-3 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-700 md:p-0 dark:text-white md:dark:hover:text-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Login</NavLink>
        </li>
        </>}
        <li onClick={toggle}>
         <IoMoon  className='text-2xl cursor-pointer'/>
        </li>
   
        
      </ul>
      
    </div>

  </div>

   {token? <div className='md:hidden px-6 relative '>
              <Link to={"/cart"}>
              <span className=' text-[24px] '><FaCartShopping /></span>
              <span className='bg-green-400 text-white rounded-full absolute -top-4 left-10 size-6 flex items-center justify-center  '>{totalItems}</span>
              
              </Link>
    </div>:null}

   <div className='pr-4  '> 
    <CiMenuBurger onClick={toggleNav} className='  text-xl cursor-pointer md:hidden' />
    
  </div>

  <div className='px-4' onClick={toggle}>
      
         <IoMoon  className='text-2xl cursor-pointer md:hidden'/>
        
   
  </div>


  </div>
  
  

    <div className={` md:hidden fixed w-1/2  z-40 bg-slate-300 dark:bg-gray-900 p-3  transition-all duration-300 top-[65px]  ${isOpen? "  min-h-96 opacity-100  ": "hidden o"}`}>
        
     
          {token?
          <>
       <h4 className='px-3 font-bold' >Main Menu :</h4>

       <ul  className=' px-3  flex flex-col  gap-3 my-2 ' >
        <li>
          <NavLink to='' onClick={toggleNav} >Home</NavLink>
        </li>
        <li className='flex items-center gap-2 relative'>
          <NavLink to='cart' onClick={toggleNav} className={"flex gap-4 items-center"} >Cart
           <span className=' text-[24px] '><FaCartShopping /></span>
           <span className='bg-green-400 text-white rounded-full absolute -top-5 left-14 size-6 flex items-center justify-center  '>{totalItems }</span>

          </NavLink>
        </li>
        <li >
          <NavLink to='wishlist' onClick={toggleNav} className={"flex gap-4 items-center"} >Whish List
           <span className=' text-[24px] '> <CiHeart /> </span>
           

          </NavLink>
        </li>
        <li>
          <NavLink to='products' onClick={toggleNav} >Products</NavLink>
        </li>
        <li>
          <NavLink to='categories' onClick={toggleNav} >Categories</NavLink>
        </li>
        <li className='border-b-[1px] border-gray-400 pb-2'>
          <NavLink to='Brand' onClick={toggleNav} >Brands</NavLink>
        </li>
        <li >
          <span className='flex gap-2 items-center cursor-pointer' onClick={Logout} >Logout <span><CiLogout /></span></span>
          
        </li>
         </ul>
          
          </>
          
       :<>
       <h3 className='font-bold px-3'>Account</h3>
      <ul className=' px-3 flex flex-col  gap-3 my-2  list-none'>

        <li >
          < NavLink to='register' onClick={toggleNav}  className='flex items-center gap-2 '  >   <span><FaUser /> </span> Register</NavLink>
        </li>
        <li>
          <NavLink to='login' onClick={toggleNav}  className='flex items-center gap-2 ' > <span><CiLogin /></span>Login</NavLink>
        </li>
      </ul>
      </>}
      

      

    </div>
   
</nav>


  
  
  
  
  </>
}
