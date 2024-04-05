import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { RFValue } from 'react-native-responsive-fontsize'
import Colors from '../Config/Colors'


const Large_green_button = ({ onPress, title, disabled, text_style }) => {
    // Optional: Modify the button style based on the disabled state
    const buttonStyle = disabled ? [styles.button, styles.disabledButton] : styles.button;
  
    return (
      <View style={styles.container}>
          {/* Disable the onPress function based on the disabled prop */}
          <TouchableOpacity style={buttonStyle} activeOpacity={.8} onPress={!disabled ? onPress : null}>
              <Text style={[styles.text, text_style]}>{title}</Text>
          </TouchableOpacity>
      </View>
    );
  };
  
  const styles = StyleSheet.create({
      container: {
          alignItems: 'center',
          position: 'absolute',
          bottom: 0,
          flexDirection: 'row',
          backgroundColor: 'transparent',
          paddingVertical: 10,
      },
      button: {
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'row',
          backgroundColor: Colors.primary,
          borderRadius: 25,
          marginHorizontal: 10,
          flex: 1,
      },
      disabledButton: {
          backgroundColor: Colors.grey, // Change this to whatever color indicates a disabled state
      },
      text: {
          color: Colors.white,
          fontSize: RFValue(18),
          paddingVertical: 10,
          fontFamily: 'DMSans_700Bold',
      }, 
  });
  
  export default Large_green_button;