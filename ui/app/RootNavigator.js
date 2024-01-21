import React from "react";

import { createStackNavigator } from "@react-navigation/stack";
import LandingScreen from "./login_stack/screens/LandingScreen";
import { View } from "react-native";
import colors from "../../constants/colors";

const Stack = createStackNavigator();

function RootStack() {
  return (
    <View>
      <Stack.Navigator screenOptions={{}} initialRouteName="LandingScreen">
        <Stack.Screen name="Landing_Screen" component={LandingScreen} />
      </Stack.Navigator>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary,
  },
});

export default RootStack;
