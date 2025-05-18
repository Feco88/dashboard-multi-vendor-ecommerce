import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { get_seller, seller_status_update, messageClear } from 
'../../store/Reducers/sellerReducer';
import toast from 'react-hot-toast';

const SellerDetails = () => {
    const dispatch = useDispatch()
    const {seller, successMessage} = useSelector(state=> state.seller)
    const {sellerId} = useParams()
   
    useEffect(()=>{
      dispatch(get_seller(sellerId))
    },[sellerId])

    const [status,setStatus] = useState('')
    const submit = (e) => {
        e.preventDefault()
        dispatch(seller_status_update({
            sellerId,
            status
        }))
    }

    useEffect(()=> {
        if (successMessage) {
            toast.success(successMessage)
            dispatch(messageClear())
        }
    },[successMessage])

    useEffect(()=>{
        if (seller) {
            setStatus(seller.status)
        }
    },[seller])

    return (
        <div className='px-2 lg:px-7 pt-5'>
         <h1 className='text-[20px] font-bold mb-3'>Eladó részletes adatai</h1>
         <div className='w-full p-4 bg-[#2f6ac2] rounded-md'>
            <div className='w-full flex flex-wrap text-[#d0d2d6] justify-center items-center'>
{/*Profilkép*/}
        <div className='w-3/12 justify-center items-center py-3'>
            <div>
            {
                seller?.image ? <img className='w-[350px] h-[350px] object-contain
                 relative p-3 overflow-hidden'
                src={seller.image} /> :
                <span className='font-bold'>Nincs feltöltött profilkép</span>
            }
            </div>
        </div>
{/*Alapinformációk*/}
                <div className='w-4/12 justify-center items-center py-3'>
                    <div className='px-1 md:px-5 py-2'>
                        <div className='py-2 text-lg'>
                            <h2>Alapinformációk</h2>
                        </div>
                        <div className='flex justify-between text-sm flex-col
                        gap-2 p-4 bg-[#3796e1] rounded-md'>
                            <div className='flex gap-2 font-bold text-[#000]'>
                                <span>Név: </span>
                                <span>{ seller ?.name}</span>
                            </div>
                            <div className='flex gap-2 font-bold text-[#000]'>
                                <span>Email: </span>
                                <span>{ seller ?.email}</span>
                            </div>
                            <div className='flex gap-2 font-bold text-[#000]'>
                                <span>Szerepkör: </span>
                                <span>{ seller ?.role}</span>
                            </div>
                            <div className='flex gap-2 font-bold text-[#000]'>
                                <span>Állapota: </span>
                                <span>{ seller ?.status}</span>
                            </div>
                            <div className='flex gap-2 font-bold text-[#000]'>
                                <span>Fizetés állapota: </span>
                                <span>{ seller ?.payment}</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='w-4/12 justify-center items-center py-3'>
                    <div className='px-0 md:px-5 py-2'>
                        <div className='py-2 text-lg'>
                            <h2>Bolt címe</h2>
                        </div>
                        <div className='flex justify-between text-sm flex-col
                        gap-2 p-4 bg-[#3796e1] rounded-md'>
                            <div className='flex gap-2 font-bold text-[#000]'>
                                <span>Bolt neve: </span>
                                <span>{seller?.shopInfo?.shopName}</span>
                            </div>
                            <div className='flex gap-2 font-bold text-[#000]'>
                                <span>Vármegye: </span>
                                <span>{seller?.shopInfo?.division}</span>
                            </div>
                            <div className='flex gap-2 font-bold text-[#000]'>
                                <span>Település: </span>
                                <span>{seller?.shopInfo?.district}</span>
                            </div>
                            <div className='flex gap-2 font-bold text-[#000]'>
                                <span>Településrész: </span>
                                <span>{seller?.shopInfo?.sub_district}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
{/*Választólista és gomb hozzáadása az eladó részletes adataihoz*/}
            <div>
             <form onSubmit={submit}>
                <div className='flex gap-4 py-3'>
                    <select value={status} onChange={(e)=>setStatus(e.target.value)}
                    className='px-4 py-2 focus:border-blue-500
                    outline-none bg-[#2f6ac2] border border-slate-700
                    rounded-md text-[#d0d2d6]' name="" id="" required>
                        <option value="">--Állapot kiválasztása--</option>
                        <option value="active">Aktiválás</option>
                        <option value="deactive">Letiltás</option>
                    </select>
                    <button className='bg-red-500 w-[210px]
                    hover:shadow-red-500/40 hover:shadow-md
                    text-white rounded-md px-7 py-2'>
                    Állapot mentése</button>
                </div>
             </form>
            </div>
         </div>
        </div>
    );
};
export default SellerDetails;