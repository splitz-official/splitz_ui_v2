import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { scale } from 'react-native-size-matters'
import { RFValue } from 'react-native-responsive-fontsize'

import { useAxios } from '../../../../Axios/axiosContext'

import Profile_picture from '../../../../Components/Profile_picture'

const Participants_list_item = ({ image, name, username, onPress }) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
        <View>
        <Profile_picture 
                    image={image} 
                    name={name} 
                    sizing_style={styles.profile_pic} 
                    text_sizing={{fontSize: RFValue(20)}}/>
        </View>
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
      marginLeft: scale(5),
    },
    profile_pic: {
      height: scale(50), 
      width: scale(50), 
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
