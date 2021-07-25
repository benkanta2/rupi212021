import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import DriversScreen from "../screens/DriversScreen";
import RidersScreen from "../screens/RidersScreen";
import Credits from "../screens/Credits";
import QA from "../screens/QA";
import ContactUs from "../screens/ContactUs";
import { getHeaderTitle } from "../utils/appUtils";

const Drawer = createDrawerNavigator();

export const mainDrawer = ({ navigation, route }) => {
  const user = route.params;
  React.useLayoutEffect(() => {
    navigation.setOptions({ headerTitle: getHeaderTitle(route) });
  }, [navigation, route]);
  return (
    <Drawer.Navigator drawerType={"slide"}>
      {user.Is_driver ? (
        <Drawer.Screen
          name="My Ride"
          component={DriversScreen}
          initialParams={user}
        />
      ) : (
        <Drawer.Screen
          name="Schedule Rides"
          component={RidersScreen}
          initialParams={user}
        />
      )}
      <Drawer.Screen name="Credits" component={Credits} initialParams={user} />
      <Drawer.Screen name="Q&A" component={QA} initialParams={user} />
      <Drawer.Screen
        name="Contact Us"
        component={ContactUs}
        initialParams={user}
      />
    </Drawer.Navigator>
  );
};
