import React from 'react';
import {CatalogStyles} from '../../Styles/CatalogStyles';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {useCementContext} from '../../Providers/CementProvider';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {rootStackParamList} from '../../App';

type HeaderProps = {
  navigation: NativeStackNavigationProp<rootStackParamList>;
};

const Header: React.FC<HeaderProps> = ({navigation}) => {
  const {productData} = useCementContext();
  return (
    <View style={sty.header}>
      <View style={sty.titleBar}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image source={require('../../assests/BackButton.png')} />
        </TouchableOpacity>
        <View>
          <Text style={[{fontSize: 25}, sty.textStyle]}>Cement</Text>
          <Text style={sty.textStyle}>{productData.length} Items</Text>
        </View>
      </View>
      <View style={CatalogStyles.headerIcon}>
        <Image source={require('../../assests/IconButton.png')} />
        <Text>(3)</Text>
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
    marginBottom: 10,
  },
  textStyle: {
    textAlign: 'center',
  },
});
