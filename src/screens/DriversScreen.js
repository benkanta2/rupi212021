import React, { useState, useEffect } from "react";
import {
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Text,
  View,
  ActivityIndicator,
} from "react-native";
import PassengersList from "../components/passengers/PassengersList";
import { AntDesign } from "@expo/vector-icons";
import { getPassengers, getShifts } from "../api/ridesApi";
import { config } from "../config";
import { compareDates, formatDate, shiftEncoder } from "../helpers";

const DriversScreen = ({ route }) => {
  const user = route.params;
  const [shift, setShift] = useState({
    date: config.INITIAL_DATE,
    type: "Evening",
    isWorking: true,
  });
  const [rides, setRides] = useState([]);
  const [isLoading, setLoading] = useState(true);

  const [todayPassengers, setTodayPassengers] = useState([]);

  const getTodayPassengers = (rides) => {
    if (rides.length == 0) {
      return [];
    }
    let ride = rides.find((ride) => compareDates(ride.Trip_date, shift.date));

    if (ride) {
      return ride.LPassengers;
    }
    return [];
  };
  const updateShift = async (newShift) => {
    setLoading(true);
    const myShifts = await getShifts(user.Id);

    setShift(getTodayShift(myShifts, newShift));
  };
  const getTodayShift = (shifts, newShift) => {
    if (shifts.length === 0) {
      alert("error getting shifts");
      return newShift;
    } else {
      let currentShift = shifts.find((ride) =>
        compareDates(ride.Shift_date, shift.date)
      );
      let isWorking = false;
      let type = "";

      if (currentShift) {
        isWorking = true;
        type = shiftEncoder(currentShift.Shift_type);
      }
      return { ...newShift, type: type, isWorking: isWorking };
    }
  };
  const showLeftArrow = (shift) => {
    return !compareDates(shift, rides[0].Trip_date);
  };
  const showRightArrow = (shift) => {
    return !compareDates(shift, rides[rides.length - 1].Trip_date);
  };
  const onUpdate = () => {
    initiatePassengers();
  };
  const initiatePassengers = async () => {
    const myRides = await getPassengers(user.Id);
    setLoading(false);
    setRides(myRides);
    setTodayPassengers(getTodayPassengers(myRides));
  };
  useEffect(() => {
    initiatePassengers();
  }, [shift]);

  if (isLoading) {
    return (
      <View>
        <ActivityIndicator size="large" />
      </View>
    );
  }
  if (rides.length > 0) {
    return (
      <ScrollView contentContainerStyle={{ flex: 1 }}>
        <View style={styles.dateContainer}>
          {showLeftArrow(shift.date) && (
            <TouchableOpacity
              onPress={() =>
                updateShift({ ...shift, date: shift.date.add(-1, "days") })
              }
            >
              <AntDesign
                name="arrowleft"
                size={24}
                color="black"
                style={styles.arrowLeft}
              />
            </TouchableOpacity>
          )}
          <Text style={styles.date}>{formatDate(shift.date)}</Text>
          {showRightArrow(shift.date) && (
            <TouchableOpacity>
              <AntDesign
                name="arrowright"
                size={24}
                color="black"
                style={styles.arrowRight}
                onPress={() =>
                  updateShift({ ...shift, date: shift.date.add(1, "days") })
                }
              />
            </TouchableOpacity>
          )}
        </View>
        {shift.isWorking ? (
          <View>
            <View style={styles.shiftDetails}>
              <Text style={styles.shiftType}>{shift.type} Shift</Text>
              <Text style={styles.seats}>
                {todayPassengers.length}/{user.Seats} passengers
              </Text>
            </View>
            <PassengersList
              onUpdate={onUpdate}
              user={user}
              passengers={todayPassengers}
            />
          </View>
        ) : (
          <Text>לא שובצת לעבודה היום</Text>
        )}
      </ScrollView>
    );
  } else {
    return <Text>Loading... </Text>;
  }
};

export default DriversScreen;

const styles = StyleSheet.create({
  dateContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
    flexDirection: "row",
  },
  date: {
    fontSize: 20,
    fontWeight: "bold",
    borderRightWidth: 0.5,
    borderRightColor: "rgba(0,0,0,0.7)",
    paddingRight: 5,
    height: 30,
  },
  shiftDetails: {
    alignItems: "center",
  },
  seats: {
    marginLeft: 5,
  },
});
