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
    {categories?.map((category)=><div key={category.id}>
       <img src={category.image} className=' w-full h-[200px] object-cover' alt="" />
    </div>
       
    )}
    </Slider>
  
  
  
  
  
  
  </>
}
