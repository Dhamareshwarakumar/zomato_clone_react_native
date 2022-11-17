import React, { useEffect, useState } from 'react';
import { Linking, Text, View } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useSelector, useDispatch } from 'react-redux';
import jwt_decode from 'jwt-decode';


// Screens
import HomeScreen from '../screens/HomeScreen';
import LoginScreen from '../screens/LoginScreen';

import { login } from '../features/authSlice';


const RootStack = createNativeStackNavigator();
const RootStackNavigator = ({ isAuthenticated }) => (
    <RootStack.Navigator>
        {isAuthenticated ? (
            <RootStack.Screen
                name="Home"
                component={HomeScreen}
                options={{
                    headerShown: false,
                }}
            />
        ) : (
            <RootStack.Screen
                name="Login"
                component={LoginScreen}
                options={{
                    headerShown: false,
                }}
            />
        )}
    </RootStack.Navigator>
)

const Navigator = () => {
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated);

    useEffect(() => {
        Linking.addEventListener('url', handleOpenURL);
    }, []);

    const handleOpenURL = ({ url }) => {
        if (url.indexOf("?token") !== -1) {
            const token = url.split("?token=")[1];
            const email = jwt_decode(token).email;
            dispatch(login({ token, email  }));
        }
    };

    const getData = async () => {
        setLoading(true);
		try {
			const token = await AsyncStorage.getItem('@jwtToken')
			
			if(token !== null) {
				const decoded = jwt_decode(token);
				dispatch(login({
					email: decoded.email,
					token
				}));
			}
		} catch(e) {
			console.error(e)
		}
        setLoading(false);
	}

    useEffect(() => {
        getData();
    }, []);

    return (
        loading ? (
            <Text>Loading</Text>
        ) : (
            <RootStackNavigator isAuthenticated={isAuthenticated} />
        )
        
    );
};

export default Navigator;
