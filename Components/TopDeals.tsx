import React, {useEffect, useState} from 'react';
import {
  FlatList,
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
  ImageSourcePropType,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Product from './Product';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {rootStackParamList} from '../App';
import {useDispatch, useSelector} from 'react-redux';
import {fetchTopProducts, sortByPrice} from '../features/TopDealsSlice';
import {AppDispatch, storeState} from '../store/store';

type TopDealsProps = {
  navigation: NativeStackNavigationProp<rootStackParamList>;
};

interface ProductProps {
  discount: boolean;
  imageSrc: ImageSourcePropType;
  label: string;
  price: number;
  discountedPrice: number;
  id: number;
}

const TopDeals: React.FC<TopDealsProps> = ({navigation}) => {
  const [col, _] = useState(2);
  const [filterOpen, setFilterOpen] = useState(false);
  const productData = useSelector(
    (state: storeState) => state.topDealsReducer.productData,
  );
  const dispatch = useDispatch<AppDispatch>();
  const {loading} = useSelector((state: storeState) => state.topDealsReducer);

  useEffect(() => {
    dispatch(fetchTopProducts());
  }, [dispatch]);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Top Deals for you</Text>
      {loading === 'true' ? (
        <Text>Loading...</Text>
      ) : productData.length === 0 ? (
        <Text>No Products</Text>
      ) : (
        <FlatList
          contentContainerStyle={{paddingBottom: 20}}
          data={productData}
          renderItem={({item}: {item: ProductProps}) => (
            <Product
              discount={item.discount}
              imageSrc={require('../assests/CementBag.png')}
              label={item.label}
              price={item.price}
              discountedPrice={item.discountedPrice}
              id={item.id}
            />
          )}
          keyExtractor={(item, index) => index.toString()}
          ItemSeparatorComponent={() => <View style={{height: 20}} />}
          numColumns={col}
          scrollEnabled
        />
      )}
      <View style={{height: 27}}></View>

      <View style={styles.bottomContainer}>
        <View style={!filterOpen ? {display: 'none'} : {}}>
          <TouchableOpacity
            style={styles.sortButton}
            onPress={() => {
              dispatch(sortByPrice(-1));
              setFilterOpen(!filterOpen);
            }}>
            <Text style={styles.filterText}>High Price to Low Price</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.sortButton}
            onPress={() => {
              dispatch(sortByPrice(1));
              setFilterOpen(!filterOpen);
            }}>
            <Text style={styles.filterText}>Low Price to High Price</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.filterContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => setFilterOpen(!filterOpen)}>
            <Text style={styles.filterText}>SORT</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('TopDealsFilter');
            }}
            style={styles.button2}>
            <Text style={styles.filterText2}>FILTER</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontWeight: 'bold',
    color: '#000',
    fontSize: 20,
    padding: 20,
  },
  bottomContainer: {
    position: 'absolute',
    bottom: 0,
  },
  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  filterText: {
    fontSize: 16,
    color: '#F15927',
  },
  filterText2: {
    fontSize: 16,
    color: '#fff',
  },
  button: {
    width: '50%',
    height: 40,
    borderWidth: 1,
    borderColor: '#C8C9CD',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  button2: {
    width: '50%',
    height: 40,
    borderWidth: 1,
    borderColor: '#C8C9CD',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F15927',
  },
  sortButton: {
    width: '100%',
    paddingVertical: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderColor: '#C8C9CD',
  },
});

export default TopDeals;
