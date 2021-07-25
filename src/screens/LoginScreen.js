import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { Button } from "react-native-elements";
import { signin } from "../api/authApi";

const LoginScreen = ({ setUser, setLoading }) => {
  const [userId, setUserId] = useState();
  const [password, setPassword] = useState();
  const [showPassword, setShowPassword] = useState(false);

  const handleSignIn = async () => {
    setLoading(true);
    const user = await signin(userId, password);
    setLoading(false);
    if (user) {
      setUser(user);
    } else {
      alert("User ID or password are incorrect, please try again");
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Log In</Text>
      </View>
      <View style={styles.inputsContainer}>
        <TextInput
          placeholder="ID"
          value={userId}
          onChangeText={(input) => setUserId(input)}
          style={styles.input}
        />
        <View style={styles.passwordContainer}>
          <TextInput
            placeholder="Password"
            value={password}
            onChangeText={(input) => setPassword(input)}
            secureTextEntry={!showPassword}
            style={styles.input}
            textContentType="password"
          />
          <TouchableOpacity
            onPressIn={() => setShowPassword(true)}
            onPressOut={() => setShowPassword(false)}
            style={styles.showPassword}
          >
            <Text style={{ color: "#3f95e0" }}>Show</Text>
          </TouchableOpacity>
        </View>
      </View>
      <Button
        buttonStyle={styles.button}
        containerStyle={styles.buttonContainer}
        title="Log In"
        onPress={() => handleSignIn()}
      />
      <TouchableOpacity style={styles.forgotPassword}>
        <Text style={{ color: "#3f95e0" }}>Forgot your password?</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    flex: 1,
  },
  titleContainer: {
    justifyContent: "center",
    flex: 3,
  },
  title: {
    alignSelf: "center",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 30,
    color: "#293934",
  },
  inputsContainer: { flex: 10 },
  input: {
    borderRadius: 8,
    height: Dimensions.get("window").height * 0.06,
    width: Dimensions.get("window").width * 0.9,
    backgroundColor: "rgba(0,0,0,0.03)",
    fontSize: 16,
    paddingLeft: 10,
    borderWidth: 0.5,
    borderColor: "rgba(0,0,0,0.05)",
    textAlign: "left",
  },
  passwordContainer: {
    flexDirection: "row",
    marginTop: 15,
  },
  showPassword: {
    position: "absolute",
    right: Dimensions.get("window").width * 0.05,
    alignSelf: "center",
  },
  buttonContainer: {
    flex: 2,
    justifyContent: "center",
  },
  button: {
    height: Dimensions.get("window").height * 0.06,
    width: Dimensions.get("window").width * 0.8,
    borderRadius: 15,
    backgroundColor: "#3f95e0",
  },
  forgotPassword: {
    flex: 1.5,
  },
});

export default LoginScreen;
