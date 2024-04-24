import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { scale } from 'react-native-size-matters'
import { RFValue } from 'react-native-responsive-fontsize'

const Participants_list_item = ({ name, username, onPress}) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
        <View style={styles.profilePicture}/>
        <View style={styles.nameContainer}>
        <Text style={styles.fullName}>{name}</Text>
        <Text style={styles.usersName}>@{username}</Text>
        </View>
    </TouchableOpacity>
  )
}
const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        padding: scale(7),
        marginTop: 2,
    },
    nameContainer: {
      padding: scale(7),
    },
    profilePicture: {
      borderWidth: 1,
      borderRadius: 100,
      height: scale(45),
      width: scale(45),
      marginRight: scale(10)
    },
    fullName: {
      fontSize: RFValue(13),
      marginBottom: scale(3)
    },
    usersName: {
      color: "grey"
    },
})

export default Participants_list_item
