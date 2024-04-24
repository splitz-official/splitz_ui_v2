import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { scale, verticalScale } from 'react-native-size-matters'
import { RFValue } from 'react-native-responsive-fontsize'
import Colors from '../../../../Config/Colors'

const User_total_list_item = ({name, price, onPress, first_letter}) => {

    const truncate = (text, maxLength) => {
        return text.length > maxLength ? text.substring(0, maxLength - 3) + '...' : text;
    };

  return (
    <TouchableOpacity activeOpacity={.8} style={styles.container} onPress={onPress}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <View style={styles.icon}>
                <Text style={styles.icon_letter}>{first_letter}</Text>
            </View>
            <Text style={styles.name}>{truncate(name, 15)}</Text>
        </View>
        <Text style={styles.price}>{price}</Text>
    </TouchableOpacity>
  )
}
const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        borderWidth: 1,
        borderColor: Colors.primary,
        borderRadius: scale(15),
        paddingHorizontal: scale(20),
        height: verticalScale(50),
        maxWidth: '100%',
        minWidth: '100%',
        marginVertical: verticalScale(3),
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    name: {
        fontFamily: 'DMSans_500Medium',
        fontSize: RFValue(14),
        // borderWidth: 1
    },
    price: {
        fontFamily: 'DMSans_500Medium',
        fontSize: RFValue(22),
        // borderWidth: 1
    },
    icon: {
        borderWidth: 2,
        borderColor: Colors.primary,
        height: scale(30),
        width: scale(30),
        borderRadius: scale(15),
        marginRight: scale(10),
        backgroundColor: Colors.backgroundFillGray,
        justifyContent: 'center',
        alignItems: 'center'
    },
    icon_letter: {
        fontFamily: 'DMSans_700Bold',
        fontSize: RFValue(20),
        color: '#959595'
    }
})

export default User_total_list_item
