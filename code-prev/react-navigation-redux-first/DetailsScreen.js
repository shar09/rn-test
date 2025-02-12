import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useDispatch } from 'react-redux';
import { goBack } from './store';

const DetailsScreen = ({ navigation }) => {
    const dispatch = useDispatch();

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Details Screen</Text>

            {/* <TouchableOpacity
                style={styles.button}
                onPress={() => {
                    dispatch(goBack());
                    navigation.goBack();
                }}
            >
                <Text style={styles.buttonText}>Go Back</Text>
            </TouchableOpacity> */}
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
    button: { backgroundColor: '#007bff', padding: 10, borderRadius: 5, marginVertical: 10 },
    buttonText: { color: '#fff', fontSize: 16 },
    title: { fontSize: 20, fontWeight: 'bold', marginBottom: 20 },
});

export default DetailsScreen;