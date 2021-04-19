import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { Card } from 'react-native-elements';

const PassengerCard = ({ passenger }) => {
	return (
		<Card>
			<View style={styles.container}>
				<Image resizeMode="cover" source={passenger.user.img} style={styles.img} />
				<Text style={styles.driverName}>{passenger.user.name}</Text>
				<Text style={styles.city}>{passenger.user.city}</Text>
			</View>
			<Text style={styles.joinRide}>{passenger.status}</Text>
		</Card>
	);
};

export default PassengerCard;

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		marginBottom: 10,
	},
	img: {
		height: 70,
		width: 70,
		borderRadius: 70,
		marginRight: 10,
	},
	driverName: {
		borderRightWidth: 0.5,
		borderRightColor: 'rgba(0,0,0,0.5)',
		paddingRight: 5,
		height: 25,
	},
	city: {
		color: 'rgba(0,0,0,0.5)',
		marginLeft: 5,
	},
	joinRide: {
		color: 'green',
		marginLeft: 80,
	},
});
