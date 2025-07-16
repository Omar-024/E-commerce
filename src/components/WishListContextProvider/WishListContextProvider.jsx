import React, { createContext, useContext, useEffect, useState } from 'react'
import style from './WishListContextProvider.module.css'
import axios from 'axios'
import { authContext } from '../AuthContextProvider/AuthContextProvider'
import WhishList from '../WhishList/WhishList'

export let WhishlistContext = createContext()

export default function WishListContextProvider({children}) {

 const [count, setCount] = useState(0)
  const [totalprice, settotalprice] = useState(0)
  const [WhishlistProducts, setWhishlistProducts] = useState([])
  const [isloading, setisloading] = useState(false)
 
 
  let {token}  = useContext(authContext)
  console.log(token);
  

const getWhishlist = async (product)=>{
     axios.post(`https://ecommerce.routemisr.com/api/v1/wishlist `, { productId:product.id } ,
    {
      headers:{
         token: token
      }
    }
   ).then((res)=>{
    console.log(res);
    setWhishlistProducts([...WhishlistProducts , product])
    
      
   }).catch((error)=>{
    console.log(error)
   })

}

const DisplayWhishlist = ()=>{
  setisloading(true)

  axios.get("https://ecommerce.routemisr.com/api/v1/wishlist" , 
    {
      headers:{
        token
      }
    }
  ).then(({data})=>{
         
      setWhishlistProducts(data?.data || [])
       
  }).catch((error)=>{
     console.log(error);
     
  }).finally(()=>{
    setisloading(false)
  })
}
useEffect( ()=>{
 
    DisplayWhishlist()
  }, [])

  
const remoevWhishlist = async (id)=>{
    return axios.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${id}` , 
    {
      headers:{
        token
      }
    }
   ).then(({data})=>{
   
    console.log(data);
     
   let filterproduct =   WhishlistProducts?.filter((item)=> item.id!=id)
   setWhishlistProducts(filterproduct)
  

   }).catch((error)=>{
     return error

   })
}
const isInwashlist = (productid)=>  WhishlistProducts?.some((item)=> item.id == productid )




 


  

  return < WhishlistContext.Provider  value={{getWhishlist  , DisplayWhishlist, setWhishlistProducts , remoevWhishlist , isInwashlist ,  isloading , WhishlistProducts , totalprice , count , setCount }}>
  
  {children}

  
  </ WhishlistContext.Provider>
  }
