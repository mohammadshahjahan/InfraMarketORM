import React, {useState} from 'react';
import {Image, TouchableOpacity, View} from 'react-native';
import OptionsAddress from './OptionAddress';
import PaymentMode from './PaymentMode';
import Thankyou from './Thankyou';
import ProductSummary from './ProductSummary';

const Address = () => {
  const [shipping, setShipping] = useState<number | undefined>(undefined);
  const [billing, setBilling] = useState<number | undefined>(undefined);
  const [payMethod, setPayMethod] = useState<number | undefined>(undefined);
  const [step, setStep] = useState(1);

  return (
    <>
      {step < 4 && <ProductSummary />}

      {step > 1 && (
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
          />
        )}
        {step >= 4 && <Thankyou />}
      </View>
    </>
  );
};

export default Address;
