import { SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { LinearGradient } from 'expo-linear-gradient'
import Constants from 'expo-constants';

const LinearGradient_background = ({ children }) => {
  return (
    <LinearGradient colors={['#005D1A','#C1EBCD']} 
    start={{ x: 0.5, y: 1 }}
    end={{ x: .5, y: 0 }}
    style={styles.container}>
        <SafeAreaView style={{paddingTop: Constants.statusBarHeight, flex: 1}}>
            {children}
        </SafeAreaView>
    </LinearGradient>
  )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
})

export default LinearGradient_background
