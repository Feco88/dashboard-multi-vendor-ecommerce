import React, { useEffect, useState } from 'react';
import Search from '../components/Search';
import { Link } from 'react-router-dom';
import Pagination from '../Pagination';
import { FaEdit, FaEye, FaTrash } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { get_products } from '../../store/Reducers/productReducer';
import { MdOutlineImage } from 'react-icons/md';

const Products = () => {

    const dispatch = useDispatch()
    const {products, totalProduct} = useSelector(state=> state.product)

    const [currentPage, setCurrentPage] = useState(1)
    const [searchValue, setSearchValue] = useState('')
    const [parPage, setParPage] = useState(5)

    useEffect(() => {
        const obj = {
            parPage: parseInt(parPage),
            page: parseInt(currentPage),
            searchValue
        }
        dispatch(get_products(obj))
    },[searchValue, currentPage, parPage])

    return (
    <div className='px-2 lg:px-7 pt-5'>
        <h1 className='text-[#000] font-semibold text-lg mb-3'>
            Összes termék
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
            <th scope='col' className='py-3 px-4'>Sorszám</th>
            <th scope='col' className='py-3 px-4'>Kép</th>
            <th scope='col' className='py-3 px-4'>Terméknév</th>
            <th scope='col' className='py-3 px-4'>Kategória</th>
            <th scope='col' className='py-3 px-4'>Gyártó</th>
            <th scope='col' className='py-3 px-4'>Ár</th>
            <th scope='col' className='py-3 px-4'>Kedvezmény</th>
            <th scope='col' className='py-3 px-4'>Készlet</th>
            <th scope='col' className='py-3 px-4'>Műveletek</th>
          </tr>
         </thead>
         <tbody>
          {
            products.map((d,i) => <tr key={i}>
            <td className='py-1 px-4 font-medium 
            whitespace-normal'>{i + 1}</td>
            <td className='py-1 px-4 font-medium 
            whitespace-normal'>
                <img className='w-[45px] h-[45px]'
                src={d.images[0]} alt="" />
            </td>
            <td className='py-1 px-4 font-medium 
            whitespace-normal'>{d?.name?.slice(0,16)}...</td> {/*Karakterek levágása 16-nál*/}
            <td className='py-1 px-4 font-medium 
            whitespace-normal'>{d.category}</td>
            <td className='py-1 px-4 font-medium 
            whitespace-normal'>{d.brand}</td>
            <td className='py-1 px-4 font-medium 
            whitespace-normal'>{d.price},- Ft</td>
            <td className='py-1 px-4 font-medium 
            whitespace-normal'>
                { 
                d.discount === 0 ? <span>Nincs</span> :
                <span>{d.discount}%</span>
            }
            </td>
            <td className='py-1 px-4 font-medium 
            whitespace-normal'>{d.stock}</td>
    <td className='py-1 px-4 font-medium 
    whitespace-normal'>
     <div className='flex justify-start items-center gap-4'>
      <Link to={`/seller/dashboard/edit-product/${d._id}`}
       className='p-[6px] bg-yellow-500 rounded
       hover:shadow-lg hover:shadow-yellow-500/50'><FaEdit /></Link>

      <Link to={`/seller/dashboard/add-banner/${d._id}`}
       className='p-[6px] bg-sky-500 rounded
       hover:shadow-lg hover:shadow-yellow-500/50'><MdOutlineImage /></Link>

      <Link className='p-[6px] bg-green-500 rounded
       hover:shadow-lg hover:shadow-green-500/50'><FaEye /></Link>
      <Link className='p-[6px] bg-red-500 rounded
       hover:shadow-lg hover:shadow-red-500/50'><FaTrash /></Link>
     </div>
    </td>
    </tr> )
          }
         </tbody>
        </table>
     </div>
{/*Lapozó (pagination) rész*/}
          {
            totalProduct <= parPage ? "" : <div className='w-full flex
            justify-end mt-4 bottom-4 right-4'>
            <Pagination
                pageNumber = {currentPage}
                setPageNumber = {setCurrentPage}
                totalItem = {totalProduct}
                parPage = {parPage}
                showItem={Math.floor(totalProduct / parPage )}
                //showItem = {3}
            />
        </div>
          }
        </div>
    </div>
    );
};

export default Products;
