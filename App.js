import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Button, UIManager, findNodeHandle } from 'react-native';
import { NavigationContainer, useFocusEffect, useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const HomeScreen = () => {
  const navigation = useNavigation();
  const [text, onChangeText] = useState('Enter Text');
  const [number, onChangeNumber] = useState('');
  const [count, setCount] = useState(0);

  useEffect(() => {
    console.log('Home Screen: Mounted');
    return () => console.log('Home Screen: Unmounted');
  }, []);

  useEffect(() => console.log('Home Screen: Updated'));

  const targetElementRef = useRef(null);

  // Function to set accessibility focus
  const setAccessibilityFocus = () => {
    console.log("set focus");
    const node = findNodeHandle(targetElementRef.current);
    if (node) {
      UIManager.sendAccessibilityEvent(
        node,
        UIManager.AccessibilityEventTypes.typeViewFocused
      );
    }
  };

  // Use useFocusEffect to set focus when the screen is focused
  useFocusEffect(
    React.useCallback(() => {
      // Do something when the screen is focused
      setAccessibilityFocus();
      return () => {
        // Do something when the screen is unfocused
        // Useful for cleanup functions
      };
    }, [])
  );

  const onPress = () => setCount(prevCount => prevCount + 1);

  return (
    <View style={styles.container}>
      <View style={styles.paragraphContainer}>
        <Text style={styles.paragraphText}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </Text>
      </View>

      <TextInput style={styles.input} onChangeText={onChangeText} value={text} />
      <TextInput style={styles.input} onChangeText={onChangeNumber} value={number} placeholder="useless placeholder" />

      <View style={styles.countContainer}>
        <View style={styles.countText}>
          <Text>Count: {count}</Text>
        </View>
        <TouchableOpacity style={styles.button} onPress={onPress}>
          <Text>Press Here</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.modalButton} onPress={() => navigation.navigate('Details')}>
        <Text style={styles.buttonText}>Go to Details</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.modalButton} onPress={() => navigation.navigate('MyModal')}>
        <Text style={styles.buttonText}>Open Modal</Text>
      </TouchableOpacity>

      <View accessible={true} ref={targetElementRef} style={styles.paragraphContainer}>
        <Text style={styles.paragraphText}>
          Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </Text>
      </View>
    </View>
  );
};

const ModalScreen = () => {
  const navigation = useNavigation();

  return (
    <View style={{ flex: 1, gap: 20, alignItems: 'center', justifyContent: 'center' }}>
      <Text style={{ fontSize: 30 }}>This is a modal!</Text>
      <Button title="Close Modal" onPress={() => navigation.goBack()} />
    </View>
  );
};

const DetailsScreen = () => {
  const navigation = useNavigation();

  return (
    <View style={{ flex: 1, gap: 20, alignItems: 'center', justifyContent: 'center' }}>
      <Text style={{ fontSize: 30 }}>Details</Text>
      <Button title="Go to Details again" onPress={() => navigation.push('Details')} />
      <Button title="Back to Home" onPress={() => navigation.goBack()} />
    </View>
  );
};

const RootStack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <RootStack.Navigator>
        <RootStack.Group>
          <RootStack.Screen name="Home" component={HomeScreen} options={{ title: 'Welcome to My App', headerStyle: { backgroundColor: '#007bff' }, headerTintColor: '#fff', headerTitleStyle: { fontWeight: 'bold' } }} />
          <RootStack.Screen name="Details" component={DetailsScreen} />
        </RootStack.Group>
        <RootStack.Group screenOptions={{ headerShown: false, presentation: 'modal' }}>
          <RootStack.Screen name="MyModal" component={ModalScreen} />
        </RootStack.Group>
      </RootStack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    paddingHorizontal: 20,
  },
  modalButton: {
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 5,
    marginBottom: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
  },
  paragraphContainer: {
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    borderColor: '#FF5733'
  },
  paragraphText: {
    fontSize: 16,
    color: '#FF5733',
    textAlign: 'center',
    lineHeight: 24,
  },
  countContainer: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 10,
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    padding: 10,
  },
  countText: {
    alignItems: 'center',
    padding: 10,
  },
});
