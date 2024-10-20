import React from 'react';
import {
  Image,
  ImageSourcePropType,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {rootStackParamList} from '../App';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

export interface ProdutProps {
  label: string;
  type?: string;
  price: number;
  discount: boolean;
  discountedPrice: number;
  imageSrc: ImageSourcePropType;
  Brand?: string;
  Grade?: string;
  Weight?: string;
  Price?: string;
  Rating?: string;
  id: number;
}

const Product: React.FC<ProdutProps> = ({
  discount,
  discountedPrice,
  imageSrc,
  label,
  price,
  id,
}) => {
  const navigation =
    useNavigation<NativeStackNavigationProp<rootStackParamList>>();
  return (
    <View style={{width: '50%'}}>
      <TouchableOpacity
        onPress={() => navigation.navigate('Product Details', {id: id})}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Image source={imageSrc} />
        </View>

        <Text style={{textAlign: 'center'}}>{label}</Text>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text
            style={{
              fontWeight: 500,
              color: '#000',
              fontSize: 17,
              textAlign: 'center',
              //borderWidth: 1,
            }}>
            {' '}
            ₹ {discount ? discountedPrice : price}{' '}
          </Text>
          {discount && (
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                //borderWidth: 1,
              }}>
              <Text
                style={{
                  fontSize: 10,
                  textDecorationLine: 'line-through',
                  marginRight: 10,
                }}>
                ₹{price}
              </Text>

              <Sale />
            </View>
          )}
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default Product;

const Sale = () => {
  return (
    <View style={{}}>
      <View style={{backgroundColor: '#F15927', padding: 2, borderRadius: 7}}>
        <Text style={{fontSize: 9, color: '#fff'}}>SALE</Text>
      </View>
    </View>
  );
};
