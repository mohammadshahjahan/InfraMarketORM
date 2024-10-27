import React from 'react';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import {ProductSummaryStyles} from '../../Styles/ProductSummary';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {rootStackParamList} from '../../App';
import {useSelector} from 'react-redux';
import {storeState} from '../../store/store';

const ProductSummary = () => {
  const image = require('../../assests/CementBag.png');
  const {subTotal, isCouponAdded, selectedItems} = useSelector(
    (state: storeState) => state.CartReducer,
  );
  const discount = isCouponAdded ? 0.2 * subTotal : 0;
  const price = subTotal + 500 - discount;
  const {navigate} =
    useNavigation<NativeStackNavigationProp<rootStackParamList>>();

  return (
    <View style={ProductSummaryStyles.container}>
      <View style={ProductSummaryStyles.imageContainer}>
        <Image source={image} style={{height: 70, width: 70}} />
        <View>
          <Text style={{fontWeight: 500, color: '#000'}}>
            {selectedItems.length} Items
          </Text>
          <TouchableOpacity onPress={() => navigate('Your Cart')}>
            <Text style={{fontSize: 12}}>Show Deatils</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View>
        <Text style={{fontWeight: 500, color: '#000'}}>₹ {price}</Text>
      </View>
    </View>
  );
};

export default ProductSummary;
