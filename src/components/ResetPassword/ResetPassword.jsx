import React, { useContext, useState } from 'react'
import style from './ResetPassword.module.css'
import { Link, useNavigate } from 'react-router-dom'
import { authContext } from '../AuthContextProvider/AuthContextProvider'
import { object, string } from 'yup'
import { useFormik } from 'formik'
import axios from 'axios'
import { jwtDecode } from "jwt-decode";
import { FaUser } from "react-icons/fa";

export default function ResetPassword() {
 let{setToken , setIdUser} = useContext(authContext)


     const [isError, setisError] = useState(null)

    let navigate = useNavigate()
     

    
    const handleReset = async (values)=>{
    
      try {
        console.log(values);
      let res = await axios.put("https://ecommerce.routemisr.com/api/v1/auth/resetPassword" , values)
      console.log(res);
      setToken(res.data.token)
      localStorage.setItem("token" , res.data.token)
     navigate("/login")
     setisError(null)
        
     
      } catch (error) {
         console.log(error);
          setisError(error.response.data.message)
         
         
      }
      
    }
    
    
    let validationSchema = object({
    
      email: string().email("email is invalid").required("email must be required") ,
     newPassword: string().matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/ , "password must be 8 letters at least include capital and small letter").required("password must be required") ,
     
    })
      

    let formik = useFormik({
      initialValues:{
       
        email:'' ,
       newPassword:"",
       


      } ,
      validationSchema ,
      onSubmit:handleReset
    })
  return <>
    {isError? <>
    <div className=" text-center p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
  {isError}
   </div>
  
  </>:""}

  
 
<h2 className='flex items-center gap-2 text-4xl text-green-400 text-center w-fit mx-auto '>Reset Your Password <span cl><FaUser/></span></h2>
   
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
    value={formik.values.newPassword}
    type="password" name="newPassword" id="floating_password" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" " />
    <label htmlFor="floating_password" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">New Password</label>
  </div>
  {formik.errors.newPassword && formik.touched.newPassword?<div className="text-center p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert ">
  {formik.errors.newPassword}
</div>:null}
 
  <button type="submit" className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">  Reset  </button>
  </form>
  </>
}

