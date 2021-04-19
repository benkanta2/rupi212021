import React, { useState, useEffect } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import PassengersList from '../components/passengers/PassengersList';
import moment from 'moment';
import { getPassengers } from '../api/ridesApi';

const DriversScreen = ({ route }) => {
	const user = route.params;
	const shift = { date: moment(), type: 'Evening' }; //initiate the current shift
	const [passengers, setPassengers] = useState([]);

	const formatDate = (date) => {
		const dateOfMonth = date.date();
		const dayOfWeek = date.format('dddd');
		const month = date.format('MMMM');
		return `${dateOfMonth} ${month}, ${dayOfWeek}`;
	};

	useEffect(() => {
		const initiatePassengers = async () => {
			const myPassengers = await getPassengers(user.userId, shift);
			setPassengers(myPassengers);
		};
		initiatePassengers();
	}, []);

	return (
		<ScrollView contentContainerStyle={{ flex: 1 }}>
			<View style={styles.dateContainer}>
				<Text style={styles.date}>{formatDate(shift.date)}</Text>
				<Text style={styles.seats}>{passengers.length}/4 passengers</Text>
			</View>
			<PassengersList passengers={passengers} />
		</ScrollView>
	);
};

export default DriversScreen;

const styles = StyleSheet.create({
	dateContainer: {
		justifyContent: 'center',
		alignItems: 'center',
		marginTop: 20,
		flexDirection: 'row',
	},
	date: {
		fontSize: 20,
		fontWeight: 'bold',
		borderRightWidth: 0.5,
		borderRightColor: 'rgba(0,0,0,0.7)',
		paddingRight: 5,
		height: 30,
	},
	seats: {
		marginLeft: 5,
	},
});
