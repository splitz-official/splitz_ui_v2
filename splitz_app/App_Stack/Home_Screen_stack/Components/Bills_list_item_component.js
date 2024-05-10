import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { Bold700Text, Medium500Text, RegularText } from '../../../../Config/AppText'
import { RFValue } from 'react-native-responsive-fontsize'
import { scale, verticalScale } from 'react-native-size-matters'
import Colors from '../../../../Config/Colors'

const Bills_list_item_component = ({ title, subtitle, onPress }) => {
  return (
    <View style={styles.container} >
        <View>
            <Bold700Text style={styles.title}>{title}</Bold700Text>
            <RegularText style={styles.title}>Created by: {subtitle}</RegularText>
        </View>
        <TouchableOpacity activeOpacity={.8} onPress={onPress} style={styles.circle}>
            <Medium500Text style={styles.circle_text}>View</Medium500Text>
        </TouchableOpacity>
    </View>
  )
}
const styles = StyleSheet.create({
    container: {
        paddingVertical: verticalScale(10),
        paddingHorizontal: '5%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    title: {
        fontSize: RFValue(12),
        marginBottom: verticalScale(5)
    },
    subtitle: {
        fontSize: RFValue(10)
    },
    circle: {
        height: scale(40),
        width: scale(40),
        borderRadius: 999,
        backgroundColor: Colors.primary,
        justifyContent: 'center',
        alignItems: 'center'
    },
    circle_text: {
        color: Colors.white,
        fontSize: RFValue(10)
    }
})

export default Bills_list_item_component
