import React, { useContext, useState } from 'react'
import style from './Login.module.css'
import { Link, useNavigate } from 'react-router-dom'
import { authContext } from '../AuthContextProvider/AuthContextProvider'
import { object, string } from 'yup'
import { useFormik } from 'formik'
import axios from 'axios'
import { jwtDecode } from "jwt-decode";
import { FaUser } from "react-icons/fa";
import { CartContext } from '../CartContextProvider/CartContextProvider'


export default function Login() {
 let{setToken , setIdUser} = useContext(authContext)
  let{getCart ,  settotalItems , totalItems} = useContext(CartContext)
   

    const [errorMessage, seterrorMessage] = useState(null)
    const [successMessage, setsuccessMessage] = useState(null)
    const [isloading, setisloading] = useState(false)
    let navigate = useNavigate()
      

    
    const handleLogin = async (values)=>{
      setisloading(true)
      try {
        console.log(values);
      let res = await axios.post("https://ecommerce.routemisr.com/api/v1/auth/signin" , values)
      console.log(res);
      localStorage.setItem("token" , res.data.token)
        let {id} = jwtDecode(res.data.token)
        console.log(id);
        setIdUser(id)
        
      localStorage.setItem("id" , id)
       
      
      
      seterrorMessage(null)
      setsuccessMessage(res.data.message)
      setisloading(false)
      navigate("/")
      setToken(res.data.token)
      } catch (error) {
         console.log(error.response.data.message);
         seterrorMessage(error.response.data.message)
         setsuccessMessage(null)
         setisloading(false)
         
      }
      
    }
    
    
    let validationSchema = object({
    
      email: string().email("email is invalid").required("email must be required") ,
      password: string().matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/ , "password must be 8 letters at least include capital and small letter").required("password must be required") ,
     
    })
      

    let formik = useFormik({
      initialValues:{
       
        email:'' ,
        password:"",
       


      } ,
      validationSchema ,
      onSubmit:handleLogin
    })
  return <>

  
  {errorMessage ?<div className=" text-center p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
  {errorMessage}
</div>:null}
  
  {successMessage ?<div className="text-center p-4 mb-4 text-sm text-green-800 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400" role="alert">
  {successMessage}
</div>:null}
<h2 className='flex items-center gap-2 text-4xl text-green-400 text-center w-fit mx-auto '>Login Now <span cl><FaUser/></span></h2>
   
  <form onSubmit={formik.handleSubmit} className="mt-8 max-w-md mx-auto">
 
  <div className="relative z-0 w-full mb-5 group">
    <input
    onChange={formik.handleChange}
    onBlur={formik.handleBlur}
    value={formik.values.email}
     type="email" name="email" id="floating_email" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" " />
    <label htmlFor="floating_email" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Email </label>
  </div>
  {formik.errors.email && formik.touched.email ?<div className="text-center p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert ">
  {formik.errors.email}
</div>:null}
  

  <div className="relative z-0 w-full mb-5 group">
    <input
    onChange={formik.handleChange}
    onBlur={formik.handleBlur}
    value={formik.values.password}
    type="password" name="password" id="floating_password" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" " />
    <label htmlFor="floating_password" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Password</label>
  </div>
  {formik.errors.password && formik.touched.password ?<div className="text-center p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert ">
  {formik.errors.password}
</div>:null}
 
  <button type="submit" className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800 cursor-pointer"> {isloading? <i className="fa-solid fa-spinner fa-spin"></i>: "Login"}  </button>
  </form>

  <Link to={"/forgetpassword"} className='flex justify-end *:underline'>
   <h3 className='hover:text-green-400 transition-all duration-200 text-gray-500 '>Forget your Password?</h3>
  </Link>
  

  
  
  
  
  
  </>
}