import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import axios from 'axios'
import * as SecureStore from "expo-secure-store"

import Config from 'react-native-config'
import GradientBackground from './Components/Gradient_background'
import Login_layout from './Components/Login_layout'
import Green_button from './Components/Green_button'
import OTPInputField from './Components/OTP_Input'
import Colors from '../../Config/Colors'
import { RFValue } from 'react-native-responsive-fontsize'

//ideas
//consider having the screen autonavigate when the otp is typed in

const Login_2_OTP_Screen = ({ route }) => {
    console.log("Login Stack: OTP Screen")
    const { phone_number } = route.params;
    const { baseURL } = route.params;
    const { navigate } = useNavigation();
    const [code, setCode] = useState("");
    const [pinReady, setPinReady] = useState("");
    const MAX_CODE_LENGTH = 5;

    async function saveKey(key, value) {
        await SecureStore.setItemAsync(key, value);
    }

    sendNewCode = () => {
        axios
          .post(baseURL + "/user/initialize-verification", {
            phone_number: phone_number,
          })
          .then((res) => {
            console.log(res);
          })
          .catch((error) => {
            console.log(error);
          });
    };
    

    const handleOTPSubmit = async () => {
        axios.post(baseURL + "/user/complete-verification", {
            phone_number: phone_number,
            otp: code,
        })
        .then(async (res) => {
            saveKey("access_token", res.data.access_token);
            const access_token = await SecureStore.getItemAsync("access_token");
            console.log("access token: ", access_token);
    
            axios.get(`${baseURL}/user/`, {
                headers: {
                    Authorization: `Bearer ${access_token}`,
                },
            })
            .then((res) => {
                if (!res.data.name) {
                    navigate("Username_Input_Screen");
                } else {
                    navigate("Bottom_Tab_Home_Navigator", { baseURL: baseURL });
                }
            })
            .catch((error) => {
                console.log("error here 1: ", error);
            });
        })
        .catch((error) => {
            if (error.response && error.response.status === 401){
                alert("The code entered was incorrect. Please try again.")
            } else {
                console.log("error here 2: ", error);
            }
        });
    };
    

  return (
    <GradientBackground showBottomView={true}>
        <Login_layout
        title_text={"Enter the code we just sent!"}
        subtitle_text={`We texted you at ${phone_number}`}>
            <OTPInputField
            setPinReady={setPinReady}
            code={code}
            setCode={setCode}
            maxLength={MAX_CODE_LENGTH}
            ></OTPInputField>
            <View style={styles.anothercodetextcontainer}>
                <Text style={styles.getAnythingText}>Didn't Get Anything?</Text>
                <TouchableOpacity
                onPress={sendNewCode}
                activeOpacity={.8}>
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
  )
}

const styles = StyleSheet.create({
    anothercodetextcontainer: {
        marginLeft: 20,
        marginBottom: 10,
        flexDirection: 'row'
    },
    againText: {
        color: Colors.primary,
        fontFamily: 'DMSans_400Regular',
        fontSize: RFValue(12),
        marginLeft: 5
    },
    getAnythingText: {
        fontSize: RFValue(12), 
        fontFamily: 'DMSans_400Regular',
        color: Colors.textgray
    }
})

export default Login_2_OTP_Screen
