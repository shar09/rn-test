import * as React from 'react';
import { View, Text, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

function HomeScreen() {
  const navigation = useNavigation();

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text style={{ fontSize: 30 }}>This is the home screen!</Text>
      <Button title="Go to Details" onPress={() => navigation.navigate('Details')} />  
      <Button title="Open Modal" onPress={() => navigation.navigate('MyModal')} />
    </View>
  );
}

function ModalScreen() {
  const navigation = useNavigation();

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text style={{ fontSize: 30 }}>This is a modal!</Text>
      <Button title="Close Modal" onPress={() => navigation.goBack()} />
    </View>
  );
}

function DetailsScreen() {
  const navigation = useNavigation();

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text style={{ fontSize: 30 }}>Details</Text>
      <Button title="Go to Details again" onPress={() => navigation.push('Details')} />  
      <Button title="Back to Home" onPress={() => navigation.goBack()} />
    </View>
  );
}

const RootStack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <RootStack.Navigator>
        <RootStack.Group>
          <RootStack.Screen name="Home" component={HomeScreen} />
          <RootStack.Screen name="Details" component={DetailsScreen} />
        </RootStack.Group>
        <RootStack.Group screenOptions={{ headerShown: false, presentation: 'modal' }}>
          <RootStack.Screen name="MyModal" component={ModalScreen} />
        </RootStack.Group>
      </RootStack.Navigator>
    </NavigationContainer>
  );
}
