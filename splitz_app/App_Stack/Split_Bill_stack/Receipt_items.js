import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useNavigation, useRoute } from '@react-navigation/native';
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize'
import { scale } from 'react-native-size-matters';


const Receipt_items = () => {

  const navigation = useNavigation();
  const route = useRoute();
  console.log(route.params)

  return (
    <View>
      <Text>Receipt_items</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  
})

export default Receipt_items
