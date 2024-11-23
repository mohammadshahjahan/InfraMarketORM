import React, {useEffect} from 'react';
import {View} from 'react-native';
import EmptyCart from './EmptyCart';
import {CheckoutStyles} from '../../Styles/CheckoutStyles';
import Address from './Address';
import {useDispatch, useSelector} from 'react-redux';
import {AppDispatch, storeState} from '../../store/store';
import {fetchCheckoutInfo} from '../../features/CheckoutSlice';

const Checkout = () => {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchCheckoutInfo());
  }, [dispatch]);

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
