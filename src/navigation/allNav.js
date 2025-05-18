import { AiOutlineDashboard, AiOutlineShoppingCart } from "react-icons/ai";
import { BiCategory } from "react-icons/bi";
import { FaUsers, FaUserTimes } from "react-icons/fa";
import { FaCodePullRequest } from "react-icons/fa6";
import { MdPayment, MdViewList } from "react-icons/md";
import { IoIosChatbubbles, IoMdAdd } from "react-icons/io";
import { TbBasketDiscount } from "react-icons/tb";
import { BsCartCheck, BsFillChatQuoteFill } from "react-icons/bs";
import { IoChatbubbles } from "react-icons/io5";
import { CgProfile } from "react-icons/cg";

export const allNav = [
    {
        id : 1,
        title : 'Irányítópult',
        icon : <AiOutlineDashboard />,
        role : 'admin',
        path : '/admin/dashboard'
    },
    {
        id : 2,
        title : 'Rendelések',
        icon : <AiOutlineShoppingCart />,
        role : 'admin',
        path : '/admin/dashboard/orders'
    },
    {
        id : 3,
        title : 'Kategóriák',
        icon : <BiCategory />,
        role : 'admin',
        path : '/admin/dashboard/category'
    },
    {
        id : 4,
        title : 'Eladók',
        icon : <FaUsers />,
        role : 'admin',
        path : '/admin/dashboard/sellers'
    },
    {
        id : 5,
        title : 'Fizetési kérelmek',
        icon : <MdPayment />,
        role : 'admin',
        path : '/admin/dashboard/payment-request'
    },
    {
        id : 6,
        title : 'Letiltott eladók',
        icon : <FaUserTimes />,
        role : 'admin',
        path : '/admin/dashboard/deactive-sellers'
    },
    {
        id : 7,
        title : 'Eladói kérések',
        icon : <FaCodePullRequest />,
        role : 'admin',
        path : '/admin/dashboard/sellers-request'
    },
    {
        id : 8,
        title : 'Beszélgetések',
        icon : <IoIosChatbubbles />,
        role : 'admin',
        path : '/admin/dashboard/chat-sellers'
    },
    {
        id : 9,
        title : 'Irányítópult',
        icon : <AiOutlineDashboard />,
        role : 'seller',
        path : '/seller/dashboard'
    },
    {
        id : 10,
        title : 'Termék hozzáadása',
        icon : <IoMdAdd />,
        role : 'seller',
        path : '/seller/dashboard/add-product'
    },
    {
        id : 11,
        title : 'Összes termék',
        icon : <MdViewList />,
        role : 'seller',
        path : '/seller/dashboard/products'
    },
    {
        id : 12,
        title : 'Kedvezményes termékek',
        icon : <TbBasketDiscount/>,
        role : 'seller',
        path : '/seller/dashboard/discount-products'
    },
    {
        id : 13,
        title : 'Rendelések',
        icon : <BsCartCheck />,
        role : 'seller',
        path : '/seller/dashboard/orders'
    },
    {
        id : 14,
        title : 'Kifizetések',
        icon : <MdPayment />,
        role : 'seller',
        path : '/seller/dashboard/payments'
    },
    {
        id : 15,
        title : 'Vásárlói beszélgetések',
        icon : <IoChatbubbles />,
        role : 'seller',
        path : '/seller/dashboard/chat-customer'
    },
    {
        id : 16,
        title : 'Chat-Support',
        icon : <BsFillChatQuoteFill />,
        role : 'seller',
        path : '/seller/dashboard/chat-support'
    },
    {
        id : 17,
        title : 'Profilom',
        icon : <CgProfile />,
        role : 'seller',
        path : '/seller/dashboard/profile'
    },
]
