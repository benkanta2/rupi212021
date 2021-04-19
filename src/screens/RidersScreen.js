import React, { useLayoutEffect, useEffect, useState } from 'react';
import { View, ScrollView, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import RidesList from '../components/rides/RidesList';
import { getAvailableRides } from '../api/ridesApi';
import moment from 'moment';

const RidersScreen = ({ navigation, route }) => {
	const user = route.params;
	const [rides, setRides] = useState([]);
	const [shift, setShift] = useState({ date: moment(), type: 'Evening' });

	useLayoutEffect(() => {
		navigation.setOptions({ headerTitle: 'Schedule Rides' });
	}, []);

	const formatDate = (date) => {
		const dateOfMonth = date.date();
		const dayOfWeek = date.format('dddd');
		const month = date.format('MMMM');
		return `${dateOfMonth} ${month}, ${dayOfWeek}`;
	};

	useEffect(() => {
		const initiateRides = async () => {
			const availableRides = await getAvailableRides(user.userId, shift);
			setRides(availableRides);
		};
		initiateRides();
		formatDate(shift.date);
	}, [shift]);

	return (
		<ScrollView contentContainerStyle={{ flex: 1 }}>
			<View style={styles.dateContainer}>
				<TouchableOpacity onPress={() => setShift({ ...shift, date: shift.date.add(-1, 'days') })}>
					<AntDesign name="arrowleft" size={24} color="black" style={styles.arrowLeft} />
				</TouchableOpacity>
				<Text style={styles.date}>{formatDate(shift.date)}</Text>
				<TouchableOpacity>
					<AntDesign
						name="arrowright"
						size={24}
						color="black"
						style={styles.arrowRight}
						onPress={() => setShift({ ...shift, date: shift.date.add(1, 'days') })}
					/>
				</TouchableOpacity>
			</View>
			<Text style={styles.shiftType}>{shift.type} Shift</Text>
			<RidesList rides={rides} setRides={setRides} user={user} />
		</ScrollView>
	);
};

export default RidersScreen;

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
	},
	arrowLeft: {
		marginRight: 10,
	},
	arrowRight: {
		marginLeft: 10,
	},
	shiftType: {
		fontSize: 16,
		alignSelf: 'center',
	},
});
