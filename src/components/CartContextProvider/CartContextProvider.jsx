import React, { createContext, useContext, useEffect, useState } from 'react'
import style from './CartContextProvider.module.css'
import axios from 'axios'
import { authContext } from '../AuthContextProvider/AuthContextProvider'

 export let CartContext = createContext()

export default function CartContextProvider({children}) {
  const [totalItems, settotalItems] = useState(0)
  const [totalprice, settotalprice] = useState(0)
  const [cartProducts, setcartProducts] = useState(null)
  const [isloading, setisloading] = useState(false)
  const [cartid, setcartid] = useState(null)
 

  let {token}  = useContext(authContext)
  console.log(token);
  

const getCart = async (productId)=>{
      return   axios.post(`https://ecommerce.routemisr.com/api/v1/cart `, { productId } ,
    {
      headers:{
         token: token
      }
    }
   ).then((res)=>{
    console.log(res);
    
     settotalItems(res.data.numOfCartItems)
  
 
     return res
   }).catch((error)=>{
    return error
   })

}





const DisplayCards = ()=>{
  setisloading(true)

  axios.get("https://ecommerce.routemisr.com/api/v1/cart" , 
    {
      headers:{
        token
      }
    }
  ).then(({data})=>{
       console.log(data.numOfCartItems);
       console.log(data);
       settotalItems(data.numOfCartItems)
       settotalprice(data.data.totalCartPrice)
       setcartProducts(data.data.products)
       console.log(data.data.products);
       setcartid(data.cartId)
       
       
  }).catch((error)=>{
     console.log(error);
     
  }).finally(()=>{
    setisloading(false)
  })
}

  
const removeCart = async (id)=>{
    return axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${id}` , 
    {
      headers:{
        token
      }
    }
   ).then(({data})=>{
     settotalItems(data.numOfCartItems)
     settotalprice(data.data.totalCartPrice)
     setcartProducts(data.data.products)
    console.log(data);
    return data
    

   }).catch((error)=>{
     return error

   })
}
const updateCart = (id , count )=>{
  setisloading(true)
   
  axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${id}` , {count} , 
    {
      headers:{
        token
      }
    }
  ).then(({data})=>{
    console.log(data);
   
     settotalItems(data.numOfCartItems)
     settotalprice(data.data.totalCartPrice)
     setcartProducts(data.data.products)
  
  }).catch((error)=>{
    console.log(error);
    
  }).finally(()=>{
    setisloading(false)

  })
}

useEffect( ()=>{
 
     DisplayCards()
  }, [])


  

  return <CartContext.Provider  value={{getCart , DisplayCards , settotalItems ,totalItems , isloading , totalprice , cartProducts , removeCart , updateCart , cartid}}>
  
  {children}

  
  </CartContext.Provider>
  }

