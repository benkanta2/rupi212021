import React from 'react';
import PassengerCard from './PassengerCard';

const PassengersList = ({ passengers }) => {
	const renderPassengers = () => {
		return passengers.map((passenger, index) => {
			return <PassengerCard key={index} passenger={passenger} />;
		});
	};

	return renderPassengers();
};

export default PassengersList;
