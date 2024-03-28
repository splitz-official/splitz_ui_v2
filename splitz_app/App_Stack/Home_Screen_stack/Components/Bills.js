import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { RFValue } from 'react-native-responsive-fontsize'

const Bills = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>COMING SOON</Text>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        // borderWidth: 2,
    },
    text: {
        fontSize: RFValue(25)
    }
})

export default Bills
