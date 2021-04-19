import { rides } from '../demoData/rides';
import { users } from '../demoData/users';

export const getAvailableRides = async (userId, shift) => {
	//add a server call to get the available rides list for this user and shift
	return rides.filter((ride) => ride.shift.date.isSame(shift.date, 'day'));
};

export const joinRide = async (userId, ride) => {
	//update the ride on db
	console.log(userId + ' has joined the ride with ' + ride.driver.name);
};

export const leaveRide = async (userId, ride) => {
	//update the ride on db
	console.log(userId + ' has left the ride with ' + ride.driver.name);
};

export const getPassengers = async (driverId, shift) => {
	//get all the passenger of the current shift and driver
	const myRide = rides.find(
		(ride) =>
			ride.driver.userId === driverId &&
			ride.shift.date.isSame(shift.date, 'day') &&
			ride.shift.type === shift.type
	);
	if (myRide) {
		return myRide.passengers.map((pass) => {
			return { ...pass, user: users.find((user) => pass.userId == user.userId) };
		});
	}
	return [];
};
