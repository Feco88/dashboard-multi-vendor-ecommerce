import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { admin_login, messageClear } from '../../store/Reducers/authReducer';
import { PropagateLoader } from 'react-spinners';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const AdminLogin = () => {

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const {loader, errorMessage, successMessage} = useSelector(state=>state.auth)

    const [state, setState] = useState({
        email: "",
        password: ""
    })

    const inputHandle = (e) => {
        setState({
            ...state,
            [e.target.name] : e.target.value
        })
    }

    const submit = (e) => {
        e.preventDefault()
        dispatch(admin_login(state))
        //console.log(state)
    }

    const overrideStyle = {
        display: 'flex',
        margin: '0 auto',
        height: '24px',
        justifyContent: 'center',
        alignItems: 'center'
    }

    useEffect(() => {
        if (errorMessage) {
            toast.error(errorMessage)
            dispatch(messageClear())
        }
        if (successMessage) {
            toast.success(successMessage)
            dispatch(messageClear())
            navigate('/')
        }
        // eslint-disable-next-line
    }, [errorMessage,successMessage])
    
return (
  <div className='min-w-screen min-h-screen bg-[#33c5ff] flex justify-center items-center' >
    <div className='w-[350px] text-[#ffffff] p-2'>
        <div className='bg-[#1877F2] p-4 rounded-md'>
            <div className='h-[70px] flex justify-center items-center'>
                <div className='w-[180px] h-[50px]'>
                    <img className='w-full h-full' src="http://localhost:3001/images/logo.png"
                    alt="kép" />
                </div>
            </div>
        <form onSubmit={submit}>
            <div className='flex flex-col w-full gap-1 mb-3'>
                <label htmlFor='email'>Email</label>
                <input onChange={inputHandle} value={state.email}
                className='px-3 py-2 outline-none border
                border-slate-400 bg-transparent rounded-md'
                type="email" name='email' placeholder='E-mail cím' id='email' required />
            </div>
            <div className='flex flex-col w-full gap-1 mb-3'>
                <label htmlFor='password'>Jelszó</label>
                <input onChange={inputHandle} value={state.password}
                className='px-3 py-2 outline-none border
                border-slate-400 bg-transparent rounded-md'
                type="password" name='password' placeholder='Jelszó' id='password' required />
            </div>
            <button disabled={loader ? true : false} className='bg-slate-800 w-full
            hover:shadow-blue-300/50 hover:shadow-lg
            text-white rounded-md px-7 py-2 mb-3'>
                {
                 loader ? <PropagateLoader color='#fff' cssOverride={overrideStyle}/> :
                 'Bejelentkezés'
                }
            </button>
        </form>
        </div>
    </div>
  </div>
 );
};

export default AdminLogin;