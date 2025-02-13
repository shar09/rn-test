import React, { useState, useEffect } from 'react';
import { Modal, View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// Home Screen Component
const HomeScreen = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [text, onChangeText] = useState('Enter Text');
  const [number, onChangeNumber] = useState('');
  const [count, setCount] = useState(0);

  useEffect(() => {
    console.log('Home Screen: Mounted');
    return () => {
      console.log('Home Screen: Unmounted');
    };
  }, []);

  useEffect(() => {
    console.log('Home Screen: Updated');
  });

  const handleOpenModal = () => {
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
  };

  const onPress = () => setCount(prevCount => prevCount + 1);

  return (
    <View style={styles.container}>
      <View style={styles.paragraphContainer}>
        <Text style={styles.paragraphText}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
        </Text>
      </View>

      <TextInput
        style={styles.input}
        onChangeText={onChangeText}
        value={text}
      />
      <TextInput
        style={styles.input}
        onChangeText={onChangeNumber}
        value={number}
        placeholder="useless placeholder"
      />

      <View style={styles.countContainer}>
        <View style={styles.countText}>
          <Text>Count: {count}</Text>
        </View>
        <TouchableOpacity style={styles.button} onPress={onPress}>
          <Text>Press Here</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        style={styles.modalButton}
        onPress={handleOpenModal}
      >
        <Text style={styles.buttonText}>Open Modal</Text>
      </TouchableOpacity>
      <View style={styles.paragraphContainer}>
        <Text style={styles.paragraphText}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
        </Text>
      </View>

      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={handleCloseModal}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>This is a Modal</Text>
            <TouchableOpacity
              style={styles.modalButton}
              onPress={handleCloseModal}
            >
              <Text style={styles.buttonText}>Close Modal</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

// Create Stack Navigator
const Stack = createStackNavigator();

// App Component
const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{
            title: 'Welcome to My App',
            headerStyle: {
              backgroundColor: '#007bff',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

// Styles
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
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '80%',
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    alignItems: 'center',
  },
  modalText: {
    fontSize: 18,
    marginBottom: 20,
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

export default App;