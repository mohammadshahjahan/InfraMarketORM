import React from 'react';
import {Image, StyleSheet, View} from 'react-native';

const OutOfStock = () => {
  return (
    <View style={outOfStockStyles.container}>
      <Image source={require('../assests/outOfStock.png')} />
    </View>
  );
};

export default OutOfStock;

const outOfStockStyles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
