import React from 'react';
import RideCard from './RideCard';

const RidesList = ({ rides, setRides, user }) => {
	//check if the current user belong to some ride
	const userHasRide = rides.find((ride) => ride.passengers.includes(user.userId));

	const updateRides = (updatedRide) => {
		const updatedRides = rides.map((ride) => {
			return ride.id === updatedRide.id ? updatedRide : ride;
		});
		setRides(updatedRides);
	};

	const renderRides = () => {
		return rides.map((ride, index) => {
			return <RideCard key={index} ride={ride} setRide={updateRides} user={user} userHasRide={userHasRide} />;
		});
	};

	return renderRides();
};

export default RidesList;
