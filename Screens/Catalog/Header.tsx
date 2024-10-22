import React from 'react';
import {CatalogStyles} from '../../Styles/CatalogStyles';
import {Text, View} from 'react-native';
import CartIcon from '../../Components/CartIcon';

const Header = () => {
  return (
    <View style={CatalogStyles.header}>
      <Text style={{color: '#000', fontSize: 24, fontWeight: 600}}>
        INFRA.<Text style={{color: '#DF542E'}}>MARKET</Text>
      </Text>
      <CartIcon />
    </View>
  );
};

export default Header;
