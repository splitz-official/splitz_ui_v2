import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import * as SecureStore from "expo-secure-store";

import GradientBackground from "./Components/Gradient_background";
import Login_layout from "./Components/Login_layout";
import Green_button from "./Components/Green_button";
import OTPInputField from "./Components/OTP_Input";
import Colors from "../../Config/Colors";
import { RFValue } from "react-native-responsive-fontsize";
import { useAxios } from "../../Axios/axiosContext";

//ideas

const Login_2_OTP_Screen = ({ route }) => {
  console.log("Login Stack: OTP Screen");

  const { axiosInstance, setUpdateCount, setToken, setUserData } = useAxios();
  const { phone_number } = route.params;
  const navigation = useNavigation();
  const [code, setCode] = useState("");
  const [pinReady, setPinReady] = useState("");
  const MAX_CODE_LENGTH = 5;

  sendNewCode = () => {
    axiosInstance
      .post("/user/initialize-verification", {
        phone_number: phone_number,
      })
      .then((res) => {
        console.log(res);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleCodeChange = (newCode) => {
    setCode(newCode);
  };

  useEffect(() => {
    if (code.length === MAX_CODE_LENGTH) {
      handleOTPSubmit();
    }
  }, [code]);

  const handleOTPSubmit = async () => {
    axiosInstance
      .post("/user/complete-verification", {
        phone_number: phone_number,
        otp: code,
      })
      .then(async (res) => {
        const { access_token } = res.data;
        // console.log(access_token)
        await SecureStore.setItemAsync("access_token", res.data.access_token);
        axiosInstance.setAuthToken(access_token);
        setToken(access_token);
        axiosInstance
          .get(`/user/`)
          .then((res) => {
            if (!res.data.name) {
              navigation.navigate("Username_Input_Screen");
            } else {
              // console.log("Logged Name: " + res.data.name, "Logged Username: " + res.data.username);
              // console.log(res.data);
              setUserData(res.data);
              navigation.navigate("Bottom_Tab_Home_Navigator");
            }
          })
          .catch((error) => {
            console.log("error here 1: ", error);
          });
      })
      .catch((error) => {
        if (error.response && error.response.status === 401) {
          alert("The code entered was incorrect. Please try again.");
        } else {
          console.log("error here 2: ", error);
        }
      });
  };

  return (
    <GradientBackground showBottomView={true}>
      <Login_layout
        title_text={"Enter the code we just sent!"}
        subtitle_text={`We texted you at ${phone_number}`}
      >
        <OTPInputField
          setPinReady={setPinReady}
          code={code}
          setCode={handleCodeChange}
          maxLength={MAX_CODE_LENGTH}
        ></OTPInputField>
        <View style={styles.anothercodetextcontainer}>
          <Text style={styles.getAnythingText}>Didn't Get Anything?</Text>
          <TouchableOpacity onPress={sendNewCode} activeOpacity={0.8}>
            <Text style={styles.againText}>Get another code here</Text>
          </TouchableOpacity>
        </View>
        <Green_button onPress={handleOTPSubmit}>Continue</Green_button>
        {/* <TouchableOpacity
            onPress={()=>{navigate("Phone_Input_Screen")}}>
                <Text>GO BACK</Text>
            </TouchableOpacity> */}
      </Login_layout>
    </GradientBackground>
  );
};

const styles = StyleSheet.create({
  anothercodetextcontainer: {
    marginLeft: 20,
    marginBottom: 10,
    flexDirection: "row",
  },
  againText: {
    color: Colors.primary,
    fontFamily: "DMSans_400Regular",
    fontSize: RFValue(12),
    marginLeft: 5,
  },
  getAnythingText: {
    fontSize: RFValue(12),
    fontFamily: "DMSans_400Regular",
    color: Colors.textgray,
  },
});

export default Login_2_OTP_Screen;
