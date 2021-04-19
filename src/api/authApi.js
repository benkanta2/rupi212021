import AsyncStorage from '@react-native-async-storage/async-storage';
import { users } from '../demoData/users';

export const tryLocalSignIn = async () => {
	//in a real server call, we will save the token returned from server
	try {
		const localUser = JSON.parse(await AsyncStorage.getItem('user'));
		//this line will be deleted on real server call
		return users.find((user) => user.userId == localUser.userId);
	} catch (err) {
		return null;
	}
};

export const signin = (userId, password) => {
	//try to sign in
	try {
		//make some server call to validate userId and password
		//this is a demo response
		const response = users.find((user) => user.userId == userId && user.password === password);
		if (response) AsyncStorage.setItem('user', JSON.stringify(response));
		return response;
	} catch (err) {
		return err;
	}
};

export const signout = (setUser) => {
	AsyncStorage.removeItem('user');
	setUser(null);
};
