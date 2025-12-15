import React, { useEffect, useState } from 'react'
import style from './CategorySlider.module.css'
import Slider from 'react-slick';
import axios from 'axios';

export default function CategorySlider() {
  const [categories, setCategories] = useState(null)
   var settings = {
    dots: true,
    infinite: true,
    speed: 1000,
     autoplay: true,
     autoplaySpeed: 2000,
    cssEase: "linear" ,

    slidesToShow: 7,
    slidesToScroll: 2,
  };
  const getCategory = async ()=>{
    let {data}=await axios.get("https://ecommerce.routemisr.com/api/v1/categories")
    console.log(data.data);
    setCategories(data.data)

  }
  useEffect( ()=>{
    getCategory()
  }, [])

  return <>

       
      <Slider {...settings} className='my-12 overflow-hidden'>
    {categories?.map((category)=><div key={category.id} className='px-2'>
       <img src={category.image} className=' w-full h-[150px] object-cover rounded-lg' alt="" />
       <h3 className='text-center mt-2 text-lg font-medium'>{category.name}</h3>
    </div>  
       )}

      {/* <Slider {...settings} className='my-12 overflow-hidden'>
    {categories?.map((category)=><div key={category.id}>
       <img src={category.image} className=' w-full h-[200px] object-cover' alt="" />
    </div>
       
    )}
    </Slider> */} 
      </Slider>

          



  
  
  
  
  
  
  </>
}
