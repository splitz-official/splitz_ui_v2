import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { MaterialIcons } from '@expo/vector-icons';
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize';

import Colors from '../../../../Config/Colors';
import { scale, verticalScale } from 'react-native-size-matters';

const Large_Button = ({ title, Iconcomponent, onPress }) => {

  return (
    <TouchableOpacity  onPress={onPress} activeOpacity={.7} style={styles.container}>
      <View style={styles.text_iconContainer}>
            <View style={styles.icon}>
                {Iconcomponent}   
            </View>
          <Text style={styles.text}>{title}</Text>
      </View>
      <MaterialIcons name="keyboard-arrow-right" size={30} color="black" />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center', 
    flex: 1,
    justifyContent:'space-between',
    alignItems: 'center',
    marginVertical: verticalScale(5),
    paddingLeft: scale(15),
    paddingRight: scale(10),
    // borderWidth: 1,
  },
  text_iconContainer: {
    marginRight: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  icon:{
    backgroundColor: Colors.lightgray,
    borderRadius: scale(5),
    height: scale(35),
    width: scale(35),
    justifyContent: 'center',
    alignItems: 'center'
  },
  text: {
    marginLeft: RFPercentage(4),
    fontFamily: 'DMSans_700Bold',
    fontSize: RFValue(14)
  },
});

export default Large_Button;
