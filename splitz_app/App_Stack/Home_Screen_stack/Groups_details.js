import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'
import { scale } from 'react-native-size-matters'
import { useNavigation, useRoute } from '@react-navigation/native'


import Screen from '../../../Components/Screen'
import Back_button from '../../../Components/Back_button'
import Colors from '../../../Config/Colors'
import { RFValue } from 'react-native-responsive-fontsize'
import Large_green_button from '../../../Components/Large_green_button'

const Groups_details = () => {

    const navigation = useNavigation();
    const route = useRoute();
    const { room_details } = route.params;
    console.log(room_details);

  return (
    <Screen>
        <Back_button onPress={()=> navigation.goBack()}/>
        <View style={styles.top_container}>
            <View style={styles.room_icon}>
                <Text>{room_details.room_code}</Text>
            </View>
            <View>
                <Text style={styles.title}>{room_details.room_name}</Text>
                <Text style={styles.subtitle}>Room code: {room_details.room_code}</Text>
            </View>
        </View>
        <Large_green_button text_style={{fontSize: RFValue(14)}}title={"Add Bill"}/>
    </Screen>
  )
}

const styles = StyleSheet.create({
    top_container: {
        flexDirection: 'row',
        // borderWidth: 1,
        alignItems: 'center',
        paddingLeft: '17%',
        paddingRight: '10%',
        marginTop: scale(20)
    },
    room_icon: {
        height: scale(60),
        width: scale(60),
        borderRadius: scale(30),
        borderWidth: 1,
        borderColor: Colors.primary,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: scale(15)
    },
    title: {
        fontFamily: 'DMSans_700Bold',
        fontSize: RFValue(34),
        // borderWidth: 1,
    },
    subtitle: {
        fontSize: RFValue(10),
        color: Colors.textgray,
        fontFamily: 'DMSans_400Regular'
        // borderWidth: 1
    }
})

export default Groups_details
