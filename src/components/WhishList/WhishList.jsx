import React, { useContext, useEffect, useState } from 'react'
import style from './WhishList.module.css'
import { WhishlistContext } from '../WishListContextProvider/WishListContextProvider'
import { MdDelete } from 'react-icons/md'
import toast from 'react-hot-toast'
import { BeatLoader } from 'react-spinners'
import { CartContext } from '../CartContextProvider/CartContextProvider'

export default function WhishList() {
   let {getCart,  settotalItems , totalItems} = useContext(CartContext)

   let{ DisplayWhishlist ,  setWhishlistProducts , remoevWhishlist,  isloading , WhishlistProducts , totalprice , count}  = useContext(WhishlistContext)

        const callingRemovewishlist = async (id)=>{
    let result =  await  remoevWhishlist(id)
    console.log(result.data);
    setWhishlistProducts(result.data)
    
    
    if(result){
       toast.success('Successfully removed!');
     }
     else{
      toast.error('This is an error!');

     }
    }

   const callGetCart =  async (id)=>{
     let result  =  await getCart(id)
     console.log(result);
     if(result.data){
      settotalItems(result.data.numOfCartItems)
      toast.success('Successfully added!');
     }
     else{
      toast.error('This is an error!');

     }
     
 } 
   
     useEffect( ()=>{
       DisplayWhishlist()
      
     }, [])

     if(isloading)
     {
      return  <div className='h-screen flex justify-center items-center'><BeatLoader color="rgb(51, 255, 128)" /></div>
     }
     if(WhishlistProducts?.length==0)
     {
      return <p className='font-bold text-2xl text-red-500 py-20'> whishlist  not found</p>
     }
   
  return <> 
  <main  className='p-2 md:p-6 bg-[#EEEEEE] dark:bg-black'>
  
   {WhishlistProducts?.map((product)=><div key={product.id} className='my-3 border-b border-gray-400  flex justify-between items-center'>
           <div className='my-3 flex items-center gap-3 '>
              
                 <img src={product.imageCover} className='w-[100px] h-[100px] object-cover' alt="" />
                <div>
                 <h3>{product.title}</h3>
                <h3 className='py-2 text-green-500 font-semibold'>{product.price} EGP</h3>
                <button onClick={()=>callingRemovewishlist(product.id)}  className='text-red-900 flex gap-1 cursor-pointer items-center'><span><MdDelete /></span> Remove </button>
                </div>
           </div>
           <div className='my-3'>
             <button onClick={()=>callGetCart(product.id)}   className='bg-green-500 text-white border-none rounded px-4 md:px-8 min-w-[150px] py-3 cursor-pointer hover:bg-green-500/80 duration-200 transition-all'>Add To Cart</button>
     
           </div>

   </div>)}

  </main>
  
  
  
  
  
  
  </>
}
