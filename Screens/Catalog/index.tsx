import React, {useEffect, useState} from 'react';
import {FlatList, Image, TextInput, View} from 'react-native';
import Header from './Header';
import {CatalogStyles} from '../../Styles/CatalogStyles';
import CategoryIcon from '../../Components/CategoryIcon';
import TopDeals from '../../Components/TopDeals';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {rootStackParamList} from '../../App';
import {useDispatch} from 'react-redux';
import {filterProductUsingSearch} from '../../features/TopDealsSlice';

const DATA = ['Cement', 'Walling Solutions', 'Construction Chemicals', 'Steel'];

type CatalogProps = {
  navigation: NativeStackNavigationProp<rootStackParamList>;
};

const Catalog: React.FC<CatalogProps> = ({navigation}) => {
  const [searchProduct, setSearchProduct] = useState<string>('');
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(filterProductUsingSearch(searchProduct));
  }, [searchProduct, dispatch]);
  // no inline styles
  return (
    <View style={{height: '100%'}}>
      {/* make a component */}
      <Header />
      <View style={CatalogStyles.textInputContainer}>
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

      <View style={{flexDirection: 'column'}}>
        <FlatList
          style={{padding: 23, borderBottomWidth: 1, borderColor: '#C8C9CD'}}
          data={DATA}
          renderItem={({item}) => (
            <CategoryIcon label={item} navigation={navigation} />
          )}
          keyExtractor={(item, index) => index.toString()}
          horizontal
          ItemSeparatorComponent={() => <View style={{width: 20}} />}
        />
      </View>

      <TopDeals navigation={navigation} />
    </View>
  );
};

export default Catalog;
