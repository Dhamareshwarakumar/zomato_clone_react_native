import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';



const HomeScreen = () => {
    return (
        <View style={styles.container}>
            <Text>HomeScreen</Text>
            <TouchableOpacity
                onPress={() => AsyncStorage.removeItem('@jwtToken')}
            >
            <Text>Logout</Text>
            </TouchableOpacity>
        </View>
    );
};

export default HomeScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});