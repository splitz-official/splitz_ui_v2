import { StyleSheet, Text, TextInput, View } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'


import GradientBackground from './Components/Gradient_background'
import Login_layout from './Components/Login_layout'
import Green_button from './Components/Green_button'

const Login_3_Username_Screen = ({ route }) => {
    console.log("Login Stack: Username Input Screen")
    // const { baseURL } = route.params;
    // const { navigate } = useNavigation();



  return (
    <GradientBackground showBottomView={true}>
        <Login_layout
        title_text={"What's your name?"}
        subtitle_text={"Please set your full name and username!"}>
            <View style={styles.textinputcontainer}>
                <TextInput 
                style={styles.nameInput}
                
                />
            </View>
            <Green_button>Create Account</Green_button>
        </Login_layout>
    </GradientBackground>
  )
}

const styles = StyleSheet.create({
    textinputcontainer: {
        borderWidth: 2
    }
})

export default Login_3_Username_Screen
