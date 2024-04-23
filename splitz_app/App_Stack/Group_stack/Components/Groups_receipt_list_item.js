import { Dimensions, StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native'
import React from 'react'
import { RFValue } from 'react-native-responsive-fontsize'

import { Ionicons } from '@expo/vector-icons';
import { scale, verticalScale } from 'react-native-size-matters';
import Colors from '../../../../Config/Colors';


const screenWidth = Dimensions.get('window').width;
// console.log(screenWidth);

const Groups_receipt_list_item = ({ title, owner}) => {


  return (
    <TouchableWithoutFeedback>
        <View style={styles.container}>
            <Text style={styles.owner}>Added by: {owner}</Text>
            <Text numberOfLines={2} style={styles.name}>"{title}"</Text>
        </View>
    </TouchableWithoutFeedback>
  )
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        height: verticalScale(55),
        // borderWidth: 1,
    },
    owner: {
        fontFamily: 'DMSans_500Medium',
        fontSize: RFValue(14)
    },
    name: {
        fontFamily: 'DMSans_400Regular',
        fontSize: RFValue(10),
        color: Colors.black,
        // marginTop: scale(5)
    }
})

export default Groups_receipt_list_item
