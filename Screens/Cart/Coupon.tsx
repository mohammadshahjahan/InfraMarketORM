import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {CouponStyles} from '../../Styles/CouponStyles';
import {QuantityStyles} from '../../Styles/QuantityStyles';
import {useDispatch} from 'react-redux';
import {setIsCouponAdded} from '../../features/CartSlice';

interface CouponProps {
  isCouponAdded: boolean;
}

const Coupon: React.FC<CouponProps> = ({isCouponAdded}) => {
  const dispatch = useDispatch();
  return (
    <View style={[CouponStyles.container, QuantityStyles.container]}>
      <View>
        <Text style={CouponStyles.CouponCode}>WELCOME20</Text>
        <Text>Coupon applied on the bill</Text>
      </View>
      <TouchableOpacity
        onPress={() => dispatch(setIsCouponAdded(!isCouponAdded))}>
        {isCouponAdded ? (
          <Text style={CouponStyles.operation}>REMOVE</Text>
        ) : (
          <Text style={[CouponStyles.operation, {color: 'green'}]}>APPLY</Text>
        )}
      </TouchableOpacity>
    </View>
  );
};

export default Coupon;
