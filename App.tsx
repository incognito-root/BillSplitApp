import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import HomeScreen from './screens/HomeScreen';
import ReceiptInputScreen from './screens/ReceiptInputScreen';
import ManualInputScreen from './screens/ManualInputScreen';

export type RootStackParamList = {
  Home: undefined;
  ReceiptInput: undefined;
  ManualInput: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

const App: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="ReceiptInput" component={ReceiptInputScreen} />
        <Stack.Screen name="ManualInput" component={ManualInputScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
