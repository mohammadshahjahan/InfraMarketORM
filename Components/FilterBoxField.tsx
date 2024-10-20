import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {topDealsFilterStyles} from '../Styles/TopDealsFilterStyles';
import CheckBox from '@react-native-community/checkbox';

interface FilterBoxFieldProps {
  label: string;
  isSelected: boolean;
  onToggleSelection: (filter: string) => void;
}

const FilterBoxField: React.FC<FilterBoxFieldProps> = ({
  label,
  isSelected,
  onToggleSelection,
}) => {
  return (
    <TouchableOpacity onPress={() => onToggleSelection(label)}>
      <View style={topDealsFilterStyles.filterKeys}>
        <CheckBox
          value={isSelected}
          onValueChange={() => onToggleSelection(label)}
          tintColors={{true: '#F15927'}}
        />
        <Text style={topDealsFilterStyles.filterParamText}>{label}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default FilterBoxField;
