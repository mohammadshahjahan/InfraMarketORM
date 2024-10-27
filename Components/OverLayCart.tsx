import React from 'react';
import {FlatList, Text, TouchableOpacity, View} from 'react-native';
import {OverlayCartStyle} from '../Styles/OverlayCartStyle';
import {QuantityStyles} from '../Styles/QuantityStyles';
import OverLayCartItem from './OverLayCartItem';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {rootStackParamList} from '../App';
import {useSelector} from 'react-redux';
import {storeState} from '../store/store';

interface OverLayCartProps {
  setOpenOverlay: React.Dispatch<React.SetStateAction<boolean>>;
}

const OverLayCart: React.FC<OverLayCartProps> = ({setOpenOverlay}) => {
  const {selectedItems} = useSelector((state: storeState) => state.CartReducer);
  const navigation =
    useNavigation<NativeStackNavigationProp<rootStackParamList>>();
  return (
    <View style={OverlayCartStyle.container}>
      <View style={OverlayCartStyle.header}>
        <Text style={OverlayCartStyle.headerText}>
          {selectedItems.length} Items added to cart
        </Text>
        <TouchableOpacity onPress={() => setOpenOverlay(false)}>
          <Text>✖</Text>
        </TouchableOpacity>
      </View>

      <View style={OverlayCartStyle.body}>
        <View style={{height: 150}}>
          <FlatList
            data={selectedItems}
            ItemSeparatorComponent={() => <View style={{height: 10}} />}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({item, index}) => (
              <OverLayCartItem
                BagSize={item.BagSize}
                Grade={item.Grade}
                image={item.image}
                label={item.label}
                price={item.price}
                quantity={item.quantity}
                key={index}
              />
            )}
            style={{marginBottom: 10}}
          />
        </View>
        <View style={QuantityStyles.container}>
          <TouchableOpacity
            style={[OverlayCartStyle.button]}
            onPress={() => {
              setOpenOverlay(false);
              navigation.navigate('Your Cart');
            }}>
            <Text style={{color: '#f15927'}}>VIEW CART</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setOpenOverlay(false);
              navigation.navigate('Checkout');
            }}
            style={[OverlayCartStyle.button, {backgroundColor: '#f15927'}]}>
            <Text style={{color: '#fff'}}>CHECKOUT</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default OverLayCart;
