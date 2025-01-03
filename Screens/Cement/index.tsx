import React, {useEffect, useState} from 'react';
import {Image, TextInput, View} from 'react-native';
import Header from './Header';
import {CatalogStyles} from '../../Styles/CatalogStyles';
import Products from './Products';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {rootStackParamList} from '../../App';
import {useDispatch} from 'react-redux';
import {filterProductUsingSearch} from '../../features/CementsSlice';
import {AppDispatch} from '../../store/store';

type CementProps = {
  navigation: NativeStackNavigationProp<rootStackParamList>;
};

const Cement: React.FC<CementProps> = ({navigation}) => {
  const [searchProduct, setSearchProduct] = useState<string>('');
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(filterProductUsingSearch(searchProduct));
  }, [searchProduct, dispatch]);

  return (
    <View style={{height: '100%', backgroundColor: '#fff'}}>
      <Header navigation={navigation} />
      <View style={[CatalogStyles.textInputContainer]}>
        <Image
          source={require('../../assests/Adornment.png')}
          style={{height: 25}}
        />
        <TextInput
          placeholder="Search Products"
          value={searchProduct}
          onChangeText={setSearchProduct}
          placeholderTextColor={'#8D8D8D'}
          style={{fontSize: 20}}
        />
      </View>

      {/* <FlatList
        style={{padding: 23, borderBottomWidth: 1, borderColor: '#C8C9CD'}}
        data={DATA}
        renderItem={renderCategoryIcon}
        keyExtractor={(item, index) => index.toString()}
        horizontal
        ItemSeparatorComponent={() => <View style={{width: 20}} />}
      /> */}

      <Products navigation={navigation} />
    </View>
  );
};

export default Cement;
