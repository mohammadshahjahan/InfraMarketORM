import React from 'react';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import {QuantityVariableStyles} from '../ProductPageScreen/Quantity';
import {useDispatch} from 'react-redux';
import {
  addItemToCart,
  removeEntireItemFromCart,
  removeItemFromCart,
} from '../../features/CartSlice';

interface ItemsProps {
  image: any;
  label: string;
  Grade: string;
  BagSize: string;
  quantity: number;
  price: number;
  id: number;
}

const Items: React.FC<ItemsProps> = ({
  BagSize,
  Grade,
  image,
  label,
  price,
  quantity,
  id,
}) => {
  const dispatch = useDispatch();

  return (
    <View>
      <View
        style={{
          flexDirection: 'row',
          gap: 10,
          alignItems: 'flex-start',
        }}>
        <Image source={image} style={{height: 65, width: 65}} />
        <View>
          <Text
            style={{
              fontSize: 15,
              color: '#000',
            }}>
            {label} {Grade} Grade - {BagSize}
          </Text>
          <Text
            style={{
              fontSize: 12,
            }}>
            ₹{price}
          </Text>
        </View>
      </View>
      <View style={{flexDirection: 'row', marginVertical: 15}}>
        <View style={{width: '60%'}}>
          <View style={QuantityVariableStyles.constainer}>
            <TouchableOpacity
              onPress={() =>
                dispatch(addItemToCart({id, Grade, BagSize, quantity: 10}))
              }
              style={QuantityVariableStyles.operation}>
              <View>
                <Text style={QuantityVariableStyles.text}>+</Text>
              </View>
            </TouchableOpacity>
            <View style={QuantityVariableStyles.value}>
              <Text>{quantity}</Text>
            </View>
            <TouchableOpacity
              onPress={() =>
                dispatch(removeItemFromCart({id, Grade, BagSize, quantity: 10}))
              }
              style={QuantityVariableStyles.operation}>
              <View>
                <Text style={QuantityVariableStyles.text}>-</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'flex-end',
            alignContent: 'flex-end',

            width: '40%',
          }}>
          <View style={{flexDirection: 'row', alignItems: 'center', gap: 20}}>
            <View>
              <Text style={{textAlign: 'right'}}>Total</Text>
              <Text style={{color: '#000'}}>₹{quantity * price}</Text>
            </View>
            <TouchableOpacity
              onPress={() =>
                dispatch(removeEntireItemFromCart({id, Grade, BagSize}))
              }>
              <Text style={{color: '#f15927'}}>X</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

export default Items;
