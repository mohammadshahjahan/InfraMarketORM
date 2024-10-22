import React from 'react';
import {Image, StyleSheet, View} from 'react-native';

const EmptyCart = () => {
  return (
    <View style={styles.container}>
      <Image source={require('../../assests/empty-cart.png')} />
    </View>
  );
};

export default EmptyCart;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
