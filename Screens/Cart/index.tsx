import React from 'react';
import {FlatList, Text, TouchableOpacity, View} from 'react-native';
import Coupon from './Coupon';
import {CartStyles} from '../../Styles/CartStyles';
import Invoice from './Invoice';
import {OverlayCartStyle} from '../../Styles/OverlayCartStyle';
import {QuantityStyles} from '../../Styles/QuantityStyles';
import Items from './Items';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from 'react-native-screens/lib/typescript/native-stack/types';
import {rootStackParamList} from '../../App';
import EmptyCart from './EmptyCart';
import {useSelector} from 'react-redux';
import {storeState} from '../../store/store';

const Cart = () => {
  // const {selectedItems, subTotal, isCouponAdded, setIsCouponAdded} =
  //   useCartContext();

  const {selectedItems, subTotal, isCouponAdded} = useSelector(
    (state: storeState) => state.CartReducer,
  );
  const disCount = isCouponAdded
    ? parseInt((subTotal * 0.2).toFixed(0), 10)
    : 0;

  const {navigate} =
    useNavigation<NativeStackNavigationProp<rootStackParamList>>();
  return (
    <>
      {selectedItems.length === 0 ? (
        <EmptyCart />
      ) : (
        <View style={CartStyles.container}>
          <View style={{maxHeight: 330}}>
            <FlatList
              data={selectedItems}
              renderItem={({item, index}) => (
                <Items
                  BagSize={item.BagSize}
                  Grade={item.Grade}
                  id={item.id}
                  image={item.image}
                  label={item.label}
                  price={item.price}
                  quantity={item.quantity}
                  key={index}
                />
              )}
              keyExtractor={(_, index) => index.toString()}
              ItemSeparatorComponent={() => <View style={{height: 20}} />}
            />
          </View>

          <View style={{}}>
            <Coupon isCouponAdded={isCouponAdded} />
            <Invoice isCouponAdded={isCouponAdded} />
          </View>
          <View style={CartStyles.bottom}>
            <View
              style={[
                QuantityStyles.container,
                {
                  borderTopWidth: 1,
                  marginTop: 10,
                },
              ]}>
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: '600',
                  color: '#000',
                  paddingVertical: 8,
                }}>
                ₹ {subTotal - disCount + 500}{' '}
              </Text>
              <TouchableOpacity
                onPress={() => navigate('Checkout')}
                style={[
                  OverlayCartStyle.button,
                  {backgroundColor: '#f15927', marginTop: 5},
                ]}>
                <Text style={{color: '#fff'}}>CHECKOUT</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      )}
    </>
  );
};

export default Cart;
