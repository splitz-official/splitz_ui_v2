import { Alert, Keyboard, KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native'
import React, { useState } from 'react'
import { useNavigation } from '@react-navigation/native';

import { MaterialIcons } from '@expo/vector-icons';

import Screen from '../../../Components/Screen';
import TopLogo from '../../../Components/TopLogo';
import Colors from '../../../Config/Colors';
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize';
import Back_button from '../../../Components/Back_button';

const Send_feedback = () => {

    const [feedbackText, setFeedbackText] = useState('');
    const { navigate } = useNavigation();

    handleSubmitFeedback = () => {
        //add backend when endpoint is created NOT DONE
        if(feedbackText.trim() != ''){
            console.log("From Feedback_Screen. Submit Button Pressed. Feedback: " + feedbackText);
            setFeedbackText('');
            navigate('profile');
        }else {
            Alert.alert('No feedback :(')
        }
    }


  return (
    <Screen style={{backgroundColor: Colors.white}}>
        <TouchableWithoutFeedback onPress={()=> {
            // console.log("dismiss keyboard");
            Keyboard.dismiss();
        }}>
            <KeyboardAvoidingView style={{flex: 1}} behavior='padding'>
                {/* <TopLogo/> */}
                <Back_button 
                onPress={()=> navigate('profile')}
                title={'Back'}
                />
                <View style={styles.title_and_gray_container}>
                    <View style={styles.feedback_title_container}>
                        <MaterialIcons name="feedback" size={RFValue(25)} color={Colors.primary} />
                        <Text style={styles.feedback_title_text}>Send feedback to Splitz!</Text>
                    </View>
                    <Text
                    style={styles.gray_text}
                    >
                        This app was created for you. We are continueously looking for ways to improve your experience. We'd love to hear your ideas!
                    </Text>
                </View>
                    <TextInput 
                    multiline={true}
                    autoFocus={true}
                    value={feedbackText}
                    onChangeText={setFeedbackText}
                    maxLength={250}
                    style={styles.textbox}>
                    </TextInput>
                <TouchableOpacity style={feedbackText.trim() !== '' ? styles.submitbutton : [styles.submitbutton, styles.disabled]} 
                onPress={handleSubmitFeedback}
                activeOpacity={.7}>
                    <Text style={{
                        color: Colors.white, 
                        fontFamily: 'DMSans_700Bold',
                        fontSize: RFValue(12)}}>Submit</Text>
                </TouchableOpacity>
            </KeyboardAvoidingView>
        </TouchableWithoutFeedback>
    </Screen>
  )
}

const styles = StyleSheet.create({
    feedback_title_container: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        // borderWidth: 2
    },
    feedback_title_text: {
        fontFamily: 'DMSans_700Bold',
        fontSize: RFValue(20),
        marginLeft: 10,
        // borderWidth: 2,
        // borderColor: 'blue'
    },
    title_and_gray_container: {
        paddingLeft: '8%',
        paddingRight: '5%',
        marginTop: RFPercentage(5),
        // borderWidth: 2,
        // borderColor: 'purple'
    },
    gray_text: {
        fontFamily: 'DMSans_400Regular',
        color: Colors.textgray,
        fontSize: RFValue(10),
        marginTop: 8
    },
    textbox: {
        marginHorizontal: '8%',
        borderRadius: 10,
        borderColor: Colors.lightgray,
        borderWidth: 2,
        marginTop: 25,
        height: RFPercentage(20),
        paddingHorizontal: 20,
        paddingTop: 20,
        textAlignVertical: 'top',
        fontSize: RFValue(14),
        color: Colors.black
    },
    submitbutton: {
        backgroundColor: Colors.primary,
        height: RFPercentage(4),
        width: RFPercentage(10),
        marginTop: 20,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: '8%'
    },
    disabled: {
        backgroundColor: Colors.grey
    }
})

export default Send_feedback
