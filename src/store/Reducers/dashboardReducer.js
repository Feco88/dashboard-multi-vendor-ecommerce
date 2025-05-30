import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from '../../api/api';

//Admin - Irányítópult főoldal adatai metódus
export const get_admin_dashboard_data = createAsyncThunk(
    'dashboard/get_admin_dashboard_data',
     async(_,{rejectWithValue, fulfillWithValue}) => {
       try {
        const {data} = await api.get(`/admin/get-dashboard`,
        {withCredentials: true})
        return fulfillWithValue(data)
       } catch (error) {
           // console.log(error.response.data)
           return rejectWithValue(error.response.data)
       }
     }
   )
//Admin - Irányítópult főoldal adatai metódus vége
//Eladó - Irányítópult főoldal adatai metódus
export const get_seller_dashboard_data = createAsyncThunk(
  'dashboard/get_seller_dashboard_data',
   async(_,{rejectWithValue, fulfillWithValue}) => {
     try {
      const {data} = await api.get(`/seller/get-dashboard-data`,
      {withCredentials: true})
      return fulfillWithValue(data)
     } catch (error) {
         // console.log(error.response.data)
         return rejectWithValue(error.response.data)
     }
   }
 )
//Eladó - Irányítópult főoldal adatai metódus vége

export const dashboardReducer = createSlice({
    name: 'dashboard',
    initialState: {
      totalSale: 0,
      totalOrder: 0,
      totalProduct: 0,
      totalPendingOrder: 0,
      totalSeller: 0,
      recentOrder: [],
      recentMessage: []
    },
    reducers: {
      messageClear : (state,_) => {
        state.successMessage = ""
        state.errorMessage = ""
      }
    },
    extraReducers: (builder) => {
    builder
    .addCase(get_admin_dashboard_data.fulfilled, (state, { payload }) => {
      state.totalSale = payload.totalSale
      state.totalOrder = payload.totalOrder
      state.totalProduct = payload.totalProduct
      state.totalSeller = payload.totalSeller
      state.recentOrder = payload.recentOrders
      state.recentMessage = payload.messages
    })
    .addCase(get_seller_dashboard_data.fulfilled, (state, { payload }) => {
      state.totalSale = payload.totalSale
      state.totalOrder = payload.totalOrder
      state.totalProduct = payload.totalProduct
      state.totalPendingOrder = payload.totalPendingOrder
      state.recentOrder = payload.recentOrders
      state.recentMessage = payload.messages
    })
  }
})

export const { messageClear } = dashboardReducer.actions;
export default dashboardReducer.reducer;