import React, { forwardRef, useEffect, useState } from 'react';
import { TbCurrencyForint } from "react-icons/tb";
import { useDispatch, useSelector } from 'react-redux';
import { FixedSizeList as List } from 'react-window';
import { get_seller_payment_details,
         messageClear,
         send_withdrawal_request } from '../../store/Reducers/paymentReducer';
import toast from 'react-hot-toast';
import moment from 'moment/moment';
//moment függvény megváltoztatása
import 'moment/locale/hu';

{/*React-window alapértelmezett függvényei */}
function handleOnWheel({ deltaY }) {
    console.log('handleOnWheel', deltaY)
}

const outerElementType = forwardRef((props, ref) => (
    <div ref={ref} onWheel={handleOnWheel} {...props} />
))

const Payments = () => {
 const dispatch = useDispatch()
 //Hozzáférés az eladói ID-hoz az auth Reducer-en keresztül
 const {userInfo} = useSelector(state => state.auth)
 //Adatok betöltése a kiiratáshoz a 'paymentReducer.js'-ből
 const {successMessage,errorMessage,loader,
        pendingWithdraws,successWithdraws,
        totalAmount,withdrawAmount, pendingAmount,
        availableAmount} = useSelector(state => state.payment)
//kifizetési kérések Admin részére
 const [amount,setAmount] = useState(0)
//elérhető összeget hasonlítja a kérelmezett mennyiséghez
 const sendRequest = (e) => {
    e.preventDefault()
    if (availableAmount - amount > 10) {
        dispatch(send_withdrawal_request({ amount,sellerId: userInfo._id }))
        setAmount(0)
    } else {
        toast.error('Nincs elegendő fedezet a számládon!')
    }
 }
 //függőben lévő kérések táblázat
 const Row = ({ index, style }) => {
  return (
   <div style={style} className='flex text-sm text-white font-medium'>
   <div className='w-[25%] p-2 whitespace-nowrap'>{index + 1}</div>
   <div className='w-[25%] p-2 whitespace-nowrap'>{pendingWithdraws[index]?.amount},- Ft</div>
   <div className='w-[25%] p-2 whitespace-nowrap'>
    <span className='py-[1px] px-[5px] bg-slate-300
     text-blue-500 rounded-md text-sm'>{pendingWithdraws[index]?.status}</span>
   </div>
   <div className='w-[25%] p-2 whitespace-nowrap'>{moment
   (pendingWithdraws[index]?.createdAt).locale('hu').format('lll')}</div>
   </div>
  )
}
 //teljesített kérések táblázat
const Rows = ({ index, style }) => {
    return (
     <div style={style} className='flex text-sm text-white font-medium'>
     <div className='w-[25%] p-2 whitespace-nowrap'>{index + 1}</div>
     <div className='w-[25%] p-2 whitespace-nowrap'>{successWithdraws[index]?.amount},- Ft</div>
     <div className='w-[25%] p-2 whitespace-nowrap'>
      <span className='py-[1px] px-[5px] bg-slate-300
       text-blue-500 rounded-md text-sm'>{successWithdraws[index]?.status}</span>
     </div>
     <div className='w-[25%] p-2 whitespace-nowrap'>{moment
     (successWithdraws[index]?.createdAt).locale('hu').format('lll')}</div>
     </div>
    )
  }
//Fizetések részleteinek megjelenítése az Eladói ID kiírásával
 useEffect(() => {
    dispatch(get_seller_payment_details(userInfo._id))
 },[])
//success és errorMessage kiíratása
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

    return (
<div className='px-2 md:px-7 py-5'>
 <div className='w-full grid grid-cols-1 sm:grid-cols-2
    md:grid-cols-2 lg:grid-cols-4 gap-7 mb-5'>
    <div className='flex justify-between items-center
    p-5 bg-[#fae8e8] rounded-md gap-3'>
        <div className='flex flex-col justify-start items-start
        text-[#5c5a5a]'>
            <h2 className='text-lg font-bold'>{totalAmount},-Ft</h2>
            <span className='text-sm font-bold'>Összes eladott termék értéke</span>
        </div>
        <div className='w-[40px] h-[40px] rounded-full
        bg-[#fa0305] flex justify-center items-center text-xl'>
            <TbCurrencyForint className='text-[#fae8e8] shadow-lg' />
        </div>
    </div>
    <div className='flex justify-between items-center
    p-5 bg-[#fde2ff] rounded-md gap-3'>
        <div className='flex flex-col justify-start items-start
        text-[#5c5a5a]'>
            <h2 className='text-xl font-bold'>{availableAmount},- Ft</h2>
            <span className='text-sm font-bold'>Elérhető összeg</span>
        </div>
        <div className='w-[40px] h-[40px] rounded-full
        bg-[#760077] flex justify-center items-center text-xl'>
            <TbCurrencyForint className='text-[#fae8e8] shadow-lg' />
        </div>
    </div>
    <div className='flex justify-between items-center
    p-5 bg-[#e9feea] rounded-md gap-3'>
        <div className='flex flex-col justify-start items-start
        text-[#5c5a5a]'>
            <h2 className='text-xl font-bold'>{withdrawAmount},- Ft</h2>
            <span className='text-sm font-bold'>Sikeresen teljesítve</span>
        </div>
        <div className='w-[40px] h-[40px] rounded-full
        bg-[#038000] flex justify-center items-center text-xl'>
            <TbCurrencyForint className='text-[#fae8e8] shadow-lg' />
        </div>
    </div>
    <div className='flex justify-between items-center
    p-5 bg-[#ecebff] rounded-md gap-3'>
        <div className='flex flex-col justify-start items-start
        text-[#5c5a5a]'>
            <h2 className='text-xl font-bold'>{pendingAmount},- Ft</h2>
            <span className='text-sm font-bold'>Teljesítetlen kifizetések</span>
        </div>
        <div className='w-[40px] h-[40px] rounded-full
        bg-[#0200f8] flex justify-center items-center text-xl'>
            <TbCurrencyForint className='text-[#fae8e8] shadow-lg' />
        </div>
    </div>
   </div>
{/*Bal oldali táblázat*/}
<div className='w-full grid grid-cols-1 md:grid-cols-2 gap-2 pb-4'>
<div className='bg-[#2f6ac2] text-[#d0d2d6] rounded-md p-5'>
    <h2 className='text-lg'>Kifizetési kérelem elküldése Admin részére</h2>
    <div className='pt-5 mb-5'>
        <form onSubmit={sendRequest}>
            <div className='flex gap-3 flex-wrap'>
            <input onChange={(e)=> setAmount(e.target.value)} value={amount}
            min='0' type="number" className='px-3 py-2 md:w-[75%]
            focus:border-blue-200 outline-none bg-[#283046]
            border border-slate-700 rounded-md text-[#d0d2d6]'
            name='amount'/>
            <button disabled={loader} className='bg-red-500 hover:shadow-red-500/40
                hover:shadow-md text-white rounded-md px-7 py-2'>
            {loader ? 'betöltés...' : 'Elküldés'}</button>
            </div>
        </form>
    </div>
    <div>
    <h2 className='text-lg pb-4'>Teljesítetlen kérések</h2>

    <div className='w-full overflow-x-auto'>
        <div className='flex bg-[#3796e1] uppercase
        text-xs font-bold min-w-[340px] rounded-md'>
            <div className='w-[25%] p-2'>Sorszám</div>
            <div className='w-[25%] p-2'>Összeg</div>
            <div className='w-[25%] p-2'>Állapot</div>
            <div className='w-[25%] p-2'>Dátum</div>
        </div>
        {
        <List style={{ minWidth : '340px'}}
            className='List'
            height={350}
            itemCount={pendingWithdraws.length}
            itemSize={35}
            outerElementType={outerElementType}
        >
         {Row}
            </List>
        }
        </div>
        </div>
    </div>
{/*Jobb oldali táblázat */}
<div className='bg-[#2f6ac2] text-[#d0d2d6] rounded-md p-5'>
    <div className='pt-5 mb-5'>
    </div>
    <div>
    <h2 className='text-lg pb-4'>Teljesített kifizetések</h2>

    <div className='w-full overflow-x-auto'>
        <div className='flex bg-[#3796e1] uppercase
        text-xs font-bold min-w-[340px] rounded-md'>
            <div className='w-[25%] p-2'>Sorszám</div>
            <div className='w-[25%] p-2'>Összeg</div>
            <div className='w-[25%] p-2'>Állapot</div>
            <div className='w-[25%] p-2'>Dátum</div>
        </div>
        {
            <List style={{ minWidth : '340px'}}
            className='List'
            height={350}
            itemCount={successWithdraws.length}
            itemSize={35}
            outerElementType={outerElementType}
            >
             {Rows}
            </List>
        }
    </div>
    </div>
</div>
</div>
</div>
 );
};

export default Payments;