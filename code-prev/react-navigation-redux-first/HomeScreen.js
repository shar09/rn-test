import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useDispatch } from 'react-redux';
import { openModal, navigate } from './store';

const HomeScreen = ({ navigation }) => {
    const dispatch = useDispatch();

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Home Screen</Text>

            <TouchableOpacity
                accessibilityLabel="Open Modal"
                accessibilityRole="button"
                style={styles.button}
                onPress={() => {
                    dispatch(openModal());
                    navigation.navigate('Modal');
                }}
            >
                <Text style={styles.buttonText}>Open Modal</Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={styles.button}
                onPress={() => {
                    dispatch(navigate('Details'));
                    navigation.navigate('Details');
                }}
            >
                <Text style={styles.buttonText}>Go to Details</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
    button: { backgroundColor: '#007bff', padding: 10, borderRadius: 5, marginVertical: 10 },
    buttonText: { color: '#fff', fontSize: 16 },
    title: { fontSize: 20, fontWeight: 'bold', marginBottom: 20 },
});

export default HomeScreen;
  