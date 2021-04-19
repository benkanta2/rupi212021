import React, { useState, useEffect } from 'react';
import { ActivityIndicator } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { mainStack } from './mainStack';
import LoginScreen from '../screens/LoginScreen';
import { tryLocalSignIn } from '../api/authApi';

const AppNavigator = () => {
	const [user, setUser] = useState(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		setTimeout(async () => {
			const user = await tryLocalSignIn();
			setUser(user);
			setLoading(false);
		}, 1000);
	}, []);

	return loading ? (
		<ActivityIndicator style={{ flex: 1 }} size="large" color="blue" />
	) : user ? (
		<NavigationContainer>{mainStack(user, setUser)}</NavigationContainer>
	) : (
		<LoginScreen setUser={setUser} setLoading={setLoading} />
	);
};

export default AppNavigator;
