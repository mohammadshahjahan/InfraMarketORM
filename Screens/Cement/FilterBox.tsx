import React, {useState} from 'react';
import {FlatList, Text, TouchableOpacity, View} from 'react-native';
import {FILTER_PARAMS, FilterHeadings} from '../../assests/FILTER_PARAM';
import {topDealsFilterStyles} from '../../Styles/TopDealsFilterStyles';
import FilterBoxField from '../../Components/FilterBoxField';
import {selectedParamsType} from '../../Providers/CementProvider';

interface FilterBoxProps {
  selectedParams: selectedParamsType;
  setSelectedParams: React.Dispatch<React.SetStateAction<selectedParamsType>>;
}

const FilterBox: React.FC<FilterBoxProps> = ({
  selectedParams,
  setSelectedParams,
}) => {
  const [selectedFilter, setSelectedFilter] = useState<
    'Brand' | 'Grade' | 'Weight' | 'Price' | 'Rating'
  >('Brand');
  const [filters, setFilters] = useState(FILTER_PARAMS[0][selectedFilter]);

  const selectParamHandler = (
    s: 'Brand' | 'Grade' | 'Weight' | 'Price' | 'Rating',
  ) => {
    setSelectedFilter(s);
    setFilters(FILTER_PARAMS[0][s]);
  };

  const toggleSelection = (filter: string) => {
    setSelectedParams(prevState => {
      const currentSelection = prevState[selectedFilter];
      if (currentSelection.includes(filter)) {
        return {
          ...prevState,
          [selectedFilter]: currentSelection.filter(item => item !== filter),
        };
      } else {
        return {
          ...prevState,
          [selectedFilter]: [...currentSelection, filter],
        };
      }
    });
  };

  return (
    <View style={topDealsFilterStyles.filterBox}>
      <View style={{width: '40%', backgroundColor: '#f6f6f6'}}>
        <FlatList
          data={FilterHeadings}
          renderItem={({
            item,
          }: {
            item: 'Brand' | 'Grade' | 'Weight' | 'Price' | 'Rating';
          }) => (
            <FilterParam
              label={item}
              selected={selectedFilter}
              onClickHandler={selectParamHandler}
            />
          )}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
      <View style={{width: '60%'}}>
        <FlatList
          data={filters}
          renderItem={({item}) => (
            <FilterBoxField
              label={item}
              isSelected={selectedParams[selectedFilter].includes(item)}
              onToggleSelection={toggleSelection}
              isRating={selectedFilter === 'Rating'}
            />
          )}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
    </View>
  );
};

export default FilterBox;

const FilterParam: React.FC<{
  label: 'Brand' | 'Grade' | 'Weight' | 'Price' | 'Rating';
  selected: string;
  onClickHandler: (
    s: 'Brand' | 'Grade' | 'Weight' | 'Price' | 'Rating',
  ) => void;
}> = ({label, onClickHandler, selected}) => {
  return (
    <TouchableOpacity onPress={() => onClickHandler(label)}>
      <View
        style={
          selected === label
            ? topDealsFilterStyles.filterParamsActive
            : topDealsFilterStyles.filterParams
        }>
        <Text
          style={
            selected === label
              ? topDealsFilterStyles.filterParamActiveText
              : topDealsFilterStyles.filterParamText
          }>
          {label}
        </Text>
      </View>
    </TouchableOpacity>
  );
};
