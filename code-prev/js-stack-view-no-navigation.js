import React, { useRef, useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  AccessibilityInfo,
  findNodeHandle
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// Home Screen Component
const HomeScreen = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const openModalButtonRef = useRef(null);
  const modalContentRef = useRef(null);

  const handleOpenModal = () => {
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
    // Restore accessibility focus to the "Open Modal" button after closing the modal.
    setTimeout(() => {
      if (openModalButtonRef.current) {
        const reactTag = findNodeHandle(openModalButtonRef.current);
        if (reactTag) {
          AccessibilityInfo.setAccessibilityFocus(reactTag);
        }
      }
    }, 100);
  };

  // When the modal becomes visible, shift the accessibility focus to the modal content.
  useEffect(() => {
    if (modalVisible) {
      const timeout = setTimeout(() => {
        if (modalContentRef.current) {
          const reactTag = findNodeHandle(modalContentRef.current);
          if (reactTag) {
            AccessibilityInfo.setAccessibilityFocus(reactTag);
          }
        }
      }, 100);
      return () => clearTimeout(timeout);
    }
  }, [modalVisible]);

  return (
    <View style={styles.outerContainer}>
      {/* 
        Wrap the main content in a view that can be hidden from accessibility 
        when the modal is visible. 
      */}
      <View
        style={styles.container}
        accessibilityElementsHidden={modalVisible} // Hides children from accessibility when modal is open
        importantForAccessibility={modalVisible ? 'no-hide-descendants' : 'auto'} // Prevents VoiceOver from traversing children
      >
        <View style={styles.paragraphContainer}>
          <Text style={styles.paragraphText}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
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
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </Text>
        </View>
      </View>

      {/* Custom "Modal" implemented as an overlaying View */}
      {modalVisible && (
        <View
          style={styles.customModal}
          accessibilityViewIsModal={true} // Tells VoiceOver that this is a modal view.
        >
          <View style={styles.modalContent} ref={modalContentRef}>
            <Text style={styles.modalText}>This is a custom modal</Text>
            {/* Close Modal Button */}
            <TouchableOpacity style={styles.button} onPress={handleCloseModal}>
              <Text style={styles.buttonText}>Close Modal</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
};

// Create Stack Navigator
const Stack = createStackNavigator();

// Main App Component
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
  outerContainer: {
    flex: 1,
  },
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
  customModal: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
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


// Hiding Underlying Elements from Accessibility:
// By setting accessibilityElementsHidden={modalVisible} and importantForAccessibility={modalVisible ? 'no-hide-descendants' : 'auto'} on the main content container, the "Open Modal" button and other background elements will be hidden from VoiceOver when the modal is visible. This prevents VoiceOver from first focusing on them.

// Modal is Clearly Marked:
// The modal overlay has accessibilityViewIsModal={true}, so VoiceOver knows it should focus solely on the modal’s contents.

// Explicit Focus Management:
// The useEffect hook and setTimeout calls ensure that once the modal is rendered, focus is moved to the modal content (e.g., its title) as quickly as possible.