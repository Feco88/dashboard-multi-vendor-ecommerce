import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { get_seller_order, messageClear, seller_order_status_update } from '../../store/Reducers/orderReducer';
import toast from 'react-hot-toast';

const OrderDetails = () => {
//rendelés-azonosító lekérése a useParams()-szel
const { orderId } = useParams()
//dispatch() függvény meghívása
const dispatch = useDispatch()
//státusz (állapotok) beállítása useState()-tel
 const [status, setStatus] = useState('')
//order meghívása a state.order Redux-ból useSelector()-al
const { order,errorMessage,successMessage } = useSelector(state => state.order)

//adott rendeléshez tartozó állapot kiíratása
useEffect(() => {
    setStatus(order?.delivery_status)
 },[order])
//metódus meghívása useEffect()-el, és dispatch()-el
useEffect(() => {
   dispatch(get_seller_order(orderId))
},[orderId])

//állapot eseménykezelése
const status_update = (e) => {
 dispatch(seller_order_status_update({orderId,info: {status: e.target.value}}))
 setStatus(e.target.value)
}
 
useEffect(()=> {
    if (successMessage) {
      toast.success(successMessage)
      dispatch(messageClear())
    }
    if (errorMessage) {
      toast.error(errorMessage)
      dispatch(messageClear())
    }
  },[successMessage,errorMessage])

return (
 <div className='px-2 lg:px-7 pt-5'>
  <div className='w-full p-4 bg-[#2f6ac2] rounded-md'>
     <div className='flex justify-between items-center p-4'>
        <h2 className='text-xl text-[#d0d2d6]'>Rendelés részletei</h2>
        <select onChange={status_update} value={status}
         name="" id="" className='px-4 py-2 focus:border-blue-500
         outline-none bg-[#475569] border border-slate-700 rounded-md
        text-[#d0d2d6]'>
         <option value="függőben">Függőben</option>
         <option value="feldolgozás alatt">Feldolgozás alatt</option>
         <option value="raktáron">Raktáron</option>
         <option value="kiszállítva">Kiszállítva</option>
         <option value="törölve">Törölve</option>
        </select>
     </div>
    <div className='p-4'>
    <div className='flex gap-2 text-xl font-bold text-slate-200'>
     <h2>#{order._id}. számú rendelés,</h2>
     <span className='text-neutral-300'>{order.date}</span>
    </div>
     <div className='flex flex-wrap'>
        <div className='w-[30%]'>
            <div className='pr-3 text-[#d0d2d6] text-lg'>
                <div className='flex flex-col gap-1'>
                    <h2 className='pb-2 font-semibold'>
                    Szállítás helye : {order.shippingInfo}
                    </h2>
                </div>
            <div className='flex justify-start items-center gap-3'>
                <h2>Fizetés állapota: </h2>
                <span className='text-base'>{order.payment_status}</span>
            </div>
            <span>Ár: {order.price},- Ft</span>
  <div className='mt-4 flex flex-col gap-4 bg-[#4789d4] rounded-md'>
  <div className='text-[#d0d2d6]'>
   {
    order?.products?.map((p,i) => <div key={i} 
    className='flex gap-3 text-md'>
    <img className='w-[50px] h-[50px]' src={p.images[0]} />
    <div>
     <h2>{p.name}</h2>
     <p>
      <span>Gyártó: {p.brand}</span><br/>
      <span className='text-lg'>Mennyiség: {p.quantity} </span>
     </p>
    </div>
   </div>
   )
  }
       </div>
      </div>
     </div>
    </div>
   </div>
  </div>
 </div>
</div>
 );
};

export default OrderDetails;
