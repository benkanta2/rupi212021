import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { Card } from 'react-native-elements';
import { joinRide, leaveRide } from '../../api/ridesApi';

const RideCard = ({ ride, setRide, user, userHasRide }) => {
	//check if the current user belongs to this ride
	const userBelongToRide = ride.passengers.includes(user.userId);

	const handleJoinRide = () => {
		Alert.alert(`Hi ${user.name}`, 'Are you sure you want to join this ride?', [
			{ text: 'No, cancel' },
			{
				text: 'Yes, go for it!',
				onPress: () => {
					const updatedRide = {
						...ride,
						passengers: [...ride.passengers, user.userId],
						availableSeats: ride.availableSeats - 1,
					};
					joinRide(user.userId, updatedRide); //sign the user into the ride on db
					setRide(updatedRide); //update the ride data on the app state
				},
			},
		]);
	};

	const handleLeaveRide = () => {
		Alert.alert(`Hi ${user.name}`, 'Are you sure you want to leave this ride?', [
			{ text: 'No, cancel' },
			{
				text: 'Yes :(',
				onPress: () => {
					const updatedRide = {
						...ride,
						passengers: ride.passengers.filter((pass) => pass != user.userId),
						availableSeats: ride.availableSeats + 1,
					};
					leaveRide(user.userId, updatedRide); //sign the user into the ride on db
					setRide(updatedRide); //update the ride data on the app state
				},
			},
		]);
	};
	//if the user is already signed to some ride on this shift, show only that ride
	return userHasRide && !userBelongToRide ? null : (
		<Card containerStyle={{ backgroundColor: userBelongToRide ? 'rgba(50,200,50,0.2)' : null }}>
			<View style={styles.container}>
				<Image resizeMode="cover" source={ride.driver.img} style={styles.img} />
				<Text style={styles.driverName}>{ride.driver.name}</Text>
				<Text style={styles.seats}>
					{ride.totalSeats - ride.availableSeats}/{ride.totalSeats} Seats
				</Text>
			</View>

			{userBelongToRide ? (
				<View style={styles.userBelongToRide}>
					<Text style={[styles.joinRide, { color: 'green' }]}>Joined</Text>
					<TouchableOpacity onPress={() => handleLeaveRide()}>
						<Text style={styles.leaveRide}>Leave Ride</Text>
					</TouchableOpacity>
				</View>
			) : (
				<TouchableOpacity onPress={() => handleJoinRide()}>
					<Text style={styles.joinRide}>Join Ride</Text>
				</TouchableOpacity>
			)}
		</Card>
	);
};

export default RideCard;

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
	seats: {
		color: 'green',
		marginLeft: 5,
	},
	joinRide: {
		color: '#3f95e0',
		marginLeft: 80,
	},
	userBelongToRide: {
		flexDirection: 'row',
		justifyContent: 'space-between',
	},
	leaveRide: {
		color: 'grey',
	},
});
