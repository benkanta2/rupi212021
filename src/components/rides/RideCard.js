import React, { useState } from "react";
import { View, Text, StyleSheet, Alert, ActivityIndicator } from "react-native";
import { Card, Button } from "react-native-elements";
import { joinRide, leaveRide } from "../../api/ridesApi";

const RideCard = ({ ride, onUpdate, user, userHasRide, isRideApproved }) => {
  //check if the current user belongs to this ride
  const [isLoading, setIsLoading] = useState(false);
  const handleJoinRide = () => {
    Alert.alert(
      `Hi ${user.F_name}`,
      "Are you sure you want to join this ride?",
      [
        { text: "No, cancel" },
        {
          text: "Yes, go for it!",
          onPress: async () => {
            setIsLoading(true);
            await joinRide(user.Id, ride); //sign the user into the ride on db
            setIsLoading(false);

            onUpdate(); //update the ride data on the app state
          },
        },
      ]
    );
  };

  const getBackGrounColor = () => {
    if (userHasRide && isRideApproved) {
      return "rgba(50,200,50,0.2)";
    }
    if (userHasRide && !isRideApproved) {
      return "orange";
    }
    return null;
  };
  const handleLeaveRide = () => {
    Alert.alert(
      `Hi ${user.F_name}`,
      "Are you sure you want to leave this ride?",
      [
        { text: "No, cancel" },
        {
          text: "Yes :(",
          onPress: async () => {
            setIsLoading(true);
            await leaveRide(user.Id, ride); //sign the user into the ride on db
            onUpdate(); //update the ride data on the app state
            setIsLoading(false);
          },
        },
      ]
    );
  };
  if (isLoading) {
    return (
      <View>
        <ActivityIndicator size="large" />
      </View>
    );
  }
  return (
    <Card
      containerStyle={{
        backgroundColor: getBackGrounColor(),
      }}
    >
      <View style={styles.rowContainter}>
        <View style={styles.container}>
          <Text style={styles.driverName}>
            {ride.driver.F_name} {ride.driver.L_name}
          </Text>
          <Text style={styles.driverName}>0{ride.driver.Phone_num}</Text>
        </View>

        <View style={styles.actionContainer}>
          {userHasRide ? (
            <View style={styles.userBelongToRide}>
              {isRideApproved ? (
                <Text style={[{ color: "green" }]}>Joined</Text>
              ) : (
                <Text style={[{ color: "white" }]}>Waiting for approval</Text>
              )}

              <Button
                buttonStyle={styles.leaveRideButton}
                title="Leave Ride"
                onPress={() => handleLeaveRide()}
              />
            </View>
          ) : (
            <Button
              buttonStyle={styles.button}
              title="Join Ride"
              onPress={() => handleJoinRide()}
            />
          )}
        </View>
      </View>
    </Card>
  );
};

export default RideCard;

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    marginBottom: 10,
  },
  actionContainer: {
    flexDirection: "column",
    marginBottom: 10,
    marginLeft: 150,
  },
  rowContainter: {
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  driverName: {
    borderRightWidth: 0.5,
    borderRightColor: "rgba(0,0,0,0.5)",
    paddingRight: 5,
    height: 25,
  },
  buttonContainer: {
    flex: 2,
    justifyContent: "center",
  },
  button: {
    height: 70,
    width: 100,
    borderRadius: 15,
    backgroundColor: "#3f95e0",
  },
  leaveRideButton: {
    marginTop: 30,
    height: 70,
    width: 130,
    borderRadius: 15,
    borderColor: "white",
    borderWidth: 1,
    backgroundColor: "transparent",
  },

  userBelongToRide: {
    flexDirection: "column",
  },
  leaveRide: {
    color: "grey",
  },
});
