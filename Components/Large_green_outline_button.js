import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { RFValue } from 'react-native-responsive-fontsize'
import * as Haptics from 'expo-haptics';

import Colors from '../Config/Colors'
import { scale } from 'react-native-size-matters'
import { Medium500Text } from '../Config/AppText';

const Large_green_outline_button = ( { title, onPress, icon_component, disabled}) => {

    const handlePress = () => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        console.log("haptic")
        // if (onPress) onPress();
        onPress();
      };

  return (
    <View style={styles.container}>
        <TouchableOpacity style={disabled ? [styles.button, styles.disabled] : styles.button} onPress={!disabled ? handlePress : null} activeOpacity={.8}>
            {icon_component}
            <Medium500Text style={disabled ? [styles.text, styles.disabled_text] : styles.text}>{title}</Medium500Text>
        </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        // position: 'absolute',
        // bottom: 0,
        width: '50%',
        paddingVertical: scale(10),
        // borderWidth: 1
    },
    button: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Colors.white,
        borderColor: Colors.primary,
        borderWidth: 2,
        flex: 1,
        maxWidth: '90%',
        paddingVertical: scale(12),
        borderRadius: 25,
        shadowColor: Colors.black,
        shadowOpacity: .25,
        shadowRadius:4,
        shadowOffset: {
            height: 4,
        }
    },
    disabled: {
        backgroundColor: Colors.grey,
        borderColor: Colors.grey,
    },
    disabled_text: {
        color: Colors.mediumgray,
    },
    text: {
        fontFamily: 'DMSans_500Medium',
        fontSize: RFValue(14),
        marginLeft: scale(5)
    }
})

export default Large_green_outline_button
