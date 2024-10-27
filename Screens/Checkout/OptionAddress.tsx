import React from 'react';
import {
  Alert,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {ADDRESS} from '../../assests/ADDRESS';
import {ProductSummaryStyles} from '../../Styles/ProductSummary';
import {QuantityStyles} from '../../Styles/QuantityStyles';
import {OverlayCartStyle} from '../../Styles/OverlayCartStyle';
import {useSelector} from 'react-redux';
import {storeState} from '../../store/store';

interface OptionsAddressProps {
  step: number;
  selectedAddress: string;
  setSelectedAddress: React.Dispatch<React.SetStateAction<string>>;
  label: string;
  setStep: React.Dispatch<React.SetStateAction<number>>;
}

const OptionsAddress: React.FC<OptionsAddressProps> = ({
  label,
  selectedAddress,
  setSelectedAddress,
  step,
  setStep,
}) => {
  const {subTotal, isCouponAdded} = useSelector(
    (state: storeState) => state.CartReducer,
  );
  const discount = isCouponAdded ? 0.2 * subTotal : 0;
  const price = subTotal + 500 - discount;

  const continueHandler = () => {
    if (!selectedAddress) {
      Alert.alert(`Please ${label}`);
      return;
    }
    setStep(step + 1);
  };
  return (
    <View style={[{margin: 10, paddingHorizontal: 5, flex: 1}]}>
      <View style={ProductSummaryStyles.imageContainer}>
        <View
          style={{
            borderRadius: 50,
            backgroundColor: '#f15927',
            paddingHorizontal: 5,
          }}>
          <Text style={{color: '#fff'}}>{step}</Text>
        </View>
        <View>
          <Text style={{color: '#000', fontWeight: '600', fontSize: 15}}>
            {label}
          </Text>
        </View>
      </View>
      <View style={{maxHeight: 420, marginVertical: 15}}>
        <FlatList
          data={ADDRESS}
          renderItem={({item}) => (
            <TouchableOpacity
              style={
                item.name === selectedAddress ? styles.selected : styles.normal
              }
              onPress={() => setSelectedAddress(item.name)}>
              <View>
                <Text
                  style={{color: '#000', fontWeight: '600', marginBottom: 5}}>
                  {item.name}
                </Text>
              </View>
              <View>
                <Text>{item.address}</Text>
              </View>
            </TouchableOpacity>
          )}
          ItemSeparatorComponent={() => <View style={{height: 10}} />}
        />
      </View>
      <View
        style={[
          {
            bottom: 0,
            position: 'absolute',
            width: '100%',
            borderTopWidth: 1,
          },
          QuantityStyles.container,
        ]}>
        <Text style={{fontWeight: '600', fontSize: 15, color: '#000'}}>
          ₹ {price}
        </Text>
        <TouchableOpacity
          onPress={continueHandler}
          style={[
            OverlayCartStyle.button,
            {backgroundColor: '#f15927', marginTop: 5},
          ]}>
          <Text style={{color: '#fff'}}>CONTINUE</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
export default OptionsAddress;

const styles = StyleSheet.create({
  selected: {
    borderWidth: 1,
    borderColor: '#f15927',
    paddingVertical: 10,
    paddingHorizontal: 10,
    backgroundColor: '#fef2ee',
  },
  normal: {
    paddingVertical: 10,
    paddingHorizontal: 10,
    backgroundColor: '#fafafa',
  },
});
