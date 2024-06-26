import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import PhoneInput from "react-native-phone-number-input";
import { RFValue } from "react-native-responsive-fontsize";

import axios from "axios";
import Config from "react-native-config";

import GradientBackground from "./Components/Gradient_background";
import Colors from "../../Config/Colors";
import Login_layout from "./Components/Login_layout";
import Green_button from "./Components/Green_button";
import { useAxios } from "../../Axios/axiosContext";

function Login_1_Phone_Input_Screen({ route }) {
  console.log("Login Stack: Phone Input Screen");
  const navigation = useNavigation();
  const [number, setNumber] = useState("");
  const { axiosInstance } = useAxios();

  handleIntializeVerification = () => {
    axiosInstance
      .post("/user/initialize-verification", {
        phone_number: number,
      })
      .then((res) => {
        console.log(number);
        navigation.navigate("OTP_Screen", { phone_number: number });
      })
      .catch((error) => {
        console.log("From phone input:", error);
      });
  };

  return (
    <GradientBackground showBottomView={true}>
      <Login_layout
        title_text={"What's your phone number"}
        subtitle_text={"We'll text you a confirmation code after!"}
      >
        <Text style={styles.phone_subtitle}>Phone Number:</Text>
        <PhoneInput
          defaultCode="US"
          value={number}
          onChangeFormattedText={(text) => {
            setNumber(text);
          }}
          containerStyle={styles.phoneNumberBox}
          textInputProps={{
            maxLength: 10,
            keyboardType: "numeric",
          }}
          textInputStyle={styles.phoneinputbox}
          autoFocus
          withShadow
        />
        <Green_button onPress={handleIntializeVerification}>
          Continue
        </Green_button>
        {/* <TouchableOpacity
                    onPress={()=>{navigate("Landing_Screen")}}>
                        <Text>GO BACK</Text>
                    </TouchableOpacity> */}
      </Login_layout>
    </GradientBackground>
  );
}

const styles = StyleSheet.create({
  phone_subtitle: {
    fontFamily: "DMSans_700Bold",
    fontSize: RFValue(14),
    marginVertical: 20,
    marginLeft: 20,
  },
  phoneNumberBox: {
    marginBottom: 10,
    flexDirection: "row",
    borderColor: Colors.lightgray,
    borderWidth: 2,
    marginLeft: 20,
    width: "95%",
  },
  phoneinputbox: {
    fontSize: RFValue(14),
    fontFamily: "DMSans_500Medium",
    // color: Colors.primary
  },
});

export default Login_1_Phone_Input_Screen;
