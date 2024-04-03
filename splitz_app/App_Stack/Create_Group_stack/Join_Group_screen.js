import { KeyboardAvoidingView, Platform, StyleSheet, Text, TextInput, TouchableOpacity, View, TouchableWithoutFeedback, Keyboard, ScrollView } from 'react-native'
import React, { useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize'

import { MaterialCommunityIcons } from '@expo/vector-icons';

import Screen from '../../../Components/Screen'
import Back_button from '../../../Components/Back_button'
import Colors from '../../../Config/Colors'
import Large_green_button from '../../../Components/Large_green_button'

const Join_Group_screen = () => {

    const { navigate } = useNavigation();
    const [id, setId] = useState('');
    const [password, setPassword] =useState('')

    const handleJoin = () => {
        console.log("check if group exists + if password is correct")
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
            <View style={styles.input_box}>
            <TextInput 
                style={styles.Group_name_input}
                placeholder='Bill/Group ID'
                placeholderTextColor={Colors.textgray}
                maxLength={25}
                value={id}
                onChangeText={setId}
                autoFocus={true}
                keyboardType='default'
                autoCorrect={false}
                />
            <View style={styles.bottom_line}/>
            <TextInput 
                style={styles.Group_name_input}
                placeholder='Password (if available)'
                placeholderTextColor={Colors.textgray}
                maxLength={25}
                value={password}
                onChangeText={setPassword}
                keyboardType='default'
                autoCorrect={false}
                secureTextEntry
                />
            <View style={styles.bottom_line}/>
            </View>
            </View>
            </View>
            </TouchableWithoutFeedback>
            </ScrollView>
            <Large_green_button 
            title={'Join'}
            onPress={handleJoin}
            disabled={id.trim() === ""}
            />
            </View>
        </KeyboardAvoidingView>
    </Screen>
  )
}

const styles = StyleSheet.create({
    top_container: {
        marginHorizontal: "6%",
        marginTop: "35%",
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
        fontSize: RFValue(20),
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
        width: RFPercentage(37),
        backgroundColor: Colors.primary,
    },
    flexContainer: {
        flex: 1, // Make sure this container takes up all available space
    },

})

export default Join_Group_screen
