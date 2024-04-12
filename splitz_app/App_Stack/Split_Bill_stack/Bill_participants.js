import { FlatList, Keyboard, KeyboardAvoidingView, Platform, StyleSheet, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';
import React, { useRef, useState } from 'react';
import { RFValue } from 'react-native-responsive-fontsize';
import { useNavigation, useRoute } from '@react-navigation/native';

import { MaterialCommunityIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';

import { scale } from 'react-native-size-matters';
import Screen from '../../../Components/Screen';
import Back_button from '../../../Components/Back_button';
import Colors from '../../../Config/Colors';
import Large_green_button from '../../../Components/Large_green_button';


//TODO:
//ADD GRID LIST WHEN FRIENDS ARE ADDED
//ADD FILTERING OF LIST WHEN FRIENDS ARE ADDED
//ADD QR FUNCTIONALITY WHEN AVAILABLE
//think about how to add friends. Need endpoint to add others to your room

const Bill_participants = () => {

    const navigation = useNavigation();
    const [search, setSearch] = useState('');
    const route = useRoute();
    console.log(route.params);

    const participantInputRef = useRef();

    const [participants, setParticipants] = useState([]);

    const addParticipant = () => {
        if (!search.trim()) return; 
        setParticipants([...participants, search.trim()]);
        setSearch(''); 
    };

    const removeParticipant = (index) => {
        const updatedParticipants = participants.filter((_, i) => i !== index);
        setParticipants(updatedParticipants);
    };

  return (
    <Screen>
        <Back_button 
        onPress={()=> navigation.goBack()}
        title={'Back'}
        />
        <KeyboardAvoidingView
        behavior='height'
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
        style={{flex: 1}}
        >
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={{flex: 1}}>
                <View style={styles.bottom_container}>
                    <Text style={styles.title_text}>Bill Participants</Text>
                    <Text style={styles.subtitle_text}>Find People on Splitz</Text>
                    <View style={styles.inputContainer}>
                        <TextInput 
                        style={styles.textInput}
                        placeholder='Group, name, number...'
                        placeholderTextColor={Colors.textgray}
                        maxLength={25}
                        ref={participantInputRef}
                        value={search}
                        onChangeText={setSearch}
                        autoFocus={true}
                        keyboardType='default'
                        // onSubmitEditing={()=> {
                        //     addParticipant()
                        //     participantInputRef.current.focus();
                        // }}
                        autoCorrect={false}
                        />
                        <TouchableOpacity style={{position: 'absolute', right: scale(20), bottom: scale(8),}} onPress={addParticipant}>
                            <AntDesign name="pluscircleo" size={scale(20)} color={Colors.primary} />
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity style={styles.QR_Code} activeOpacity={.8} onPress={()=> console.log("QR PRESSED BUT NO FUNCTION :)")}>
                        <MaterialCommunityIcons name="qrcode-scan" size={RFValue(16)} color={Colors.primary} />
                        <Text style={styles.QR_text}> Scan QR Code</Text>
                    </TouchableOpacity>
                    <Text style={[styles.subtitle_text, {marginTop: 40}]}>Quick Add Participants</Text>
                    {participants.length > 0 ? (
                        <FlatList 
                        data={participants}
                        keyExtractor={(index) => index.toString()}
                        renderItem={({item, index}) => 
                            <View style={{flexDirection: 'row', marginVertical: scale(5), alignItems: 'center'}}>
                                <Text style={{fontFamily: 'DMSans_500Medium', fontSize: RFValue(14), marginRight: scale(5)}}>{item}</Text>
                                <TouchableOpacity activeOpacity={.5} onPress={() => removeParticipant(index)}>
                                    <AntDesign name="closecircle" size={scale(16)} color="gray" />
                                </TouchableOpacity>
                            </View>
                        }
                        style={styles.participants_list}
                        />
                    ): (
                        <Text style={{marginTop: 40, fontSize: RFValue(18)}}>You have no friends!</Text>
                    )}
                </View>
                {/* <Large_green_button 
                title={'Next'}
                onPress={()=> navigation.navigate('upload_or_take_photo', route.params)}
                /> */}
                <Large_green_button title={'Next'} onPress={()=>navigation.navigate('Manual_entry', {participants})} disabled={participants.length === 0}/>
                </View>
            </TouchableWithoutFeedback>
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
        flex: 1,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center'
    },  
    participants_list: {
        marginTop: scale(15),
        // borderWidth: 1,
    },
    QR_Code: {
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'flex-start',
        marginTop: scale(10),
        marginLeft: scale(5),
        // borderWidth: 2
    },
    QR_text: {
        fontSize: RFValue(12), 
        color: Colors.textgray
    },

})

export default Bill_participants
