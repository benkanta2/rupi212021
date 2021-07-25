import axios from "axios";
import { config } from "../config";
import { getUserData } from "./authApi";
export const getAvailableRides = async (userId) => {
  let url = `${config.SERVER_URL}/api/Alg_trip_options/${userId}`;
  let result = await axios
    .get(url)
    .then(async function ({ data }) {
      if (data) {
        let newData = [];
        for (let index = 0; index < data.length; index++) {
          const ride = data[index];
          let userData = await getUserData(ride.Driver_id);
          ride.driver = userData;
          newData.push(ride);
        }
        return newData;
      } else {
        console.log("error Alg_trip_options");
        return null;
      }
    })
    .catch(function (error) {
      console.log("error");
      console.log(error);
      return null;
    });
  return result;
};

export const joinRide = async (userId, ride) => {
  let url = `${config.SERVER_URL}/api/Passengers`;
  let data = {
    Driver_id: ride.driver.Id,
    Rider_id: userId,
    Trip_date: ride.Date,
  };
  let response = await axios
    .post(url, data)
    .then(function (response) {
      if (response.data == 1) {
        console.log("success");
      } else if (response.data === 0) {
        console.log("Driver unavailable");
        alert("The driver is not available, please select another driver");
      }
      return response.data;
    })
    .catch(function (error) {
      console.log(error);
      alert(error);
      return error;
    });
  return response;
};

export const getUserRides = async (userId, isDriver) => {
  let url = `${config.SERVER_URL}/api/Passenger/${userId}/${isDriver}`;
  let result = await axios.get(url).then(async function ({ data }) {
    return data;
  });
  return result;
};
export const leaveRide = async (userId, ride) => {
  let data = {
    Driver_id: ride.driver.Id,
    Rider_id: userId,
    Trip_date: ride.Date,
  };
  let url = `${config.SERVER_URL}/api/Passengers?pass=${JSON.stringify(data)}`;

  let response = await axios
    .delete(url)
    .then(function (response) {
      return response;
    })
    .catch(function (error) {
      console.log(error);
      alert(error);
      return error;
    });
  return response;
};

export const approveRide = async (ride) => {
  let url = `${config.SERVER_URL}/api/Passengers`;
  let data = {
    Driver_id: ride.Driver_id,
    Rider_id: ride.Rider_id,
    Trip_date: ride.Trip_date,
  };
  let response = await axios
    .put(url, data)
    .then(function (response) {
      console.log("success");
      console.log(response);
      return response;
    })
    .catch(function (error) {
      console.log(error);
      alert(error);
      return error;
    });
  return response;
};

export const getPassengers = async (driverId, shift) => {
  let url = `${config.SERVER_URL}/api/Trips/${driverId}`;
  let result = await axios.get(url).then(async function ({ data }) {
    return data;
  });
  return result;
};

export const getShifts = async (driverId) => {
  let url = `${config.SERVER_URL}/api/Shifts/${driverId}`;
  let result = await axios.get(url).then(async function ({ data }) {
    return data;
  });
  return result;
};
