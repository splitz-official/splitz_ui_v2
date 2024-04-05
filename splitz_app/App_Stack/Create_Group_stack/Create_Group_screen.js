import { KeyboardAvoidingView, Platform, StyleSheet, Text, TextInput, TouchableOpacity, View, TouchableWithoutFeedback, Keyboard, ScrollView } from 'react-native'
import React, { useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize'

import { MaterialCommunityIcons } from '@expo/vector-icons';

import Screen from '../../../Components/Screen'
import Back_button from '../../../Components/Back_button'
import Colors from '../../../Config/Colors'
import Large_green_button from '../../../Components/Large_green_button'

const Create_Group_screen = () => {

    const { navigate } = useNavigation();
    const [search, setSearch] = useState('');
    const [group, setGroup] =useState('')

    const handleContinue = () => {
        if(group.trim() !== "") {
        console.log('Create Group Password')
        navigate("Create_Group_password", {groupName: group});
        } else {
            alert("Please enter a group name to continue!");
        }
    };

  return (
    <Screen>
        <Back_button 
        onPress={()=> navigate('home')}
        title={'Home'}
        />
        <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={{flex: 1}}>
        <View style={styles.flexContainer}>
        <ScrollView contentContainerStyle={{ flexGrow: 1 }} keyboardShouldPersistTaps="handled">
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View>
            <View style={styles.top_container}>
            <View style={styles.image}/>
            <View style={styles.input_box}>
            <TextInput 
                style={styles.Group_name_input}
                placeholder='Name your group...'
                placeholderTextColor={Colors.textgray}
                maxLength={25}
                value={group}
                onChangeText={setGroup}
                autoFocus={true}
                keyboardType='default'
                autoCorrect={false}
                />
            <View style={styles.bottom_line}/>
            </View>
            </View>

            <View style={styles.bottom_container}>
                <Text style={styles.subtitle_text}>Add Group Members</Text>
                <TextInput 
                style={styles.textInput}
                placeholder='Group, name, number...'
                placeholderTextColor={Colors.textgray}
                maxLength={25}
                value={search}
                onChangeText={setSearch}
                keyboardType='default'
                autoCorrect={false}
                />
                <TouchableOpacity style={styles.QR_Code} activeOpacity={.8} onPress={()=> console.log("QR PRESSED BUT NO FUNCTION :)")}>
                    <MaterialCommunityIcons name="qrcode-scan" size={RFValue(16)} color={Colors.primary} />
                    <Text style={styles.QR_text}> Scan QR Code</Text>
                </TouchableOpacity>
                <Text style={[styles.subtitle_text, {marginTop: 40}]}>Quick Add Participants</Text>

                <Text style={{marginTop: 40, fontSize: RFValue(18)}}>You have no friends! Invite them to create a group!</Text>
            </View>
            </View>
            </TouchableWithoutFeedback>
            </ScrollView>
            <Large_green_button 
            title={'Continue'}
            onPress={handleContinue}
            disabled={group.trim()===""}
            />
            </View>
        </KeyboardAvoidingView>
    </Screen>
  )
}

const styles = StyleSheet.create({
    top_container: {
        flexDirection: "row",
        marginHorizontal: "6%",
        marginTop: "5%",
    },
    bottom_container: {
        marginHorizontal: '6%',
        marginTop: "2%",
    },
    image: {
        height: RFPercentage(8),
        width: RFPercentage(8),
        borderRadius: RFPercentage(4),
        borderWidth: 2,
        borderColor: Colors.primary,
        marginBottom: 8,
    },
    title_text: {
        fontSize: RFValue(18),
        fontFamily: 'DMSans_700Bold',
    },
    subtitle_text: {
        fontSize: RFValue(18),
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
    Group_name_input: {
        fontFamily: 'DMSans_700Bold',
        fontWeight: "bold",
        fontSize: RFValue(22),
        color: Colors.primary,
        marginTop: 10,
        marginBottom: 10,
    },
    input_box: {
        flexDirection:"column", 
        marginLeft: 15,
    },
    bottom_line:{
        height: RFPercentage(0.6),
        width: RFPercentage(31),
        backgroundColor: Colors.primary,
    },
    QR_Code: {
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'flex-start',
        marginTop: 15,
        marginLeft: 5,
        // borderWidth: 2
    },
    QR_text: {
        fontSize: RFValue(12), 
        color: Colors.textgray
    },
    flexContainer: {
        flex: 1, // Make sure this container takes up all available space
    },
})

export default Create_Group_screen
