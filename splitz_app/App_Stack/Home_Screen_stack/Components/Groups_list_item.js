import { StyleSheet, Text, TouchableOpacity, View, Image, Dimensions } from 'react-native'
import React from 'react'
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize'
import { useNavigation } from '@react-navigation/native'
import { scale } from 'react-native-size-matters'

import { FontAwesome6 } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import Colors from '../../../../Config/Colors'

const Groups_list_item = ({title, image, icon_text, room_code, onPress}) => {

    const navigation = useNavigation();

    function getInitials(fullName) {
        const parts = fullName.trim().split(' '); 
        const initials = parts.slice(0,3).map(part => part.charAt(0).toUpperCase());  
        return initials.join('. ') + '.'; 
    }
    
    const truncate = (text, maxLength) => {
        return text.length > maxLength ? text.substring(0, maxLength - 3) + '...' : text;
    };

  return (
    <TouchableOpacity 
    style={styles.container} 
    activeOpacity={.8} 
    onPress={onPress}>
        {image ? 
            <Image source={image}style={styles.image}></Image>
        :
            <View style={styles.icon_no_image}>
                <MaterialCommunityIcons name="account-group" size={scale(32)} color={Colors.black} />
            </View>
        }
        <Text style={styles.text} numberOfLines={2}>{title}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
    container:{
        alignItems: 'center',
        flex: 1,
        margin: 2,
        height: Dimensions.get('screen').width/3,
        justifyContent: "flex-start",
        flexGrow: 1,
        paddingTop: '5%',
    },
    image: {
        height: scale(60),
        width: scale(60),
        borderRadius: scale(30),
        borderWidth: 2,
        borderColor: Colors.primary,
        marginBottom: 8,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
    },
    text: {
        fontFamily: 'DMSans_700Bold',
        fontSize: RFValue(12),
        textAlign: 'center',
        width: "100%",
        paddingTop: scale(2),
    },
    icon_no_image: {
        height: scale(60),
        width: scale(60),
        borderRadius: scale(30),
        borderWidth: 2,
        borderColor: Colors.primary,
        marginBottom: 8,
        justifyContent: 'center',
        // backgroundColor: Colors.backgroundFillGray,
        alignItems: 'center',
        position: "relative",
    }
})

export default Groups_list_item
