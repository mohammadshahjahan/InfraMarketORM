/* eslint-disable react-native/no-inline-styles */
// I am removing warning by es lint for inline css coz if I dont it makes it look too yellow

import React from 'react';
import {Text, View} from 'react-native';

interface PriceBoxProps {
  discount: boolean;
  discountedPrice: number;
  price: number;
}

const PriceBox: React.FC<PriceBoxProps> = ({
  discount,
  discountedPrice,
  price,
}) => {
  return (
    <View
      style={{
        paddingBottom: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#e3e3e3',
        marginBottom: 12,
      }}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <Text
          style={{
            fontWeight: 600,
            color: '#000',
            fontSize: 27,
            textAlign: 'center',
            //borderWidth: 1,
          }}>
          {' '}
          ₹ {discount ? discountedPrice : price}{' '}
        </Text>
        {discount && (
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              //borderWidth: 1,
            }}>
            <Text
              style={{
                fontSize: 15,
                textDecorationLine: 'line-through',
                marginRight: 10,
              }}>
              ₹{price}
            </Text>

            <Sale />
          </View>
        )}
      </View>
    </View>
  );
};

export default PriceBox;

export const Sale = () => {
  return (
    <View style={{}}>
      <View style={{backgroundColor: '#F15927', padding: 2, borderRadius: 7}}>
        <Text style={{fontSize: 13, color: '#fff'}}>SALE</Text>
      </View>
    </View>
  );
};
