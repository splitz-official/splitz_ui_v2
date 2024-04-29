import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Colors from '../Config/Colors';

const Profile_picture = ({image, name, sizing_style, text_sizing, maxLength = 2}) => {

    function getInitials(fullName) {
        const parts = fullName.trim().split(' '); 
        const initials = parts.slice(0,maxLength).map(part => part.charAt(0).toUpperCase());  
        return initials.join(''); 
    }

  return (
    image ?
        <Image resizeMode='cover' style={[styles.image, sizing_style]} source={{uri: image}}/>
    :
    <View style={[styles.no_image, sizing_style]}>
        <Text style={[styles.text, text_sizing]}>{getInitials(name)}</Text>
    </View>
  )
}
const styles = StyleSheet.create({
    image: {
        borderRadius: 999
    },
    no_image: {
        borderWidth: 1,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 999,
        backgroundColor: Colors.backgroundFillGray,
    },
    text: {
        fontFamily: 'DMSans_500Medium',
        color: Colors.icon_text_gray
    }
})

export default Profile_picture
