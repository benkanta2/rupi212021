import React, { useLayoutEffect, useEffect, useState } from "react";
import {
  View,
  ScrollView,
  Text,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import RidesList from "../components/rides/RidesList";
import { getAvailableRides, getUserRides } from "../api/ridesApi";
import { config } from "../config";
import { compareDates, formatDate } from "../helpers";
import { getUserData } from "../api/authApi";
const RidersScreen = ({ navigation, route }) => {
  const user = route.params;
  const [rides, setRides] = useState([]);
  const [shift, setShift] = useState({
    date: config.INITIAL_DATE,
    type: "Evening",
  });
  const [isLoading, setLoading] = useState(true);

  const updateRides = async () => {
    setLoading(true);
    const tempUserRides = await getUserRides(user.Id, user.Is_driver);
    setLoading(false);
    const fixedRidesDateName = [];

    for (let index = 0; index < tempUserRides.length; index++) {
      const userRide = tempUserRides[index];
      userRide.Date = userRide.Trip_date;
      fixedRidesDateName.push(userRide);
    }
    let userDriverID = 0;
    let RelevantRide = getRelevantRides(
      tempUserRides,
      shift.date,
      userDriverID
    );
    if (RelevantRide.length == 1) {
      userDriverID = RelevantRide[0].Driver_id;
    }
    if (userDriverID != 0) {
      let userData = await getUserData(userDriverID);
      RelevantRide[0].driver = userData;
      RelevantRide[0].isUserRegisterd = true;
      setRides(RelevantRide);
    } else {
      setLoading(true);
      const availableRides = await getAvailableRides(user.Id);
      setLoading(false);
      let relevantRides = getRelevantRides(
        availableRides,
        shift.date,
        userDriverID
      );
      relevantRides.sort(
        (ride, ride2) => ride.Ride_opt_score - ride2.Ride_opt_score
      );
      setRides(relevantRides);
    }
  };

  const showLeftArrow = (shift) => {
    let today = new Date();
    if (compareDates(shift, today) && !config.ALLOW_PAST_DATES) {
      return false;
    }
    return true;
  };
  useLayoutEffect(() => {
    navigation.setOptions({ headerTitle: "Schedule Rides" });
  }, []);

  const getRelevantRides = (rides, date, userDriverID) => {
    let relevantRides = [];
    for (let index = 0; index < rides.length; index++) {
      const ride = rides[index];
      if (
        compareDates(ride.Date, date) &&
        (userDriverID == 0 || userDriverID == ride.driver.Id)
      ) {
        relevantRides.push(ride);
      }
    }
    return relevantRides;
  };

  const updateShift = async (newShift) => {
    setLoading(true);
    setShift(newShift);
  };
  useEffect(() => {
    updateRides();
    setLoading(false);
  }, [shift]);

  if (isLoading) {
    return (
      <View>
        <ActivityIndicator size="large" />
      </View>
    );
  }
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
      </View>
      {rides.length > 0 ? (
        <RidesList onUpdate={updateRides} rides={rides} user={user} />
      ) : (
        <View style={styles.container}>
          <Text>אין נהגים זמינים עבורך. פנה למנהל</Text>
        </View>
      )}
    </ScrollView>
  );
};

export default RidersScreen;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
  },
  dateContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
    flexDirection: "row",
  },
  date: {
    fontSize: 20,
    fontWeight: "bold",
  },
  arrowLeft: {
    marginRight: 10,
  },
  arrowRight: {
    marginLeft: 10,
  },
  shiftType: {
    fontSize: 16,
    alignSelf: "center",
  },
});
