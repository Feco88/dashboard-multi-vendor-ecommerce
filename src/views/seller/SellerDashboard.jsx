import React, { useEffect } from 'react';
import { TbCurrencyForint } from "react-icons/tb";
import { MdProductionQuantityLimits } from "react-icons/md";
import { FaCartArrowDown } from "react-icons/fa";
import Chart from 'react-apexcharts';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import customer from '../../assets/demo.jpg';
import { get_seller_dashboard_data } from '../../store/Reducers/dashboardReducer';
import moment from 'moment/moment';
import 'moment/locale/hu';

const SellerDashboard = () => {
    const dispatch = useDispatch()
    const {totalSale,totalOrder,totalProduct,totalPendingOrder,
          recentOrder,recentMessage} = useSelector(state=> state.dashboard)
    const {userInfo} = useSelector(state => state.auth)
   
    useEffect(() => {
       dispatch(get_seller_dashboard_data())
    },[])
    
    const state = {
        series : [
            {
                name : "Megrendelések",
                data : [23,34,45,56,76,34,23,76,87,78,93,110]
            },
            {
                name : "Bevétel",
                data : [67,39,45,56,90,56,23,56,87,78,88,105]
            },
            {
                name : "Eladások",
                data : [34,39,56,56,80,67,23,56,98,78,93,96]
            },
        ],
        options : {
            color : ['#181ee8','#181ee8'],
            plotOptions : {
                radius : 30
            },
            chart : {
                background : 'transparent',
                foreColor : '#d0d2d6'
            },
            dataLabels : {
                enabled : false
            },
            strock : {
                show : true,
                curve : ['smooth','straight','stepline'],
                lineCap : 'butt',
                colors : '#f0f0f0',
                width : .5,
                dashArray : 0
            },
            xaxis : {
                categories : ['Jan','Feb','Már','Ápr','Máj','Jún','Júl',
                'Aug','Sze','Okt','Nov','Dec']
            },
            legend : {
                position : 'top'
            },
            responsive : [
                {
                    breakpoint : 565,
                    yaxis : {
                        categories : ['Jan','Feb','Már','Ápr','Máj','Jún','Júl',
                        'Aug','Sze','Okt','Nov','Dec']
                    },
                    options : {
                        plotOptions : {
                            bar : {
                                horizontal : true
                            }
                        },
                        chart : {
                            height : "550px"
                        }
                    }
                }
            ]
        }
    }

    return (
<div className='px-2 md:px-7 py-5'>
        <div className='w-full grid grid-cols-1 sm:grid-cols-2
         md:grid-cols-2 lg:grid-cols-4 gap-5'>
            <div className='flex justify-between items-center
            p-5 bg-[#fae8e8] rounded-md gap-3'>
                <div className='flex flex-col justify-start items-start
                text-[#5c5a5a]'>
                    <h2 className='text-lg font-bold'>{totalSale},-Ft</h2>
                    <span className='text-md font-medium'>Összes eladás</span>
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
                    <h2 className='text-xl font-bold'>{totalProduct}</h2>
                    <span className='text-md font-medium'>Termék</span>
                </div>
                <div className='w-[40px] h-[40px] rounded-full
                bg-[#760077] flex justify-center items-center text-xl'>
                    <MdProductionQuantityLimits className='text-[#fae8e8] shadow-lg' />
                </div>
            </div>
            <div className='flex justify-between items-center
            p-5 bg-[#e9feea] rounded-md gap-3'>
                <div className='flex flex-col justify-start items-start
                text-[#5c5a5a]'>
                    <h2 className='text-xl font-bold'>{totalOrder}</h2>
                    <span className='text-md font-medium'>Megrendelés</span>
                </div>
                <div className='w-[40px] h-[40px] rounded-full
                bg-[#038000] flex justify-center items-center text-xl'>
                    <FaCartArrowDown className='text-[#fae8e8] shadow-lg' />
                </div>
            </div>
            <div className='flex justify-between items-center
            p-5 bg-[#ecebff] rounded-md gap-3'>
                <div className='flex flex-col justify-start items-start
                text-[#5c5a5a]'>
                    <h2 className='text-xl font-bold'>{totalPendingOrder}</h2>
                    <span className='text-md font-medium'>Függőben lévő rendelés</span>
                </div>
                <div className='w-[40px] h-[40px] rounded-full
                bg-[#0200f8] flex justify-center items-center text-xl'>
                    <FaCartArrowDown className='text-[#fae8e8] shadow-lg' />
                </div>
            </div>
        </div>
{/* Diagram */}
        <div className='w-full flex flex-wrap mt-7'>
            <div className='w-full lg:w-7/12 lg:pr-3'>
                <div className='w-full bg-[#2f6ac2] p-4 rounded-md'>
                <Chart options={state.options} series={state.series} type='bar'
                height={350} />
                </div>
            </div>
{/* Legutóbbi beszélgetések fejléc */}
            <div className='w-full lg:w-5/12 lg:pl-4 mt-6 lg:mt-0'>
                <div className='w-full bg-[#2f6ac2] p-4 rounded-md text-[#d0d2d6]'>
                    <div className='flex justify-between items-center'>
                        <h2 className='font-semibold text-lg text-[#d0d2d6] pb-3'>
                        Legutóbbi vásárlói beszélgetések</h2>
                        <Link className='font-semibold text-sm text-[#d0d2d6]'>
                        Összes megtekintése</Link>
                    </div>
{/* Legutóbbi beszélgetések - kép, szerepkör, dátumbélyegző */}
  <div className='flex flex-col gap-2 pt-3 text-[#d0d2d6]'>
  {
     recentMessage.map((m,i) => <li className='mb-3 ml-6'>
     <div className='flex absolute -left-5 shadow-lg
     justify-center items-center w-10 h-10 p-[6px]
     bg-[#4c7fe2] rounded-full z-10'>
    {/*bejelentkezett eladó azonosítója alapján kép megjelenítése*/}
    {
     m.senderId === userInfo._id ? <img className='w-full rounded-full h-full shadow-lg'
     src={userInfo.image} alt="" /> :
     <img className='w-full rounded-full h-full shadow-lg' src={customer} alt="" />
    } 

     </div>
     <div className='p-3 bg-slate-800 rounded-lg border
     border-slate-600 shadow-sm'>
         <div className='flex justify-between items-center mb-2'>
     <Link className='text-md font-normal'>{m.senderName}</Link>
     <time className='mb-1 text-sm font-normal sm:order-last sm:mb-0'>
        {moment(m.createdAt).locale('hu').startOf('hour').fromNow()}</time>
         </div>
         <div className='p-2 text-xs font-normal bg-slate-700
         rounded-lg border border-slate-800'>
            {m.message}
         </div>
     </div>
 </li>
    )
    }
  </div>
 </div>
</div>
</div>
{/* Megrendelések rész */}
    <div className='w-full p-4 bg-[#2f6ac2] rounded-md mt-6'>
        <div className='flex justify-between items-center'>
            <h2 className='font-semibold text-lg text-[#d0d2d6] pb-3
            '>Legutóbbi rendelések</h2>
            <Link className='font-semibold text-sm text-[#d0d2d6]
            '>Összes megtekintése</Link>
        </div>
{/* Táblázat elkészítése a megrendelésekhez*/}
     <div className='relative overflow-x-auto'>
        <table className='w-full text-sm text-left text-[#d0d2d6]'>
         <thead className='text-sm text-[#d0d2d6] uppercase
         border-b border-slate-700'>
          <tr>
            <th scope='col' className='py-3 px-4'>Rendelésszám</th>
            <th scope='col' className='py-3 px-4'>Ár</th>
            <th scope='col' className='py-3 px-4'>Fizetés állapota</th>
            <th scope='col' className='py-3 px-4'>Rendelés állapota</th>
            <th scope='col' className='py-3 px-4'>Művelet</th>
          </tr>
         </thead>
         <tbody>
          {
            recentOrder.map((d,i) => <tr key={i}>
            <td scope='row' className='py-3 px-4 font-medium 
            whitespace-normal'>#{d._id}</td>
            <td scope='row' className='py-3 px-4 font-medium 
            whitespace-normal'>{d.price},- Ft</td>
            <td scope='row' className='py-3 px-4 font-medium 
            whitespace-normal'>{d.payment_status}</td>
            <td scope='row' className='py-3 px-4 font-medium 
            whitespace-normal'>{d.delivery_status}</td>
            <td scope='row' className='py-3 px-4 font-medium 
            whitespace-normal'>
             <Link to={`/seller/dashboard/order/details/${d._id}`}>Megtekintés</Link></td>
           </tr>)
          }
         </tbody>
        </table>
     </div>
    </div>
</div>
    );
};

export default SellerDashboard;