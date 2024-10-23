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
  isCouponAdded: boolean;
  setIsCouponAdded: React.Dispatch<React.SetStateAction<boolean>>;
  clearCart: () => void;
  removeItemFromCart: (
    id: number,
    Grade: string,
    BagSize: string,
    quantity: number,
  ) => void;
  removeEntireItemFromCart: (
    id: number,
    Grade: string,
    BagSize: string,
  ) => void;
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
  const [isCouponAdded, setIsCouponAdded] = useState(true);

  const clearCart = () => {
    setSelectedItems([]);
    setSubTotal(0);
    setIsCouponAdded(true);
  };

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
      ].sort((a, b) => {
        if (a.id !== b.id) {
          return a.id - b.id;
        }
        if (a.Grade !== b.Grade) {
          return a.Grade.localeCompare(b.Grade);
        }
        return a.BagSize.localeCompare(b.BagSize);
      });
      setSelectedItems(newCartItems);
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
        ...selectedItems,
      ].sort((a, b) => {
        if (a.id !== b.id) {
          return a.id - b.id;
        }
        if (a.Grade !== b.Grade) {
          return a.Grade.localeCompare(b.Grade);
        }
        return a.BagSize.localeCompare(b.BagSize);
      });
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

  const removeItemFromCart = (
    id: number,
    Grade: string,
    BagSize: string,
    quantity: number,
  ) => {
    const product = selectedItems.filter(
      prod =>
        prod.id === id && prod.Grade === Grade && prod.BagSize === BagSize,
    );
    if (!product) {
      return;
    }

    const newSelectedItems = selectedItems
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
      setSelectedItems(newSelectedItems);
      setSubTotal(subTotal - price);
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
      setSelectedItems(newItems);
      setSubTotal(subTotal - price);
    }
  };

  const removeEntireItemFromCart = (
    id: number,
    Grade: string,
    BagSize: string,
  ) => {
    const product = selectedItems.filter(
      prod =>
        prod.id === id && prod.Grade === Grade && prod.BagSize === BagSize,
    );
    if (!product) {
      return;
    }
    const price = product[0].quantity * product[0].price;
    const newSelectedItems = selectedItems
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
    setSelectedItems(newSelectedItems);
    setSubTotal(subTotal - price);
  };

  const value = {
    selectedItems,
    addItemToCart,
    subTotal,
    isCouponAdded,
    setIsCouponAdded,
    clearCart,
    removeItemFromCart,
    removeEntireItemFromCart,
  };
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
