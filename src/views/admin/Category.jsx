import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Pagination from '../Pagination';
import { FaEdit, FaTrash, FaImage } from 'react-icons/fa';
import { IoMdCloseCircle } from "react-icons/io";
import { PropagateLoader } from 'react-spinners';
import { overrideStyle } from '../../utils/utils';
import { categoryAdd, messageClear, get_category, updateCategory, deleteCategory }
from '../../store/Reducers/categoryReducer';
import { useDispatch, useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import Search from './../components/Search';

const Category = () => {

  const dispatch = useDispatch()
  const {loader,successMessage,errorMessage, categorys, totalCategory} = useSelector(
    state=> state.category)
  const [currentPage, setCurrentPage] = useState(1)
  const [searchValue, setSearchValue] = useState('')
  const [parPage, setParPage] = useState(5)
  const [show, setShow] = useState(false)
  const [imageShow, setImage] = useState('')
  //kategória szerkesztéséhez
  const [isEdit, setIsEdit] = useState(false)
  const [editId, setEditId] = useState(null)
  const [state, setState] = useState({
    name: '',
    image: ''
  })

  const imageHandle = (e) => {
     let files = e.target.files
      if (files.length > 0) {
        setImage(URL.createObjectURL(files[0]))
        setState({
        ...state,
        image: files[0]
      })
    }
  }

  const addOrUpdateCategory = (e) => {
     e.preventDefault()
     if (isEdit) {
       dispatch(updateCategory({ id: editId, ...state}))
     } else {
     dispatch(categoryAdd(state))
     }
  }

  useEffect(() => {
     if (successMessage) {
         toast.success(successMessage)
         dispatch(messageClear())
         setState({
          name: '',
          image: ''
        })
//sikeres módosítás esetén visszaállítja a képet,
//a szerkesztést, és az ID-t alapértékeikre
        setImage('')
        setIsEdit(false)
        setEditId(null)
     }
     if (errorMessage) {
        toast.error(errorMessage)
        dispatch(messageClear())
     }
  },[successMessage,errorMessage,dispatch])

  useEffect(() => {
     const obj = {
        parPage: parseInt(parPage),
        page: parseInt(currentPage),
        searchValue
     }
     dispatch(get_category(obj))
  },[searchValue, currentPage, parPage])

//handleEdit eseményfüggvény a kategória szerkesztéséhez
  const handleEdit = (category) => {
    setState({
      name: category.name,
      image: category.image
    })
    setImage(category.image)
    setEditId(category._id)
 //kattintásra az értéke true lesz
    setIsEdit(true)
    setShow(true)
  }
//handleDelete eseményfüggvény kategória törléséhez
  const handleDelete = (id) => {
    if (window.confirm('Biztos törölni szeretnéd a kategóriát?')) {
        console.log("Kategória azonosító törlése",id)
        dispatch(deleteCategory(id))
    }
  }

 return (
  <div className='px-2 lg:px-7 pt-5'>
{/*Reszponzivitás beállítása*/}
   <div className='flex lg:hidden justify-between items-center mb-5
    p-4 bg-[#2f6ac2] rounded-md'>
     <h1 className='text-[#d0d2d6] font-semibold text-lg'>Kategória</h1>
      <button onClick={() => setShow(true)} className='bg-red-500 shadow-lg
      hover:shadow-red-500/40 px-4 py-2 cursor-pointer text-white
       rounded-sm text-sm'>Hozzáadás</button>
   </div>
{/*Keresőmező, és szelektor lapozáshoz*/}
        <div className='flex flex-wrap w-full'>
{/*Kategória aloldal bal oldali rész*/}
        <div className='w-full lg:w-7/12'>
        <div className='w-full p-4 bg-[#2f6ac2] rounded-md'>
        <Search setParPage={setParPage} setSearchValue={setSearchValue}
        searchValue={searchValue} />

{/*Táblázat a kategóriákhoz */}
     <div className='relative overflow-x-auto'>
        <table className='w-full text-sm text-left text-[#d0d2d6]'>
         <thead className='text-sm text-[#d0d2d6] uppercase
         border-b border-slate-700'>
          <tr>
            <th scope='col' className='py-3 px-4'>Sorszám</th>
            <th scope='col' className='py-3 px-4'>Kép</th>
            <th scope='col' className='py-3 px-4'>Terméknév</th>
            <th scope='col' className='py-3 px-4'>Műveletek</th>
          </tr>
         </thead>
         <tbody>
    {
        categorys.map((d,i) => <tr key={i}>
        <td className='py-1 px-4 font-medium 
            whitespace-normal'>{i+1}</td>
        <td className='py-1 px-4 font-medium 
            whitespace-normal'>
            <img className='w-[45px] h-[45px]'
            src={d.image} alt="" />
        </td>
        <td className='py-1 px-4 font-medium 
          whitespace-normal'>{d.name}</td>
        <td className='py-1 px-4 font-medium 
          whitespace-normal'>
           <div className='flex justify-start items-center gap-4'>
            <Link className='p-[6px] bg-yellow-500 rounded
             hover:shadow-lg hover:shadow-yellow-500/50'
             onClick={() => handleEdit(d)}><FaEdit />
            </Link>
            <Link className='p-[6px] bg-red-500 rounded
             hover:shadow-lg hover:shadow-red-500/50'
             onClick={() => handleDelete(d._id)}
             ><FaTrash />
            </Link>
           </div>
        </td>
       </tr> )
    }
    </tbody>
   </table>
  </div>
{/*Lapozó (pagination) rész*/}
 <div className='w-full flex justify-end mt-4 bottom-4 right-4'>
  <Pagination
    pageNumber = {currentPage}
    setPageNumber = {setCurrentPage}
    totalItem = {totalCategory}
    parPage = {parPage}
    showItem={Math.floor(totalCategory / parPage )}
    //showItem = {3}
  />
  </div>
 </div>
</div>
{/*Kategória hozzáadása doboz*/}
    <div className={`w-[320px] lg:w-5/12 translate-x-100 lg:relative
         lg:right-0 fixed ${show ? 'right-0' : '-right-[340px]'} z-[9999] top-0
         transition-all duration-500`}>
    <div className='w-full pl-5'>
        <div className='bg-[#2f6ac2] h-screen lg:h-auto px-3 py-2
        lg:rounded-md text-[#d0d2d6]'>
         <div className='flex justify-between items-center mb-4'>
          <h1 className='text-[#d0d2d6] font-semibold text-xl mb-4
            w-full text-center'>
 {/*Ha a kategória szerkesztés alatt van, akkor jelenítse meg a
 'Kategória szerkesztése' szöveget, ha nincs szerkesztés alatt,
  akkor jelenítse meg a 'Kategória hozzáadása' szöveget*/}
        {isEdit ? 'Kategória szerkesztése' : 'Kategória hozzáadása'}</h1>
{/*Kategória panel eltüntetése mobilnézetben*/}
         <div onClick={() => setShow(false)} className='block lg:hidden'>
            <IoMdCloseCircle />
         </div>
         </div>

    <form onSubmit={addOrUpdateCategory}>
     <div className='flex flex-col w-full gap-1 mb-3'>
      <label htmlFor="name">Kategória neve</label>
       <input value={state.name} onChange={(e)=>setState({...state,name : e.target.value})}
        className='px-4 py-2 focus:border-blue-500 outline-none
        bg-[#ffffff] border border-slate-700 rounded-md text-[#000000]'
        type="text" id='name' name='category_name'
        placeholder='Kategória neve' />
     </div>
{/*Kategóriakép kiválasztása*/}
    <div>
     <label className='flex justify-center items-center
      flex-col h-[219px] corsor-pointer border border-dashed
     hover:border-red-500 w-full border-[#d0d2d6]'
        htmlFor="image">
        {
         imageShow ? <img className='w-full h-full'
         src={imageShow} /> : <>
         <span><FaImage /></span>
         <span>Kép kiválasztása</span>
         </>
        }
     </label>
      <input onChange={imageHandle} className="hidden"
       type="file" name="image" id="image" />
{/*"Kategória hozzáadása" gomb*/}
            <div className='mt-4'>
        <button disabled={loader ? true : false}
        className='bg-red-800 w-full
         hover:shadow-red-300/50 hover:shadow-lg
         text-white rounded-md px-7 py-2 mb-3'>
         {
         loader ? <PropagateLoader color='#fff' cssOverride={overrideStyle}/> :
         isEdit ? 'Kategória módosítása' : 'Kategória hozzáadása'
         }
        </button>
            </div>
         </div>
        </form>
        </div>
    </div>
    </div>
        </div>
     </div>
    );
};

export default Category;