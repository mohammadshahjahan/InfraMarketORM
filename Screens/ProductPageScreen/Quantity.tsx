import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {QuantityStyles} from '../../Styles/QuantityStyles';

interface QuantityProps {
  quantity: number;
  setter: React.Dispatch<React.SetStateAction<number>>;
  value: number;
}

const Quantity: React.FC<QuantityProps> = ({quantity, setter, value}) => {
  return (
    <View style={QuantityStyles.container}>
      <View>
        <Text>Quantity</Text>
      </View>
      <View style={QuantityVariableStyles.box}>
        <QuantityVariable quantity={quantity} setter={setter} />
      </View>
      <View style={{flexDirection: 'column', gap: 3}}>
        <Text>Total Value</Text>
        <Text>₹ {value}</Text>
      </View>
    </View>
  );
};

export default Quantity;

interface QuantityVariableProps {
  quantity: number;
  setter: React.Dispatch<React.SetStateAction<number>>;
}

const QuantityVariable: React.FC<QuantityVariableProps> = ({
  quantity,
  setter,
}) => {
  const adder = () => {
    if (quantity >= 100) {
      return;
    }
    setter(prev => prev + 10);
  };
  const subtract = () => {
    if (quantity <= 0) {
      return;
    }
    setter(prev => prev - 10);
  };

  return (
    <View style={QuantityVariableStyles.constainer}>
      <TouchableOpacity
        onPress={adder}
        style={QuantityVariableStyles.operation}>
        <View>
          <Text style={QuantityVariableStyles.text}>+</Text>
        </View>
      </TouchableOpacity>
      <View style={QuantityVariableStyles.value}>
        <Text>{quantity}</Text>
      </View>
      <TouchableOpacity
        onPress={subtract}
        style={QuantityVariableStyles.operation}>
        <View>
          <Text style={QuantityVariableStyles.text}>-</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export const QuantityVariableStyles = StyleSheet.create({
  box: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  constainer: {
    flexDirection: 'row',
    gap: 8,
    alignItems: 'center',
    justifyContent: 'center',
    width: '70%',
  },
  operation: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fef2ee',
    borderRadius: 10,
    width: '30%',
    paddingVertical: 15,
  },
  text: {
    color: '#f15927',
  },
  value: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#f15927',
    borderWidth: 1,
    borderRadius: 10,
    width: '30%',
    paddingVertical: 15,
  },
});
