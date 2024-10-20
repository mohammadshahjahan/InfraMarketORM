import {RouteProp} from '@react-navigation/native';
import React from 'react';
import {Text} from 'react-native';
import {rootStackParamList} from '../App';

type ProductPageProps = {
  route: RouteProp<rootStackParamList, 'Product Details'>;
};

const ProductPage: React.FC<ProductPageProps> = ({route}) => {
  const id = route.params.id;
  return <Text>{id}</Text>;
};

export default ProductPage;
