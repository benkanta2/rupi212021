import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { config } from "../config";
export const tryLocalSignIn = async () => {
  try {
    const localUser = JSON.parse(await AsyncStorage.getItem("user"));
    return localUser;
  } catch (err) {
    return null;
  }
};
export const signin = async (userId, password) => {
  let url = `${config.SERVER_URL}/api/Users/${userId}/${password}/exist`;
  let result = await axios
    .get(url)
    .then(async function ({ data }) {
      if (data.Id !== 0) {
        console.log("success login");
        let userdata = await getUserData(data.Id);
        data.fullAddress = userdata.fullAddress;
        await AsyncStorage.setItem("user", JSON.stringify(data));

        return data;
      } else {
        console.log("user doesn't exist");
        return null;
      }
    })
    .catch(function (error) {
      console.log("error logging in");
      console.log(error);
      return null;
    });
  return result;
};

export const signout = (setUser) => {
  AsyncStorage.removeItem("user");
  setUser(null);
};

export const getUserData = async (userID) => {
  let url = `${config.SERVER_URL}/api/Users/${userID}`;
  let result = await axios.get(url).then(async ({ data }) => {
    url = `${config.SERVER_URL}/api/City?UserID=${userID}`;
    let address = await axios.get(url).then(({ data }) => {
      return data;
    });
    return { ...data, fullAddress: address };
  });
  return result;
};
