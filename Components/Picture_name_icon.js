import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { scale } from 'react-native-size-matters'
import { RFValue } from 'react-native-responsive-fontsize'

const Picture_name_icon = ({ name, icon_name_styles }) => {
return (
    <View style={[styles.container, icon_name_styles]}>
        <View style={styles.image}>

        </View>
        <Text style={styles.name}>{name}</Text>
    </View>
    )
}
const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        // borderWidth: 1,
        margin: 0
    },
    image: {
        height: scale(45),
        width: scale(45),
        borderRadius: scale(22.5),
        borderWidth: 1
    },
    name: {
        fontFamily: 'DMSans_500Medium',
        fontSize: RFValue(14),
        marginTop: scale(5)
    }
})

export default Picture_name_icon
