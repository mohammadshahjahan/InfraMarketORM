import React from 'react';
import {CatalogStyles} from '../../Styles/CatalogStyles';
import {Image, Text, View} from 'react-native';

const Header = () => {
  return (
    <View style={CatalogStyles.header}>
      <Text style={{color: '#000', fontSize: 24, fontWeight: 600}}>
        INFRA.<Text style={{color: '#DF542E'}}>MARKET</Text>
      </Text>
      <View style={CatalogStyles.headerIcon}>
        <Image source={require('../../assests/IconButton.png')} />
        <Text>(3)</Text>
      </View>
    </View>
  );
};

export default Header;
