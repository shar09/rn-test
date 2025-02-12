import React, { useRef, useState } from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet, AccessibilityInfo, findNodeHandle } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// Home Screen Component
const HomeScreen = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const openModalButtonRef = useRef(null); // Ref for the "Open Modal" button

  const handleOpenModal = () => {
    setModalVisible(true); // Open the modal
  };

  const handleCloseModal = () => {
    setModalVisible(false); // Close the modal
    
    // Focus the "Open Modal" button after the modal is closed
    if (openModalButtonRef.current) {
      const reactTag = findNodeHandle(openModalButtonRef.current);
      if (reactTag) {
        AccessibilityInfo.setAccessibilityFocus(reactTag);
      }
    }
  };

  return (
    <View style={styles.container}>
        <View style={styles.paragraphContainer}>
        <Text style={styles.paragraphText}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
        </Text>
      </View>

      {/* Open Modal Button */}
      <TouchableOpacity
        ref={openModalButtonRef}
        style={styles.button}
        onPress={handleOpenModal}
      >
        <Text style={styles.buttonText}>Open Modal</Text>
      </TouchableOpacity>

      <View style={styles.paragraphContainer}>
        <Text style={styles.paragraphText}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
        </Text>
      </View>

      {/* Modal */}
      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={handleCloseModal}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>This is a Modal</Text>

            {/* Close Modal Button */}
            <TouchableOpacity
              style={styles.button}
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
            title: 'Welcome to My App', // Navbar title
            headerStyle: {
              backgroundColor: '#007bff', // Navbar background color
            },
            headerTintColor: '#fff', // Navbar text color
            headerTitleStyle: {
              fontWeight: 'bold', // Navbar title font weight
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
  button: {
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
  paragraphText: {
    fontSize: 16,
    color: '#555',
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
});

export default App;