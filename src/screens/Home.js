import React from 'react';
import {
    StyleSheet,
    Text,
    View
} from 'react-native';

import authenticate from '../utils/authenticate';

const Home = () => {
    return (
        <View>
            <Text>Home</Text>
        </View>
    );
};

export default authenticate(Home);

const styles = StyleSheet.create({});