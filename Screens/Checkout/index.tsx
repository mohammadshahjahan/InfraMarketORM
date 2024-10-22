import React from 'react';
import {View} from 'react-native';
import EmptyCart from './EmptyCart';
import {useCartContext} from '../../Providers/CartProvider';
import {CheckoutStyles} from '../../Styles/CheckoutStyles';
import ProductSummary from './ProductSummary';
import Address from './Address';

const Checkout = () => {
  const {selectedItems} = useCartContext();
  return (
    <View style={{flex: 1}}>
      {selectedItems.length === 0 ? (
        <EmptyCart />
      ) : (
        <View style={CheckoutStyles.container}>
          <ProductSummary />
          <Address />
        </View>
      )}
    </View>
  );
};

export default Checkout;
