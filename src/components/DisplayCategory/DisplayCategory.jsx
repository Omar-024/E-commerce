import React, { useState } from 'react'
import style from './DisplayCategory.module.css'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { BeatLoader } from 'react-spinners'
import { Link } from 'react-router-dom'

export default function DisplayCategory() {
    const getCategory =async ()=>{
   return await axios.get('https://ecommerce.routemisr.com/api/v1/categories')
  }

 let {data , isLoading , error , isError}= useQuery({
    queryKey:["category"] ,
    queryFn: getCategory ,
    select:(data)=>data.data.data
  })
  if(isError)
  {
    return <div className='flex justify-center items-center py-10'> Category Not Defined  </div>
  }
  if(isLoading)
  {
    return <div className='h-screen flex items-center justify-center'><BeatLoader color='green' /></div>
  }



  return <>

  <div className="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 gap-6 my-6 ">
   {data?.map((category)=> <div key={category._id} className=' rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300' >
  <Link to={`/SpeceficCategory/${category._id}`}>

       <div className=' text-center  '>
       <img src={category.image} className='w-full h-[280px] object-cover' alt="" />
       <h3 className='py-4 text-3xl text-green-500'>{category.name}</h3>
     </div>
  
  </Link>
   </div> )}
  </div>
  
  
  
  
  
  
  </>
}
