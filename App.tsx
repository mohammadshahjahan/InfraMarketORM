/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import TopDealsFilter from './Screens/Filter/TopDealsFilter';
import Home from './Screens/Home/index';
import {TopDealsProvider} from './Providers/TopDealsProvider';
import {CementProvider} from './Providers/CementProvider';
import Cement from './Screens/Cement/index';
import CementFilter from './Screens/Filter/CementFilter';
import OutOfStock from './Components/OutOfStock';
import ProductPage from './Screens/ProductPageScreen/index';

export type rootStackParamList = {
  Home: undefined;
  TopDealsFilter: undefined;
  Cement: undefined;
  CementFilter: undefined;
  'Walling Solutions': undefined;
  'Construction Chemicals': undefined;
  Steel: undefined;
  'Product Details': {id: number};
};

function App(): React.JSX.Element {
  const Stack = createNativeStackNavigator<rootStackParamList>();
  return (
    <TopDealsProvider>
      <CementProvider>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Home">
            <Stack.Screen
              name="Home"
              component={Home}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="TopDealsFilter"
              component={TopDealsFilter}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="Cement"
              component={Cement}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="CementFilter"
              component={CementFilter}
              options={{headerShown: false}}
            />
            <Stack.Screen name="Walling Solutions" component={OutOfStock} />
            <Stack.Screen
              name="Construction Chemicals"
              component={OutOfStock}
            />
            <Stack.Screen name="Steel" component={OutOfStock} />
            <Stack.Screen name="Product Details" component={ProductPage} />
          </Stack.Navigator>
        </NavigationContainer>
      </CementProvider>
    </TopDealsProvider>
  );
}

export default App;
