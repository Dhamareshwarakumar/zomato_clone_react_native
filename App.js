import React, { useEffect } from 'react';
import {
	View,
	Text,
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { Provider } from 'react-redux';
import axios from 'axios';

import { store } from './src/app/store';

import Navigator from './src/components/Navigator';


const App = () => {
	// Set Axios Base URL
	axios.defaults.baseURL = process.env.REACT_APP_BASE_URI;

	return (
		<Provider store={store}>
			<NavigationContainer>
				<Navigator />
			</NavigationContainer>
		</Provider>
	);
};

export default App;