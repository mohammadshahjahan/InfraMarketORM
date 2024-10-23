import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {rootStackParamList} from '../../App';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useNavigation} from '@react-navigation/native';

const EmptyCart = () => {
  const {popToTop} =
    useNavigation<NativeStackNavigationProp<rootStackParamList>>();
  return (
    <>
      <View style={styles.container}>
        <Image source={require('../../assests/empty-cart.png')} />
      </View>
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            popToTop();
          }}>
          <Text style={{color: '#f15927'}}> CONTINUE SHOPPING </Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

export default EmptyCart;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '50%',
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
