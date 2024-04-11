import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useNavigation, useRoute } from '@react-navigation/native';

const Receipt_details = () => {

    const route = useRoute();
    const { receipt, room_code } = route.params;
    console.log(route.params);

  return (
    <View>
      <Text>Receipt_details</Text>
    </View>
  )
}

export default Receipt_details

const styles = StyleSheet.create({})