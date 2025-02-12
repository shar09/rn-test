import React from 'react';
import { Provider } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import store from './store';
import HomeScreen from './HomeScreen';
import ModalScreen from './ModalScreen';

const Stack = createStackNavigator();

const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen 
            name="Home" 
            component={HomeScreen} 
            options={{ title: 'Welcome to My App' }}
          />
          <Stack.Screen 
            name="Modal" 
            component={ModalScreen} 
            options={{ headerShown: false, presentation: 'modal' }} 
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export default App;