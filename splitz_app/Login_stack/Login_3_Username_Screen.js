import { StyleSheet, Text, TextInput, TouchableWithoutFeedback, View, Keyboard, KeyboardAvoidingView, Platform } from 'react-native'
import React, { useState, useRef } from 'react'
import { useNavigation } from '@react-navigation/native'
import axios from 'axios'
import * as SecureStore from "expo-secure-store"


import { useAxios } from '../../Axios/axiosContext'
import GradientBackground from './Components/Gradient_background'
import Login_layout from './Components/Login_layout'
import Green_button from './Components/Green_button'
import { RFValue } from 'react-native-responsive-fontsize'
import Colors from '../../Config/Colors'
import { scale } from 'react-native-size-matters'
import Screen from '../../Components/Screen'

const Login_3_Username_Screen = ({ route }) => {
    console.log("Login Stack: Username Input Screen")
    const { navigate } = useNavigation();

    const { axiosInstance, setUserData } = useAxios();
    const [name, setName] = useState("");
    const [username, setUsername] = useState('');
    const nameInputRef = useRef(null);
    const usernameInputRef = useRef(null);
    

    const handleCreatePress = async () => {
        if (name == "" || username == "") {
          alert("Please fill in all fields");
          return;
        }
        const data = {
          name: name,
          username: username,
        };
        axiosInstance
        .put(`/user/update`, data)
        .then((response) => {
            // console.log(response.data);
            // alert("Update Success!");
            setUserData(response.data);
            navigate("Bottom_Tab_Home_Navigator");
        })
        .catch((error) => {
            Alert.alert("Failed!");
            console.log("error", error);
        });
    }

  return (
      <GradientBackground showBottomView={true}>
        <Screen style={{backgroundColor: Colors.white}}>
        <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={{flex: 1}}>
            <View style={{flex: 1}}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={{justifyContent: "flex-start"}}>
            <Text style={styles.titleText}>What's your name?</Text>
            <Text style={styles.helperText}>Please set your full name and username!</Text>
            <Text style={styles.header}>Full Name:</Text>
            <View style={styles.textinputcontainer}>
                <TextInput 
                style={styles.Input}
                ref={nameInputRef}
                onSubmitEditing={() => usernameInputRef.current.focus()}
                returnKeyType='next'
                returnKeyLabel='next'
                onChangeText={setName}
                value={name}
                keyboardType='name-phone-pad'
                selectionColor={Colors.mediumgray}
                autoFocus={true}
                />
            </View>
            <Text style={styles.header}>Username:</Text>
            <View style={styles.textinputcontainer}>
                <TextInput 
                style={styles.Input}
                ref={usernameInputRef}
                onChangeText={setUsername}
                value={username}
                keyboardType='name-phone-pad'
                selectionColor={Colors.mediumgray}
                autoCorrect={false}
                />
            </View>
            <Green_button onPress={handleCreatePress}>Create Account</Green_button>
            </View>
</TouchableWithoutFeedback>
</View>
</KeyboardAvoidingView>
</Screen>
    </GradientBackground>
  )
}

const styles = StyleSheet.create({
    header: {
        marginLeft: scale(20),
        marginTop: scale(20),
        marginBottom: scale(15),
        fontSize: RFValue(14),
        fontFamily: 'DMSans_700Bold'
    },
    textinputcontainer: {
        borderWidth: scale(2),
        borderRadius: scale(15),
        marginLeft: scale(20),
        marginBottom: scale(5),
        marginRight: scale(20),
        borderColor: Colors.lightgray,
        paddingBottom: scale(15),
        paddingTop: scale(20),
        paddingHorizontal: scale(15),
        shadowColor: Colors.mediumgray,
        shadowOpacity: scale(.3),
        shadowRadius: scale(3),
        shadowOffset: {
            height:scale(3),
            width: 0
        }
    },
    Input: {
        fontSize: RFValue(16)
    },
    button: {
        marginBottom: scale(500),
        marginRight: scale(20)
    },
    titleText: {
        marginLeft: scale(20),
        marginTop: scale(50),
        marginBottom: scale(5),
        fontSize: RFValue(20),
        fontFamily: 'DMSans_700Bold'
    },
    helperText: {
        marginLeft: scale(20),
        marginBottom: scale(10),
        fontSize: RFValue(12),
        fontFamily: 'DMSans_400Regular',
        color: Colors.mediumgray
    },
})

export default Login_3_Username_Screen
