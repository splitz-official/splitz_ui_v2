import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { scale } from 'react-native-size-matters'

const Participants_list_item = ({ name, username, onPress}) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
        <Text>{name}</Text>
        <Text>@{username}</Text>
    </TouchableOpacity>
  )
}
const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        borderWidth: 1,
        padding: scale(10)
    }
})

export default Participants_list_item
