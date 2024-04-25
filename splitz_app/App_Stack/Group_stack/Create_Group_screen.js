import { KeyboardAvoidingView, Platform, StyleSheet, Text, TextInput, TouchableOpacity, View, TouchableWithoutFeedback, Keyboard, ScrollView, Alert, Image } from 'react-native'
import React, { useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize'

import { MaterialCommunityIcons } from '@expo/vector-icons';


import { useAxios } from '../../../Axios/axiosContext';
import Screen from '../../../Components/Screen'
import Back_button from '../../../Components/Back_button'
import Colors from '../../../Config/Colors'
import Large_green_button from '../../../Components/Large_green_button'
import { scale } from 'react-native-size-matters';

const Create_Group_screen = () => {

    const { navigate } = useNavigation();
    const [search, setSearch] = useState('');
    const [group, setGroup] = useState('')
    const [password, setPassword] = useState('');
    const { axiosInstance } = useAxios();

    const handleContinue = async () => {
        if(group.trim() !== "") {
            console.log('From Create_Group_screen: handle continue to create group password screen')
            try {
                const body = { room_name: group.trim(), room_password: password };
                const created_room = await axiosInstance.post(`/room/create`, body);
                navigate("Groups_details", {room_code: created_room.data.room_code});
            } catch (error) {
                console.error(error);
            }
        } else {
            Alert.alert("Please enter a group name to continue!");
        }
    };

  return (
    <Screen style={{backgroundColor: Colors.white}}>
        <Back_button 
        onPress={()=> navigate('home')}
        title={'Home'}
        />
        <KeyboardAvoidingView behavior={'height'} style={{flex: 1}}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.container}>
                <TextInput 
                    style={styles.Group_name_input}
                    placeholder='Name your group...'
                    placeholderTextColor={Colors.textInputPlaceholder}
                    maxLength={20}
                    value={group}
                    onChangeText={setGroup}
                    autoFocus={true}
                    keyboardType='default'
                    autoCorrect={false}
                    />
                <View style={styles.bottom_line}/>
                <Image source={require('../../../assets/create_img.png')} resizeMode='contain' style={{height: '80%', width: '100%'}}/>
            </View>

            {/* <View style={styles.bottom_container}>
                <Text style={styles.subtitle_text}>Add Group Members</Text>
                <TextInput 
                style={styles.textInput}
                placeholder='Group, name, number...'
                placeholderTextColor={Colors.textInputPlaceholder}
                maxLength={25}
                value={search}
                onChangeText={setSearch}
                keyboardType='default'
                autoCorrect={false}
                />
                <TouchableOpacity style={styles.QR_Code} activeOpacity={.8} onPress={()=> console.log("QR PRESSED BUT NO FUNCTION :)")}>
                    <MaterialCommunityIcons name="qrcode-scan" size={RFValue(16)} color={Colors.primary} />
                    <Text style={styles.QR_text}>Scan QR Code</Text>
                </TouchableOpacity>
                <Text style={[styles.subtitle_text, {marginTop: 40}]}>Quick Add Participants</Text>
                <Text style={{marginTop: 40, fontSize: RFValue(18)}}>You have no friends! Invite them to create a group!</Text>
            </View> */}
            </TouchableWithoutFeedback>
            <Large_green_button 
            title={'Create Room'}
            onPress={handleContinue}
            disabled={group.trim()===""}
            />
        </KeyboardAvoidingView>
    </Screen>
  )
}

const styles = StyleSheet.create({
    container: {
        marginHorizontal: "6%",
        marginTop: "20%",
        flex: 1,
    },
    Group_name_input: {
        fontFamily: 'DMSans_700Bold',
        fontSize: RFValue(20),
        color: Colors.primary,
        marginBottom: scale(5),
        // borderWidth: 1,
    },
    top_container: {
        flexDirection: "row",
        marginHorizontal: "6%",
        marginTop: "20%",
        // marginBottom: scale(10),
        alignItems: 'center',
        // flex: 1,
        // borderWidth: 1
    },
    bottom_container: {
        marginHorizontal: '6%',
        marginTop: "2%",
    },
    image: {
        height: scale(55),
        width: scale(55),
        borderRadius: scale(27.5),
        borderWidth: 1,
        borderColor: Colors.primary,
    },
    title_text: {
        fontSize: RFValue(18),
        fontFamily: 'DMSans_700Bold',
    },
    subtitle_text: {
        fontSize: RFValue(14),
        fontFamily: 'DMSans_500Medium',
        marginTop: 20
    },
    textInput: {
        borderWidth: 1,
        borderRadius: 10,
        marginTop: 15,
        borderColor: Colors.textInputGray,
        fontFamily: 'DMSans_400Regular',
        fontSize: RFValue(12),
        padding: 10,
    },
    input_box: {
        flexDirection:"column", 
        marginLeft: scale(15),
        flex: 1,
        // borderWidth: 1
    },
    bottom_line:{
        height: scale(2),
        minWidth: '80%',
        backgroundColor: Colors.primary,
    },
    QR_Code: {
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'flex-start',
        marginTop: scale(10),
        marginLeft: scale(5),
        // borderWidth: 2
    },
    QR_text: {
        fontSize: RFValue(12), 
        color: Colors.textgray,
        marginLeft: scale(5)
    },
})

export default Create_Group_screen
