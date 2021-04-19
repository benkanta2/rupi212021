import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, Alert } from 'react-native';
import { Image, Overlay, Button } from 'react-native-elements';
import { signout } from '../api/authApi';

const Profile = ({ route }) => {
	const user = route.params.user;
	const setUser = route.params.setUser;
	const [overlayVisible, setOverlayVisible] = useState(false);

	const handleLogOut = () => {
		Alert.alert('Hi', 'Are you sure you want to signout from your profile?', [
			{ text: 'No, cancel', style: 'cancel' },
			{ text: 'Yes, signout', onPress: () => signout(setUser) },
		]);
	};

	return (
		<View style={styles.container}>
			{overlayVisible ? (
				<Overlay
					isVisible={overlayVisible}
					onBackdropPress={() => setOverlayVisible(false)}
					overlayStyle={{ backgroundColor: 'rgba(255,255,255,0)' }}
					backdropStyle={{ backgroundColor: 'rgba(255,255,255,0)' }}
				>
					<Image source={user.img} containerStyle={styles.overlayImg} />
				</Overlay>
			) : (
				<TouchableOpacity style={styles.imgContainer} onPress={() => setOverlayVisible(true)}>
					<Image source={user.img} containerStyle={styles.img} />
				</TouchableOpacity>
			)}
			<Text style={styles.name}>{user.name}</Text>
			<Button
				buttonStyle={styles.button}
				containerStyle={styles.buttonContainer}
				title="Log Out"
				onPress={() => handleLogOut()}
			/>
		</View>
	);
};

export default Profile;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
	},
	imgContainer: {
		marginTop: 50,
	},
	img: {
		width: 150,
		height: 150,
		borderRadius: 200,
	},
	overlayImg: {
		width: 400,
		height: 400,
		borderRadius: 400,
	},
	name: {
		fontSize: 28,
		fontWeight: 'bold',
		color: 'rgba(0,0,0,0.8)',
	},
	buttonContainer: {
		flex: 2,
		justifyContent: 'center',
	},
	button: {
		height: Dimensions.get('window').height * 0.06,
		width: Dimensions.get('window').width * 0.8,
		borderRadius: 15,
		backgroundColor: '#3f95e0',
	},
});
