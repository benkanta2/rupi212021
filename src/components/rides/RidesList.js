import React, { useEffect } from "react";
import RideCard from "./RideCard";

const RidesList = ({ rides, onUpdate, user }) => {
  //check if the current user belong to some ride
  let userHasRide = false;
  let isApproved = false;
  if (rides.length == 1 && rides[0].isUserRegisterd) {
    for (let index = 0; index < rides.length; index++) {
      const userRide = rides[index];
      if (userRide.Date === rides[0].Date && userRide.IsApproved) {
        isApproved = true;
      }
    }
    userHasRide = true;
  }

  const renderRides = () => {
    return rides.map((ride, index) => {
      return (
        <RideCard
          key={index}
          ride={ride}
          onUpdate={onUpdate}
          user={user}
          userHasRide={userHasRide}
          isRideApproved={isApproved}
        />
      );
    });
  };

  return renderRides();
};

export default RidesList;
