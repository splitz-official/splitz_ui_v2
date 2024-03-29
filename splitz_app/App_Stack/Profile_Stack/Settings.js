import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Screen from '../../../Components/Screen'
import Back_button from '../../../Components/Back_button'
import { useNavigation } from '@react-navigation/native'
import TopLogo from '../../../Components/TopLogo'
import { RFValue } from 'react-native-responsive-fontsize'

const Settings = () => {

    const { navigate } = useNavigation();

  return (
    <Screen>
        <TopLogo/>
        <Back_button title={'Back'} onPress={()=>navigate('profile')}/>
        <View style={styles.container}>
            <Text style={styles.title}>Settings</Text>
        </View>
    </Screen>
  )
}

const styles = StyleSheet.create({
    title: {
        fontFamily: 'DMSans_700Bold',
        fontSize: RFValue(18),
    },
    container: {
        flex: 1,
        marginHorizontal: '6%'
    }
})

export default Settings
