import React, { useContext, useEffect, useState } from 'react'
import style from './DisplayProducts.module.css'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { BeatLoader } from 'react-spinners'
import { CartContext } from '../CartContextProvider/CartContextProvider'
import toast from 'react-hot-toast'
import { CiHeart } from 'react-icons/ci'
import { WhishlistContext } from '../WishListContextProvider/WishListContextProvider'


export default function DisplayProducts() {
    const [products, setProducts] = useState(null)
    const [isLoading, setIsloading] = useState(false)
    const [isError, setIsError] = useState(false)

 let{getCart ,  settotalItems , totalItems ,  DisplayCards} = useContext(CartContext)
 let{getWhishlist  , remoevWhishlist ,isInwashlist} = useContext(WhishlistContext)

 
   const callGetCart =  async (id)=>{
     let result  =  await getCart(id)
     console.log(result);
     
    
     if(result.data){
      console.log(result.data.numOfCartItems)
       settotalItems(result.data.numOfCartItems)
       toast.success('Successfully added!')
     }
     else{
      toast.error('This is an error!');

     }
     
 } 

  

   const getProducts= async ()=>{
    setIsloading(true)
    try {
      let {data}= await axios.get("https://ecommerce.routemisr.com/api/v1/products")
       console.log(data);
       setProducts(data.data)
       setIsloading(false)
       
      
       
    } catch (error) {
     
      setIsloading(false)
      setIsError("Product not Found")
      
    }

   }  
   useEffect(() => {
     getProducts()
     DisplayCards()
   
    
   }, [])
  //  const [isclamp, setIsclamp] = useState(false)
   
    // const handleClamp = ()=>{
    //      setIsclamp(!isclamp)
        
    //    }

  return <>
  {isError? <div> {isError} </div>: null }
  {isLoading?
   <div className=' h-screen flex justify-center items-center'><BeatLoader color="rgb(51, 255, 128)" /> </div>
   : 
   <div  className=" pt-5 gap-5 w-full grid lg:grid-cols-5 md:grid-cols-3 sm:grid-cols-2">
  {products ?.map( (product)=>{
    let isfavourite = isInwashlist(product.id);
    return(

  <div key={product.id}  >
  
  <div className="mb-4 group overflow-hidden  relative bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
    
     <span onClick={()=>{isfavourite? remoevWhishlist(product.id): getWhishlist(product) }}  className={ `${isfavourite? "text-red-500":""} text-[24px] absolute top-0 right-0 cursor-pointer `} > <CiHeart /> </span>


  <Link  to={`/detailsproduct/${product.id}/${product.category.name}`}>
      <div>
          <img className="p-6  rounded-t-lg" src={product.imageCover} alt={product.title} />
          <div className="px-5 pb-2">
            
              <h4 className="text-xl font-semibold tracking-tight text-green-700 dark:text-white">{product.category.name}</h4>
              <h5  className={` text-[16px] w-[250px] font-semibold tracking-tight text-gray-800 dark:text-white }`}> {product.title.split(" " ,3).join(" ")} </h5>
          
            <div  className="flex items-center justify-between mt-2.5 mb-5">
              {product.priceAfterDiscount?  <div>
                <span className='line-through text-red-500'>{product.price} </span>
                <span>{product.priceAfterDiscount}  EGP</span>
              </div>:<span>{product.price}  EGP</span>}
              
              <div className="flex items-center gap-1 ">
                <i className="fa-solid fa-star text-yellow-400"></i>
                <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded-sm dark:bg-blue-200 dark:text-blue-800 ">{product.ratingsAverage}</span>
              </div>
            
            </div>
          </div>
      </div>
    
    
  </Link>
    
 <div className='px-2'>
  <button  onClick={()=>callGetCart(product.id)} className="text-black mb-2 w-full mx-auto translate-y-[200%] group-hover:translate-y-0 text-[16px] border border-green-400 rounded-lg cursor-pointer  hover:bg-green-400 hover:text-white transition-all duration-300 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium  px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">Add to cart</button>

 </div>
 
     
    
    {product.priceAfterDiscount? <span className='absolute bg-red-500 text-white p-2 rounded-b-md top-0 left-0 '> sale</span>: ""}
  </div>
 



 
  </div> )}

   )
  
  }

  </div> 
  }

 


  
  
  
  
  
  
  </>
}
