import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import HomeScreen from './screens/HomeScreen';
import ReceiptInputScreen from './screens/ReceiptInputScreen';
import ManualInputScreen from './screens/ManualInputScreen';
import SplitDetailsScreen from './screens/SplitDetailsScreen';
import ResultScreen from './screens/ResultScreen';

export type RootStackParamList = {
  Home: undefined;
  ReceiptInput: undefined;
  ManualInput: {items: any};
  SplitDetailsScreen: {numberOfPeople: number; items: any};
  ResultScreen: {billItems: any; splits: any};
};

const Stack = createStackNavigator<RootStackParamList>();

const App: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="ReceiptInput" component={ReceiptInputScreen} />
        <Stack.Screen name="ManualInput" component={ManualInputScreen} />
        <Stack.Screen
          name="SplitDetailsScreen"
          component={SplitDetailsScreen}
        />
        <Stack.Screen name="ResultScreen" component={ResultScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
