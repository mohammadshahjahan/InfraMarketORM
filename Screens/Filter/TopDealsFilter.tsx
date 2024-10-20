import React, {useState} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {topDealsFilterStyles} from '../../Styles/TopDealsFilterStyles';
import FilterBox from '../../Components/FilterBox';
import {useTopDealsContext} from '../../Providers/TopDealsProvider';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {rootStackParamList} from '../../App';

type TopDealsFilterProps = {
  navigation: NativeStackNavigationProp<rootStackParamList>;
};

const TopDealsFilter: React.FC<TopDealsFilterProps> = ({navigation}) => {
  const {selectedParams, setSelectedParams} = useTopDealsContext();

  const [selectedParamsSub, setSelectedParamsSub] = useState(selectedParams);
  const clearAllHandler = () => {
    setSelectedParams({
      Brand: [],
      Grade: [],
      Weight: [],
      Price: [],
      Rating: [],
    });
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
            Filters
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
            //console.log(selectedParamsSub);
            setSelectedParams(selectedParamsSub);
            //console.log(selectedParams);
            navigation.goBack();
          }}>
          <Text style={topDealsFilterStyles.filterText2}>Apply</Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

export default TopDealsFilter;
