import React, {useState} from 'react';
import {FlatList, Text, TouchableOpacity, View} from 'react-native';
import Coupon from './Coupon';
import {useCartContext} from '../../Providers/CartProvider';
import {CartStyles} from '../../Styles/CartStyles';
import Invoice from './Invoice';
import {OverlayCartStyle} from '../../Styles/OverlayCartStyle';
import {QuantityStyles} from '../../Styles/QuantityStyles';
import Items from './Items';

const Cart = () => {
  const [isCouponAdded, setIsCouponAdded] = useState(true);
  const {selectedItems, subTotal} = useCartContext();
  const disCount = isCouponAdded
    ? parseInt((subTotal * 0.2).toFixed(0), 10)
    : 0;
  return (
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
        <Coupon
          isCouponAdded={isCouponAdded}
          setIsCouponAdded={setIsCouponAdded}
        />
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
            style={[
              OverlayCartStyle.button,
              {backgroundColor: '#f15927', marginTop: 5},
            ]}>
            <Text style={{color: '#fff'}}>CHECKOUT</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default Cart;
