import React, {useState} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {topDealsFilterStyles} from '../../Styles/TopDealsFilterStyles';
import FilterBox from '../Cement/FilterBox';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {rootStackParamList} from '../../App';
import {useDispatch, useSelector} from 'react-redux';
import {
  filterProductsHandler,
  setSelectedParams,
} from '../../features/CementsSlice';
import {storeState} from '../../store/store';

type CementFilterProps = {
  navigation: NativeStackNavigationProp<rootStackParamList>;
};

const CementFilter: React.FC<CementFilterProps> = ({navigation}) => {
  const selectedParams = useSelector(
    (state: storeState) => state.CementReducer.selectedParams,
  );
  const dispatch = useDispatch();
  const [selectedParamsSub, setSelectedParamsSub] = useState(selectedParams);
  const clearAllHandler = () => {
    dispatch(
      setSelectedParams({
        Brand: [],
        Grade: [],
        Weight: [],
        Price: [],
        Rating: [],
      }),
    );
    setSelectedParamsSub({
      Brand: [],
      Grade: [],
      Weight: [],
      Price: [],
      Rating: [],
    });
  };
  return (
    <>
      <View style={topDealsFilterStyles.container}>
        <View style={topDealsFilterStyles.header}>
          <Text style={{fontSize: 17, fontWeight: 500, color: '#000'}}>
            Cement Filters
          </Text>
          <View>
            <TouchableOpacity onPress={() => clearAllHandler()}>
              <Text style={{color: '#DF542E', fontSize: 17}}>CLEAR ALL</Text>
            </TouchableOpacity>
          </View>
        </View>
        <FilterBox
          selectedParams={selectedParamsSub}
          setSelectedParams={setSelectedParamsSub}
        />
      </View>
      <View style={topDealsFilterStyles.filterContainer}>
        <TouchableOpacity
          style={topDealsFilterStyles.button}
          onPress={() => navigation.goBack()}>
          <Text style={topDealsFilterStyles.filterText}>Close</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={topDealsFilterStyles.button2}
          onPress={() => {
            dispatch(setSelectedParams(selectedParamsSub));
            dispatch(filterProductsHandler());
            navigation.goBack();
          }}>
          <Text style={topDealsFilterStyles.filterText2}>Apply</Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

export default CementFilter;
