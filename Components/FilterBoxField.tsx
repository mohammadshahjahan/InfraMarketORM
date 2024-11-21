import React from 'react';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import {topDealsFilterStyles} from '../Styles/TopDealsFilterStyles';
import CheckBox from '@react-native-community/checkbox';

interface FilterBoxFieldProps {
  label: string;
  isSelected: boolean;
  onToggleSelection: (filter: string) => void;
  isRating: boolean;
}

const FilterBoxField: React.FC<FilterBoxFieldProps> = ({
  label,
  isSelected,
  onToggleSelection,
  isRating,
}) => {
  return (
    <TouchableOpacity onPress={() => onToggleSelection(label)}>
      <View style={topDealsFilterStyles.filterKeys}>
        <CheckBox
          value={isSelected}
          onValueChange={() => onToggleSelection(label)}
          tintColors={{true: '#F15927'}}
        />
        <View style={topDealsFilterStyles.filterParamText}>
          <Text>{label}</Text>
          {isRating && <Image source={require('../assests/Star.png')} />}
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default FilterBoxField;
