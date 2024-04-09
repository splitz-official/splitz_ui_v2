import { Dimensions, StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native'
import React from 'react'
import { RFValue } from 'react-native-responsive-fontsize'

import { Ionicons } from '@expo/vector-icons';
import { scale } from 'react-native-size-matters';
import Colors from '../../../../Config/Colors';


const screenWidth = Dimensions.get('window').width;
// console.log(screenWidth);

const Groups_receipt_list_item = ({ title }) => {


  return (
    <TouchableWithoutFeedback>
        <View style={styles.container}>
            <Ionicons name="receipt-outline" size={scale(38)} color={Colors.primary} />
            <Text numberOfLines={2} style={styles.name}>{title}</Text>
        </View>
    </TouchableWithoutFeedback>
  )
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: scale(10),
        width: scale(80),
        height: scale(100),
        // borderWidth: 1,
    },
    name: {
        fontFamily: 'DMSans_500Medium',
        fontSize: RFValue(12),
        color: Colors.black,
        marginTop: scale(5)
    }
})

export default Groups_receipt_list_item
