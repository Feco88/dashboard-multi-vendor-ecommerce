import React, { useEffect, useState } from 'react';
import { FaRegImage } from 'react-icons/fa';
import { PropagateLoader } from 'react-spinners';
import { overrideStyle } from '../../utils/utils';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { add_banner,get_banner,messageClear, update_banner } from '../../store/Reducers/bannerReducer';
import toast from 'react-hot-toast';

const AddBanner = () => {
  
  const {productId} = useParams()
  const dispatch = useDispatch()
  const {loader,successMessage,errorMessage,banner} = useSelector(state => state.banner)

  const [imageShow, setImageShow] = useState('')
  const [image, setImage] = useState('')

  //banner feltöltéséhez üzenetek kiiratása
  useEffect(() => {
   if (successMessage) {
     toast.success(successMessage)
     dispatch(messageClear())
   }
   if (errorMessage) {
     toast.error(errorMessage)
     dispatch(messageClear())
   }
  },[successMessage,errorMessage])

  //banner képek feltöltése
  const imageHandle = (e) => {
    const files = e.target.files
    const length = files.length
    if (length > 0) {
      setImage(files[0])
      setImageShow(URL.createObjectURL(files[0]))
    }
  }

  //banner hozzáadása
  const add = (e) => {
    e.preventDefault()
    const formData = new FormData()
  //termékazonosítót hozzáfűzzük az űrlapadatokhoz
    formData.append('productId',productId)
  //a feltöltött képet átadjuk az űrlapadatokhoz
    formData.append('mainban',image)
    dispatch(add_banner(formData))
  }

  //banner cseréje
  const update = (e) => {
    e.preventDefault()
    const formData = new FormData()
    formData.append('mainban',image)
    dispatch(update_banner({info:formData, bannerId: banner._id}))
  }

  //feltöltött banner megjelenítése
  useEffect(() => {
    dispatch(get_banner(productId))
  },[productId])

 return (
 <div className='px-2 lg:px-7 pt-5'>
   <h1 className='text-[#000] font-semibold text-lg mb-3'>
    Hirdetés hozzáadása
   </h1>
  <div className='w-full p-4 bg-[#2f6ac2] rounded-md'>
   {
   !banner && <div>
    <form onSubmit={add}>
     <div className='mb-4'>
     <label className='flex justify-center items-center flex-col
     h-[180px] cursor-pointer border border-dashed hover:border-red-500
     w-full text-white' htmlFor='image'>
      <span className='text-4xl'><FaRegImage/></span>
      <span>Kép kiválasztása</span>
     </label>
      <input required onChange={imageHandle} className='hidden' type="file" id='image'/>
     </div>
     {
      imageShow && <div className='mb-4'>
        <img className='w-full h-[300px]' src={imageShow} alt="" />
      </div>
     }
     <button disabled={loader ? true : false}
      className='bg-red-500 w-[280px]
       hover:shadow-red-300/50 hover:shadow-lg
       text-white rounded-md px-7 py-2 mb-3'>
        {
         loader ? <PropagateLoader color='#fff' cssOverride={overrideStyle}/> :
         'Hirdetés hozzáadása'
        }
     </button>
    </form>
    </div>
    }
    {
     banner && <div>
      {
       <div className='mb-4'>
        <img className='w-full h-[300px]' src={banner.banner} alt="" />
       </div>
      }
    <form onSubmit={update}>
     <div className='mb-4'>
      <label className='flex justify-center items-center flex-col
      h-[180px] cursor-pointer border border-dashed hover:border-red-500
      w-full text-white' htmlFor='image'>
       <span className='text-4xl'><FaRegImage/></span>
       <span>Kép kiválasztása</span>
      </label>
      <input required onChange={imageHandle} className='hidden' type="file" id='image'/>
     </div>
    {
     imageShow && <div className='mb-4'>
      <img className='w-full h-[300px]' src={imageShow} alt="" />
     </div>
    }
     <button disabled={loader ? true : false}
     className='bg-red-500 w-[280px]
     hover:shadow-red-300/50 hover:shadow-lg
     text-white rounded-md px-7 py-2 mb-3'>
      {
       loader ? <PropagateLoader color='#fff' cssOverride={overrideStyle}/> :
       'Kép módosítása'
      }
     </button>
    </form>
    </div>
    }
   </div>
  </div>
 );
};
export default AddBanner;