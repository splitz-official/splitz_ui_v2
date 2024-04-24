import { KeyboardAvoidingView, StyleSheet, Text, TextInput, View } from 'react-native'
import React from 'react'
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize'
import { scale, verticalScale } from 'react-native-size-matters'
import Colors from '../../../../Config/Colors'

const Edit_profile_text_fields = ({description, placeholder_value, extra_style, editable, onChangeText, placeholderColor}) => {
  return (
    <View style={styles.container}> 
      <Text style={[styles.description, extra_style]}>{description}</Text>
      <TextInput 
        style={[editable ? [styles.editing, styles.value] : styles.value]} 
        placeholder={placeholder_value}
        placeholderTextColor={placeholderColor}
        onChangeText={onChangeText}
        autoCapitalize='none'
        readOnly={!editable}
        />
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: scale(25),
        alignItems: 'center',
        height: verticalScale(40),
        // borderWidth: 2
    },
    description: {
        // borderWidth: 2,
        fontFamily: 'DMSans_500Medium',
        fontSize: RFValue(14),
        color: 'black'
    },
    value: {
        // borderWidth: 2,
        fontFamily: 'DMSans_400Regular',
        fontSize: RFValue(14),
    },
    editing: {
        borderBottomWidth: 1, 
        borderColor: Colors.black,
        padding: 5,
        minWidth: RFPercentage(15)
    }
})

export default Edit_profile_text_fields
