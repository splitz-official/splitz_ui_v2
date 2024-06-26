import { StyleSheet, Text, TouchableOpacity, View, Image, Dimensions } from 'react-native'
import React from 'react'
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize'
import { scale } from 'react-native-size-matters'

import { FontAwesome6 } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import Colors from '../../../../Config/Colors'
import { Bold700Text } from '../../../../Config/AppText';

const Groups_list_item = ({title, image, icon_text, room_code, onPress}) => {
    
    const truncate = (text, maxLength) => {
        return text.length > maxLength ? text.substring(0, maxLength - 3) + '...' : text;
    };

  return (
    <TouchableOpacity 
    style={styles.container} 
    activeOpacity={.8} 
    onPress={onPress}>
        {image ? 
            <Image source={{uri: image}}style={styles.image}></Image>
        :
            <View style={styles.image}>
                <MaterialCommunityIcons name="account-group" size={scale(32)} color={Colors.primary} />
            </View>
        }
        <Bold700Text style={styles.text} numberOfLines={2}>{title}</Bold700Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
    container:{
        alignItems: 'center',
        margin: 2,
        height: Dimensions.get('screen').width/3,
        justifyContent: "flex-start",
        paddingTop: '5%',
        flex: 1,
        // borderWidth: 1
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
        fontSize: RFValue(12),
        textAlign: 'center',
        width: "100%",
        paddingTop: scale(2),
    }
})

export default Groups_list_item
