import 'react-native-gesture-handler';
import React from 'react';
import { I18nManager, LogBox } from 'react-native';
import AppNavigator from './src/navigators/AppNavigator';

I18nManager.allowRTL(false);
LogBox.ignoreLogs(['Non-serializable values were found in the navigation state']);

export default function App() {
	return <AppNavigator />;
}
