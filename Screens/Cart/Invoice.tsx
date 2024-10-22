/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {Text, View} from 'react-native';
import {useCartContext} from '../../Providers/CartProvider';
import {QuantityStyles} from '../../Styles/QuantityStyles';

interface InvoiceProps {
  isCouponAdded: boolean;
}

const Invoice: React.FC<InvoiceProps> = ({isCouponAdded}) => {
  const {subTotal} = useCartContext();
  const disCount = isCouponAdded
    ? parseInt((subTotal * 0.2).toFixed(0), 10)
    : 0;
  return (
    <View>
      <InvoiceRow
        isSubtotal={true}
        label="Sub Total"
        price={subTotal}
        key={1}
      />
      <InvoiceRow isSubtotal={false} label="Shipping" price={500} key={2} />
      {isCouponAdded && (
        <InvoiceRow
          isSubtotal={false}
          label="Coupon Discount"
          price={disCount}
          key={3}
        />
      )}

      {/* I used this to give space and a border, coz i didnot wanted to wrap above code in the View */}
      <View
        style={{
          borderColor: '#c4c4c4',
          height: 15,
          borderBottomWidth: 1,
          borderStyle: 'dashed',
        }}
      />

      <View style={QuantityStyles.container}>
        <Text
          style={{
            fontSize: 18,
            fontWeight: '600',
            color: '#000',
            paddingTop: 15,
          }}>
          Total Price
        </Text>
        <Text
          style={{
            fontSize: 18,
            fontWeight: '600',
            color: '#000',
            paddingTop: 15,
          }}>
          ₹ {subTotal - disCount + 500}
        </Text>
      </View>
    </View>
  );
};

export default Invoice;

interface InvoiceRowProps {
  label: string;
  price: number;
  isSubtotal: boolean;
}

const InvoiceRow: React.FC<InvoiceRowProps> = ({label, price, isSubtotal}) => {
  return (
    <View style={QuantityStyles.container}>
      <Text
        style={[
          isSubtotal
            ? {fontSize: 15, fontWeight: '600', color: '#000'}
            : {fontSize: 12},
          {paddingTop: 15},
        ]}>
        {label}
      </Text>
      <Text
        style={[
          isSubtotal
            ? {fontSize: 15, fontWeight: '600', color: '#000'}
            : {fontSize: 12},
          {paddingTop: 15},
        ]}>
        ₹{price}
      </Text>
    </View>
  );
};
