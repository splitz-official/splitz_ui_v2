import React from "react";
import { Image, StyleSheet } from "react-native";

function TopLogo() {
  return (
    <Image
      style={styles.topLogo}
      source={require("../../assets/app_images/splitzTopLogo.png")}
    ></Image>
  );
}

const styles = StyleSheet.create({
  topLogo: {
    justifyContent: "flex-start",
    width: 180,
    height: 55,
    top: 60,
    left: 10,
  },
});

export default TopLogo;
