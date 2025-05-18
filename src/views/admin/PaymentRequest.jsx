import React, { forwardRef, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FixedSizeList as List } from 'react-window';
import { confirm_payment_request, get_payment_request, messageClear }
       from '../../store/Reducers/paymentReducer';
import moment from 'moment/moment';
//moment függvény megváltoztatása
import 'moment/locale/hu';
import toast from 'react-hot-toast';

{/*React-window alapértelmezett függvényei */}
function handleOnWheel({ deltaY }) {
    console.log('handleOnWheel', deltaY)
}

const outerElementType = forwardRef((props, ref) => (
    <div ref={ref} onWheel={handleOnWheel} {...props} />
)) 

export default function PaymentRequest() {
 const dispatch = useDispatch()
 const {successMessage,errorMessage,pendingWithdraws,loader} = useSelector(state => state.payment)
//loader betöltéséhez a Jóváhagyás gombhoz
 const [paymentId, setPaymentId] = useState('')

 useEffect(() => {
    dispatch(get_payment_request())
 },[])

 const confirm_request = (id) => {
    setPaymentId(id)
    dispatch(confirm_payment_request(id))
 }

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
     <div className='w-[25%] p-2 whitespace-nowrap'>
      <button disabled={loader} onClick={() => confirm_request(pendingWithdraws[index]?._id)}
      className='bg-blue-500 shadow-lg
      hover:shadow-blue-500/50 px-3 py-[2px]
       cursor-pointer text-white rounded-sm text-sm'>
       {(loader && paymentId === pendingWithdraws[index]?._id ? 'Betöltés...' : 'Jóváhagyás')}
      </button>
     </div>
   </div>
  )
 }

  return (
<div className='px-2 lg:px-7 pt-5'>
<div className='w-full p-4 bg-[#2f6ac2] rounded-md'>
  <h2 className='text-xl font-medium pb-5 text-[#d0d2d6]'>
    Eladók kifizetési kérelmének teljesítése</h2>
  <div className='w-full'>
   <div className='w-full overflow-x-auto'>
    <div className='flex bg-[#3796e1] uppercase
    text-xs font-bold min-w-[340px] rounded-md'>
     <div className='w-[25%] p-2'>Sorszám</div>
     <div className='w-[25%] p-2'>Összeg</div>
     <div className='w-[25%] p-2'>Állapot</div>
     <div className='w-[25%] p-2'>Dátum</div>
     <div className='w-[25%] p-2'>Művelet</div>
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
</div>
  )
}