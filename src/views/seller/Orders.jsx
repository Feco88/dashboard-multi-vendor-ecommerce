import React, { useEffect, useState } from 'react';
import Search from '../components/Search';
import { Link } from 'react-router-dom';
import Pagination from '../Pagination';
import { FaEye } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { get_seller_orders } from '../../store/Reducers/orderReducer';

const Orders = () => {
 const dispatch = useDispatch()
 const {userInfo} = useSelector(state=>state.auth)
 const {myOrders,totalOrder} = useSelector(state => state.order)

 const [currentPage, setCurrentPage] = useState(1)
 const [searchValue, setSearchValue] = useState('')
 const [parPage, setParPage] = useState(5)

 useEffect(() => {
  const obj = {
    parPage: parseInt(parPage),
    page: parseInt(currentPage),
    searchValue,
    sellerId: userInfo._id
  }
        dispatch(get_seller_orders(obj))
    },[searchValue,currentPage,parPage])

 return (
  <div className='px-2 lg:px-7 pt-5'>
      <h1 className='text-[#000] font-semibold text-lg mb-3'>
        Rendelések
      </h1>
      <div className='w-full p-4 bg-[#2f6ac2] rounded-md'>
        <Search setParPage={setParPage} setSearchValue={setSearchValue}
        searchValue={searchValue}/>
{/*Adattábla rész*/}
  <div className='relative overflow-x-auto mt-5'>
   <table className='w-full text-sm text-left text-[#d0d2d6]'>
      <thead className='text-sm text-[#d0d2d6] uppercase
      border-b border-slate-700'>
      <tr>
       <th scope='col' className='py-3 px-4'>Rendelésszám</th>
       <th scope='col' className='py-3 px-4'>Ár</th>
       <th scope='col' className='py-3 px-4'>Fizetés állapota</th>
       <th scope='col' className='py-3 px-4'>Rendelés állapota</th>
       <th scope='col' className='py-3 px-4'>Rendelés ideje</th>
       <th scope='col' className='py-3 px-4'>Műveletek</th>
      </tr>
     </thead>
    <tbody>
     {
      myOrders.map((d,i) => <tr key={i}>

      <td className='py-1 px-4 font-medium 
      whitespace-normal'>#{d._id}</td>
      <td className='py-1 px-4 font-medium 
      whitespace-normal'>{d.price},- Ft</td>
      <td className='py-1 px-4 font-medium 
      whitespace-normal'>{d.payment_status}</td>
      <td className='py-1 px-4 font-medium 
      whitespace-normal'>{d.delivery_status}</td>
      <td className='py-1 px-4 font-medium 
      whitespace-normal'>{d.date}</td>
      <td className='py-1 px-4 font-medium 
      whitespace-normal'>
        <div className='flex justify-start items-center gap-4'>
        <Link to={`/seller/dashboard/order/details/${d._id}`}
        className='p-[6px] bg-green-500 rounded
        hover:shadow-lg hover:shadow-green-500/50'><FaEye /></Link>
        </div>
      </td>
     </tr> )
     }
    </tbody>
  </table>
 </div>
{/*Lapozó (pagination) rész*/}
    {
      totalOrder <= parPage ? "" : <div className='w-full flex
      justify-end mt-4 bottom-4 right-4'>
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
