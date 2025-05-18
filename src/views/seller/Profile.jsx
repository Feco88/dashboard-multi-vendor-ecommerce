import React, { useEffect, useState } from 'react';
import { FaRegEdit } from 'react-icons/fa';
import { FaImages } from 'react-icons/fa6';
import { FadeLoader } from 'react-spinners';
import { useDispatch, useSelector} from 'react-redux';
import { profile_image_upload, messageClear, profile_info_add, change_password }
       from '../../store/Reducers/authReducer';
import toast from 'react-hot-toast';
import { PropagateLoader } from 'react-spinners';
import { overrideStyle } from '../../utils/utils';
import { create_stripe_connect_account } from '../../store/Reducers/sellerReducer';

const Profile = () => {

const [state, setState] = useState({
  shopName: '',
  division: '',
  district: '',
  sub_district: ''
})
const dispatch = useDispatch()
const { userInfo,loader,successMessage,errorMessage} = useSelector(state => state.auth);

useEffect(() => {
  if (successMessage) {
    toast.success(successMessage)
    messageClear()
  }
},[successMessage])

const add_image = (e) => {
  if (e.target.files.length > 0) {
    const formData = new FormData()
    formData.append('image',e.target.files[0])
    dispatch(profile_image_upload(formData))
  }
}

const inputHandle = (e) => {
  setState({
    ...state,
    [e.target.name]: e.target.value
  })
}

const add = (e) => {
  e.preventDefault()
  dispatch(profile_info_add(state))
}

/////Jelszó megváltoztatása/////
const [passwordData, setPasswordData] = useState({
  email: "",
  old_password: "",
  new_password: ""
})
/* Jelszó megváltoztatáshoz használt eseménykezelő függvény.
passwordData = bemeneti mezők adatai (email, old_password, new_password),
melyeket elhelyezünk a setPasswordData state-ben */
const pinputHandle = (e) => {
  setPasswordData({
    ...passwordData,
    [e.target.name]: e.target.value
  })
}

const handlePasswordChange = (e) => {
  e.preventDefault()
  dispatch(change_password(passwordData))
}
// sikeres/sikertelen jelszóváltoztatásról üzenet küldése
useEffect(() => {
  if (successMessage) {
    toast.success(successMessage)
    dispatch(messageClear())
  }
  if (errorMessage) {
   toast.error(errorMessage)
   dispatch(messageClear())
  }
},[successMessage,errorMessage,dispatch])

return (
<div className='px-2 lg:px-7 py-5'>
 <div className='w-full flex flex-wrap'>
  <div className='w-full md:w-6/12'>
   <div className='w-full p-4 bg-[#2f6ac2] rounded-md text-[#d0d2d6]'>
    <div className='flex justify-center items-center py-3'>
     {
      userInfo?.image ? <label htmlFor="img" className='h-[350px] w-[350px]
       relative p-0 cursor-pointer overflow-hidden object-contain'>
        <img src={userInfo.image} alt="" />
        {
         loader && <div className='bg-slate-600 absolute left-0
         top-0 w-full h-full opacity-70 flex justify-center items-center z-20'>
          <span>
            <FadeLoader />
          </span>
         </div>
        }
        </label> : <label className='flex justify-center items-center
         flex-col h-[150px] w-[200px] cursor-pointer border border-dashed
         hover:border-red-500 border-[#d0d2d6] relative' htmlFor="img">
          <span><FaImages /></span>
          <span>Profilkép kiválasztása</span>
        {
         loader && <div className='bg-slate-600 absolute left-0
          top-0 w-full h-full opacity-70 flex justify-center items-center z-20'>
          <span>
            <FadeLoader />
          </span>
         </div>
        }
        </label>
     }
   <input onChange={add_image} type="file" className='hidden' id='img'/>
  </div>
{/*Alapadatok és szerkesztés rész*/}
  <div className='px-0 md:px-5 py-2'>
   <div className='flex justify-between text-sm flex-col gap-2 p-4
   bg-slate-800 rounded-md relative'>
     <span className='p-[6px] bg-yellow-500 rounded hover:shadow-lg
     hover:shadow-yellow-500/50 absolute right-2 top-2 cursor-pointer'>
      <FaRegEdit />
     </span>
     <div className='flex gap-2'>
      <span className='text-white text-base font-bold'>Eladó neve: </span>
      <span className='text-base'>{userInfo.name}</span>
     </div>
     <div className='flex gap-2'>
      <span className='text-white text-base font-bold'>E-mail cím: </span>
      <span className='text-base'>{userInfo.email}</span>
     </div>
     <div className='flex gap-2'>
      <span className='text-white text-base font-bold'>Szerepkör: </span>
      <span className='text-base'>{userInfo.role}</span>
     </div>
     <div className='flex gap-2'>
      <span className='text-white text-base font-bold'>Állapot: </span>
      <span className='text-base'>{userInfo.status}</span>
     </div>
     <div className='flex gap-2'>
      <span className='text-white text-base font-bold'>Fizetési fiók: </span>
      <p className='text-base'>
      {
       userInfo.payment === 'active' ? <span className='bg-red-500 text-white
       text-sm cursor-pointer font-normal ml-2 px-2 py-0.5 rounded'>
       {userInfo.payment}</span> : <span onClick={()=> dispatch(create_stripe_connect_account())}
       className='bg-blue-500 text-white
       text-sm cursor-pointer font-normal ml-2 px-2 py-0.5 rounded'>
       Kattints az aktiváláshoz</span>
      }
     </p>
     </div>
   </div>
  </div>
{/*Szerkesztés rész*/}
  <div className='px-0 md:px-5 py-2'>
     {
 // Ha létezik boltinformáció, akkor jelenjen meg,
 // ha nem létezik boltinformáció, akkor beviteli mezők jelennek meg
    !userInfo?.shopInfo ? <form onSubmit={add}>
     <div className='flex flex-col w-full gap-1 mb-2'>
      <label htmlFor="Shop">Bolt neve</label>
       <input value={state.shopName} onChange={inputHandle} className='px-4 py-2 focus:border-blue-200
       outline-none bg-[#283046] border border-slate-700 rounded-md
       text-[#d0d2d6]' type="text" name='shopName' id='Shop' placeholder=''/>
      </div>
      <div className='flex flex-col w-full gap-1 mb-2'>
        <label htmlFor="division">Vármegye</label>
         <input  value={state.division} onChange={inputHandle} className='px-4 py-2 focus:border-blue-200
         outline-none bg-[#283046] border border-slate-700 rounded-md
         text-[#d0d2d6]' type="text" name='division' id='division' placeholder=''/>
      </div>
      <div className='flex flex-col w-full gap-1 mb-2'>
        <label htmlFor="district">Település</label>
         <input value={state.district} onChange={inputHandle} className='px-4 py-2 focus:border-blue-200
         outline-none bg-[#283046] border border-slate-700 rounded-md
         text-[#d0d2d6]' type="text" name='district' id='district' placeholder=''/>
        </div>
      <div className='flex flex-col w-full gap-1 mb-2'>
        <label htmlFor="sub">Településrész</label>
         <input value={state.sub_district} onChange={inputHandle} className='px-4 py-2 focus:border-blue-200 outline-none
         bg-[#283046] border border-slate-700 rounded-md text-[#d0d2d6]'
         type="text" name='sub_district' id='sub' placeholder=''/>
      </div>
      <button disabled={loader ? true : false}
       className='bg-red-500 w-[220px]
       hover:shadow-red-300/50 hover:shadow-lg
       text-white rounded-md px-7 py-2 mb-3'>
      {
       loader ? <PropagateLoader color='#fff' cssOverride={overrideStyle}/> :
       'Változtatások mentése'
      }
      </button>
       </form> : 
     <div className='flex justify-between text-sm flex-col gap-2 p-4
     bg-slate-800 rounded-md relative'>
       <span className='p-[6px] bg-yellow-500 rounded hover:shadow-lg
       hover:shadow-yellow-500/50 absolute right-2 top-2 cursor-pointer'>
        <FaRegEdit />
       </span>
       <div className='flex gap-2'>
        <span className='text-white text-base font-bold'>Bolt neve: </span>
        <span className='text-base'>{ userInfo.shopInfo?.shopName }</span>
       </div>
       <div className='flex gap-2'>
        <span className='text-white text-base font-bold'>Vármegye: </span>
        <span className='text-base'>{ userInfo.shopInfo?.division }</span>
       </div>
       <div className='flex gap-2'>
        <span className='text-white text-base font-bold'>Település: </span>
        <span className='text-base'>{ userInfo.shopInfo?.district }</span>
       </div>
       <div className='flex gap-2'>
        <span className='text-white text-base font-bold'>Településrész: </span>
        <span className='text-base'>{ userInfo.shopInfo?.sub_district }</span>
       </div>
     </div>
        }
    </div>
            </div>
           </div>
{/*Jelszó megváltoztatása rész*/}
<div className='w-full md:w-6/12'>
 <div className='w-full pl-0 md:pl-7 mt-6 md:mt-0'>
   <div className='bg-[#2f6ac2] rounded-md text-[#d0d2d6] p-4'>
    <h1 className='text-[#d0d2d6] text-lg mb-3 font-semibold'>
    Jelszó megváltoztatása</h1>
  <form onSubmit={handlePasswordChange}>
    <div className='flex flex-col w-full gap-1 mb-2'>
      <label htmlFor="email">Email</label>
        <input className='px-4 py-2 focus:border-blue-200 outline-none
        bg-[#283046] border border-slate-700 rounded-md text-[#d0d2d6]'
        type="email" name='email' id='email' value={passwordData.email}
        onChange={pinputHandle} placeholder='Email'/>
    </div>
    <div className='flex flex-col w-full gap-1 mb-2'>
      <label htmlFor="o_password">Régi jelszó</label>
        <input className='px-4 py-2 focus:border-blue-200 outline-none
        bg-[#283046] border border-slate-700 rounded-md text-[#d0d2d6]'
         type="password" name='old_password' id='o_password'
         value={passwordData.old_password} onChange={pinputHandle}
         placeholder='Régi jelszó'/>
    </div>
    <div className='flex flex-col w-full gap-1 mb-2'>
      <label htmlFor="n_password">Új jelszó</label>
       <input className='px-4 py-2 focus:border-blue-200 outline-none
        bg-[#283046] border border-slate-700 rounded-md text-[#d0d2d6]'
        type="password" name='new_password' id='n_password'
        value={passwordData.new_password} onChange={pinputHandle} placeholder='Új jelszó'/>
    </div>
   <button disabled={loader} className='bg-red-500 hover:shadow-red-500/40
    hover:shadow-md text-white rounded-md px-7 py-2
    my-2'>
     {loader ? "Betöltés..." : "Változtatások mentése"}
   </button>
  </form>
     </div>
    </div>
</div>
         </div>
        </div>
    );
};
export default Profile;
