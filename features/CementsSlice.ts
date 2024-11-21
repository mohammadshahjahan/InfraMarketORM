import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ITEMS_DATA } from "../assests/ITEMS_DATA"; 
import axios from "axios";
import { BACKENDURL } from "../constants";

interface InitialState {
    productData: typeof ITEMS_DATA;
    fetchProducts: typeof ITEMS_DATA;
    selectedParams: {
        Brand: string[];
        Grade: string[];
        Weight: string[];
        Price: string[];
        Rating: string[];
    };
    loading : string
}

const initialState: InitialState = {
    productData: [],
    fetchProducts: [],
    selectedParams: {
        Brand: [],
        Grade: [],
        Weight: [],
        Price: [],
        Rating: [],
    },
    loading:'true',
};

export const cementSlice = createSlice({
    name:'cement',
    initialState,
    reducers: {
        filterProductUsingSearch: (state, action) => {
            let newFilteredData = state.fetchProducts;
            if (action.payload) {
                newFilteredData = newFilteredData.filter(product =>
                  product.label
                    .toLowerCase()
                    .replace(/ /g, '')
                    .includes(action.payload.toLowerCase().replace(/ /g, '')),
                );
              }

             state.productData = newFilteredData;
        },
        setSelectedParams : (state, action) => {
            state.selectedParams = action.payload;
        },
        filterProductsHandler: (state) => {
            let newFilteredData = state.fetchProducts;

            if (state.selectedParams.Brand.length > 0) {
            newFilteredData = newFilteredData.filter(product =>
                state.selectedParams.Brand.includes(product.brand),
            );
            }

            if (state.selectedParams.Grade.length > 0) {
            newFilteredData = newFilteredData.filter(product =>
                state.selectedParams.Grade.includes(product.grade),
            );
            }
            if (state.selectedParams.Rating.length > 0) {
            newFilteredData = newFilteredData.filter(product =>
                state.selectedParams.Rating.includes(product.rating),
            );
            }

            if (state.selectedParams.Weight.length > 0) {
            newFilteredData = newFilteredData.filter(product =>
                state.selectedParams.Weight.includes(product.weight),
            );
            }

            if (state.selectedParams.Price.length > 0) {
                let upperBound = 0;
                for (let prices = 0; prices < state.selectedParams.Price.length; prices++) {
                    let s: string = state.selectedParams.Price[prices].substring(6);
                    upperBound = Math.max(upperBound, parseInt(s, 10));
                }
                if (upperBound === 0) {
                    upperBound = 500;
                }
                newFilteredData = newFilteredData.filter(product => {
                    const cost = product.discount ? product.discountedPrice : product.price;

                    return cost <= upperBound;
                });
            }
            state.productData = newFilteredData;
        },
        sortByPrice : (state, action) => {
            let newProducts = state.productData;
            newProducts.sort((a, b) => {
                const priceA = a.discount ? a.discountedPrice : a.price;
                const priceB = b.discount ? b.discountedPrice : b.price;
                return action.payload === 1 ? priceA - priceB : priceB - priceA;
              });
              state.productData = newProducts;
        },
    },
    extraReducers(builder){
        builder
        .addCase(fetchCementProducts.pending,(state, _) => {
            state.loading = 'true';
            console.log('Loading');
        })
        .addCase(fetchCementProducts.fulfilled,(state, action) => {
            state.productData = action.payload;
            state.fetchProducts = action.payload;
            state.loading = 'false';
        })
        .addCase(fetchCementProducts.rejected,(state,action) => {
            state.loading = 'true';
            console.log('XD, You not able to fetch Cement products, Thats a L');
            console.log(action.error);
        });
    },
});

export const fetchCementProducts = createAsyncThunk('/fetchCementProducts',async()=>{
    try {
        const fetchedProducts = await axios.get(BACKENDURL + '/getAllProducts');
        return fetchedProducts.data;
    } catch (error:any) {
        return error.message;
    }
  });


export const {filterProductUsingSearch,filterProductsHandler,sortByPrice,setSelectedParams} = cementSlice.actions;

const CementReducer = cementSlice.reducer;

export default CementReducer;

