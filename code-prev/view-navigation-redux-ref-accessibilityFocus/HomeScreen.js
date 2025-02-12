import React, { useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useDispatch } from 'react-redux';
import { openModal } from './store';

const HomeScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const openModalButtonRef = useRef(null); // Ref for the Open Modal button

  const handleOpenModal = () => {
    dispatch(openModal());
    navigation.navigate('Modal', { openModalButtonRef });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.paragraphText}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      </Text>

      <TouchableOpacity
        ref={openModalButtonRef}
        accessibilityLabel="Open Modal"
        accessibilityRole="button"
        accessibilityLiveRegion="polite"
        style={styles.button}
        onPress={handleOpenModal}
      >
        <Text style={styles.buttonText}>Open Modal</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#f5f5f5' },
  button: { backgroundColor: '#007bff', padding: 10, borderRadius: 5 },
  buttonText: { color: '#fff', fontSize: 16, textAlign: 'center' },
  paragraphText: { fontSize: 16, color: '#555', textAlign: 'center' },
});

export default HomeScreen;