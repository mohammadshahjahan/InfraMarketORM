import React from 'react';
import {View} from 'react-native';
import EmptyCart from './EmptyCart';
import {CheckoutStyles} from '../../Styles/CheckoutStyles';
import Address from './Address';
import {useSelector} from 'react-redux';
import {storeState} from '../../store/store';

const Checkout = () => {
  const {selectedItems} = useSelector((state: storeState) => state.CartReducer);
  return (
    <View style={{flex: 1}}>
      {selectedItems.length === 0 ? (
        <EmptyCart />
      ) : (
        <View style={CheckoutStyles.container}>
          <Address />
        </View>
      )}
    </View>
  );
};

export default Checkout;
