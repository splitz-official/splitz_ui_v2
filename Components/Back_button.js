import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize';

import { MaterialIcons } from '@expo/vector-icons';
import Colors from '../Config/Colors';
import { scale } from 'react-native-size-matters';

const Back_button = ({onPress, title, children, disabled}) => {
  return (
    <View style={{}}>
      <TouchableOpacity 
          onPress={disabled ? null : onPress}
          style={styles.container}
          activeOpacity={.8}
          >
          <MaterialIcons name="arrow-back-ios-new" size={RFValue(14)} color={disabled ? Colors.white : Colors.primary} />
          <Text style={disabled ? styles.disabled :styles.text}>{title}</Text>
          {/* {children} */}
      </TouchableOpacity>
      {children}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    marginLeft: '5%',
    marginVertical: scale(10),
    // borderWidth: 2,
  },
  text: {
    color: Colors.darkgreen,
    fontFamily: 'DMSans_500Medium',
    fontSize: RFValue(12),
    marginLeft: 5
  },
  disabled: {
    color: Colors.white,
    fontFamily: 'DMSans_500Medium',
    fontSize: RFValue(12),
    marginLeft: 5
  }
})

export default Back_button
