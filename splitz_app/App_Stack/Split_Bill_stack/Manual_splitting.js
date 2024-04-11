import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useNavigation, useRoute } from '@react-navigation/native';


import Screen from '../../../Components/Screen'
import Back_button from '../../../Components/Back_button'

const Manual_splitting = () => {

    const navigation = useNavigation();
    const route = useRoute();
    console.log(route.params);

  return (
    <Screen>
        <Back_button title={'Back'} onPress={()=>navigation.goBack()}/>
    </Screen>
  )
}
const styles = StyleSheet.create({

})

export default Manual_splitting
