import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {useCartContext} from '../../Providers/CartProvider';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from 'react-native-screens/lib/typescript/native-stack/types';
import {rootStackParamList} from '../../App';

const Thankyou = () => {
  const {clearCart} = useCartContext();
  const {popToTop} =
    useNavigation<NativeStackNavigationProp<rootStackParamList>>();
  return (
    <View style={{flex: 1}}>
      <View style={styles.container}>
        <Image source={require('../../assests/ThankYou.png')} />
      </View>
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            clearCart();
            popToTop();
          }}>
          <Text style={{color: '#f15927'}}> CONTINUE SHOPPING </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Thankyou;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    marginTop: 20,
    padding: 20,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: '#e99d84',
  },
});
