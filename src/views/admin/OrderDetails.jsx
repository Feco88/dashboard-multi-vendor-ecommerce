import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { admin_order_status_update, get_admin_order, messageClear } from '../../store/Reducers/orderReducer';
import toast from 'react-hot-toast';

const OrderDetails = () => {
//rendelés-azonosító lekérése a useParams()-szel
 const { orderId } = useParams()
//dispatch() függvény meghívása
 const dispatch = useDispatch()
//státusz (állapotok) beállítása useState()-tel
 const [status, setStatus] = useState('')
//metódus meghívása useEffect()-el, és dispatch()-el
 useEffect(() => {
    dispatch(get_admin_order(orderId))
 },[orderId])

//order meghívása a state.order Redux-ból useSelector()-al
 const { order,errorMessage,successMessage } = useSelector(state => state.order)
//állapot eseménykezelése
const status_update = (e) => {
 dispatch(admin_order_status_update({orderId,info: {status: e.target.value}}))
 setStatus(e.target.value)
}
//adott rendeléshez tartozó állapot kiíratása
useEffect(() => {
    setStatus(order?.delivery_status)
 },[order])
 
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
         <h2 className='pb-2 font-semibold'>Vásárló: {order.shippingInfo?.name}</h2>
          <p><span className='text-sm'>
           {order.shippingInfo?.province}<br/>
           {order.shippingInfo?.city}-{order.shippingInfo?.area}<br/>
           {order.shippingInfo?.address}<br/><br/>
           </span>
          </p>
        </div>
    <div className='flex justify-start items-center gap-3'>
      <h2>Fizetés állapota: </h2>
      <span className='text-base'>{order.payment_status}</span>
    </div>
    <span>Ár: {order.price},- Ft</span>
    <div className='mt-4 flex flex-col gap-4 bg-[#4789d4] rounded-md'>
      <div className='text-[#d0d2d6]'>
      {
        order.products && order.products.map((p,i) => 
       <div key={i} className='flex gap-3 text-md'>
         <img className='w-[75px] h-[75px] object-contain'
          src={p.images[0]} />
        <div>
         <h2>{p.name}</h2>
         <p>
          <span>Gyártó: </span>
          <span>{p.brand}</span>
          <span className='text-lg'><br/>Mennyiség: {p.quantity} </span>
         </p>
        </div>
       </div>
        )
      }
     </div>
    </div>
   </div>
  </div>
    <div className='w-[70%]'>
     <div className='pl-3'>
      <div className='mt-4 flex flex-col bg-[#4789d4] rounded-md p-4'>
      {
        order?.suborder?.map((o,i) => <div key={i + 20}
        className='text-[#d0d2d6] mt-2'>
        <div className='flex justify-start items-center gap-3'>
          <h2> Rendelések állapota a(z) {i + 1}. eladótól: </h2>
          <span>{o.delivery_status}</span>
        </div>
     {/*Termékek adatainak megjelenítése*/}
        {
            o.products?.map((p,i)=> <div className='flex gap-3 text-md mt-2'>
            <img className='w-[95px] h-[95px] object-contain'
             src={p.images[0]} />
              <div>
                 <h2>{p.name}</h2>
                 <p>
                  <span>Gyártó: </span>
                  <span>{p.brand}</span><br/>
                  <span className='text-lg'>Mennyiség: {p.quantity} </span>
                 </p>
              </div>
         </div>)
        }
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
    );
};

export default OrderDetails;
