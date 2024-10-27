import { createSlice } from "@reduxjs/toolkit";
import { ITEMS_DATA } from "../assests/ITEMS_DATA"; 

interface InitialState {
    productData: typeof ITEMS_DATA;
    selectedParams: {
        Brand: string[];
        Grade: string[];
        Weight: string[];
        Price: string[];
        Rating: string[];
    };
}

const initialState: InitialState = {
    productData: ITEMS_DATA,
    selectedParams: {
        Brand: [],
        Grade: [],
        Weight: [],
        Price: [],
        Rating: [],
    },
};

export const topDealsSlice = createSlice({
    name:'topDeals',
    initialState,
    reducers: {
        filterProductUsingSearch: (state, action) => {
            let newFilteredData = ITEMS_DATA;
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
            let newFilteredData = ITEMS_DATA;

            if (state.selectedParams.Brand.length > 0) {
            newFilteredData = newFilteredData.filter(product =>
                state.selectedParams.Brand.includes(product.Brand),
            );
            }

            if (state.selectedParams.Grade.length > 0) {
            newFilteredData = newFilteredData.filter(product =>
                state.selectedParams.Grade.includes(product.Grade),
            );
            }
            if (state.selectedParams.Rating.length > 0) {
            newFilteredData = newFilteredData.filter(product =>
                state.selectedParams.Rating.includes(product.Rating),
            );
            }

            if (state.selectedParams.Weight.length > 0) {
            newFilteredData = newFilteredData.filter(product =>
                state.selectedParams.Weight.includes(product.Weight),
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

});


export const {filterProductUsingSearch,filterProductsHandler,sortByPrice,setSelectedParams} = topDealsSlice.actions;

const topDealsReducer = topDealsSlice.reducer;

export default topDealsReducer;

