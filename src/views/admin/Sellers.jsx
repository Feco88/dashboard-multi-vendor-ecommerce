import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import Pagination from '../Pagination';
import { FaEye } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { get_active_sellers } from '../../store/Reducers/sellerReducer';

export default function Sellers() {
  const dispatch = useDispatch()
  const [currentPage, setCurrentPage] = useState(1)
  const [searchValue, setSearchValue] = useState('')
  const [parPage, setParPage] = useState(5)
  const [show, setShow] = useState(false)
  const { sellers, totalSeller } = useSelector(state => state.seller)
  useEffect(() => {
  //objektumként eltároljuk a metódusból átvett adatokat
    const obj = {
      parPage: parseInt(parPage),
      page: parseInt(currentPage),
      searchValue
    }
//'get_active_sellers' metódus meghívása a Reducer-ből dispatch()-el,
//melynek átadjuk az 'obj' változóban tárolt objektumot
    dispatch(get_active_sellers(obj))
  },[searchValue,currentPage,parPage])

  return (
<div className='px-2 lg:px-7 pt-5'>
  <h1 className='text-[20px] font-bold mb-3'>Eladók</h1>
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
      <input onChange={e => setSearchValue(e.target.value)}
      value={searchValue}
      className='px-4 py-2 w-[225px] focus:border-blue-500 outline-none
      bg-[#283046] border border-slate-700 rounded-md text-[#d0d2d6]' 
      type="text" placeholder='Keress Eladó/Email alapján' />
    </div>
{/*Táblázat az Eladókhoz */}
<div className='relative overflow-x-auto'>
  <table className='w-full text-sm text-left text-[#d0d2d6]'>
    <thead className='text-sm text-[#d0d2d6] uppercase
    border-b border-slate-700'>
    <tr>
      <th scope='col' className='py-3 px-4'>Sorszám</th>
      <th scope='col' className='py-3 px-4'>Kép</th>
      <th scope='col' className='py-3 px-4'>Eladó</th>
      <th scope='col' className='py-3 px-4'>Bolt</th>
      <th scope='col' className='py-3 px-4'>Fizetés állapota</th>
      <th scope='col' className='py-3 px-4'>Email</th>
      <th scope='col' className='py-3 px-4'>Állapot</th>
      <th scope='col' className='py-3 px-4'>Település</th>
      <th scope='col' className='py-3 px-4'>Művelet</th>
    </tr>
    </thead>
    <tbody>
    {
      sellers.map((d,i) => <tr key={i}>
      <td className='py-1 px-4 font-medium 
      whitespace-normal'>{i+1}</td>
      <td className='py-1 px-4 font-medium 
      whitespace-normal'>
          <img className='w-[50px] h-[50px]'
          src={d.image} alt="" />
      </td>
      <td className='py-1 px-4 font-medium 
      whitespace-normal'>{d.name}</td>
      <td className='py-1 px-4 font-medium 
      whitespace-normal'>{d.shopInfo?.shopName}</td>
      <td className='py-1 px-4 font-medium 
      whitespace-normal'><span>{d.payment}</span></td>
      <td className='py-1 px-4 font-medium 
      whitespace-normal'>{d.email}</td>
      <td className='py-1 px-4 font-medium 
      whitespace-normal'>{d.status}</td>
      <td className='py-1 px-4 font-medium 
      whitespace-normal'>{d.shopInfo?.district}</td>
      <td className='py-1 px-4 font-medium 
      whitespace-normal'>
          <div className='flex justify-start items-center gap-4'>
          <Link to={`/admin/dashboard/seller/details/${d._id}`}
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
  totalSeller <= parPage ? <div className='w-full flex justify-end
  mt-4 bottom-4 right-4'>
  <Pagination
    pageNumber = {currentPage}
    setPageNumber = {setCurrentPage}
    totalItem = {totalSeller}
    parPage = {parPage}
    showItem={Math.floor(totalSeller / parPage )}
    //showItem = {2}
  />
</div> : ""
}

</div>
</div>
  )
}
