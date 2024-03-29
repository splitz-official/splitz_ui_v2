import { StyleSheet, Text, TouchableOpacity, View, Image, Dimensions } from 'react-native'
import React from 'react'
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize'
import Colors from '../../../../Config/Colors'

const Groups_list_item = ({title, image, onPress, icon_text}) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
        {/* <Image source={image}style={styles.image}>

        </Image> */}
        <View style={styles.icon_with_initial}>
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
    icon_with_initial: {
        height: RFPercentage(8),
        width: RFPercentage(8),
        borderRadius: RFPercentage(4),
        borderWidth: 2,
        borderColor: Colors.primary,
        marginBottom: 8,
        justifyContent: 'center',
        alignItems: 'center'
    }
})

export default Groups_list_item
