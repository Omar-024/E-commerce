import React, { useEffect, useState } from 'react'
import style from './SpeceficCategory.module.css'
import axios from 'axios'
import { data, useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { useContext } from 'react'
import { CartContext } from '../CartContextProvider/CartContextProvider'
import { BeatLoader } from 'react-spinners'

export default function SpeceficCategory() {

  let{id} =   useParams()

  


    const [isLoading, setisLoading] = useState(false)
    const [category, setCategory] = useState({})
    const [categoriesArr, setcategoriesArr] = useState(null)

    const speceficCategory = (id)=>{
      setisLoading(true)
      axios.get(`https://ecommerce.routemisr.com/api/v1/categories/${id}`)
    .then(({data})=>{
      console.log(data.data);
       setCategory(data.data)
      
    }).catch((error)=>{
      console.log(error)
    }).finally(()=>{
      setisLoading(false)
    })
      
    }
    const subCategory = (categoryid)=>{
      axios.get(`https://ecommerce.routemisr.com/api/v1/categories/${categoryid}/subcategories`).
      then(({data})=>{
        console.log(data)
        setcategoriesArr(data.data)
      }).catch((error)=>{
        console.log(error)
      })
    }






    useEffect(  ()=>{
      speceficCategory(id)
      subCategory(id)
    } ,[] )

  return <>
  {isLoading? <div className='h-screen flex items-center justify-center'><BeatLoader color='green' /></div>: 
    
    <div className=" grid lg:grid-cols-[1fr_2fr]  gap-12 items-center ">
    {/* specefic category */}
  <div className=' my-4 text-center '>
    <img src={category?.image} className='w-full rounded-2xl' alt="" />
    <h3 className='text-3xl text-green-400 py-3'>{category?.name}</h3>
  </div>
  {/* related category */}
    <div className='text-center '>
      <h2 className='text-3xl font-bold text-green-400 mb-4'>{category?.name} SubCategories </h2>
      <div  className='grid lg:grid-cols-3 gap-5 overflow-hidden   '>
      {categoriesArr?.map((cat)=> <div key={cat._id } className='  bg-green-400 p-7 text-center hover:shadow-2xl hover:scale-110 duration-300 transition-all cursor-pointer '>  
        
        
          <h2 className='text-2xl text-white'>{cat?.name}</h2>
        
        
          </div>)}

      </div>

    </div>
  
 

  </div>
  
  }



  
  
  
  
  
  </>
}
