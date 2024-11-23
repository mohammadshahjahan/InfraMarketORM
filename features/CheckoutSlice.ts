import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { BACKENDURL } from "../constants";

interface Address{
    id: number,
    add: string
}

interface initilStateProps{
    shippingAddress : Address[]
    billingAddress : Address[]
    modeOfPayment : string[]
    loading: string
}

const initialState : initilStateProps = {
    shippingAddress : [],
    billingAddress : [],
    modeOfPayment : [],
    loading : 'true',
};

export const CheckoutSlice = createSlice({
    name:'checkout',
    initialState,
    reducers:{},
    extraReducers(builder){
        builder
        .addCase(fetchCheckoutInfo.pending,(state)=>{
            state.loading = 'true';
        })
        .addCase(fetchCheckoutInfo.fulfilled,(state,action) => {
            state.billingAddress = action.payload.billing;
            state.shippingAddress = action.payload.shipping;
            state.modeOfPayment = action.payload.MOP;
            state.loading = 'false'
        })
        .addCase(fetchCheckoutInfo.rejected,(state,action) => {
            state.loading = 'true';
            console.log('XD, You not able to fetch Cement products, Thats a L');
            console.log(action.error);
        });
    }
})

export const fetchCheckoutInfo = createAsyncThunk('/getCheckoutDetails', async() => {
    try {
        const shippingAddress = await axios.get(BACKENDURL + '/getShippingAddress');
        const billingAddress = await axios.get(BACKENDURL + '/getBillingAddress');
        const modeOfPayment = await axios.get(BACKENDURL + '/getPaymentMode');
        return {
            shipping : shippingAddress.data,
            billing: billingAddress.data,
            MOP: modeOfPayment.data,
        }
    } catch (error:any) {
        return error.message;
    }
});

const CheckoutReducer = CheckoutSlice.reducer;

export default CheckoutReducer;
