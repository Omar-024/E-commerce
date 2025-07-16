import React, { useContext, useEffect, useState } from 'react'
import style from './Cart.module.css'
import { CartContext } from '../CartContextProvider/CartContextProvider'
import { BeatLoader } from 'react-spinners'
import { MdDelete } from 'react-icons/md'
import toast from 'react-hot-toast'
import { Link } from 'react-router-dom'
import { authContext } from '../AuthContextProvider/AuthContextProvider'

export default function Cart() {
 let{DisplayCards , totalItems  , isloading , totalprice , cartProducts , removeCart , updateCart} = useContext(CartContext)
   let {token} =   useContext(authContext)

  const callingRemoveCart = async (id)=>{
    let result =  await removeCart(id)
    if(result.data){
       toast.success('Successfully removed!');
     }
     else{
      toast.error('This is an error!');

     }
    }

   


  useEffect( ()=>{
    DisplayCards()
  }, [])


  
 
  return <>

  <main className='p-2 md:p-6 bg-[#EEEEEE] dark:bg-black'>
    {isloading? <div className='h-screen flex items-center justify-center'><BeatLoader color='green' /></div>: <>
    
    <div className='flex justify-between'>
     <h1 className='text-2xl'>total Price: <span className='text-green-500'>{ totalprice}</span> </h1>
     <h1 className='text-2xl'>total Items: <span className='text-green-500'>{ totalItems}</span> </h1>
      
    </div>

    {cartProducts?.map((cartProduct , index)=><div key={index} className='my-3 border-b border-gray-400  flex justify-between items-center'>
      <div className='my-3 flex items-center gap-3 '>
           <img src={cartProduct.product.imageCover} className='w-[100px] h-[100px] object-cover' alt="" />
           <div>
            <h3>{cartProduct.product.title}</h3>
           <h3 className='py-2 text-green-500 font-semibold'>{cartProduct.price} EGP</h3>
           <button onClick={()=>callingRemoveCart(cartProduct.product.id)}  className='text-red-900 flex gap-1 cursor-pointer items-center'><span><MdDelete /></span> Remove </button>
           </div>
      </div>
      <div className='my-3'>
         <div className="flex items-center">
  <button onClick={()=> updateCart(cartProduct.product.id , cartProduct.count-1 )}  className="cursor-pointer inline-flex items-center justify-center p-1 me-3 text-sm font-medium h-6 w-6 text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700" type="button">

    <span className="sr-only">Quantity button</span>
    <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 2">
      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M1 1h16" />
    </svg>
  
 
  </button>
  <div>
    <input id="first_product" className="bg-gray-50 w-14 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block px-2.5 py-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder={cartProduct.count} />
  </div>
  <button onClick={()=> updateCart(cartProduct.product.id , cartProduct.count+1  )}  className="cursor-pointer inline-flex items-center justify-center h-6 w-6 p-1 ms-3 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700" type="button">
    
       <span className="sr-only">Quantity button</span>
    <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 1v16M1 9h16" />
    </svg>

  </button>
        </div>

      </div>
    </div> )}
    <Link to="/Payment" className='flex justify-center items-center mt-4'>
    <button className='btn'>Payment</button>
    </Link>
    
    
    </>
    
    
      
      }

  </main>

   


  </>
}
