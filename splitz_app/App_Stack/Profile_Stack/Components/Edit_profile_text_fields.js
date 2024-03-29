import { KeyboardAvoidingView, StyleSheet, Text, TextInput, View } from 'react-native'
import React from 'react'
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize'
import { scale } from 'react-native-size-matters'
import Colors from '../../../../Config/Colors'

const Edit_profile_text_fields = ({description, value, extra_style, editable, user_value, onChangeText}) => {
  return (
    <View style={styles.container} behavior='height'> 
      <Text style={[styles.description, extra_style]}>{description}</Text>
      {editable ? (
        <TextInput 
        style={[styles.value, styles.editing]} 
        placeholder={value}
        value={user_value}
        onChangeText={onChangeText}
        autoCapitalize={false}/>
      ) : (
        <Text style={[styles.value, extra_style]}>{value}</Text>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: scale(25),
        alignItems: 'center',
        marginVertical: scale(10),
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
        color: 'black'
    },
    editing: {
        borderBottomWidth: 1, 
        borderColor: Colors.black,
        padding: 5,
        minWidth: RFPercentage(15)
    }
})

export default Edit_profile_text_fields
