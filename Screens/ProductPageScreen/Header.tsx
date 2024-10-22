import React from 'react';
import {CatalogStyles} from '../../Styles/CatalogStyles';
import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {rootStackParamList} from '../../App';
import CartIcon from '../../Components/CartIcon';

type HeaderProps = {
  navigation: NativeStackNavigationProp<rootStackParamList>;
};

const Header: React.FC<HeaderProps> = ({navigation}) => {
  return (
    <View style={sty.header}>
      <View style={sty.titleBar}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image source={require('../../assests/BackButton.png')} />
        </TouchableOpacity>
      </View>
      <View style={CatalogStyles.headerIcon}>
        <CartIcon />
      </View>
    </View>
  );
};

export default Header;

const sty = StyleSheet.create({
  titleBar: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 7,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: 0,
    paddingRight: 10,
    width: '100%',

    backgroundColor: '#fff',
  },
  textStyle: {
    textAlign: 'center',
  },
});
