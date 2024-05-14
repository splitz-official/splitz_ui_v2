import { KeyboardAvoidingView, Platform, StyleSheet, Text, TextInput, TouchableOpacity, View, TouchableWithoutFeedback, Keyboard, ScrollView, Alert, Image } from 'react-native'
import React, { useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize'
import { scale } from 'react-native-size-matters';

import { MaterialCommunityIcons } from '@expo/vector-icons';

import Screen from '../../../Components/Screen'
import Back_button from '../../../Components/Back_button'
import Colors from '../../../Config/Colors'
import Large_green_button from '../../../Components/Large_green_button'
import { useAxios } from '../../../Axios/axiosContext';

const Join_Group_screen = () => {


    //how do we get room data. Can we have the output of the join endpoint be the same as the create/`/room/members/{user_id}`
    const { axiosInstance } = useAxios();
    const navigation = useNavigation();
    const [id, setId] = useState('');
    const [password, setPassword] =useState('')

    const handleJoin = async () => {
        console.log("check if group exists + if password is correct")
        try {
            const body = { room_code: id.trim(), room_password: password };
            const join_room = await axiosInstance.post(`/room/join`, body);
            navigation.navigate('Groups_details', {room_code: id});
        } catch (error) {
            console.error(error);
            Alert.alert("Join room failed")
        }
    };

  return (
    <Screen style={{backgroundColor: Colors.white}}>
        <Back_button 
        onPress={()=> navigation.navigate('home')}
        title={'Home'}
        />
        <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={{flex: 1}}>
            <View style={{flex: 1}}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={styles.container}>
                    <TextInput 
                        style={styles.group_id_pass_input}
                        placeholder='Bill/Group ID'
                        placeholderTextColor={Colors.textInputPlaceholder}
                        maxLength={20}
                        value={id}
                        onChangeText={setId}
                        autoFocus={true}
                        keyboardType='default'
                        autoCorrect={false}
                        autoCapitalize='characters'
                        />
                    <View style={styles.bottom_line}/>
                    {/* <TextInput 
                        style={styles.group_id_pass_input}
                        placeholder='Password (if available)'
                        placeholderTextColor={Colors.placeholderTextColor}
                        maxLength={25}
                        value={password}
                        onChangeText={setPassword}
                        keyboardType='default'
                        autoCorrect={false}
                        secureTextEntry
                        />
                    <View style={styles.bottom_line}/> */}
                    {/* <Image source={require('../../../assets/join_img.png')} resizeMode='contain' style={{height: '80%', width: '100%'}}/> */}
                </View>
            </TouchableWithoutFeedback>
            <Large_green_button 
            title={'Join'}
            onPress={handleJoin}
            disabled={id.trim().length !== 6}
            />
            </View>
        </KeyboardAvoidingView>
    </Screen>
  )
}

const styles = StyleSheet.create({
    container: {
        marginHorizontal: "6%",
        marginTop: "20%",
        flex: 1,
        // maxHeight: scale(100),
        // borderWidth: 1
    },
    group_id_pass_input: {
        fontFamily: 'DMSans_700Bold',
        fontSize: RFValue(20),
        color: Colors.primary,
        marginBottom: scale(5),
    },
    bottom_line:{
        height: scale(2),
        backgroundColor: Colors.primary,
        marginBottom: scale(10)
    },
    flexContainer: {
        flex: 1, 
    },

})

export default Join_Group_screen
