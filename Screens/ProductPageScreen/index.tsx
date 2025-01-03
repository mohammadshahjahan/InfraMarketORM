import {RouteProp} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {
  ScrollView,
  Text,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import {rootStackParamList} from '../../App';
import {useGetData} from '../../utils/useProductIdUtils';
import Star from './Star';
import {ProductScreenPageStyles} from '../../Styles/ProductPageScreenStyles';
import PriceBox from './PriceBox';
import Specification from './Specification';
import Quantity, {QuantityVariableStyles} from './Quantity';
import ImageContainer from './ImageContainer';
import Header from './Header';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useDispatch} from 'react-redux';
import {addItemToCart} from '../../features/CartSlice';
import axios from 'axios';
import {BACKENDURL} from '../../constants';

type ProductPageProps = {
  route: RouteProp<rootStackParamList, 'Product Details'>;
  navigation: NativeStackNavigationProp<rootStackParamList>;
};

const ProductPage: React.FC<ProductPageProps> = ({route, navigation}) => {
  const id = route.params.id;
  const [product, setProduct] = useState(useGetData(id));
  const skuIdRandom = id.toString();

  const Grade = ['OPC 33', 'UOPC 43', 'OPC 53'];
  const BagSize = ['20 Kg', '30 Kg', '40 Kg', '50 Kg'];
  const [currGrade, setCurrGrade] = useState(Grade[0]);
  const [currBagSize, setCurrBagSize] = useState(BagSize[0]);

  const [quantity, setQuantity] = useState(0);
  const [amount, setAmount] = useState(0);

  const dispatch = useDispatch();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const fetchProductDetails = async () => {
      const res = await axios.get(
        BACKENDURL +
          `/getProduct?product_id=${id}&bagSize=${currBagSize.substring(
            0,
            2,
          )}&grade=${currGrade}`,
      );
      setProduct(prevProduct => ({
        ...prevProduct,
        discountedPrice: res.data.discountedPrice,
        price: res.data.price,
        rating: res.data.rating,
      }));
      //  {"brand": "ACC", "discount": true, "discountedPrice": 200, "grade": "OPC 33", "id": 2, "imageSrc": "https://raw.githubusercontent.com/mohammadshahjahan/InfraMarketORM/refs/heads/main/assests/CementBag.png", "label": "ACC Concrete Plus", "price": 420, "rating": "0", "type": "Cement", "weight": "20 Kg"}
      console.log('hi', res.data);
      setLoading(false);
    };
    fetchProductDetails();
  }, [currBagSize, currGrade, id]);

  useEffect(() => {
    const price = product.discount ? product.discountedPrice : product.price;
    setAmount(price * quantity);
  }, [quantity, product.discount, product.discountedPrice, product.price]);

  const alertSuccess = () => {
    ToastAndroid.show('Item added successfully!', ToastAndroid.SHORT);
  };

  useEffect(() => {
    setQuantity(0);
    setAmount(0);
  }, [currBagSize, currGrade]);

  return (
    <>
      <Header navigation={navigation} />
      <ScrollView style={{zIndex: -10}}>
        <View style={{paddingHorizontal: 20, backgroundColor: '#fff'}}>
          <ImageContainer />
          <View style={{flexDirection: 'row', gap: 20}}>
            <ProductLabels label="SKU ID" value={skuIdRandom} />
            <ProductLabels label="Brand" value={product.brand} />
          </View>
          <View>
            <Text style={{fontWeight: 600, fontSize: 25, color: '#000'}}>
              {product.label}
            </Text>
          </View>
          <View style={ProductScreenPageStyles.ratingContaner}>
            <View style={ProductScreenPageStyles.reviewContainer}>
              <Star star={parseInt(product.rating.substring(0, 1), 10)} />
              <Text>
                {' '}
                <Text style={{fontWeight: 600}}>
                  {product.rating.substring(0, 1)}
                </Text>
                (<Text>1 Reviews</Text>)
              </Text>
            </View>
            <TouchableOpacity>
              <View>
                <Text style={{color: '#F15927'}}>WRITE A REVIEW</Text>
              </View>
            </TouchableOpacity>
          </View>
          <View>
            {loading ? (
              <Text>Loading...</Text>
            ) : (
              <PriceBox
                discount={product.discount}
                discountedPrice={product.discountedPrice}
                price={product.price}
              />
            )}
          </View>
          <View
            style={{
              paddingBottom: 15,
              marginBottom: 15,
              borderBottomWidth: 1,
              borderBottomColor: '#e3e3e3',
            }}>
            <Specification
              label={'Grade'}
              options={Grade}
              setter={setCurrGrade}
              currOption={currGrade}
            />
            <View style={{height: 10}}></View>
            <Specification
              label={'Bag Size'}
              options={BagSize}
              setter={setCurrBagSize}
              currOption={currBagSize}
            />
          </View>
          <View
            style={{
              paddingBottom: 15,
              marginBottom: 15,
              borderBottomWidth: 1,
              borderBottomColor: '#e3e3e3',
              flexDirection: 'row',
              gap: 15,
              alignItems: 'center',
            }}>
            <View style={{flexDirection: 'column', gap: 10}}>
              <Text>In Stock</Text>
              <Text style={{fontWeight: 600}}>100</Text>
            </View>
            <View style={{flexDirection: 'column', gap: 10}}>
              <Text>Min Order Quantity</Text>
              <Text style={{fontWeight: 600}}>10</Text>
            </View>
            <View style={{flexDirection: 'column', gap: 10}}>
              <Text>Max Order Quantity</Text>
              <Text style={{fontWeight: 600}}>100</Text>
            </View>
          </View>
          {loading ? (
            <Text>Loading...</Text>
          ) : (
            <>
              <View>
                <Quantity
                  quantity={quantity}
                  setter={setQuantity}
                  value={amount}
                />
              </View>
              <View style={[QuantityVariableStyles.box]}>
                <TouchableOpacity
                  style={[QuantityVariableStyles.box]}
                  onPress={() => {
                    dispatch(
                      addItemToCart({
                        id: id,
                        Grade: currGrade,
                        BagSize: currBagSize,
                        quantity: quantity,
                        inventoryItem: [product],
                      }),
                    );
                    alertSuccess();
                  }}>
                  <View
                    style={[
                      QuantityVariableStyles.box,
                      ProductScreenPageStyles.button,
                    ]}>
                    <Text style={{color: '#fff', fontSize: 20}}>
                      ADD TO CART
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
            </>
          )}
        </View>
      </ScrollView>
    </>
  );
};

export default ProductPage;

interface ProductLabelsProps {
  label: string;
  value: string;
}

const ProductLabels: React.FC<ProductLabelsProps> = ({label, value}) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
        paddingVertical: 10,
      }}>
      <View>
        <Text>{label}</Text>
      </View>
      <View>
        <Text style={{fontWeight: 600, fontSize: 17}}>{value}</Text>
      </View>
    </View>
  );
};
