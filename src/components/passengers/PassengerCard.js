import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Alert, ActivityIndicator } from "react-native";
import { Icon, Card, Button } from "react-native-elements";
import { getUserData } from "../../api/authApi";
import { approveRide } from "../../api/ridesApi";
const PassengerCard = ({ passenger, user, onUpdate }) => {
  const [passengerDetails, setPassengerDetails] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const getPassengerData = async () => {
    setIsLoading(true);
    let data = await getUserData(passenger.Rider_id);
    setPassengerDetails(data);
    setIsLoading(false);
  };
  useEffect(() => {
    getPassengerData();
  }, []);
  const handleJoinRide = () => {
    Alert.alert(
      `Hi ${user.F_name}`,
      "Are you sure you want to approve this rider?",
      [
        { text: "No, cancel" },
        {
          text: "Yes, go for it!",
          onPress: async () => {
            await approveRide(passenger); //sign the user into the ride on db
            onUpdate(); //update the ride data on the app state
          },
        },
      ]
    );
  };

  const getBackGroundColor = () => {
    if (passenger.IsApproved) {
      return "rgba(50,200,50,0.2)";
    }
    if (!passenger.IsApproved) {
      return "orange";
    }
    return null;
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
        backgroundColor: getBackGroundColor(),
      }}
    >
      <View style={styles.rowContainter}>
        <View style={styles.container}>
          <Text style={styles.driverName}>
            {passengerDetails.F_name} {passengerDetails.L_name}
          </Text>
          <Text style={styles.driverName}>0{passengerDetails.Phone_num}</Text>
          <Text style={styles.driverName}>{passengerDetails.fullAddress}</Text>
        </View>

        <View style={styles.actionContainer}>
          {passenger.IsApproved ? (
            <View style={styles.userBelongToRide}>
              {passenger.IsApproved ? (
                <View>
                  <Text style={[{ color: "green" }]}>Approved</Text>
                  <Icon name="check" type="material" size={30} />
                </View>
              ) : (
                <Text style={[{ color: "white" }]}>Waiting for approval</Text>
              )}
            </View>
          ) : (
            <Button
              buttonStyle={styles.button}
              title="Approve Ride"
              onPress={() => handleJoinRide()}
            />
          )}
        </View>
      </View>
    </Card>
  );
};

export default PassengerCard;

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
    height: 70,
    width: 130,
    borderRadius: 15,
    backgroundColor: "red",
  },

  userBelongToRide: {
    flexDirection: "column",
    justifyContent: "space-between",
  },
  leaveRide: {
    color: "grey",
  },
});
