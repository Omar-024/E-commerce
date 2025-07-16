import React, { useContext, useState } from 'react'
import style from './Payment.module.css'
import { useFormik } from 'formik'
import axios from 'axios';
import { CartContext  } from '../CartContextProvider/CartContextProvider';
import { authContext } from '../AuthContextProvider/AuthContextProvider';
import { useNavigate } from 'react-router-dom';


export default function Payment() {
  let{cartid , totalItems, settotalItems}=useContext(CartContext)
  let{token} = useContext(authContext)
  let navigate =  useNavigate()
  const [payFlag, setpayFlag] = useState(false)
  
  

   const cashPayment = (values)=>{
   
    console.log(values);
    axios.post(`https://ecommerce.routemisr.com/api/v1/orders/${cartid}` ,values , 
         {
      headers:{
        token
      }
    }
    ).then((res)=>{
      console.log(res);
    

      navigate("/allorder")
      
    }).catch((error)=>{
      console.log(error)
    })
 
    
   }

  const onlinePayment = (values)=>{
   
    
    console.log(values);
    axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartid}?url=http://localhost:5173` , values , 
         {
      headers:{
        token
      }
    }
    ).then(({data})=>{
      console.log(data);
      window.open(data.session.url , "_self")
     
      
    }).catch((error)=>{
      console.log(error)
    })
   
    
   }

   const PaymentFlag = (values )=>{
     let shippingAddress ={
      shippingAddress:values
    }

    if(payFlag)
    {
      cashPayment(shippingAddress)
      
    }
    else
    {
      onlinePayment(shippingAddress)

  
    }
   }

    

    let formik = useFormik({
      initialValues:{
       details:"" ,
       phone: "" ,
       city: ""
      } ,
      onSubmit:PaymentFlag
    }) 
  return <> 
  <form  onSubmit={formik.handleSubmit} >
 <div className="mb-5">
  <label htmlFor="Details" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">details</label>
  <input  type="text"
  name='details'
  onChange={formik.handleChange}
  value={formik.values.details}
   id="Details" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-none  focus:ring-green-500 focus:border-gray-400 block w-1/2 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500" />
</div>

 <div className="mb-5">
  <label htmlFor="phone" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">phone</label>
  <input type="tel" 
    name='phone'
  onChange={formik.handleChange}
  value={formik.values.phone}
  id="phone" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-none  focus:ring-green-500 focus:border-gray-400 block w-1/2 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500" />
</div>
 <div className="mb-5">
  <label htmlFor="city" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">city</label>
  <input type="text"
    name='city'
  onChange={formik.handleChange}
  value={formik.values.city}
  id="city" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-none  focus:ring-green-500 focus:border-gray-400 block w-1/2 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500" />
</div>
<button onClick={()=>setpayFlag(true)}  type='submit' className='btn my-2'> Cash </button >
<button onClick={()=>setpayFlag(false)} type='submit' className='btn mx-2 my-2'> Checkout </button>

  </form>
  
  
  
  
  
  
  </>
}
