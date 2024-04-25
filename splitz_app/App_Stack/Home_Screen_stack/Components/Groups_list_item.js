import { StyleSheet, Text, TouchableOpacity, View, Image, Dimensions } from 'react-native'
import React from 'react'
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize'
import { useNavigation } from '@react-navigation/native'
import { scale } from 'react-native-size-matters'

import Colors from '../../../../Config/Colors'

const Groups_list_item = ({title, image, icon_text, room_code, onPress}) => {

    const navigation = useNavigation();

    const truncate = (text, maxLength) => {
        return text.length > maxLength ? text.substring(0, maxLength - 3) + '...' : text;
    };

  return (
    <TouchableOpacity 
    style={styles.container} 
    activeOpacity={.8} 
    onPress={onPress}>
        {/* <Image source={image}style={styles.image}>

        </Image> */}
        <View style={styles.icon_no_image}>
            <Text style={{fontSize: RFValue(12)}}>{icon_text}</Text>
        </View>
        <Text style={styles.text} numberOfLines={2}>{title}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
    container:{
        alignItems: 'center',
        justifyContent: 'flex-start',
        paddingTop: '5%',
        flex: 1,
        margin: 2,
        height: Dimensions.get('screen').width/3,
        // borderWidth: 2,
    },
    image: {
        height: RFPercentage(8),
        width: RFPercentage(8),
        borderRadius: RFPercentage(4),
        borderWidth: 2,
        borderColor: Colors.primary,
        marginBottom: 8,
    },
    text: {
        fontFamily: 'DMSans_700Bold',
        fontSize: RFValue(12)
    },
    icon_no_image: {
        height: scale(60),
        width: scale(60),
        borderRadius: scale(30),
        borderWidth: 2,
        borderColor: Colors.primary,
        marginBottom: 8,
        justifyContent: 'center',
        alignItems: 'center'
    }
})

export default Groups_list_item
