import React, { useContext, useEffect, useState } from 'react'
import style from './AllOrders.module.css'
import { authContext } from '../AuthContextProvider/AuthContextProvider'
import axios from 'axios';

export default function AllOrders() {
   const [orders, setorders] = useState(null)
  //  const [cartitems, setcartItems] = useState(null)
  let{idUser} = useContext(authContext)
  console.log(idUser);
  const getUserOrer = async()=>{

  try {
     let {data} = await axios.get(`https://ecommerce.routemisr.com/api/v1/orders/user/${idUser}`)
   console.log(data);
   setorders(data)
 
  } catch (error) {
    console.log(error);
    
  }
   
  }
  useEffect( ()=>{
    getUserOrer()
  }, [idUser])

   
  return <>
  <main className='p-3.5  '>
 <h2 className='font-bold py-3'>My Orders</h2>
 <div className="grid lg:grid-cols-4 gap-5">
  {orders?.map((order)=><div className='relative text-center shadow p-3'>
   <img src={order.cartItems[0].product.imageCover} alt="" />
   <span className='absolute top-0 size-8 rounded-full flex i justify-center items-center bg-gray-600 text-green-500 font-bold '>  {order.cartItems[0].count}</span>
    
    </div>
  
 )}
 </div>
 



  </main>
  
  
  
  
  
  
  </>
}
