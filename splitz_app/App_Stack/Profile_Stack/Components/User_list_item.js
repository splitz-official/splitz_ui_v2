import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { scale, verticalScale } from 'react-native-size-matters'
import { RFValue } from 'react-native-responsive-fontsize'

import { Feather } from '@expo/vector-icons';

import Colors from '../../../../Config/Colors'

const User_list_item = ({ name, username, onPress, alreadyFriends}) => {
  return (
    <View style={styles.container} activeOpacity={.5}>
        {/* <Image />  */}
        <View style={styles.image}>

        </View>
        <View style={styles.text_container}>
            <Text style={styles.name}>{name}</Text>
            <Text style={styles.username}>@{username}</Text>
        </View>
        <TouchableOpacity activeOpacity={alreadyFriends ? 1 : .5} style={styles.add_check_icon} onPress={alreadyFriends ? null : onPress}>
            {alreadyFriends ?  <Feather name="user-check" size={scale(20)} color="black" /> : <Feather name="user-plus" size={scale(20)} color="black" />}
        </TouchableOpacity>
    </View>
  )
}
const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: verticalScale(5),
        // marginVertical: verticalScale(4),
        // borderWidth: 1
    },
    image: {
        borderWidth: 1,
        height: scale(40),
        width: scale(40),
        borderRadius: scale(20)
    },
    text_container: {
        marginLeft: scale(10)
    },
    name: {
        fontFamily: 'DMSans_500Medium',
        fontSize: RFValue(12),
        marginBottom: verticalScale(5)
    },
    username: {
        fontFamily: 'DMSans_400Regular',
        fontSize: RFValue(10),
        color: Colors.textgray
    },
    add_check_icon: {
        position: 'absolute', 
        right: scale(10)
    }
})

export default User_list_item
