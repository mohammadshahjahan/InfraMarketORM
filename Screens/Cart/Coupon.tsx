import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {CouponStyles} from '../../Styles/CouponStyles';
import {QuantityStyles} from '../../Styles/QuantityStyles';

interface CouponProps {
  isCouponAdded: boolean;
  setIsCouponAdded: React.Dispatch<React.SetStateAction<boolean>>;
}

const Coupon: React.FC<CouponProps> = ({isCouponAdded, setIsCouponAdded}) => {
  return (
    <View style={[CouponStyles.container, QuantityStyles.container]}>
      <View>
        <Text style={CouponStyles.CouponCode}>WELCOME20</Text>
        <Text>Coupon applied on the bill</Text>
      </View>
      <TouchableOpacity onPress={() => setIsCouponAdded(!isCouponAdded)}>
        {isCouponAdded ? (
          <Text style={CouponStyles.operation}>REMOVE</Text>
        ) : (
          <Text style={CouponStyles.operation}>APPLY</Text>
        )}
      </TouchableOpacity>
    </View>
  );
};

export default Coupon;
