import { combineReducers } from '@reduxjs/toolkit';
import authReducer from "./Reducers/authReducer";
import categoryReducer from "./Reducers/categoryReducer";
import productReducer from "./Reducers/productReducer";
import sellerReducer from "./Reducers/sellerReducer";
import chatReducer from './Reducers/chatReducer';
import orderReducer from './Reducers/orderReducer';
import paymentReducer from './Reducers/paymentReducer';
import dashboardReducer from './Reducers/dashboardReducer';
import bannerReducer from './Reducers/bannerReducer';

const rootReducer = combineReducers ({
    auth: authReducer,
    category: categoryReducer,
    product: productReducer,
    seller: sellerReducer,
    chat: chatReducer,
    order: orderReducer,
    payment: paymentReducer,
    dashboard: dashboardReducer,
    banner: bannerReducer
});

export default rootReducer;
