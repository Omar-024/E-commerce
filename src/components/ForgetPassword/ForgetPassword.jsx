import React, { useState } from 'react'
import style from './ForgetPassword.module.css'
import { useFormik } from 'formik';
import axios from 'axios';
import { data, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

export default function ForgetPassword() {
  let navigate =  useNavigate()

    const [isloading, setIsloading] = useState(false)
    const [isError, setisError] = useState(null)

    const forgetPassword = (values)=>{
      console.log(values);
      setIsloading(true)
      axios.post("https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords" , values)
      .then(({data})=>{
        console.log(data)
        setisError(null)
          if(data.message)
      {
        toast.success("Reset code sent to your email")
      }
      setTimeout(()=>{
        navigate("/verifycode")
      } , 2000)
        
      }).catch((error)=>{
        console.log(error);
      setisError(error.response.data.message)
        
      }).finally(()=>{
        setIsloading(false)
      })
      
    }
  

    let formik = useFormik({
         initialValues:{
          email: ""
         } ,
         onSubmit:forgetPassword
    })
  return <>
  {isError? <>
    <div className=" text-center p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
  {isError}
   </div>
  
  </>:""}

  
  <form onSubmit={formik.handleSubmit} className="mt-8 w-1/2 mx-auto"  >
    <div className="relative z-0 w-full mx-auto my-2 mb-5 group">
    <input
    onChange={formik.handleChange}
   
    value={formik.values.email}
     type="email" name="email" id="floating_email" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" " />
    <label htmlFor="floating_email" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Email </label>
  </div>

  <button type="submit" className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800 cursor-pointer "> {isloading? <i className="fa-solid fa-spinner fa-spin"></i>: "Verify" } </button>
 
  </form>
  
  
  
  
  
  
  </>
}
