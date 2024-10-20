import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {SpecificationStyles} from '../../Styles/SpecificationStyles';

interface SpecificationProps {
  label: string;
  options: string[];
  setter: React.Dispatch<React.SetStateAction<string>>;
  currOption: string;
}

const Specification: React.FC<SpecificationProps> = ({
  label,
  options,
  setter,
  currOption,
}) => {
  return (
    <View style={SpecificationStyles.container}>
      <View style={SpecificationStyles.label}>
        <Text>{label}</Text>
      </View>
      <View style={SpecificationStyles.options}>
        {options.map((op, ind) => (
          <TouchableOpacity onPress={() => setter(op)} key={ind}>
            <View
              style={
                op === currOption
                  ? SpecificationStyles.activeOption
                  : SpecificationStyles.option
              }>
              <Text style={SpecificationStyles.textOption}>{op}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

export default Specification;
