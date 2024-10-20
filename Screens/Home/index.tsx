import React from 'react';
import {StatusBar, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Catalog from '../Catalog';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {rootStackParamList} from '../../App';

type HomeProps = {
  navigation: NativeStackNavigationProp<rootStackParamList>;
};

const Home: React.FC<HomeProps> = ({navigation}) => {
  return (
    <View style={{height: '100%'}}>
      <SafeAreaView style={{backgroundColor: '#fff'}}>
        <StatusBar barStyle="dark-content" backgroundColor="#fff" />
        <Catalog navigation={navigation} />
      </SafeAreaView>
    </View>
  );
};

export default Home;
