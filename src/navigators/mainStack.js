import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { Icon, Image } from 'react-native-elements';
import { mainDrawer } from './mainDrawer';
import { DrawerActions } from '@react-navigation/native';
import Profile from '../screens/Profile';

const Stack = createStackNavigator();

export const mainStack = (user, setUser) => {
	const headerLeft = (navigation) => (
		<TouchableOpacity onPress={() => navigation.dispatch(DrawerActions.openDrawer())}>
			<Icon name="menu" type="material" size={30} />
		</TouchableOpacity>
	);

	const headerRight = (navigation) => (
		<TouchableOpacity onPress={() => navigation.navigate('My Profile', { user: user, setUser: setUser })}>
			<Image
				source={user.img}
				containerStyle={{
					width: 40,
					height: 40,
					borderRadius: 40,
				}}
			/>
		</TouchableOpacity>
	);

	const mainOptions = ({ navigation }) => {
		return {
			headerTitleStyle: styles.headerTitleStyle,
			headerTitleContainerStyle: styles.headerTitleContainerStyle,
			headerLeftContainerStyle: styles.headerLeftContainerStyle,
			headerRightContainerStyle: styles.headerRightContainerStyle,
			headerLeft: () => headerLeft(navigation),
			headerRight: () => headerRight(navigation),
		};
	};

	const profileOptions = ({ navigation }) => {
		return {
			headerTitleStyle: styles.headerTitleStyle,
			headerTitleContainerStyle: styles.headerTitleContainerStyle,
			headerRightContainerStyle: styles.headerRightContainerStyle,
			headerRight: () => headerRight(navigation),
		};
	};

	return (
		<Stack.Navigator>
			<Stack.Screen name="main" component={mainDrawer} options={mainOptions} initialParams={user} />
			<Stack.Screen name="My Profile" component={Profile} options={profileOptions} initialParams={setUser} />
		</Stack.Navigator>
	);
};

const styles = StyleSheet.create({
	headerTitleStyle: {
		flex: 1,
		alignSelf: 'center',
	},
	headerTitleContainerStyle: {
		left: 0,
		right: 0,
		zIndex: 1,
	},
	headerLeftContainerStyle: {
		marginLeft: 10,
		zIndex: 2,
	},
	headerRightContainerStyle: {
		marginRight: 10,
		zIndex: 2,
	},
});
