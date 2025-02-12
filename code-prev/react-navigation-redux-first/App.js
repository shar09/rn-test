import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Provider } from 'react-redux';
import store from './store';
import HomeScreen from './HomeScreen';
import DetailsScreen from './DetailsScreen';
import ModalScreen from './ModalScreen';

const Stack = createStackNavigator();

const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Home Screen' }}/>
          <Stack.Screen name="Details" component={DetailsScreen} options={{ title: 'Details Screen' }}/>
          <Stack.Screen name="Modal" component={ModalScreen} options={{ headerShown: false, presentation: 'transparentModal' }} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export default App;
