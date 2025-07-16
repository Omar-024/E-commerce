import React, { useContext, useEffect, useState } from 'react'
import style from './DetailsProducts.module.css'
import axios from 'axios'
import { Link, useParams } from 'react-router-dom'
import { BeatLoader } from 'react-spinners'
import { CartContext } from '../CartContextProvider/CartContextProvider'
import toast from 'react-hot-toast'

export default function  DetailsProducts() {
  let {getCart,  settotalItems , totalItems} = useContext(CartContext)
  let {id , category}=useParams()
  console.log(id , category);
  
    const [product, setProduct] = useState(null)
    const [relatedProduct, setRelatedProduct] = useState(null)
       const [isLoading, setIsloading] = useState(false)

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
    

    const getDetailsProduct = async (id)=>{
       setIsloading(true)
       try {
          let {data} = await axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
      console.log(data.data)
      setProduct(data.data)
       setIsloading(false)
        
       } catch (error) {
         setIsloading(false)
          
       }
    
      
    }

    const getRelatProduct = async()=>{

     let{data} =  await axios.get("https://ecommerce.routemisr.com/api/v1/products")
     console.log(data.data)
     let relateProduct = data.data.filter((product)=> product.category.name == category)
     console.log("relatie",relateProduct )
     setRelatedProduct(relateProduct)


    }

    useEffect( ()=>{
      getDetailsProduct(id)
      getRelatProduct()
    }, [id])

       
       
      


  return <>
  {isLoading? <div className=' h-screen flex justify-center items-center'> <BeatLoader /> </div>:
  <div className='items-center gap-10 grid grid-cols-[1fr_2fr]'>
     <div>
       <img src={product?.imageCover} className='w-full' alt="" />
     </div>
     <div>
      <h4 className='pb-3 leading-6 text-[18px] font-medium'>{product?.title}</h4>
      <h5 className='text-gray-500 pb-3'>{product?.description}</h5>
      <h3>{product?.category.name}</h3>
      <div className='flex justify-between '>
        <span className='text-gray-700'>{product?.price} EGP</span>
         <div className="flex items-center gap-1 ">
          <i className="fa-solid fa-star text-yellow-400"></i>
          <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded-sm dark:bg-blue-200 dark:text-blue-800 ">{product?.ratingsAverage}</span>
        </div>
      </div>
      <button onClick={()=>callGetCart(product.id)} className='cursor-pointer mt-3 py-2 w-full text-center bg-green-600 text-white '>+ Add to cart</button>
     </div>
   </div>}


   <div  className=" pt-5 gap-5 w-full grid lg:grid-cols-5 md:grid-cols-3 sm:grid-cols-2">
  {relatedProduct ?.map( (product)=><div key={relatedProduct.id}  >
    
 <Link to={`/detailsproduct/${product.id}/${product.category.name}`}>
  <div className=" group overflow-hidden  relative bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
    
      <img className="p-8 rounded-t-lg" src={product.imageCover} alt={product.title} />

    <div className="px-5 pb-5">
      
        <h4 className="text-xl font-semibold tracking-tight text-green-700 dark:text-white">{product.category.name}</h4>
        <h5 className={` text-xl font-semibold tracking-tight text-gray-800 dark:text-white `}> {product.title} </h5>
    
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
      <div className="flex items-center justify-between">
      
        <button onClick={()=>callGetCart(product.id)}     className=" text-black translate-y-[200%] group-hover:translate-y-0 text-[16px] border border-green-400 rounded-lg cursor-pointer  hover:bg-green-400 hover:text-white transition-all duration-300 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium  px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">Add to cart</button>
      </div>
    </div>
    {product.priceAfterDiscount? <span className='absolute bg-red-500 text-white p-2 rounded-b-md top-0 left-0 '> sale</span>: ""}
  </div>
 
 </Link>


 
  </div> )}

  </div>
  
  
  
  
  
  
  </>
}
