import { StyleSheet, Text, TouchableOpacity, View, Image, Dimensions } from 'react-native'
import React from 'react'
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize'
import { useNavigation } from '@react-navigation/native'
import { scale } from 'react-native-size-matters'

import Colors from '../../../../Config/Colors'

const Groups_list_item = ({title, image, icon_text, room_code}) => {

    const navigation = useNavigation();

  return (
    <TouchableOpacity style={styles.container} activeOpacity={.8} 
    onPress={()=>navigation.navigate('CreateGroupStackNavigation', { 
        screen: 'Groups_details',
        params: { room_code }
        })}>
        {/* <Image source={image}style={styles.image}>

        </Image> */}
        <View style={styles.icon_no_image}>
            <Text style={{fontSize: RFValue(12)}}>{icon_text}</Text>
        </View>
        <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
    container:{
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        // borderWidth: 2,
        margin: 2,
        height: Dimensions.get('screen').width/3,
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
