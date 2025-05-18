import React, { useEffect, useState } from 'react';
import { LuArrowDownSquare } from 'react-icons/lu';
import { Link } from 'react-router-dom';
import Pagination from '../Pagination';
import { useDispatch, useSelector } from 'react-redux';
import { get_admin_orders } from '../../store/Reducers/orderReducer';

const Orders = () => {
 const dispatch = useDispatch()
 const [currentPage, setCurrentPage] = useState(1)
 const [searchValue, setSearchValue] = useState('')
 const [parPage, setParPage] = useState(5)
 const [show, setShow] = useState(false)

 const {myOrders,totalOrder} = useSelector(state => state.order)

 useEffect(() => {
    const obj = {
        parPage: parseInt(parPage),
        page: parseInt(currentPage),
        searchValue
    }
    dispatch(get_admin_orders(obj))
},[searchValue,currentPage,parPage])

return (
<div className='px-2 lg:px-7 pt-5'>
 <div className='w-full p-4 bg-[#2f6ac2] rounded-md'>
    <div className='flex justify-between items-center'>
    <select onChange={(e) => setParPage(parseInt(e.target.value))} 
    className='px-4 py-2 focus:border-blue-500
    outline-none bg-[#2f6ac2] border border-slate-700
    rounded-md text-[#d0d2d6]'>
        <option value={"5"}>5</option>
        <option value={"10"}>10</option>
        <option value={"20"}>20</option>
    </select>
    <input onChange={e => setSearchValue(e.target.value)} value={searchValue}
    className='px-4 py-2 focus:border-blue-500 outline-none
    bg-[#283046] border border-slate-700 rounded-md text-[#d0d2d6]' 
    type="text" placeholder='keresés' />
    </div>
{/* Táblázat fejléc */}
<div className='relative mt-5 overflow-x-auto'>
    <div className='w-full text-sm text-left bg-[#2f6ac2]'>
        <div className='text-sm text-[#d0d2d6] uppercase border-b
        border-slate-700'>
        <div className='flex justify-between items-center'>
            <div className='py-3 w-[25%] font-bold'>Rendelésszám</div>
            <div className='py-3 w-[13%] font-bold'>Ár</div>
            <div className='py-3 w-[18%] font-bold'>Fizetés állapota</div>
            <div className='py-3 w-[18%] font-bold'>Rendelés állapota</div>
            <div className='py-3 w-[18%] font-bold'>Műveletek</div>
            <div className='py-3 w-[8%] font-bold'><LuArrowDownSquare /></div>
        </div>
        </div>
{/*Táblázat tartalma*/}
 {
    myOrders.map((o,i) => 
<div className='text-[#d0d2d6]'>
    <div className='flex justify-between items-start
    border-b border-slate-700'>
        <div className='py-3 w-[25%] font-medium whitespace-nowrap'>
        #{o._id}</div>
        <div className='py-3 w-[13%] font-medium'>{o.price},- Ft</div>
        <div className='py-3 w-[18%] font-medium'>{o.payment_status}</div>
        <div className='py-3 w-[18%] medium'>{o.delivery_status}</div>
        <div className='py-3 w-[18%] medium'>
            <Link to={`/admin/dashboard/order/details/${o._id}`}>Megtekintés</Link>
        </div>
        <div onClick={(e) => setShow(o._id)} className='py-3 w-[8%] font-medium'>
            <LuArrowDownSquare />
        </div>
    </div>
{/* További rendelések (sub-orders) ikonnal történő megnyitás*/}
<div className={show === o._id ? 'block border-b border-slate-700 bg-[#3b7fd8]':'hidden'}>
 {
  o.suborder.map((so,i) => <div className='flex justify-start items-start
        border-b border-slate-700'>
    <div className='py-3 w-[25%] font-medium whitespace-nowrap pl-3'>
     #{so._id}</div>
    <div className='py-3 w-[13%] font-medium'>{so.price},- Ft</div>
    <div className='py-3 w-[18%] font-medium'>{so.payment_status}</div>
    <div className='py-3 w-[18%] medium'>{so.delivery_status}</div>
  </div>
  )
 }

    </div>
</div>
)
 }
</div>
</div>
{/*Lapozás*/}
 {
  totalOrder <= parPage ? "" : <div className='w-full flex justify-end mt-4 bottom-4 right-4'>
   <Pagination 
    pageNumber = {currentPage}
    setPageNumber = {setCurrentPage}
    totalItem = {totalOrder}
    parPage = {parPage}
    showItem={Math.floor(totalOrder / parPage )}
    //showItem = {3}
   />
 </div>
 }

    </div>
</div>
);
};

export default Orders;