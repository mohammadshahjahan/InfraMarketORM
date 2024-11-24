import React, {useState} from 'react';
import {Image, TouchableOpacity, View} from 'react-native';
import OptionsAddress from './OptionAddress';
import PaymentMode from './PaymentMode';
import Thankyou from './Thankyou';
import ProductSummary from './ProductSummary';
import {useSelector} from 'react-redux';
import {storeState} from '../../store/store';
import axios from 'axios';
import {BACKENDURL} from '../../constants';

interface CartItemsProps {
  id: number;
  label: string;
  Grade: string;
  image: any;
  BagSize: string;
  quantity: number;
  price: number;
}

const Address = () => {
  const [shipping, setShipping] = useState<number | undefined>(undefined);
  const [billing, setBilling] = useState<number | undefined>(undefined);
  const [payMethod, setPayMethod] = useState<number | undefined>(undefined);
  const [step, setStep] = useState(1);
  const {selectedItems, subTotal} = useSelector(
    (state: storeState) => state.CartReducer,
  );

  const createCartProduct = (prod: CartItemsProps) => {
    return {
      product: prod.id,
      variant: prod.Grade,
      weight: parseInt(prod.BagSize.substring(0, 2), 10),
      quantity: prod.quantity,
      price: prod.price,
    };
  };

  const placeOrderHandler = async () => {
    const cart = selectedItems.map(prod => createCartProduct(prod));
    const payload = {
      subtotal: subTotal,
      status: true,
      mode: payMethod,
      billing,
      shipping,
      cart,
    };
    await axios.post(BACKENDURL + '/createTransaction', payload);
  };

  return (
    <>
      {step < 4 && <ProductSummary />}

      {step > 1 && step < 4 && (
        <View>
          <TouchableOpacity
            onPress={() => {
              setStep(step - 1);
            }}>
            <Image source={require('../../assests/BackButton.png')} />
          </TouchableOpacity>
        </View>
      )}

      <View style={{flex: 1}}>
        {step === 1 && (
          <OptionsAddress
            label="Select a Shipping Address"
            step={step}
            setStep={setStep}
            selectedAddress={shipping}
            setSelectedAddress={setShipping}
          />
        )}
        {step === 2 && (
          <OptionsAddress
            label="Select a Billing Address"
            step={step}
            setStep={setStep}
            selectedAddress={billing}
            setSelectedAddress={setBilling}
          />
        )}
        {step === 3 && (
          <PaymentMode
            label="Select a Payment Mode"
            step={step}
            setStep={setStep}
            selectedPayment={payMethod}
            setSelectedPayment={setPayMethod}
            placeOrderHandler={placeOrderHandler}
          />
        )}
        {step >= 4 && <Thankyou />}
      </View>
    </>
  );
};

export default Address;
