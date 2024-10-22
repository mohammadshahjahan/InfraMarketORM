import React from 'react';
import {Image, Text, View} from 'react-native';
import {QuantityStyles} from '../Styles/QuantityStyles';

interface OverLayCartItemProps {
  image: any;
  label: string;
  Grade: string;
  BagSize: string;
  quantity: number;
  price: number;
}

const OverLayCartItem: React.FC<OverLayCartItemProps> = ({
  BagSize,
  Grade,
  image,
  label,
  price,
  quantity,
}) => {
  return (
    <View style={QuantityStyles.container}>
      <Image source={image} style={{height: 60, width: 60}} />
      <View style={{width: '40%'}}>
        <Text
          style={{
            fontSize: 10,
            color: '#000',
            textAlign: 'center',
          }}>
          {label} {Grade} Grade - {BagSize}
        </Text>
        <Text
          style={{
            fontSize: 10,
            textAlign: 'center',
          }}>
          {quantity} x ₹{price}
        </Text>
      </View>
      <View>
        <Text style={{color: '#000'}}>₹{quantity * price}</Text>
      </View>
    </View>
  );
};

export default OverLayCartItem;
