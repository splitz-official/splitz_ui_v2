import { FlatList, Keyboard, KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableWithoutFeedback, View } from 'react-native'
import React, { useState } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native';



import { useAxios } from '../../../Axios/axiosContext'
import Screen from '../../../Components/Screen';
import Back_button from '../../../Components/Back_button';
import Colors from '../../../Config/Colors';
import { RFValue } from 'react-native-responsive-fontsize';
import Large_green_button from '../../../Components/Large_green_button';
import { verticalScale } from 'react-native-size-matters';

const Bill_totals = () => {

  const { axiosInstance } = useAxios();
  const navigation = useNavigation();
  const route = useRoute();


  const [editingName, setEditingName] = useState(false);
  const [receiptname, setReceiptName] = useState('');


  return (
    <Screen>
      <Back_button title={"Back"} onPress={()=> navigation.goBack()}/>
      <KeyboardAvoidingView
      behavior='height'
      style={{flex: 1}}
      >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <TextInput 
          style={styles.receipt_name}
          value={receiptname}
          onFocus={()=> setEditingName(true)}
          onChangeText={setReceiptName}
          placeholder='Name this bill!'
          placeholderTextColor={Colors.textInputPlaceholder}
          autoFocus={false}
          />
        <View style={styles.top_total_container}>
          <Text style={styles.top_total_text}>Total</Text>
        </View>
      <View style={styles.list_container}>
        <FlatList 
        
        />
      </View>
      </View>
      </TouchableWithoutFeedback>
      <Large_green_button title={"TBD"}/>
      </KeyboardAvoidingView>
    </Screen>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: '6%'
  },
  receipt_name: {
    borderBottomWidth: 3,
    borderBottomColor: Colors.primary,
    fontFamily: 'DMSans_700Bold',
    color: Colors.primary,
    fontSize: RFValue(18),
    marginTop: '10%'
  },
  top_total_container: {
    alignItems: 'center',
    marginTop: '8%',
    // borderWidth: 1,
  },
  top_total_text: {
    fontFamily: 'DMSans_700Bold',
    fontSize: RFValue(24)
  },
  list_container: {
    borderWidth: 1,
    marginTop: '8%',
    height: '10%',
  }
})

export default Bill_totals
