import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { scale } from 'react-native-size-matters'
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
        <TouchableOpacity activeOpacity={alreadyFriends ? 1 : .5} style={{position: 'absolute', right: 0}} onPress={alreadyFriends ? null : onPress}>
            {alreadyFriends ?  <Feather name="user-check" size={scale(20)} color="black" /> : <Feather name="user-plus" size={scale(20)} color="black" />}
        </TouchableOpacity>
    </View>
  )
}
const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: scale(6),
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
        marginBottom: scale(5)
    },
    username: {
        fontFamily: 'DMSans_400Regular',
        fontSize: RFValue(10),
        color: Colors.textgray
    }
})

export default User_list_item
