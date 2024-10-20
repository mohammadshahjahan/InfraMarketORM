import React from 'react';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import {CategoryIconStyles} from '../Styles/CategoryIconStyles';

export type ImageKeys =
  | 'Cement'
  | 'Walling Solutions'
  | 'Construction Chemicals'
  | 'Steel'
  | string;

interface CategoryIconProps {
  label: ImageKeys;
  navigation: any;
}

const images: Record<ImageKeys, any> = {
  Cement: require('../assests/cement.png'),
  'Walling Solutions': require('../assests/paint-roller.png'),
  'Construction Chemicals': require('../assests/spray-can.png'),
  Steel: require('../assests/steel.png'),
};

const CategoryIcon: React.FC<CategoryIconProps> = ({label, navigation}) => {
  const imageUrl = images[label];
  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate(label);
      }}>
      <View style={CategoryIconStyles.container}>
        <View style={CategoryIconStyles.backGround}>
          <Image source={imageUrl} />
        </View>
        <Text style={{textAlign: 'center'}}>{label}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default CategoryIcon;
