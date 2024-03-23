import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native';

import { MaterialIcons } from '@expo/vector-icons';

import Screen from '../../../Components/Screen';
import TopLogo from '../../../Components/TopLogo';
import Colors from '../../../Config/Colors';
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize';

const Send_feedback = () => {

    const { navigate } = useNavigation();


  return (
    <View style={styles.container}>
        <Screen>
            <TopLogo/>
            <TouchableOpacity 
            onPress={()=> navigate("profile")}
            style={styles.backbutton}>
                <MaterialIcons name="arrow-back-ios-new" size={RFValue(14)} color={Colors.primary} />
                <Text style={styles.backbuttontext}>BACK</Text>
            </TouchableOpacity>
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
        </Screen>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    },
    backbutton: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingLeft: '5%',
        marginTop: 10,
        // borderWidth: 2,
    },
    backbuttontext: {
        color: Colors.black,
        fontFamily: 'DMSans_500Medium',
        fontSize: RFValue(12),
        marginLeft: 5
    },
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
    }
})

export default Send_feedback
