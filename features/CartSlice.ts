import { createSlice } from "@reduxjs/toolkit";
import { ITEMS_DATA } from "../assests/ITEMS_DATA";


interface CartItemsProps {
    id: number;
    label: string;
    Grade: string;
    image: any;
    BagSize: string;
    quantity: number;
    price: number;
  }

interface initialStateProps {
    selectedItems : CartItemsProps[];
    subTotal: number;
    isCouponAdded: boolean;
}

const initialState:initialStateProps = {
    selectedItems : [],
    subTotal: 0,
  isCouponAdded :true,
};

export const CartSlice = createSlice({
    name:'cart',
    initialState,
    reducers:{
        addItemToCart : (state, action) => {
            const { id, Grade, BagSize, quantity} = action.payload;
            if (quantity === 0) {
                return;
              }
            const inventoryItem = ITEMS_DATA.filter(prod => prod.id === id);
            const product = state.selectedItems.filter(
                prod =>
                  prod.id === id && prod.Grade === Grade && prod.BagSize === BagSize,
            );
            if (product.length > 0) {
                let filteredCartItems = state.selectedItems.filter(
                  prod =>
                    !(prod.id === id && prod.Grade === Grade && prod.BagSize === BagSize),
                );
                let newCartItems = [
                  {
                    id: product[0].id,
                    label: product[0].label,
                    Grade: Grade,
                    image: product[0].image,
                    BagSize: BagSize,
                    quantity: product[0].quantity + quantity,
                    price: product[0].price,
                  },
                  ...filteredCartItems,
                ].sort((a, b) => {
                  if (a.id !== b.id) {
                    return a.id - b.id;
                  }
                  if (a.Grade !== b.Grade) {
                    return a.Grade.localeCompare(b.Grade);
                  }
                  return a.BagSize.localeCompare(b.BagSize);
                });
                state.selectedItems =  newCartItems;
              } else {
                const newCartItems = [
                  {
                    id: id,
                    label: inventoryItem[0].label,
                    Grade: Grade,
                    image: inventoryItem[0].imageSrc,
                    BagSize: BagSize,
                    quantity: quantity,
                    price: inventoryItem[0].discount
                      ? inventoryItem[0].discountedPrice
                      : inventoryItem[0].price,
                  },
                  ...state.selectedItems,
                ].sort((a, b) => {
                  if (a.id !== b.id) {
                    return a.id - b.id;
                  }
                  if (a.Grade !== b.Grade) {
                    return a.Grade.localeCompare(b.Grade);
                  }
                  return a.BagSize.localeCompare(b.BagSize);
                });
                state.selectedItems =  newCartItems;
              }

              const newSubTotal = state.subTotal + quantity * (inventoryItem[0].discount ? inventoryItem[0].discountedPrice : inventoryItem[0].price);

              state.subTotal = newSubTotal;
        },
        removeItemFromCart : (state,action) => {
            const {id, Grade, BagSize, quantity} = action.payload;
            const product = state.selectedItems.filter(
                prod =>
                  prod.id === id && prod.Grade === Grade && prod.BagSize === BagSize,
              );
            if (!product) {
                return;
            }
            const newSelectedItems = state.selectedItems
                                        .filter(
                                            prod =>
                                            !(prod.id === id && prod.Grade === Grade && prod.BagSize === BagSize),
                                        )
                                        .sort((a, b) => {
                                            if (a.id !== b.id) {
                                            return a.id - b.id;
                                            }
                                            if (a.Grade !== b.Grade) {
                                            return a.Grade.localeCompare(b.Grade);
                                            }
                                            return a.BagSize.localeCompare(b.BagSize);
                                        });

            if (product[0].quantity <= quantity) {
                const price = product[0].quantity * product[0].price;
                state.selectedItems = newSelectedItems;
                state.subTotal = state.subTotal - price;
            } else {
                const changedProd = product[0];
                changedProd.quantity -= quantity;
                const price = product[0].price * quantity;
                const newItems = [...newSelectedItems, {...changedProd}].sort((a, b) => {
                                                                            if (a.id !== b.id) {
                                                                                return a.id - b.id;
                                                                            }
                                                                            if (a.Grade !== b.Grade) {
                                                                                return a.Grade.localeCompare(b.Grade);
                                                                            }
                                                                            return a.BagSize.localeCompare(b.BagSize);
                                                                        });
                state.selectedItems = newItems;
                state.subTotal = state.subTotal - price;

                }
        },
        removeEntireItemFromCart : (state, action) => {
            const {id, Grade, BagSize} = action.payload;
            const product = state.selectedItems.filter(
                prod =>
                  prod.id === id && prod.Grade === Grade && prod.BagSize === BagSize,
              );
            if (!product) {
                return;
            }
            const price = product[0].quantity * product[0].price;
            const newSelectedItems = state.selectedItems
            .filter(
                prod =>
                !(prod.id === id && prod.Grade === Grade && prod.BagSize === BagSize),
            )
            .sort((a, b) => {
                if (a.id !== b.id) {
                return a.id - b.id;
                }
                if (a.Grade !== b.Grade) {
                return a.Grade.localeCompare(b.Grade);
                }
                return a.BagSize.localeCompare(b.BagSize);
            });
            state.selectedItems = newSelectedItems;
            state.subTotal = state.subTotal - price;
        },
        setIsCouponAdded: (state, action) => {
            state.isCouponAdded = action.payload;
        },
        setCartEmpty: (state) => {
          state.subTotal = 0;
          state.selectedItems = [];
          state.isCouponAdded = true;
        }
}});


export const {addItemToCart,removeEntireItemFromCart,removeItemFromCart, setIsCouponAdded, setCartEmpty} = CartSlice.actions;

const CartReducer = CartSlice.reducer;

export default CartReducer;

