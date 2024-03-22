import { StyleSheet, Text, TextInput, TouchableWithoutFeedback, View, Keyboard } from 'react-native'
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
import axiosInstance from '../../Axios/axiosInstance'

const Login_3_Username_Screen = ({ route }) => {
    console.log("Login Stack: Username Input Screen")
    const { baseURL } = route.params;
    const { navigate } = useNavigation();

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
            console.log(response.data);
            alert("Update Success!");
            navigate("Bottom_Tab_Home_Navigator");
        })
        .catch((error) => {
            Alert.alert("Failed!");
            console.log("error", error);
        });
    }

  return (
      <GradientBackground showBottomView={true}>
        <Login_layout //login layout has keyboard avoiding view for anyone wondering
        title_text={"What's your name?"}
        subtitle_text={"Please set your full name and username!"}>
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
        </Login_layout>
    </GradientBackground>
  )
}

const styles = StyleSheet.create({
    header: {
        marginLeft: 20,
        marginTop: 25,
        marginBottom: 15,
        fontSize: RFValue(14),
        fontFamily: 'DMSans_700Bold'
    },
    textinputcontainer: {
        borderWidth: 2,
        borderRadius: 15,
        marginLeft: 20,
        marginBottom: 20,
        borderColor: Colors.lightgray,
        paddingBottom: 15,
        paddingTop: 20,
        paddingHorizontal: 15,
        shadowColor: Colors.mediumgray,
        shadowOpacity: .3,
        shadowRadius: 3,
        shadowOffset: {
            height:3,
            width: 0
        }
    },
    Input: {
        fontSize: RFValue(16)
    },
    button: {
        marginBottom: 500
    }
})

export default Login_3_Username_Screen
