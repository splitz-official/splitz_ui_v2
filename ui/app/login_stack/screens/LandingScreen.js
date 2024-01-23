import React from "react";
import { View, StyleSheet, Image, TouchableOpacity } from "react-native";

import colors from "../../../../constants/colors";
// import {
//   HeadingText,
//   TopLogo,
//   ButtonText,
//   ButtonText2,
// } from "../../../components/";

import HeadingText from "../../../components/HeadingText";
import TopLogo from "../../../components/TopLogo";
import ButtonText from "../../../components/ButtonText";
import ButtonText2 from "../../../components/ButtonText2";

function LandingScreen() {
  const handlePress = () => {
    console.log("test!");
  };
  return (
    <View style={styles.container}>
      <TopLogo />
      <Image
        style={styles.LandingScreenImage}
        source={require("../../../../assets/app_images/people_talking.png")}
      />
      <View style={styles.buttonBox}>
        <View style={styles.textBox}>
          <HeadingText>
            Group payments made simple, social, and central.
          </HeadingText>
        </View>
        <TouchableOpacity style={styles.primaryButton} onPress={handlePress}>
          <ButtonText>Sign Up</ButtonText>
        </TouchableOpacity>
        <TouchableOpacity style={styles.secondaryButton} onPress={handlePress}>
          <ButtonText2>Login</ButtonText2>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.secondary,
    flex: 1,
  },

  LandingScreenImage: {
    justifyContent: "center",
    top: 40,
    width: 420,
    height: 500,
  },
  buttonBox: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    backgroundColor: colors.white,
    justifyContent: "center",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  textBox: {
    justifyContent: "flex-start",
    alignItems: "center",
    alignSelf: "center",
    marginBottom: 30,
    bottom: 10,
  },
  topLogo: {
    justifyContent: "flex-start",
    width: 164,
    height: 55,
    top: 60,
  },
  primaryButton: {
    backgroundColor: colors.primary,
    borderRadius: 100,
    width: 355,
    height: 60,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },
  secondaryButton: {
    backgroundColor: colors.white,
    borderRadius: 100,
    borderWidth: 2,
    borderColor: colors.primary,
    width: 355,
    height: 60,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },
});

export default LandingScreen;
