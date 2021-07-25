import React from "react";
import PassengerCard from "./PassengerCard";
import { Text } from "react-native";

const PassengersList = ({ passengers, user, onUpdate }) => {
  const renderPassengers = () => {
    return passengers.map((passenger, index) => {
      return (
        <PassengerCard
          user={user}
          key={index}
          onUpdate={onUpdate}
          passenger={passenger}
        />
      );
    });
  };

  if (passengers.length == 0) {
    return <Text style={{ textAlign: "center" }}>טרם שובצו נוסעים לנסיעה</Text>;
  }
  return renderPassengers();
};

export default PassengersList;
