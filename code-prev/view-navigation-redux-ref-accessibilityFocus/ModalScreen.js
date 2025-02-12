import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, AccessibilityInfo, findNodeHandle } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { closeModal } from './store';

const ModalScreen = ({ navigation, route }) => {
  const dispatch = useDispatch();
  const modalVisible = useSelector((state) => state.modal.visible);
  const openModalButtonRef = route?.params?.openModalButtonRef; // Get ref from HomeScreen

  useEffect(() => {
    if (!modalVisible) {
      navigation.goBack();
    }
  }, [modalVisible, navigation]);

  const handleCloseModal = () => {
    dispatch(closeModal());

    // Delay focus shift for better accessibility behavior
    setTimeout(() => {
      if (openModalButtonRef?.current) {
        const reactTag = findNodeHandle(openModalButtonRef.current);
        if (reactTag) {
          AccessibilityInfo.setAccessibilityFocus(reactTag);
        }
      }
    }, 100); // Adjust timing if needed
  };

  return (
    <View style={styles.modalContainer}>
      <View style={styles.modalContent}>
        <Text style={styles.modalText}>This is a Modal</Text>
        <TouchableOpacity
          accessibilityLabel="Close Modal"
          accessibilityRole="button"
          style={styles.button}
          onPress={handleCloseModal}
        >
          <Text style={styles.buttonText}>Close Modal</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  modalContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)' },
  modalContent: { width: '80%', padding: 20, backgroundColor: '#fff', borderRadius: 10, alignItems: 'center' },
  modalText: { fontSize: 18, marginBottom: 20 },
  button: { backgroundColor: '#007bff', padding: 10, borderRadius: 5 },
  buttonText: { color: '#fff', fontSize: 16, textAlign: 'center' },
});

export default ModalScreen;