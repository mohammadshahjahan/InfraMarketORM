import React, {createContext, useContext, useState} from 'react';
import {ITEMS_DATA} from '../assests/ITEMS_DATA';

interface CartItemsProps {
  id: number;
  label: string;
  Grade: string;
  image: any;
  BagSize: string;
  quantity: number;
  price: number;
}

interface CartContextProps {
  selectedItems: CartItemsProps[];
  addItemToCart: (
    id: number,
    Grade: string,
    BagSize: string,
    quantity: number,
  ) => void;
  subTotal: number;
}

export const CartContext = createContext<CartContextProps | undefined>(
  undefined,
);

export const useCartContext = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCartContext must be used within an CartProvider');
  }
  return context;
};

interface CartProviderProps {
  children: React.ReactNode;
}

export const CartProvider: React.FC<CartProviderProps> = ({children}) => {
  const [selectedItems, setSelectedItems] = useState<CartItemsProps[]>([]);
  const [subTotal, setSubTotal] = useState(0);

  const addItemToCart = (
    id: number,
    Grade: string,
    BagSize: string,
    quantity: number,
  ) => {
    if (quantity === 0) {
      return;
    }
    const inventoryItem = ITEMS_DATA.filter(prod => prod.id === id);
    const product = selectedItems.filter(
      prod =>
        prod.id === id && prod.Grade === Grade && prod.BagSize === BagSize,
    );
    if (product.length > 0) {
      let filteredCartItems = selectedItems.filter(
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
      ];
      setSelectedItems(newCartItems);
    } else {
      const newCartItems = [
        ...selectedItems,
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
      ];
      setSelectedItems(newCartItems);
    }
    const newSubTotal =
      subTotal +
      quantity *
        (inventoryItem[0].discount
          ? inventoryItem[0].discountedPrice
          : inventoryItem[0].price);

    setSubTotal(newSubTotal);
  };

  const value = {
    selectedItems,
    addItemToCart,
    subTotal,
  };
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
