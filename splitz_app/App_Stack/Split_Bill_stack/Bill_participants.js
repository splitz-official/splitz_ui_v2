import { KeyboardAvoidingView, Platform, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { RFValue } from 'react-native-responsive-fontsize'

import { MaterialCommunityIcons } from '@expo/vector-icons';

import Screen from '../../../Components/Screen'
import Back_button from '../../../Components/Back_button'
import Colors from '../../../Config/Colors'
import Large_green_button from '../../../Components/Large_green_button'


//TODO:
//ADD GRID LIST WHEN FRIENDS ARE ADDED
//ADD FILTERING OF LIST WHEN FRIENDS ARE ADDED
//ADD QR FUNCTIONALITY WHEN AVAILABLE
//think about how to add friends. Need endpoint to add others to your room

const Bill_participants = () => {

    const { navigate } = useNavigation();
    const [search, setSearch] = useState('');

  return (
    <Screen>
        <Back_button 
        onPress={()=> navigate('home')}
        title={'Home'}
        />
        <KeyboardAvoidingView
        behavior='height'
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
        style={{flex: 1}}
        >
            <View style={styles.bottom_container}>
                <Text style={styles.title_text}>Bill Participants</Text>
                <Text style={styles.subtitle_text}>Find People on Splitz</Text>
                <TextInput 
                style={styles.textInput}
                placeholder='Group, name, number...'
                placeholderTextColor={Colors.textgray}
                maxLength={25}
                value={search}
                onChangeText={setSearch}
                autoFocus={true}
                keyboardType='default'
                autoCorrect={false}
                />
                <TouchableOpacity style={styles.QR_Code} activeOpacity={.8} onPress={()=> console.log("QR PRESSED BUT NO FUNCTION :)")}>
                    <MaterialCommunityIcons name="qrcode-scan" size={RFValue(16)} color={Colors.primary} />
                    <Text style={styles.QR_text}> Scan QR Code</Text>
                </TouchableOpacity>
                <Text style={[styles.subtitle_text, {marginTop: 40}]}>Quick Add Participants</Text>

                <Text style={{marginTop: 40, fontSize: RFValue(18)}}>You have no friends!</Text>
            </View>
            <Large_green_button 
            title={'Next'}
            />
        </KeyboardAvoidingView>
    </Screen>
  )
}

const styles = StyleSheet.create({
    bottom_container: {
        marginHorizontal: '6%',
        marginTop: 20
    },
    title_text: {
        fontSize: RFValue(18),
        fontFamily: 'DMSans_700Bold',
    },
    subtitle_text: {
        fontSize: RFValue(14),
        fontFamily: 'DMSans_500Medium',
        marginTop: 20
    },
    textInput: {
        borderWidth: 1,
        borderRadius: 10,
        marginTop: 15,
        borderColor: Colors.textInputGray,
        fontFamily: 'DMSans_400Regular',
        fontSize: RFValue(12),
        padding: 10,
    },
    QR_Code: {
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'flex-start',
        marginTop: 10,
        marginLeft: 5,
        // borderWidth: 2
    },
    QR_text: {
        fontSize: RFValue(12), 
        color: Colors.textgray
    },

})

export default Bill_participants
